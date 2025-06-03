const DEBUG_MODE = true;
window.selectSection = selectSection;

/* ------- SelectSection ------- */
function debug(data) {
  if (DEBUG_MODE) {
    console.debug("DEBUG: " + data);
  }
}

function selectSection(id) {
  if (!id) {
    console.warn("selectSection appelé sans id ; aucun changement effectué.");
    return;
  }

  document.querySelectorAll("#mainTabs button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.querySelectorAll(".convert-map-layout").forEach((sec) => {
    sec.style.display = "none";
    sec.classList.remove("active");
  });
  document.querySelectorAll(".content").forEach((sec) => {
    sec.style.display = "none";
    sec.classList.remove("active");
  });

  const section = document.getElementById(id);
  const button  = document.getElementById(id + "Btn");
  if (!section || !button) {
    console.warn(`selectSection : aucun élément trouvé pour id="${id}" ou id="${id}Btn"`);
    return;
  }

  section.style.display = "flex";
  section.classList.add("active");
  button.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  selectSection("convertMap");
});


/* ------- Cache, overpy, template -------*/
function getCacheURL(lang) {
  return new URL(`framework-templates/framework-template_${lang}.js`, import.meta.url).href;
}

async function cacheExists(lang) {
  const cacheUrl = getCacheURL(lang);
  try {
    const res = await fetch(cacheUrl, { method: "GET" });
    debug(`cacheExists (${lang}): HTTP ${res.status}`);
    return res.ok;
  } catch (e) {
    debug(`cacheExists error (${lang}): ` + e.message);
    return false;
  }
}

function getOverpy() {
  return window.window || window.OverPy || window.Overpy;
}

async function inlineIncludes(src, rawBase) {
  const re = /^[ \t]*#!include\s+"([^"]+)"[^\n]*$/gm;
  let out = "", last = 0, m;
  while ((m = re.exec(src))) {
    out += src.slice(last, m.index);
    const file = m[1], url = rawBase + file;
    debug(`Including ${file}`);
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status} fetching ${file}`);
    const txt = await r.text();
    out += await inlineIncludes(txt, rawBase);
    last = re.lastIndex;
  }
  return out + src.slice(last);
}

function cleanSource(src) {
  return src
    .replace(/^[ \t]*#!include.*$/gm, "")
    .replace(/^[ \t]*#!define\s+editortoggle.*$/gm, "")
    .replace(/^[ \t]*editortoggle\(.*\).*$/gm, "")
    .replace(/\beditoron\b/g, "false")
    .replace(/^[ \t]*(testData|selectedmap)\s*$/gm, "");
}

async function loadTemplate(lang) {
  const cacheUrl = getCacheURL(lang);

  if (await cacheExists(lang)) {
    debug(`Loading from cache for ${lang}`);
    const mod = await import(cacheUrl);
    return mod.frameworkTemplate;
  }

  debug(`Compiling new template for ${lang}`);
  const overpy = getOverpy();
  if (!overpy) throw new Error("OverPy UMD not found");
  await overpy.readyPromise;

  const rawBase   = "https://cdn.jsdelivr.net/gh/tylovejoy/genji-framework@1.10.3F/";
  const entryFile = "framework.opy";
  const resp      = await fetch(rawBase + entryFile);
  if (!resp.ok) throw new Error(`HTTP ${resp.status} on ${entryFile}`);
  let src = await resp.text();

  src = await inlineIncludes(src, rawBase);
  src = cleanSource(src);

  if (lang === "zh-CN") {
    src = src.replace(/^[ \t]*#!define\s+enableInvisCommand.*$/gm, "");
    src = "#!define enableInvisCommand false\n" + src;
    debug("Désactivation de enableInvisCommand pour zh-CN");
  }

  const { result } = await overpy.compile(src, lang, rawBase, entryFile);
  const tpl = result;

  const esc = tpl.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
  const moduleText =
    `// framework-template_${lang}.js (auto)\n` +
    `export const frameworkTemplate = \`${esc}\n\`;\n`;

  await fetch(
    new URL(`compile.php?file=framework-templates/framework-template_${lang}.js`, import.meta.url).href,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module: moduleText })
    }
  );
  debug(`Cache saved as framework-template_${lang}.js`);
  return tpl;
}


