const DEBUG_MODE = true;

function getCacheURL(lang) {
  return new URL(`framework-templates/framework-template_${lang}.js`, import.meta.url).href;
}

function debug(data) {
  if (DEBUG_MODE) {
    console.debug('DEBUG: ' + data);
  }
}

async function cacheExists(lang) {
  const cacheUrl = getCacheURL(lang);
  try {
    const res = await fetch(cacheUrl, { method: 'GET' });
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
  let out = '', last = 0, m;
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
    .replace(/^[ \t]*#!include.*$/gm, '')
    .replace(/^[ \t]*#!define\s+editortoggle.*$/gm, '')
    .replace(/^[ \t]*editortoggle\(.*\).*$/gm, '')
    .replace(/\beditoron\b/g, 'false')
    .replace(/^[ \t]*(testData|selectedmap)\s*$/gm, '');
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
  if (!overpy) throw new Error('OverPy UMD not found');
  await overpy.readyPromise;

  const rawBase   = 'https://cdn.jsdelivr.net/gh/tylovejoy/genji-framework@1.10.3F/';
  const entryFile = 'framework.opy';
  const resp      = await fetch(rawBase + entryFile);
  if (!resp.ok) throw new Error(`HTTP ${resp.status} on ${entryFile}`);
  let src = await resp.text();

  src = await inlineIncludes(src, rawBase);
  src = cleanSource(src);

  if (lang === 'zh-CN') {
    src = src.replace(/^[ \t]*#!define\s+enableInvisCommand.*$/gm, '');
    src = '#!define enableInvisCommand false\n' + src;
    debug('Désactivation de enableInvisCommand pour zh-CN');
  }

  const { result } = await overpy.compile(src, lang, rawBase, entryFile);
  const tpl = result;

  const esc = tpl
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`');

  const moduleText =
    `// framework-template_${lang}.js (auto)\n` +
    `export const frameworkTemplate = \`${esc}\n\`;\n`;

  await fetch(
    new URL(
      `compile.php?file=framework-templates/framework-template_${lang}.js`,
      import.meta.url
    ).href,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module: moduleText })
    }
  );
  debug(`Cache saved as framework-template_${lang}.js`);
  return tpl;
}

function buildRule(mapdata, lang) {
  const lines = mapdata.trim().split('\n');
  const indented = lines.map(l => '    ' + l).join('\n');

  let ruleText;
  if (lang === 'zh-CN') {
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
  if (lang === 'zh-CN') {
    marker    = '规则 ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入")';
    startRule = '规则';
    endRule   = '事件';
  } else {
    marker    = 'rule ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入")';
    startRule = 'rule';
    endRule   = 'event';
  }

  const markerIdx = tpl.indexOf(marker);
  if (markerIdx < 0) throw new Error(`Marker not found. Expected: ${marker}`);

  const start = tpl.lastIndexOf(startRule, markerIdx);
  if (start < 0) throw new Error(`Rule start not found for: ${startRule}`);

  let brace = 0, end = -1;
  for (let i = start; i < tpl.length; i++) {
    if (tpl[i] === '{') {
      brace++;
    } else if (tpl[i] === '}') {
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

function extractMapDataBlock(fullText, lang) {
  let headerSubstring = '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入';

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

function extractModeMapNames(fullText) {
  const result = {};
  const modesMatch = fullText.match(/^\s*modes\s*\{/m);
  if (!modesMatch) return result;
  const modesStartIdx = fullText.indexOf(modesMatch[0]);
  const braceOpenIdx = fullText.indexOf('{', modesStartIdx + modesMatch[0].length - 1);
  if (braceOpenIdx < 0) return result;

  let braceCount = 1;
  let idx = braceOpenIdx + 1;
  for (; idx < fullText.length; idx++) {
    if (fullText[idx] === '{') braceCount++;
    else if (fullText[idx] === '}') {
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
    const braceRelIdx     = headerMatch[0].lastIndexOf('{');
    const openingBraceIdx = pos + headerIndex + braceRelIdx;

    let innerBrace = 1;
    let j = openingBraceIdx + 1;
    for (; j < modesContent.length; j++) {
      if (modesContent[j] === '{') innerBrace++;
      else if (modesContent[j] === '}') {
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
            const fullMapEntry = tokens.join(' ');
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
  const modeRegex = new RegExp(`^\\s*${modeName.trim()}\\s*\\{`, 'm');
  const modeHeaderMatch = tpl.match(modeRegex);
  if (!modeHeaderMatch) return tpl;

  const modeLineIdx     = modeHeaderMatch.index;
  const openingBraceIdx = tpl.indexOf('{', modeLineIdx);
  if (openingBraceIdx < 0) return tpl;

  const enabledIdx = tpl.indexOf('enabled maps', openingBraceIdx);
  if (enabledIdx < 0) return tpl;

  const braceEnabledOpen = tpl.indexOf('{', enabledIdx);
  if (braceEnabledOpen < 0) return tpl;

  let level = 1;
  let k = braceEnabledOpen + 1;
  for (; k < tpl.length; k++) {
    if (tpl[k] === '{') level++;
    else if (tpl[k] === '}') {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return tpl;
  const braceEnabledClose = k;

  const indentMatch = tpl.slice(braceEnabledOpen + 1).match(/^[ \t]*/);
  const indent = indentMatch ? indentMatch[0] : '    ';
  const newInside = `\n${indent}${fullMapEntry}\n`;

  return tpl.slice(0, braceEnabledOpen + 1)
       + newInside
       + tpl.slice(braceEnabledClose);
}

function extractMapCredits(fullText, lang) {
  let uniqueMarker;
  if (lang === 'zh-CN') {
    uniqueMarker = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入';
  } else {
    uniqueMarker = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
  }

  const idxMarker = fullText.indexOf(uniqueMarker);
  if (idxMarker < 0) {
    throw new Error(`Marqueur "Credits and Colors here" introuvable dans le textarea.`);
  }

  const keyword = (lang === 'zh-CN') ? '动作' : 'actions';
  const sliceAfter = fullText.slice(idxMarker);

  const relIdx = sliceAfter.search(new RegExp(`${keyword}\\s*\\{`));
  if (relIdx < 0) {
    throw new Error(`Bloc "${keyword} { … }" introuvable pour "Credits and Colors here".`);
  }

  const braceOpenIdx = fullText.indexOf('{', idxMarker + relIdx);
  if (braceOpenIdx < 0) {
    throw new Error(`Accolade ouvrante introuvable pour "${keyword}".`);
  }

  let level = 1;
  let i = braceOpenIdx + 1;
  for (; i < fullText.length; i++) {
    if (fullText[i] === '{') level++;
    else if (fullText[i] === '}') {
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
  if (lang === 'zh-CN') {
    uniqueMarker = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入';
  } else {
    uniqueMarker = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
  }

  const idxMarker = tpl.indexOf(uniqueMarker);
  if (idxMarker < 0) return tpl;

  const keyword = (lang === 'zh-CN') ? '动作' : 'actions';
  const sliceAfter = tpl.slice(idxMarker);

  const relIdx = sliceAfter.search(new RegExp(`${keyword}\\s*\\{`));
  if (relIdx < 0) return tpl;

  const actionsIdx = idxMarker + relIdx;
  const braceActionsOpen = tpl.indexOf('{', actionsIdx);
  if (braceActionsOpen < 0) return tpl;

  let level = 1;
  let j = braceActionsOpen + 1;
  for (; j < tpl.length; j++) {
    if (tpl[j] === '{') level++;
    else if (tpl[j] === '}') {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return tpl;
  const braceActionsClose = j;

  const indentMatch = tpl.slice(braceActionsOpen + 1).match(/^[ \t]*/);
  const indent = indentMatch ? indentMatch[0] : '    ';

  const lines = creditsBlock.split(/\r?\n/);
  const indentedBlock = lines.map(line => indent + line).join('\n');
  const newInside = `\n${indentedBlock}\n`;

  return tpl.slice(0, braceActionsOpen + 1)
       + newInside
       + tpl.slice(braceActionsClose);
}

function showLoader() {
  let o = document.getElementById('convert-loader');
  if (!o) {
    o = document.createElement('div');
    o.id = 'convert-loader';
    o.innerHTML = `
      <div class="spinner"></div>
      <div class="loader-text">Converting…</div>`;
    Object.assign(o.style, {
      position: 'fixed', top:0, left:0, right:0, bottom:0,
      background:'rgba(0,0,0,0.4)', display:'flex',
      'justify-content':'center', 'align-items':'center',
      'flex-direction':'column', 'z-index':1000,
      color:'#fff', 'font-size':'1.2em'
    });
    const s = document.createElement('style');
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
  const o = document.getElementById('convert-loader');
  if (o) o.remove();
}

async function doConvert(fullText, lang) {
  const mapDataBlock = extractMapDataBlock(fullText, lang);
  debug('Bloc "actions" de Map Data extrait.');

  let tpl = await loadTemplate(lang);
  debug('Template chargé.');

  const newRule = buildRule(mapDataBlock, lang);
  tpl = replaceMapData(tpl, newRule, lang);

  const modeMapNames = extractModeMapNames(fullText);
  debug('Modes & maps extraits : ' + JSON.stringify(modeMapNames));

  for (const [modeName, fullMapEntry] of Object.entries(modeMapNames)) {
    tpl = insertMapNameIntoTemplate(tpl, modeName, fullMapEntry);
  }

  try {
    const creditsBlock = extractMapCredits(fullText, lang);
    debug('Bloc Credits extrait.');
    tpl = insertMapCreditsIntoTemplate(tpl, creditsBlock, lang);
  } catch (e) {
    debug('Aucun bloc Credits trouvé : ' + e.message);
  }

  return tpl;
}

document.addEventListener('DOMContentLoaded', () => {
  const btnConvert = document.getElementById('convert-btn');
  const btnCopy    = document.querySelector('.copy-btn');
  const textarea   = document.querySelector('.mapdata');
  const langEl     = document.getElementById('lang');

  btnConvert.addEventListener('click', async () => {
    showLoader();
    btnConvert.disabled    = true;
    btnConvert.textContent = 'Processing…';
    try {
      const lang = langEl.value || 'en-US';
      const fullText = textarea.value;
      const resultTpl = await doConvert(fullText, lang);
      textarea.value = resultTpl;
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    } finally {
      hideLoader();
      btnConvert.disabled    = false;
      btnConvert.textContent = 'convert data';
    }
  });

  btnCopy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textarea.value);
      showConfirmationMessage(t('newsfeed.copy_clipboard'));
    } catch (err) {
      console.error('Copy failed:', err);
      alert('Copy failed: ' + err.message);
    }
  });
});