/* ------- Construct map data rule -------*/
function buildRule(mapdata, lang) {
  const lines = mapdata.trim().split("\n");
  const indented = lines.map(l => "    " + l).join("\n");

  let ruleText;
  if (lang === "zh-CN") {
    ruleText = `规则 ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入") 
{
    事件
    {
        持续 - 全局;
    }

    actions
    {
${indented}
    }
}`;
  } else {
    ruleText = `rule ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入") 
{
    event
    {
        Ongoing - Global;
    }

    actions
    {
${indented}
    }
}`;
  }
  return ruleText;
}

function replaceMapData(tpl, newRule, lang) {
  let marker, startRule, endRule;
  if (lang === "zh-CN") {
    marker    = '规则 ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入")';
    startRule = "规则";
    endRule   = "事件";
  } else {
    marker    = 'rule ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入")';
    startRule = "rule";
    endRule   = "event";
  }

  const markerIdx = tpl.indexOf(marker);
  if (markerIdx < 0) throw new Error(`Marker not found. Expected: ${marker}`);

  const start = tpl.lastIndexOf(startRule, markerIdx);
  if (start < 0) throw new Error(`Rule start not found for: ${startRule}`);

  let brace = 0, end = -1;
  for (let i = start; i < tpl.length; i++) {
    if (tpl[i] === "{") {
      brace++;
    } else if (tpl[i] === "}") {
      brace--;
      if (brace === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end < 0) throw new Error(`Rule end not found for: ${endRule}`);

  return tpl.slice(0, start) + newRule + tpl.slice(end);
}


/* ------- Extract map data ------- */
function extractMapDataBlock(fullText, lang) {
  const headerSubstring = '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入';

  const headerIdx = fullText.indexOf(headerSubstring);
  if (headerIdx < 0) {
    throw new Error(`Impossible de trouver le marqueur "Map Data" (${headerSubstring}) dans le textarea.`);
  }

  const afterHeader = fullText.slice(headerIdx);
  const actionsMatch = afterHeader.match(/actions\s*\{\s*([\s\S]*?)\s*\}/i);
  if (!actionsMatch || actionsMatch[1] == null) {
    throw new Error('Bloc "actions { … }" introuvable après le marqueur Map Data.');
  }

  return actionsMatch[1].trim();
}


/* ------- Extract map name -------*/
function extractModeMapNames(fullText) {
  const result = {};
  const modesMatch = fullText.match(/^\s*modes\s*\{/m);
  if (!modesMatch) return result;
  const modesStartIdx = fullText.indexOf(modesMatch[0]);
  const braceOpenIdx = fullText.indexOf("{", modesStartIdx + modesMatch[0].length - 1);
  if (braceOpenIdx < 0) return result;

  let braceCount = 1;
  let idx = braceOpenIdx + 1;
  for (; idx < fullText.length; idx++) {
    if (fullText[idx] === "{") braceCount++;
    else if (fullText[idx] === "}") {
      braceCount--;
      if (braceCount === 0) break;
    }
  }
  if (braceCount !== 0) return result;

  const modesContent = fullText.slice(braceOpenIdx + 1, idx);
  let pos = 0;
  while (pos < modesContent.length) {
    const remaining = modesContent.slice(pos);
    const headerMatch = remaining.match(/^\s*(disabled\s+)?([^\s{][^{\r\n]*)\s*\{/m);
    if (!headerMatch) break;

    const disabledKeyword = headerMatch[1];
    const modeNameRaw     = headerMatch[2].trim();
    const headerIndex     = headerMatch.index;
    const braceRelIdx     = headerMatch[0].lastIndexOf("{");
    const openingBraceIdx = pos + headerIndex + braceRelIdx;

    let innerBrace = 1;
    let j = openingBraceIdx + 1;
    for (; j < modesContent.length; j++) {
      if (modesContent[j] === "{") innerBrace++;
      else if (modesContent[j] === "}") {
        innerBrace--;
        if (innerBrace === 0) break;
      }
    }
    if (innerBrace !== 0) break;

    const modeBlockContent = modesContent.slice(openingBraceIdx + 1, j);
    pos = j + 1;

    if (!disabledKeyword) {
      const enabledMatch = modeBlockContent.match(/enabled\s+maps\s*\{\s*([\s\S]*?)\s*\}/i);
      if (enabledMatch) {
        const insideEnabled = enabledMatch[1].trim();
        const lines = insideEnabled.split(/\r?\n/);
        for (let rawLine of lines) {
          const line = rawLine.trim();
          if (!line) continue;
          const tokens = line.split(/\s+/);
          if (tokens.length < 2) continue;
          const possibleId = tokens[tokens.length - 1];
          if (/^\d{8,}$/.test(possibleId)) {
            const fullMapEntry = tokens.join(" ");
            result[modeNameRaw] = fullMapEntry;
            break;
          }
        }
      }
    }
  }

  return result;
}

function insertMapNameIntoTemplate(tpl, modeName, fullMapEntry) {
  const modeRegex = new RegExp(`^\\s*${modeName.trim()}\\s*\\{`, "m");
  const modeHeaderMatch = tpl.match(modeRegex);
  if (!modeHeaderMatch) return tpl;

  const modeLineIdx     = modeHeaderMatch.index;
  const openingBraceIdx = tpl.indexOf("{", modeLineIdx);
  if (openingBraceIdx < 0) return tpl;

  const enabledIdx = tpl.indexOf("enabled maps", openingBraceIdx);
  if (enabledIdx < 0) return tpl;

  const braceEnabledOpen = tpl.indexOf("{", enabledIdx);
  if (braceEnabledOpen < 0) return tpl;

  let level = 1;
  let k = braceEnabledOpen + 1;
  for (; k < tpl.length; k++) {
    if (tpl[k] === "{") level++;
    else if (tpl[k] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return tpl;
  const braceEnabledClose = k;

  const indentMatch = tpl.slice(braceEnabledOpen + 1).match(/^[ \t]*/);
  const indent = indentMatch ? indentMatch[0] : "    ";
  const newInside = `\n${indent}${fullMapEntry}\n`;

  return tpl.slice(0, braceEnabledOpen + 1)
       + newInside
       + tpl.slice(braceEnabledClose);
}

/* ------- Extract & insertion du bloc "Credits and Colors" -------*/
function extractMapCredits(fullText, lang) {
  let uniqueMarker;
  if (lang === "zh-CN") {
    uniqueMarker = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入';
  } else {
    uniqueMarker = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
  }

  const idxMarker = fullText.indexOf(uniqueMarker);
  if (idxMarker < 0) {
    throw new Error(`Marqueur "Credits and Colors here" introuvable dans le textarea.`);
  }

  const keyword = (lang === "zh-CN") ? "动作" : "actions";
  const sliceAfter = fullText.slice(idxMarker);

  const relIdx = sliceAfter.search(new RegExp(`${keyword}\\s*\\{`));
  if (relIdx < 0) {
    throw new Error(`Bloc "${keyword} { … }" introuvable pour "Credits and Colors here".`);
  }

  const braceOpenIdx = fullText.indexOf("{", idxMarker + relIdx);
  if (braceOpenIdx < 0) {
    throw new Error(`Accolade ouvrante introuvable pour "${keyword}".`);
  }

  let level = 1;
  let i = braceOpenIdx + 1;
  for (; i < fullText.length; i++) {
    if (fullText[i] === "{") level++;
    else if (fullText[i] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) {
    throw new Error(`Accolade fermante introuvable pour "${keyword}".`);
  }
  const braceCloseIdx = i;

  const innerContent = fullText.slice(braceOpenIdx + 1, braceCloseIdx);
  return innerContent.trim();
}

function insertMapCreditsIntoTemplate(tpl, creditsBlock, lang) {
  let uniqueMarker;
  if (lang === "zh-CN") {
    uniqueMarker = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入';
  } else {
    uniqueMarker = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
  }

  const idxMarker = tpl.indexOf(uniqueMarker);
  if (idxMarker < 0) return tpl;

  const keyword = (lang === "zh-CN") ? "动作" : "actions";
  const sliceAfter = tpl.slice(idxMarker);

  const relIdx = sliceAfter.search(new RegExp(`${keyword}\\s*\\{`));
  if (relIdx < 0) return tpl;

  const actionsIdx = idxMarker + relIdx;
  const braceActionsOpen = tpl.indexOf("{", actionsIdx);
  if (braceActionsOpen < 0) return tpl;

  let level = 1;
  let j = braceActionsOpen + 1;
  for (; j < tpl.length; j++) {
    if (tpl[j] === "{") level++;
    else if (tpl[j] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return tpl;
  const braceActionsClose = j;

  const indentMatch = tpl.slice(braceActionsOpen + 1).match(/^[ \t]*/);
  const indent = indentMatch ? indentMatch[0] : "    ";

  const lines = creditsBlock.split(/\r?\n/);
  const indentedBlock = lines.map(line => indent + line).join("\n");
  const newInside = `\n${indentedBlock}\n`;

  return tpl.slice(0, braceActionsOpen + 1)
       + newInside
       + tpl.slice(braceActionsClose);
}

/* ------- Extract Workshop bans -------*/

function insertWorkshopBansIntoTemplate(tpl, bans) {
  if (!bans.length) return tpl;

  const workshopIdx = tpl.search(/\bworkshop\s*\{/i);
  if (workshopIdx < 0) return tpl;

  const openBraceIdx = tpl.indexOf("{", workshopIdx);
  if (openBraceIdx < 0) return tpl;

  let level = 1;
  let i = openBraceIdx + 1;
  for (; i < tpl.length; i++) {
    if (tpl[i] === "{") level++;
    else if (tpl[i] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return tpl;

  const closeBraceIdx = i;
  const indent = "    ";
  const bansText = bans
    .map(name => `${indent}ban ${name} : On`)
    .join("\n");

  return tpl.slice(0, openBraceIdx + 1)
       + "\n" + bansText + "\n"
       + tpl.slice(closeBraceIdx);
}


/* ------- Loader ------- */
function showLoader() {
  let o = document.getElementById("convert-loader");
  if (!o) {
    o = document.createElement("div");
    o.id = "convert-loader";
    o.innerHTML = `
      <div class="spinner"></div>
      <div class="loader-text">Converting…</div>`;
    Object.assign(o.style, {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      zIndex: 1000,
      color: "#fff",
      fontSize: "1.2em",
    });
    const s = document.createElement("style");
    s.textContent = `
      .spinner {
        border: 8px solid rgba(255,255,255,0.3);
        border-top: 8px solid #fff;
        border-radius: 50%;
        width: 60px; height: 60px;
        animation: spin 1s linear infinite;
        margin-bottom: 0.5em;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`;
    document.head.append(s);
    document.body.append(o);
  }
}

function hideLoader() {
  const o = document.getElementById("convert-loader");
  if (o) o.remove();
}


/* ------- Extract & display datas settings -------*/
function parseGlobalACheckpoints(fullText) {
  const results = [];

  const regexGlobalA = /Global\.A\s*=\s*Array\s*\(\s*/;
  const matchGA = fullText.match(regexGlobalA);
  if (!matchGA) return results;

  const startIdx = fullText.indexOf("Array(", matchGA.index) + "Array(".length;
  if (startIdx < 0) return results;

  let level = 1;
  let i = startIdx;
  for (; i < fullText.length; i++) {
    if (fullText[i] === "(") level++;
    else if (fullText[i] === ")") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return results;
  const endIdx = i;

  const inside = fullText.slice(startIdx, endIdx);

  const elements = [];
  let current = "";
  let depth = 0;
  for (let c of inside) {
    if (c === "(") {
      depth++;
      current += c;
    } else if (c === ")") {
      depth--;
      current += c;
    } else if (c === "," && depth === 0) {
      elements.push(current.trim());
      current = "";
    } else {
      current += c;
    }
  }
  if (current.trim() !== "") elements.push(current.trim());

  const regexVector = /Vector\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/;
  elements.forEach((elem) => {
    const m = elem.match(regexVector);
    if (m) {
      const x = parseFloat(m[1]);
      const y = parseFloat(m[2]);
      const z = parseFloat(m[3]);
      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        results.push({ x, y, z });
      }
    }
  });

  return results;
}

function parseGlobalArrayNumbers(fullText, varName) {
  const regex = new RegExp(`Global\\.${varName}\\s*=\\s*Array\\s*\\(`);
  const match = fullText.match(regex);
  if (!match) return [];

  const startIdx = fullText.indexOf("Array(", match.index) + "Array(".length;
  if (startIdx < 0) return [];

  let level = 1;
  let i = startIdx;
  for (; i < fullText.length; i++) {
    if (fullText[i] === "(") level++;
    else if (fullText[i] === ")") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return [];
  const endIdx = i;

  const inside = fullText.slice(startIdx, endIdx);

  return inside
    .split(",")
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));
}

function parseGlobalArrayVectors(fullText, varName) {
  const results = [];
  const regex = new RegExp(`Global\\.${varName}\\s*=\\s*Array\\s*\\(`);
  const match = fullText.match(regex);
  if (!match) return results;

  const startIdx = fullText.indexOf("Array(", match.index) + "Array(".length;
  if (startIdx < 0) return results;

  let level = 1;
  let i = startIdx;
  for (; i < fullText.length; i++) {
    if (fullText[i] === "(") level++;
    else if (fullText[i] === ")") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return results;
  const endIdx = i;

  const inside = fullText.slice(startIdx, endIdx);

  const regexVector = /Vector\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/g;
  let m;
  while ((m = regexVector.exec(inside)) !== null) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    const z = parseFloat(m[3]);
    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
      results.push({ x, y, z });
    }
  }
  return results;
}

function parseGlobalWorkshopBans(fullText) {
  const result = [];
  const workshopMatch = fullText.match(/workshop\s*\{([\s\S]*?)\}/i);
  if (!workshopMatch) return result;
  const block = workshopMatch[1];
  block.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*ban\s+([^:]+?)\s*:\s*On\s*$/i);
    if (m) {
      result.push(m[1].trim());
    }
  });
  return result;
}

function parseGlobalArrayBooleans(fullText, varName) {
  const results = [];
  const regex = new RegExp(`Global\\.${varName}\\s*=\\s*Array\\s*\\(`);
  const match = fullText.match(regex);
  if (!match) return results;

  const startIdx = fullText.indexOf("Array(", match.index) + "Array(".length;
  if (startIdx < 0) return results;

  let level = 1;
  let i = startIdx;
  for (; i < fullText.length; i++) {
    if (fullText[i] === "(") level++;
    else if (fullText[i] === ")") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return results;
  const endIdx = i;

  const inside = fullText.slice(startIdx, endIdx);

  inside.split(",").forEach((token) => {
    const t = token.trim().toLowerCase();
    if (t === "true") results.push(true);
    else if (t === "false") results.push(false);
  });
  return results;
}


let draggedCard = null;
const container = document.getElementById("mapSettings");

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
});
container.addEventListener("drop", (e) => {
  e.preventDefault();
  if (draggedCard) {
    container.appendChild(draggedCard);
    draggedCard = null;
  }
});

function updateCardNumbers() {
  const cards = Array.from(container.querySelectorAll(".checkpoint-card"));
  cards.forEach((card, idx) => {
    const circle = card.querySelector(".checkpoint-number");
    if (circle) {
      circle.textContent = idx;
    }
  });
}
/* ------- Settings section -------*/

function renderGlobalBans(container, fullText) {
  const globalBans = parseGlobalWorkshopBans(fullText);
  if (globalBans.length === 0) return;

  const sectionGlobal = document.createElement("div");
  sectionGlobal.classList.add("section", "section--global-bans");

  const titleGlobal = document.createElement("div");
  titleGlobal.classList.add("section__title");
  titleGlobal.textContent = "Global Bans";
  sectionGlobal.appendChild(titleGlobal);

  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("global-ban-icons");
  globalBans.forEach(banName => {
    const span = document.createElement("span");
    span.classList.add("global-ban-icon");
    span.textContent = banName;
    span.title = banName;
    iconsContainer.appendChild(span);
  });
  sectionGlobal.appendChild(iconsContainer);
  container.appendChild(sectionGlobal);
}

function extractAllData(fullText) {
  const checkpoints = parseGlobalACheckpoints(fullText);

  const killNums   = parseGlobalArrayNumbers(fullText, "killballnumber");
  const Hpos       = parseGlobalArrayVectors(fullText, "H");
  const Iradius    = parseGlobalArrayNumbers(fullText, "I");

  const pinNums    = parseGlobalArrayNumbers(fullText, "pinballnumber");
  const TQpos      = parseGlobalArrayVectors(fullText, "TQ");
  const EditMode   = parseGlobalArrayNumbers(fullText, "EditMode");
  const TQ5        = parseGlobalArrayBooleans(fullText, "TQ5");
  const TQ6        = parseGlobalArrayBooleans(fullText, "TQ6");
  const BounceLock = parseGlobalArrayBooleans(fullText, "BounceToggleLock");

  const DaoNums   = parseGlobalArrayNumbers(fullText, "Dao").map(n => parseInt(n));
  const SHIFTNums = parseGlobalArrayNumbers(fullText, "SHIFT").map(n => parseInt(n));

  const BanMulti      = parseGlobalArrayNumbers(fullText, "BanMulti");
  const BanCreate     = parseGlobalArrayNumbers(fullText, "BanCreate");
  const BanDead       = parseGlobalArrayNumbers(fullText, "BanDead");
  const BanEmote      = parseGlobalArrayNumbers(fullText, "BanEmote");
  const BanClimb      = parseGlobalArrayNumbers(fullText, "BanClimb");
  const BanBhop       = parseGlobalArrayNumbers(fullText, "BanBhop");
  const BanStand      = parseGlobalArrayNumbers(fullText, "BanStand");
  const BanDjump      = parseGlobalArrayNumbers(fullText, "BanDjump");
  const BanSaveDouble = parseGlobalArrayNumbers(fullText, "BanSaveDouble");

  const killMap = {};
  killNums.forEach((chkNum, i) => {
    if (!killMap[chkNum]) killMap[chkNum] = [];
    killMap[chkNum].push({
      pos: Hpos[i] || { x: 0, y: 0, z: 0 },
      radius: Iradius[i] != null ? Iradius[i] : null
    });
  });

  const pinMap = {};
  pinNums.forEach((chkNum, i) => {
    if (!pinMap[chkNum]) pinMap[chkNum] = [];
    pinMap[chkNum].push({
      pos: TQpos[i] || { x: 0, y: 0, z: 0 },
      force: EditMode[i] != null ? EditMode[i] : null,
      givesUlt5: TQ5[i] || false,
      givesUlt6: TQ6[i] || false,
      locked: BounceLock[i] || false
    });
  });

  const abilityMap = {};
  DaoNums.forEach(chk => {
    abilityMap[chk] = abilityMap[chk] || {};
    abilityMap[chk].ultimate = true;
  });
  SHIFTNums.forEach(chk => {
    abilityMap[chk] = abilityMap[chk] || {};
    abilityMap[chk].dash = true;
  });

  const banMap = {
    Multi: BanMulti,
    Create: BanCreate,
    Dead: BanDead,
    Emote: BanEmote,
    Climb: BanClimb,
    Bhop: BanBhop,
    Stand: BanStand,
    Djump: BanDjump,
    SaveDouble: BanSaveDouble
  };

  return {
    checkpoints,
    killMap,
    pinMap,
    abilityMap,
    banMap
  };
}

function createCheckpointCard(idx, coords, data) {
  const { killMap, pinMap, abilityMap, banMap } = data;
  const originalIndex = idx;

  const card = document.createElement("div");
  card.classList.add("checkpoint-card");
  card.draggable = true;
  card.dataset.original = originalIndex;

  const header = document.createElement("div");
  header.classList.add("checkpoint-header");

  const leftGroup = document.createElement("div");
  leftGroup.classList.add("checkpoint-header__left");
  const numberCircle = document.createElement("div");
  numberCircle.classList.add("checkpoint-number");
  numberCircle.textContent = originalIndex;
  leftGroup.appendChild(numberCircle);

  const coordsInline = document.createElement("div");
  coordsInline.classList.add("coords-inline");
  coordsInline.textContent =
    `${coords.x.toFixed(3)}, ${coords.y.toFixed(3)}, ${coords.z.toFixed(3)}`;
  leftGroup.appendChild(coordsInline);
  header.appendChild(leftGroup);

  const rightGroup = document.createElement("div");
  rightGroup.classList.add("checkpoint-header__right");

  const banIcons = document.createElement("div");
  banIcons.classList.add("ban-icons");
  const banList = [
    { arr: banMap.Multi,  icon: "∞" },
    { arr: banMap.Create, icon: "♂" },
    { arr: banMap.Stand,  icon: "♠" },
    { arr: banMap.Dead,   icon: "X" },
    { arr: banMap.Emote,  icon: "♥" },
    { arr: banMap.Climb,  icon: "↑" },
    { arr: banMap.Bhop,   icon: "≥" },
    { arr: banMap.Djump,  icon: "»" },
    { arr: banMap.SaveDouble, icon: "△" }
  ];
  rightGroup.appendChild(banIcons);

  const originalLabel = document.createElement("div");
  originalLabel.classList.add("original-label");
  originalLabel.textContent = `Original position : ${originalIndex}`;
  rightGroup.appendChild(originalLabel);

  header.appendChild(rightGroup);
  card.appendChild(header);

  const kills = killMap[originalIndex] || [];
  if (kills.length > 0) {
    const sectionKill = document.createElement("div");
    sectionKill.classList.add("section");
    const titleKill = document.createElement("div");
    titleKill.classList.add("section__title");
    titleKill.textContent = "Kill orbs";
    sectionKill.appendChild(titleKill);

    const itemsKill = document.createElement("div");
    itemsKill.classList.add("section__items");
    kills.forEach(kb => {
      const item = document.createElement("div");
      item.classList.add("detail");

      const circleBlue = document.createElement("span");
      circleBlue.classList.add("circle", "circle-blue");
      item.appendChild(circleBlue);

      const px = kb.pos.x.toFixed(3),
            py = kb.pos.y.toFixed(3),
            pz = kb.pos.z.toFixed(3);
      const r = kb.radius != null ? kb.radius : "N/A";

      const textSpan = document.createElement("span");
      textSpan.classList.add("detail__text");
      textSpan.textContent = `Pos: (${px}, ${py}, ${pz}), Radius: ${r}`;
      item.appendChild(textSpan);

      itemsKill.appendChild(item);
    });
    sectionKill.appendChild(itemsKill);
    card.appendChild(sectionKill);
  }

  const pins = pinMap[originalIndex] || [];
  if (pins.length > 0) {
    const sectionPin = document.createElement("div");
    sectionPin.classList.add("section");
    const titlePin = document.createElement("div");
    titlePin.classList.add("section__title");
    titlePin.textContent = "Bounce orbs";
    sectionPin.appendChild(titlePin);

    const itemsPin = document.createElement("div");
    itemsPin.classList.add("section__items");
    pins.forEach(pb => {
      const item = document.createElement("div");
      item.classList.add("detail");

      const circlePin = document.createElement("span");
      circlePin.classList.add("circle", pb.locked ? "circle-orange" : "circle-green");
      item.appendChild(circlePin);

      const px = pb.pos.x.toFixed(3),
            py = pb.pos.y.toFixed(3),
            pz = pb.pos.z.toFixed(3);
      const f = pb.force != null ? pb.force : "N/A";

      const textSpan = document.createElement("span");
      textSpan.classList.add("detail__text");
      textSpan.textContent =
        `Pos: (${px}, ${py}, ${pz}), Strength: ${f}, Lock: ${pb.locked ? "True" : "False"}`;
      item.appendChild(textSpan);

      const iconsContainer = document.createElement("span");
      iconsContainer.classList.add("pinball-icons");
      if (pb.givesUlt5) {
        const imgU5 = document.createElement("img");
        imgU5.src = "assets/abilities/ultimate.webp";
        imgU5.alt = "Donne Ultime";
        imgU5.classList.add("pinball-icon");
        imgU5.title = "Donne Ultime";
        iconsContainer.appendChild(imgU5);
      }
      if (pb.givesUlt6) {
        const imgU6 = document.createElement("img");
        imgU6.src = "assets/abilities/dash.webp";
        imgU6.alt = "Donne Dash";
        imgU6.classList.add("pinball-icon");
        imgU6.title = "Donne Dash";
        iconsContainer.appendChild(imgU6);
      }
      item.appendChild(iconsContainer);

      itemsPin.appendChild(item);
    });
    sectionPin.appendChild(itemsPin);
    card.appendChild(sectionPin);
  }

  const abilities = abilityMap[originalIndex] || {};
  if (abilities.ultimate || abilities.dash) {
    const sectionAbil = document.createElement("div");
    sectionAbil.classList.add("section");
    const titleAbil = document.createElement("div");
    titleAbil.classList.add("section__title");
    titleAbil.textContent = "Abilities";
    sectionAbil.appendChild(titleAbil);

    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("ability-icons");
    if (abilities.ultimate) {
      const imgU = document.createElement("img");
      imgU.src = "assets/abilities/ultimate.webp";
      imgU.alt = "Ultimate";
      imgU.classList.add("ability-icon");
      imgU.title = "Ultimate available";
      iconsContainer.appendChild(imgU);
    }
    if (abilities.dash) {
      const imgD = document.createElement("img");
      imgD.src = "assets/abilities/dash.webp";
      imgD.alt = "Dash";
      imgD.classList.add("ability-icon");
      imgD.title = "Dash available";
      iconsContainer.appendChild(imgD);
    }
    sectionAbil.appendChild(iconsContainer);
    card.appendChild(sectionAbil);
  }

  const hasAnyBan = banList.some(({ arr }) => arr.includes(originalIndex));
  if (hasAnyBan) {
    const sectionBan = document.createElement("div");
    sectionBan.classList.add("section", "section--bans");
    const titleBan = document.createElement("div");
    titleBan.classList.add("section__title");
    titleBan.textContent = "Bans";
    sectionBan.appendChild(titleBan);

    const banIcons2 = document.createElement("div");
    banIcons2.classList.add("ban-icons");
    banList.forEach(({ arr, icon }) => {
      if (arr.includes(originalIndex)) {
        const iconSpan = document.createElement("span");
        iconSpan.classList.add("ban-icon");
        iconSpan.textContent = icon;
        iconSpan.title = "Ban";
        banIcons2.appendChild(iconSpan);
      }
    });
    sectionBan.appendChild(banIcons2);
    card.appendChild(sectionBan);
  }

  card.addEventListener("dragstart", function (e) {
    draggedCard = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "");
  });
  card.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });
  card.addEventListener("drop", function (e) {
    e.stopPropagation();
    if (!draggedCard || draggedCard === this) return;
    const rect = this.getBoundingClientRect();
    const halfway = rect.top + rect.height / 2;
    if (e.clientY < halfway) {
      container.insertBefore(draggedCard, this);
    } else {
      if (this.nextSibling) container.insertBefore(draggedCard, this.nextSibling);
      else container.appendChild(draggedCard);
    }
    updateCardNumbers();
  });
  card.addEventListener("dragend", () => { draggedCard = null; });

  return card;
}

function renderMapSettings(fullText) {
  container.innerHTML = "";

  renderGlobalBans(container, fullText);

  const { checkpoints, killMap, pinMap, abilityMap, banMap } = extractAllData(fullText);

  if (checkpoints.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "Aucun checkpoint (Global.A) trouvé dans le texte.";
    msg.classList.add("empty-message");
    container.appendChild(msg);
    return;
  }

  const dataModel = { killMap, pinMap, abilityMap, banMap };
  checkpoints.forEach((coords, idx) => {
    const card = createCheckpointCard(idx, coords, dataModel);
    container.appendChild(card);
  });

  updateCardNumbers();
}

/* ------- Convertor ------- */
async function doConvert(fullText, lang) {
  const globalBans = parseGlobalWorkshopBans(fullText);

  const mapDataBlock = extractMapDataBlock(fullText, lang);
  debug('Bloc "actions" de Map Data extrait.');

  let tpl = await loadTemplate(lang);
  debug("Template chargé.");

  const newRule = buildRule(mapDataBlock, lang);
  tpl = replaceMapData(tpl, newRule, lang);

  const modeMapNames = extractModeMapNames(fullText);
  debug("Modes & maps extraits : " + JSON.stringify(modeMapNames));
  for (const [modeName, fullMapEntry] of Object.entries(modeMapNames)) {
    tpl = insertMapNameIntoTemplate(tpl, modeName, fullMapEntry);
  }

  try {
    const creditsBlock = extractMapCredits(fullText, lang);
    debug("Bloc Credits extrait.");
    tpl = insertMapCreditsIntoTemplate(tpl, creditsBlock, lang);
  } catch (e) {
    debug("Aucun bloc Credits trouvé : " + e.message);
  }

  tpl = insertWorkshopBansIntoTemplate(tpl, globalBans);

  return tpl;
}

/* ------- ConvertBtn ------- */
document.addEventListener("DOMContentLoaded", () => {
  const btnConvert = document.getElementById("convert-btn");
  const btnCopy    = document.querySelector(".copy-btn");
  const textarea   = document.querySelector(".mapdata");
  const langEl     = document.getElementById("lang");

  btnConvert.addEventListener("click", async () => {
    showLoader();
    btnConvert.disabled    = true;
    btnConvert.textContent = "Processing…";

    try {
      const lang = langEl.value || "en-US";
      const fullText = textarea.value;

      const resultTpl = await doConvert(fullText, lang);
      textarea.value = resultTpl;

      renderMapSettings(fullText);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      hideLoader();
      btnConvert.disabled    = false;
      btnConvert.textContent = "convert data";
    }
  });

  btnCopy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(textarea.value);
      showConfirmationMessage(t("newsfeed.copy_clipboard"));
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Copy failed: " + err.message);
    }
  });
});
