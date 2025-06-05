const DEBUG_MODE = true;
let isEditMode = false;
let currentDataModel = null;
let editIndex = null;
let modesNames = null;
let mapNamesTranslations = null;
let heroesNames = null;
let keywordTranslations = null;
let iconTranslations = null;
let lastFullText = "";
window.selectSection = selectSection;

let lastParsedWorkshopSettings = {
  editorMode: false,
  portals: false
};

const globalSettings = {
  editorMode: false,
  difficultyHUD: "off",
  playtest: "off",
  validator: "off",
  portals: "off"
};

const DIFFICULTY_MAP = [
  /* 0 */ "playtest",
  /* 1 */ "easy-",
  /* 2 */ "easy",
  /* 3 */ "easy+",
  /* 4 */ "medium-",
  /* 5 */ "medium",
  /* 6 */ "medium+",
  /* 7 */ "hard-",
  /* 8 */ "hard",
  /* 9 */ "hard+",
  /*10 */ "veryhard-",
  /*11 */ "veryhard",
  /*12 */ "veryhard+",
  /*13 */ "extreme-",
  /*14 */ "extreme",
  /*15 */ "extreme+",
  /*16 */ "hell",
  /*17 */ "off"
];

const GLOBAL_BANS = [
  "BAN MULTICLIMB - 封禁蹿留",
  "BAN CREATEBHOP - 封禁卡小",
  "BAN STANDCREATE - 封禁站卡",
  "BAN DEATHBHOP - 封禁死小",
  "BAN EMOTE SAVEHOP - 封禁表情留小",
  "BAN WALLCLIMB - 封禁爬墙",
  "BAN SAVE DOUBLE - 封禁延二段跳",
  "REQUIRE BHOP AVAILABLE - 留小跳进点",
  "REQUIRE DJUMP AVAILABLE - 留二段跳"
];

const ADDON_RULE_TITLES = [
  'Addon | Custom difficulty hud  - 自定义难度hud <---- INSERT HERE / 在这输入',
  'Addon | Title Data - 标题数据 <---- EDIT ME / 在此处编辑',
  'Addon | Friend Title - 朋友称号 <---- DISPLAY MESSAGE HERE (ON PLAYER)',
  'Addon | Display Author Time - 展示世界纪录 <---- EDIT ME / 在此处编辑',
  'Addon | HUD text for certain Checkpoints - 特定关卡显示的HUD文本 <---- EDIT ME / 在此处编辑',
  'Addon | Hint text for certain Checkpoints - 特定关卡的提示文本 <---- EDIT ME / 在此处编辑',
  'Addon | 3rd Person Camera Mode - 第三人称',
  'Addon | Stall enhancer - 增强系統跳的判定',
  'Addon | Fake Ledge Dash - 超级跳',
  'Addon | Group up - Map Data',
  'Addon | Group Up',
  'Addon | Custom checkpoint loading or resetting',
  'Addon | Custom Orb Script',
  'Addon | Fake Triple Jump - 假三段跳'
];

/* ------ Inject addons ------ */
async function injectTranslatedAddons(tpl, fullText, sourceLang, targetLang) {
  for (const title of ADDON_RULE_TITLES) {
    const sourceBlock = extractEnabledBlock(fullText, title);
    if (!sourceBlock) {
      continue;
    }

    let reconstructed;
    if (sourceLang === targetLang) {
      reconstructed = sourceBlock.replace(/^\s*disabled\s+/i, '');
    } else {
      reconstructed = translateEntireAddonBlock(sourceBlock, sourceLang, targetLang);
    }

    tpl = removeAllBlocks(tpl, title);

    tpl += "\n\n" + reconstructed;
  }

  return tpl;
}

function removeAllDisabledBlocks(tplStr, title) {
  const disabledPrefixes = [
    'disabled', 'deshabilitado', 'desabilitado',
    'deaktiviert', '無効', '禁用'
  ];
  const ruleKeywords = ['rule', 'regla', 'regra', 'regel', 'ルール', '规则'];
  const t = title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  const prefixGroup = disabledPrefixes.join('|');
  const ruleGroup = ruleKeywords.join('|');

  const regexSource = `(?:${prefixGroup})\\s+(?:${ruleGroup})\\s*\\(\\s*"${t}"\\s*\\)\\s*\\{`;
  const reDisabledStart = new RegExp(regexSource, 'i');

  let result = tplStr;
  let m;
  while ((m = result.match(reDisabledStart))) {
    const startIdx = m.index;
    const braceOpen = result.indexOf('{', startIdx);
    if (braceOpen < 0) break;

    let level = 1;
    let i = braceOpen + 1;
    for (; i < result.length; i++) {
      if (result[i] === '{') level++;
      else if (result[i] === '}') {
        level--;
        if (level === 0) break;
      }
    }
    if (level !== 0) break;

    const endIdx = i + 1;
    result = result.slice(0, startIdx) + result.slice(endIdx);
  }

  return result;
}

function buildEnabledRuleRegex(title) {
  const disabledPrefixes = [
    'disabled', 'deshabilitado', 'desabilitado',
    'deaktiviert', '無効', '禁用'
  ];
  const ruleKeywords = ['rule', 'regla', 'regra', 'regel', 'ルール', '规则'];

  const t = title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const negativeLookbehinds = disabledPrefixes
    .map(pref => `(?<!(?:${pref}\\s))`)
    .join('');
  const keywordsGroup = ruleKeywords.join('|');
  const regexSource = `${negativeLookbehinds}^[ \\t]*(?:${keywordsGroup})\\s*\\(\\s*"${t}(?:[^"]*)?"\\s*\\)\\s*\\{`;
  return new RegExp(regexSource, 'mi');
}


function extractEnabledBlock(fullText, title) {
  const reEnabledStart = buildEnabledRuleRegex(title);
  const m = fullText.match(reEnabledStart);
  if (!m) return null;

  const startIdx = m.index;
  const braceOpen = fullText.indexOf('{', startIdx);
  if (braceOpen < 0) return null;

  let level = 1;
  let i = braceOpen + 1;
  for (; i < fullText.length; i++) {
    if (fullText[i] === '{') level++;
    else if (fullText[i] === '}') {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return null;

  return fullText.slice(startIdx, i + 1);
}

function removeAllBlocks(tplStr, title) {
  tplStr = removeAllDisabledBlocks(tplStr, title);

  const t = title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const ruleKeywords = ['rule', 'regla', 'regra', 'regel', 'ルール', '规则'];
  const ruleGroup = ruleKeywords.join('|');
  const regexActiveStart = new RegExp(`^[ \\t]*(?:${ruleGroup})\\s*\\(\\s*"${t}"\\s*\\)\\s*\\{`, 'mi');

  let result = tplStr;
  let m;
  while ((m = result.match(regexActiveStart))) {
    const startIdx = m.index;
    const braceOpen = result.indexOf('{', startIdx);
    if (braceOpen < 0) break;

    let level = 1;
    let i = braceOpen + 1;
    for (; i < result.length; i++) {
      if (result[i] === '{') level++;
      else if (result[i] === '}') {
        level--;
        if (level === 0) break;
      }
    }
    if (level !== 0) break;

    const endIdx = i + 1;
    result = result.slice(0, startIdx) + result.slice(endIdx);
  }

  return result;
}

/*----- selectSection ------*/
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

  if (id === "mapSettings") {
    const editModeBtn = document.getElementById("editModeBtn");
    if (editModeBtn && !editModeBtn.dataset.listenerInstalled) {
      editModeBtn.dataset.listenerInstalled = "true";
      editModeBtn.addEventListener("click", () => {
        isEditMode = !isEditMode;
        editModeBtn.textContent = isEditMode ? "Exit edit" : "Edit mode";
        const container = document.getElementById("mapSettings");
        container.querySelectorAll(".checkpoint-card").forEach(card => {
          if (isEditMode) card.classList.add("editable");
          else            card.classList.remove("editable");
        });
      });
    }
  }
}

/* -------------- Boutons Convert & Copy -------------- */
document.addEventListener("DOMContentLoaded", () => {
  selectSection("convertMap");

  const btnConvert   = document.getElementById("convert-btn");
  const btnTranslate = document.getElementById("translate-btn");
  const btnCopy      = document.querySelector(".copy-btn");
  const textarea     = document.querySelector(".mapdata");
  const langEl       = document.getElementById("lang");
  const targetEl     = document.getElementById("targetLang");

  btnConvert.addEventListener("click", async () => {
    showLoader();
    btnConvert.disabled    = true;
    btnConvert.textContent = "Processing…";
    try {
      const lang     = langEl.value || "en-US";
      const fullText = textarea.value;

      lastParsedWorkshopSettings = parseWorkshopSettings(fullText);

      const lobbyBlock = extractLobbyBlock(fullText, lang);

      const resultTpl = await doConvert(fullText, lang);

      textarea.value = resultTpl;
      renderMapSettings(fullText);
    } catch (err) {
      console.error(err);
      showErrorMessage("Error: " + err.message);
    } finally {
      hideLoader();
      btnConvert.disabled    = false;
      btnConvert.textContent = "convert data";
    }
  });

  btnTranslate.addEventListener("click", async () => {
    const clientLang = langEl.value || "en-US";
    const targetLang = targetEl.value || "en-US";
    const fullText   = textarea.value;

    lastParsedWorkshopSettings = parseWorkshopSettings(fullText);

    await loadKeywordTranslations();
    await loadModesNames();
    await loadMapNameTranslations();
    await loadHeroesNames();
    await loadIconTranslations();

    let lobbyBlock = extractLobbyBlock(fullText, clientLang);
    let mapDataBlock = extractMapDataBlock(fullText, clientLang);

    const modeMapNames = extractModeMapNames(fullText);

    let creditsBlock = "";
    try { creditsBlock = extractMapCredits(fullText, clientLang); }
    catch(e) {  }
    const globalBans = parseGlobalWorkshopBans(fullText);

    lobbyBlock = translateLobbyBlock(lobbyBlock, clientLang, targetLang);
    mapDataBlock = translateFromTo(mapDataBlock, clientLang, targetLang);
    creditsBlock = translateFromTo(creditsBlock, clientLang, targetLang);
    creditsBlock = translateHeroNames(creditsBlock, heroesNames, clientLang, targetLang);

    let tpl = await loadTemplate(targetLang);

    const newRule = buildRule(mapDataBlock, targetLang);
    tpl = replaceMapData(tpl, newRule, targetLang);

    for (const [modeNameLocalized, fullMapEntry] of Object.entries(modeMapNames)) {
      const modeKey = findModeKey(modeNameLocalized, clientLang);
      const targetModeName = getTargetModeName(modeKey, targetLang, modeNameLocalized);

      const tokens = fullMapEntry.trim().split(/\s+/);
      const mapId = tokens[tokens.length - 1];
      const rawMapName = tokens.slice(0, tokens.length - 1).join(" ");

      let translatedMapName = rawMapName;
      let mapKey = Object.keys(mapNamesTranslations || {}).find(key => {
        const dict = mapNamesTranslations[key];
        return dict && dict[clientLang] === rawMapName;
      });
      if (mapKey && mapNamesTranslations[mapKey][targetLang]) {
        translatedMapName = mapNamesTranslations[mapKey][targetLang];
      } else {
        translatedMapName = translateFromTo(rawMapName, clientLang, targetLang);
      }

      const newFullMapEntry = `${translatedMapName} ${mapId}`;

      tpl = insertMapNameIntoTemplate(
        tpl,
        targetModeName,
        newFullMapEntry,
        targetLang
      );
    }

    if (creditsBlock) {
      tpl = insertMapCreditsIntoTemplate(tpl, creditsBlock, targetLang);
    }

    tpl = insertWorkshopBansIntoTemplate(tpl, globalBans, targetLang);
    //tpl = await injectTranslatedAddons(tpl, fullText, clientLang, targetLang);

    if (lobbyBlock) {
      tpl = insertLobbyIntoTemplate(tpl, lobbyBlock, targetLang);
    }

    const globalLocalplayerBlock = extractGlobalLocalplayerBlock(fullText);
    if (globalLocalplayerBlock) {
      let blockToInsert = globalLocalplayerBlock;
      if (clientLang !== targetLang) {
        blockToInsert = translateFromTo(blockToInsert, clientLang, targetLang);
        blockToInsert = translateHeroNames(blockToInsert, heroesNames, clientLang, targetLang);
      }
      tpl = insertDifficultyHudBlock(tpl, blockToInsert, targetLang);
    }

    textarea.value = tpl;
    renderMapSettings(fullText);
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

/* ------- Extract & insert difficulty ------- */
function extractGlobalLocalplayerBlock(fullText) {
  const reHeader = /^[ \t]*(?:rule|规则|ルール)\s*\(\s*"Huds\s*\|\s*Global\s*Localplayer"\s*\)\s*\{/mi;
  const m = fullText.match(reHeader);
  if (!m) return "";

  const startIdx = m.index;
  const braceOpen = fullText.indexOf("{", startIdx);
  if (braceOpen < 0) return "";

  let level = 1;
  let i = braceOpen + 1;
  for (; i < fullText.length; i++) {
    if (fullText[i] === "{") level++;
    else if (fullText[i] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return "";

  return fullText.slice(startIdx, i + 1);
}

function parseDifficultyIndex(fullText, lang) {
  const hudBlock = extractDifficultyHudBlock(fullText, lang);
  if (!hudBlock) return -1;

  const reIndex = /Difficultyhud\s*=\s*Array\s*\([\s\S]*?Combo\s*\([\s\S]*?,\s*(\d+)\s*\)/i;
  const m = hudBlock.match(reIndex);
  if (m && m[1]) {
    return parseInt(m[1], 10);
  }
  return -1;
}

function extractDifficultyHudBlock(fullText, lang) {
  let pattern;
  switch (lang) {
    case "ja-JP":
      pattern = /グローバル\.Difficultyhud\s*=\s*[\s\S]*?;\s*/;
      break;
    case "zh-CN":
      pattern = /全局\.Difficultyhud\s*=\s*[\s\S]*?;\s*/;
      break;
    default:
      pattern = /Global\.Difficultyhud\s*=\s*Array\([\s\S]*?;\s*/;
      break;
  }
  const m = fullText.match(pattern);
  return m ? m[0] : "";
}

function fillDifficultyFields(parsedIndex) {
  const playElem = document.getElementById("playtestToggle");
  const diffElem = document.getElementById("difficultyHUDSelect");

  if (parsedIndex === 0) {
    if (playElem) playElem.value = "on";
    if (diffElem) diffElem.value = "off";
  } 
  else if (parsedIndex > 0 && parsedIndex < DIFFICULTY_MAP.length) {
    if (playElem) playElem.value = "off";
    if (diffElem) diffElem.value = DIFFICULTY_MAP[parsedIndex];
  } 
  else {
    if (playElem) playElem.value = globalSettings.playtest;
    if (diffElem) diffElem.value = globalSettings.difficultyHUD;
  }
}

function insertDifficultyHudBlock(tpl, hudBlock, lang) {
  const cleanedHud = hudBlock.trim();
  const reHeader = new RegExp(
    `^[ \\t]*(?:rule|规则|ルール)\\s*\\(\\s*"Huds\\s*\\|\\s*Global\\s*Localplayer"\\s*\\)\\s*\\{`,
    "mi"
  );
  const m = tpl.match(reHeader);
  if (!m) {
    return tpl;
  }

  const startIdx = m.index;
  const braceOpenIdx = tpl.indexOf("{", startIdx);
  if (braceOpenIdx < 0) {
    return tpl;
  }

  let level = 1;
  let i = braceOpenIdx + 1;
  for (; i < tpl.length; i++) {
    if (tpl[i] === "{") level++;
    else if (tpl[i] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) {
    return tpl;
  }
  const braceCloseIdx = i;

  return tpl.slice(0, startIdx) + cleanedHud + tpl.slice(braceCloseIdx + 1);
}

/* ------- Translations ------- */
async function loadMapNameTranslations() {
  if (mapNamesTranslations) return mapNamesTranslations;

  try {
    const res = await fetch("translations/maps_names.json");
    if (!res.ok) {
      console.warn("Impossible de charger translations/maps_names.json :", res.status);
      mapNamesTranslations = {};
      return mapNamesTranslations;
    }
    mapNamesTranslations = await res.json();
    return mapNamesTranslations;
  } catch (e) {
    console.warn("Erreur durant fetch(« maps_names.json »):", e);
    mapNamesTranslations = {};
    return mapNamesTranslations;
  }
}

async function loadModesNames() {
  if (modesNames) return modesNames;
  const res = await fetch("translations/modes_names.json");
  if (!res.ok) {
    console.warn("Impossible de charger translations/modes_names.json :", res.status);
    return {};
  }
  modesNames = await res.json();
  return modesNames;
}

async function loadHeroesNames() {
  if (heroesNames) return heroesNames;
  try {
    const res = await fetch("translations/heroes.json");
    if (!res.ok) {
      console.warn("Impossible de charger translations/heroes.json :", res.status);
      heroesNames = {};
      return heroesNames;
    }
    heroesNames = await res.json();
    return heroesNames;
  } catch (e) {
    console.warn("Erreur durant fetch(« heroes.json »):", e);
    heroesNames = {};
    return heroesNames;
  }
}

function translateHeroNames(text, heroesNames, sourceLang, targetLang) {
  const pairs = [];
  for (const heroKey of Object.keys(heroesNames)) {
    const dict = heroesNames[heroKey];
    const nameSource = dict[sourceLang];
    const nameTarget = dict[targetLang];
    if (nameSource && nameTarget && nameSource !== nameTarget) {
      pairs.push({ from: nameSource, to: nameTarget });
    }
  }
  pairs.sort((a, b) => b.from.length - a.from.length);

  for (const { from, to } of pairs) {
    const re = new RegExp(from.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g");
    text = text.replace(re, to);
  }
  return text;
}

async function loadKeywordTranslations() {
  if (keywordTranslations) return keywordTranslations;
  try {
    const res = await fetch("translations/keywords.json");
    if (!res.ok) {
      console.warn("Impossible de charger translations/keywords.json :", res.status);
      keywordTranslations = {};
      return keywordTranslations;
    }
    keywordTranslations = await res.json();
    return keywordTranslations;
  } catch (e) {
    console.warn("Erreur durant fetch(« keywords.json »):", e);
    keywordTranslations = {};
    return keywordTranslations;
  }
}

async function loadIconTranslations() {
  if (iconTranslations) return iconTranslations;
  try {
    const res = await fetch("translations/icons.json");
    if (!res.ok) {
      console.warn("Impossible de charger translations/icons.json :", res.status);
      iconTranslations = {};
      return iconTranslations;
    }
    const raw = await res.json();
    iconTranslations = raw.Icon || {};
    return iconTranslations;
  } catch (e) {
    console.warn("Erreur durant fetch(« icons.json »):", e);
    iconTranslations = {};
    return iconTranslations;
  }
}

function translateFromTo(text, sourceLang, targetLang) {
  const srcDict = (keywordTranslations && keywordTranslations[sourceLang]) || {};
  const tgtDict = (keywordTranslations && keywordTranslations[targetLang]) || {};
  const pairs   = [];

  for (const eng of Object.keys(srcDict)) {
    const from = srcDict[eng];
    const to   = tgtDict[eng] || eng;
    if (from && from !== to) {
      pairs.push({ localized: from, replacement: to });
    }
  }
  pairs.sort((a, b) => b.localized.length - a.localized.length);

  const literalPattern = /("([^"\\]|\\.)*")|('([^'\\]|\\.)*')/g;
  let result = "";
  let lastIndex = 0;
  let m;

  while ((m = literalPattern.exec(text))) {
    const outside = text.slice(lastIndex, m.index);
    let translatedOutside = outside;
    for (const { localized, replacement } of pairs) {
      const escaped = localized.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const useWordBoundary = /^[A-Za-z0-9_]+$/.test(localized);
      const pattern = useWordBoundary ? "\\b" + escaped + "\\b" : escaped;
      const re = new RegExp(pattern, "gi");
      translatedOutside = translatedOutside.replace(re, replacement);
    }
    result += translatedOutside;

    const literal = m[0];
    const quote = literal[0];
    let inner = literal.slice(1, -1);
    let translatedInner = inner;
    for (const { localized, replacement } of pairs) {
      const escaped = localized.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const useWordBoundary = /^[A-Za-z0-9_]+$/.test(localized);
      const pattern = useWordBoundary ? "\\b" + escaped + "\\b" : escaped;
      const re = new RegExp(pattern, "gi");
      translatedInner = translatedInner.replace(re, replacement);
    }
    result += quote + translatedInner + quote;

    lastIndex = literalPattern.lastIndex;
  }

  const tail = text.slice(lastIndex);
  let translatedTail = tail;
  for (const { localized, replacement } of pairs) {
    const escaped = localized.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const useWordBoundary = /^[A-Za-z0-9_]+$/.test(localized);
    const pattern = useWordBoundary ? "\\b" + escaped + "\\b" : escaped;
    const re = new RegExp(pattern, "gi");
    translatedTail = translatedTail.replace(re, replacement);
  }
  result += translatedTail;

  return result;
}

function translateEntireAddonBlock(sourceBlock, sourceLang, targetLang) {
  let t = sourceBlock;

  if (sourceLang === 'ja-JP') {
    t = t.replace(/^\s*ルール/, 'rule').replace(/ルール/, 'rule');
    t = t.replace(/イベント\s*\{/, 'event {');
    t = t.replace(/アクション\s*\{/, 'actions {');
  } else if (sourceLang === 'zh-CN') {
    t = t.replace(/^\s*规则/, 'rule').replace(/规则/, 'rule');
    t = t.replace(/事件\s*\{/, 'event {');
    t = t.replace(/动作\s*\{/, 'actions {');
  } else if (sourceLang === 'ko-KR') {
    t = t.replace(/^\s*rule/i, 'rule').replace(/rule/, 'rule');
    t = t.replace(/event\s*\{/i, 'event {');
    t = t.replace(/action\s*\{/i, 'actions {');
  } else if (sourceLang === 'ru-RU') {
    t = t.replace(/^\s*rule/i, 'rule').replace(/rule/, 'rule');
    t = t.replace(/event\s*\{/i, 'event {');
    t = t.replace(/actions\s*\{/i, 'actions {');
  } else if (sourceLang === 'es-MX') {
    t = t.replace(/^\s*regla/i, 'rule').replace(/regla/, 'rule');
    t = t.replace(/evento\s*\{/i, 'event {');
    t = t.replace(/acciones\s*\{/i, 'actions {');
  } else if (sourceLang === 'pt-BR') {
    t = t.replace(/^\s*regra/i, 'rule').replace(/regra/, 'rule');
    t = t.replace(/evento\s*\{/i, 'event {');
    t = t.replace(/ações\s*\{/i, 'actions {');
  } else if (sourceLang === 'de-DE') {
    t = t.replace(/^\s*regel/i, 'rule').replace(/regel/, 'rule');
    t = t.replace(/event\s*\{/i, 'event {');
    t = t.replace(/aktionen\s*\{/i, 'actions {');
  }

  t = translateFromTo(t, sourceLang, targetLang);
  t = translateIconNames(t, sourceLang, targetLang, iconTranslations);

  return t;
}

function translateIconNames(text, sourceLang, targetLang, iconsDict) {
  if (!iconsDict) return text;

  return text.replace(/Icon String\(\s*([^)]+)\s*\)/g, (match, iconKey) => {
    let foundInfo = null;
    for (const [iconName, translations] of Object.entries(iconsDict)) {
      if (translations[sourceLang] === iconKey) {
        foundInfo = translations;
        break;
      }
    }

    if (!foundInfo) {
      return match;
    }

    const translated = foundInfo[targetLang] || foundInfo["en-US"] || iconKey;
    return `Icon String(${translated})`;
  });
}

function translateLobbyBlock(lobbyText, sourceLang, targetLang) {
  if (!lobbyText) return "";
  const lines = lobbyText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length);
  const srcDict = (keywordTranslations && keywordTranslations[sourceLang]) || {};
  const tgtDict = (keywordTranslations && keywordTranslations[targetLang]) || {};

  const translatedLines = lines.map(line => {
    const parts = line.split(":");
    if (parts.length < 2) return line;
    const keyLocale = parts[0].trim();
    const valueLocale = parts[1].trim();

    let engKeyFound = null;
    for (const eng of Object.keys(srcDict)) {
      if (srcDict[eng] === keyLocale) {
        engKeyFound = eng;
        break;
      }
    }

    let newKey = keyLocale;
    if (engKeyFound) {
      newKey = tgtDict[engKeyFound] || engKeyFound;
    }

    let newValue = valueLocale;
    newValue = translateFromTo(valueLocale, sourceLang, targetLang);
    return `${newKey}: ${newValue}`;
  });

  return translatedLines.join("\n");
}

/* ------- Cache, overpy, parse/extract, render, modal ------- */
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
    .replace(/^[ \t]*#!define\s+enableInvisCommand.*$/gm, "")
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

/* ------- Construct map data rule ------- */
function buildRule(mapdata, lang) {
  const lines = mapdata.trim().split("\n");
  const indented = lines.map(l => "    " + l).join("\n");

  let ruleText;

  if (lang === "zh-CN") {
    ruleText = `规则("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入") 
{
    事件
    {
        持续 - 全局;
    }

    动作
    {
${indented}
    }
}`;
  }
  else if (lang === "ko-KR") {
    ruleText = `rule("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入") 
{
    event
    {
        Ongoing - Global;
    }

    action
    {
${indented}
    }
}`;
  }
  else if (lang === "ja-JP") {
    ruleText = `ルール("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入") 
{
    イベント
    {
        進行中 - グローバル;
    }

    アクション
    {
${indented}
    }
}`;
  }
  else if (lang === "ru-RU") {
    ruleText = `rule ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这入力")
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
  else if (lang === "es-MX") {
    ruleText = `regla ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这入力")
{
    evento
    {
        En curso - Global;
    }

    acciones
    {
${indented}
    }
}`;
  }
  else if (lang === "pt-BR") {
    ruleText = `regra ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这入力")
{
    evento
    {
        Em andamento - Global;
    }

    ações
    {
${indented}
    }
}`;
  }
  else if (lang === "de-DE") {
    ruleText = `regel ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这入力")
{
    event
    {
        Ongoing - Global;
    }

    aktionen
    {
${indented}
    }
}`;
  }
  else {
    ruleText = `rule ("<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这入力")
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

  marker = '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入';

  if (lang === "zh-CN") {
    startRule = "规则";
    endRule   = "事件";
  } else if (lang === "ko-KR") {
    startRule = "rule";
    endRule   = "event";
  } else if (lang === "ja-JP") {
    startRule = "ルール";
    endRule   = "イベント";
  } else if (lang === "ru-RU") {
    startRule = "rule";
    endRule   = "event";
  } else if (lang === "es-MX") {
    startRule = "regla";
    endRule   = "evento";
  } else if (lang === "pt-BR") {
    startRule = "regra";
    endRule   = "evento";
  } else if (lang === "de-DE") {
    startRule = "regel";
    endRule   = "event";
  } else {
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
  const markers = [
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入',
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这入力',
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE',
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE',
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - Data Entry <---- INSERT HERE',
    'Map Data <---- INSERT YOUR MAP DATA HERE'
  ];

  let headerIdx = -1;
  for (const m of markers) {
    const idx = fullText.indexOf(m);
    if (idx >= 0) {
      headerIdx = idx;
      break;
    }
  }
  if (headerIdx < 0) {
    throw new Error(
      `Impossible de trouver le marqueur "Map Data" (versions attendues :\n` +
      `– ${markers[0]}\n` +
      `– ${markers[1]}\n` +
      `– ${markers[2]}\n` +
      `– ${markers[3]}\n` +
      `– ${markers[4]}\n` +
      `– ${markers[5]}\n` +
      `) dans le texte fourni.`
    );
  }

  const afterHeader = fullText.slice(headerIdx);

  let actionsRegex;
  if (lang === "zh-CN") {
    actionsRegex = /动作\s*\{\s*([\s\S]*?)\s*\}/i;
  } else if (lang === "ko-KR") {
    actionsRegex = /action\s*\{\s*([\s\S]*?)\s*\}/i;
  } else if (lang === "ja-JP") {
    actionsRegex = /アクション\s*\{\s*([\s\S]*?)\s*\}/i;
  } else if (lang === "ru-RU") {
    actionsRegex = /actions\s*\{\s*([\s\S]*?)\s*\}/i;
  } else if (lang === "es-MX") {
    actionsRegex = /acciones\s*\{\s*([\s\S]*?)\s*\}/i;
  } else if (lang === "pt-BR") {
    actionsRegex = /ações\s*\{\s*([\s\S]*?)\s*\}/i;
  } else if (lang === "de-DE") {
    actionsRegex = /aktionen\s*\{\s*([\s\S]*?)\s*\}/i;
  } else {
    actionsRegex = /actions\s*\{\s*([\s\S]*?)\s*\}/i;
  }

  const actionsMatch = afterHeader.match(actionsRegex);
  if (!actionsMatch || !actionsMatch[1]) {
    return "";
  }

  return actionsMatch[1].trim();
}

/* ------- Extract & insert lobby ------- */
function extractLobbyBlock(fullText, lang) {
  let keyword;
  switch (lang) {
    case "es-MX":
      keyword = "sala de espera";
      break;
    case "de-DE":
      keyword = "Lobby";
      break;
    case "ja-JP":
      keyword = "ロビー";
      break;
    case "ko-KR":
      keyword = "lobby";
      break;
    case "ru-RU":
      keyword = "lobby";
      break;
    case "zh-CN":
      keyword = "大厅";
      break;
    case "pt-BR":
      keyword = "lobby";
      break;
    default:
      keyword = "lobby";
      break;
  }

  const regexHeader = new RegExp(`^\\s*${keyword}\\s*\\{`, "im");
  const matchHeader = fullText.match(regexHeader);
  if (!matchHeader) return "";

  const startIdx = fullText.indexOf("{", matchHeader.index);
  if (startIdx < 0) return "";

  let level = 1, i = startIdx + 1;
  for (; i < fullText.length; i++) {
    if (fullText[i] === "{") level++;
    else if (fullText[i] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return "";

  const inside = fullText.slice(startIdx + 1, i);
  return inside.trim();
}

function insertLobbyIntoTemplate(tpl, lobbyContent, lang) {
  let keyword;
  switch (lang) {
    case "es-MX":
      keyword = "sala de espera";
      break;
    case "de-DE":
      keyword = "Lobby";
      break;
    case "ja-JP":
      keyword = "ロビー";
      break;
    case "ko-KR":
      keyword = "lobby"; 
      break;
    case "ru-RU":
      keyword = "lobby";
      break;
    case "zh-CN":
      keyword = "大厅";
      break;
    case "pt-BR":
      keyword = "lobby";
      break;
    default:
      keyword = "lobby";
      break;
  }

  const regexHeader = new RegExp(`^\\s*${keyword}\\s*\\{`, "m");
  const m = tpl.match(regexHeader);
  if (!m) return tpl;

  const startBrIdx = tpl.indexOf("{", m.index);
  if (startBrIdx < 0) return tpl;

  let level = 1, i = startBrIdx + 1;
  for (; i < tpl.length; i++) {
    if (tpl[i] === "{") level++;
    else if (tpl[i] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) return tpl;
  const endBrIdx = i;

  const lines = lobbyContent.split("\n");
  const indent = "    ";
  const indented = lines.map(l => indent + l).join("\n");

  return tpl.slice(0, startBrIdx + 1)
       + "\n" + indented + "\n"
       + tpl.slice(endBrIdx);
}

/* ------- Extract map name ------- */
function extractModeMapNames(fullText) {
  const result = {};
  const mainRegex = /^\s*(?:modes|modos|模式|モード|modi)\s*\{/mi;
  const modesMatch = fullText.match(mainRegex);
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
    const headerMatch = remaining.match(/^\s*(?:disabled\s+|deshabilitado\s+|desabilitado\s+|deaktiviert\s+|禁用\s+|無効\s+)?([^\s{][^{\r\n]*)\s*\{/mi);
    if (!headerMatch) break;

    const modeNameRaw = headerMatch[1].trim();
    const headerIndex = headerMatch.index;
    const braceRelIdx = headerMatch[0].lastIndexOf("{");
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

    const enabledRegex = /(?:enabled\s+maps|mapas\s+habilitados|mapas\s+ativados|verfügbare\s+karten|启用地图|有効なマップ)\s*\{\s*([\s\S]*?)\s*\}/i;
    const enabledMatch = modeBlockContent.match(enabledRegex);
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

  return result;
}

/* ------- Find & target map name ------- */
function findModeKey(localizedName, lang) {
  if (!modesNames) return null;
  for (const [modeKey, translations] of Object.entries(modesNames)) {
    if (translations[lang] === localizedName) {
      return modeKey;
    }
  }
  return null;
}

function getTargetModeName(modeKey, targetLang, fallback) {
  if (modesNames && modesNames[modeKey] && modesNames[modeKey][targetLang]) {
    return modesNames[modeKey][targetLang];
  }
  return fallback;
}

/* ------- Insert map name ------- */
function insertMapNameIntoTemplate(tpl, modeName, fullMapEntry, lang) {
  const modeRegex = new RegExp(`^\\s*${modeName.trim()}\\s*\\{`, "m");
  const modeHeaderMatch = tpl.match(modeRegex);
  if (!modeHeaderMatch) return tpl;

  const modeLineIdx     = modeHeaderMatch.index;
  const openingBraceIdx = tpl.indexOf("{", modeLineIdx);
  if (openingBraceIdx < 0) return tpl;

  let keyword, keywordMatch;
  if (lang === "ja-JP") {
    keyword = "有効なマップ";
    keywordMatch = new RegExp(`${keyword}\\s*\\{`);
  } else if (lang === "zh-CN") {
    keyword = "启用地图";
    keywordMatch = new RegExp(`${keyword}\\s*\\{`);
  } else if (lang === "es-MX") {
    keyword = "mapas habilitados";
    keywordMatch = new RegExp(`${keyword}\\s*\\{`, "i");
  } else if (lang === "pt-BR") {
    keyword = "mapas ativados";
    keywordMatch = new RegExp(`${keyword}\\s*\\{`, "i");
  } else if (lang === "de-DE") {
    keywordMatch = /verfügba(?:re|ren)\s+karten\s*\{/i;
  } else {
    keyword = "enabled maps";
    keywordMatch = new RegExp(`${keyword}\\s*\\{`, "i");
  }

  const sliceAfter = tpl.slice(openingBraceIdx);
  const m = sliceAfter.match(keywordMatch);
  if (!m) return tpl;

  const braceEnabledOpen = tpl.indexOf("{", openingBraceIdx + m.index + m[0].lastIndexOf("{"));
  if (braceEnabledOpen < 0) return tpl;

  let level = 1, k = braceEnabledOpen + 1;
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

  const newInside = `\n${indent}${fullMapEntry}\n${indent}`;
  return tpl.slice(0, braceEnabledOpen + 1)
         + newInside
         + tpl.slice(braceEnabledClose);
}

/* ------- Extract & insertion du bloc "Credits and Colors" ------- */
function extractMapCredits(fullText, lang) {
  if (lang === "ja-JP") {
    const ruleHeaderRegex = /ルール\("<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE \/ (在这入力|在这输入)"\)/;
    const headerMatch = fullText.match(ruleHeaderRegex);
    if (!headerMatch) {
      throw new Error('Impossible de trouver "ルール(…Credits and Colors…)" pour ja-JP.');
    }
    const startIdx = fullText.indexOf(headerMatch[0]);

    const braceOpenIdx = fullText.indexOf("{", startIdx + headerMatch[0].length);
    if (braceOpenIdx < 0) {
      throw new Error('Accolade ouvrante introuvable après la ligne “ルール(…)”.');
    }

    let level = 1, i = braceOpenIdx + 1;
    for (; i < fullText.length; i++) {
      if (fullText[i] === "{") level++;
      else if (fullText[i] === "}") {
        level--;
        if (level === 0) break;
      }
    }
    if (level !== 0) {
      throw new Error('Accolade fermante introuvable pour la règle “ルール(…)” en ja-JP.');
    }
    const outerCloseIdx = i;

    const ruleBlock = fullText.slice(braceOpenIdx + 1, outerCloseIdx);

    const keyword = "アクション";
    const actionRegex = new RegExp(`${keyword}\\s*\\{`);
    const mAction = ruleBlock.match(actionRegex);
    if (!mAction) {
      throw new Error(`Bloc "${keyword} { … }" introuvable dans la règle ja-JP.`);
    }
    const relActionOpen = ruleBlock.indexOf("{", mAction.index + mAction[0].lastIndexOf("{"));
    if (relActionOpen < 0) {
      throw new Error(`Accolade ouvrante introuvable pour "${keyword}" dans ja-JP.`);
    }
    const absoluteActionOpen = braceOpenIdx + 1 + relActionOpen;

    let level2 = 1, j = absoluteActionOpen + 1;
    for (; j < fullText.length; j++) {
      if (fullText[j] === "{") level2++;
      else if (fullText[j] === "}") {
        level2--;
        if (level2 === 0) break;
      }
    }
    if (level2 !== 0) {
      throw new Error(`Accolade fermante introuvable pour "${keyword}" en ja-JP.`);
    }
    const actionClose = j;

    return fullText.slice(absoluteActionOpen + 1, actionClose).trim();
  }

  let modern, keyword;
  if (lang === "zh-CN") {
    modern  = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入';
    keyword = "动作";
  } else if (lang === "pt-BR") {
    modern  = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
    keyword = "ações";
  } else if (lang === "es-MX") {
    modern  = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
    keyword = "acciones";
  } else if (lang === "ko-KR") {
    modern  = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
    keyword = "action";
  } else if (lang === "ru-RU") {
    modern  = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
    keyword = "actions";
  } else if (lang === "de-DE") {
    modern  = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
    keyword = "aktionen";
  } else {
    modern  = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
    keyword = "actions";
  }
  const legacy = 'Credits here - 作者名字 <---- INSERT HERE / 在这入力';

  let idxMarker = fullText.indexOf(modern);
  if (idxMarker < 0) {
    const legacyRegex = /Credits here\s*-\s*作者名字\s*<---- INSERT HERE \/ 在这入力/i;
    const mLegacy = fullText.match(legacyRegex);
    if (!mLegacy) {
      throw new Error(`Marqueur "${legacy}" introuvable en zh-CN ou en mode legacy.`);
    }
    idxMarker = mLegacy.index;
  }

  const sliceAfter = fullText.slice(idxMarker);
  const relIdx = sliceAfter.search(new RegExp(`${keyword}\\s*\\{`, "i"));
  if (relIdx < 0) {
    throw new Error(`Bloc "${keyword} { … }" introuvable après le marqueur Credits.`);
  }
  const braceOpenIdx2 = fullText.indexOf("{", idxMarker + relIdx);
  if (braceOpenIdx2 < 0) {
    throw new Error(`Accolade ouvrante introuvable pour "${keyword}".`);
  }

  let level3 = 1, k = braceOpenIdx2 + 1;
  for (; k < fullText.length; k++) {
    if (fullText[k] === "{") level3++;
    else if (fullText[k] === "}") {
      level3--;
      if (level3 === 0) break;
    }
  }
  if (level3 !== 0) {
    throw new Error(`Accolade fermante introuvable pour "${keyword}".`);
  }
  const braceCloseIdx2 = k;
  return fullText.slice(braceOpenIdx2 + 1, braceCloseIdx2).trim();
}

function insertMapCreditsIntoTemplate(tpl, creditsBlock, lang) {
  let uniqueMarker;
  if (lang === "zh-CN") {
    uniqueMarker =
      '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入';
  } else {
    uniqueMarker =
      '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';
  }

  const idxMarker = tpl.indexOf(uniqueMarker);
  if (idxMarker < 0) {
    return tpl;
  }

  const headerEnd = tpl.indexOf(")", idxMarker);
  if (headerEnd < 0) {
    return tpl;
  }

  let actionWord;
  switch (lang) {
    case "ja-JP": actionWord = "アクション"; break;
    case "zh-CN": actionWord = "动作";    break;
    case "ko-KR": actionWord = "action"; break;
    case "ru-RU": actionWord = "actions";break;
    case "es-MX": actionWord = "acciones";break;
    case "pt-BR": actionWord = "ações";  break;
    case "de-DE": actionWord = "aktionen";break;
    default:      actionWord = "actions";break;
  }

  const actionIdx = tpl
    .slice(headerEnd + 1)
    .search(new RegExp(`${actionWord}\\s*\\{`, "i"));
  if (actionIdx < 0) {
    return tpl;
  }

  const globalActionIdx = headerEnd + 1 + actionIdx;

  const braceOpenIdx = tpl.indexOf("{", globalActionIdx);
  if (braceOpenIdx < 0) {
    return tpl;
  }

  let level = 1;
  let i2 = braceOpenIdx + 1;
  for (; i2 < tpl.length; i2++) {
    if (tpl[i2] === "{") level++;
    else if (tpl[i2] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) {
    return tpl;
  }
  const braceCloseIdx = i2;

  const lines = creditsBlock.split(/\r?\n/);
  const indentedBlock = lines.map(line => "        " + line).join("\n");

  const newActionsSection = 
    `${actionWord}\n` +
    `    {\n` +
    `${indentedBlock}\n` +
    `    }`;

  return tpl.slice(0, globalActionIdx)
       + newActionsSection
       + tpl.slice(braceCloseIdx + 1);
}

/* ------- Extract Workshop bans ------- */
function parseGlobalWorkshopBans(fullText) {
  const result = [];
  const regexWorkshop = /(?:workshop|地图工坊|ワークショップ)\s*\{([\s\S]*?)\}/i;
  const workshopMatch = fullText.match(regexWorkshop);
  if (!workshopMatch) return result;

  const block = workshopMatch[1];
  block.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*ban\s+([^:]+?)\s*:\s*(?:On|开启|활성화|Вкл\.|Activado|Ligado|Ein)\s*$/i);
    if (m) {
      result.push(m[1].trim());
    }
  });

  return result;
}

function insertWorkshopBansIntoTemplate(tpl, bans, lang) {
  if (!bans.length) return tpl;

  let blockRegex;
  if (lang === "zh-CN") {
    blockRegex = /地图工坊\s*\{/;
  } else if (lang === "ja-JP") {
    blockRegex = /ワークショップ\s*\{/;
  } else {
    blockRegex = /\bworkshop\s*\{/i;
  }

  const workshopIdx = tpl.search(blockRegex);
  if (workshopIdx < 0) {
    return tpl;
  }

  const openBraceIdx = tpl.indexOf("{", workshopIdx);
  if (openBraceIdx < 0) {
    return tpl;
  }

  let level = 1;
  let i = openBraceIdx + 1;
  for (; i < tpl.length; i++) {
    if (tpl[i] === "{") level++;
    else if (tpl[i] === "}") {
      level--;
      if (level === 0) break;
    }
  }
  if (level !== 0) {
    return tpl;
  }
  const closeBraceIdx = i;

  const indent = "    ";
  let bansText;

  if (lang === "zh-CN") {
    bansText = bans
      .map(name => `${indent}ban ${name} : 开启`)
      .join("\n");
  } else if (lang === "ja-JP") {
    bansText = bans
      .map(name => `${indent}ban ${name} : ON`)
      .join("\n");
  } else if (lang === "ko-KR") {
    bansText = bans
      .map(name => `${indent}ban ${name} : 활성화`)
      .join("\n");
  } else if (lang === "ru-RU") {
    bansText = bans
      .map(name => `${indent}ban ${name} : Вкл.`)
      .join("\n");
  } else if (lang === "es-MX") {
    bansText = bans
      .map(name => `${indent}ban ${name} : Activado`)
      .join("\n");
  } else if (lang === "pt-BR") {
    bansText = bans
      .map(name => `${indent}ban ${name} : Ligado`)
      .join("\n");
  } else if (lang === "de-DE") {
    bansText = bans
      .map(name => `${indent}ban ${name} : Ein`)
      .join("\n");
  } else {
    bansText = bans
      .map(name => `${indent}ban ${name} : On`)
      .join("\n");
  }

  return tpl.slice(0, openBraceIdx + 1)
       + "\n" + bansText + "\n"
       + tpl.slice(closeBraceIdx);
}

/* ------- Extract Workshop settings------- */
function parseWorkshopSettings(fullText) {
  const result = { editorMode: false, portals: false };
  const regexWorkshop = /(?:workshop|地图工坊|ワークショップ)\s*\{([\s\S]*?)\}/i;
  const workshopMatch = fullText.match(regexWorkshop);
  if (!workshopMatch) return result;
  const block = workshopMatch[1];

  const reEditor = /Editor mode\s*-\s*作图模式\s*:\s*([^\r\n]+)/i;
  const mEditor = block.match(reEditor);
  if (mEditor) {
    const val = mEditor[1].trim();
    const vLower = val.toLowerCase();
    const truthy = ["on", "开启", "활성화", "вкл.", "activado", "ligado", "ein"];
    if (truthy.includes(vLower)) {
      result.editorMode = true;
    } else {
      result.editorMode = false;
    }
  }

  const rePortals = /enable portals control maps\s*-\s*启用传送门\s*占点地图\s*:\s*([^\r\n]+)/i;
  const mPortals = block.match(rePortals);
  if (mPortals) {
    const val = mPortals[1].trim();
    const vLower = val.toLowerCase();
    const truthy = ["on", "开启", "활성화", "вкл.", "activado", "ligado", "ein"];
    if (truthy.includes(vLower)) {
      result.portals = true;
    } else {
      result.portals = false;
    }
  }

  return result;
}

/* ------- Extract Map Validator------- */
function parseBasicMapValidator(tplStr) {
  const disabledPrefixes = [
    'disabled', 'deshabilitado', 'desabilitado',
    'deaktiviert', '無効', '禁用'
  ];
  const ruleKeywords = ['rule', 'regla', 'regra', 'regel', 'ルール', '规则'];
  const title = 'Addon | SUB Basic Map Validator';
  const t = title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  const prefixGroup = disabledPrefixes.join('|');
  const ruleGroup = ruleKeywords.join('|');

  const disabledRegex = new RegExp(
    `(?:${prefixGroup})\\s+(?:${ruleGroup})\\s*\\(\\s*"${t}"\\s*\\)`,
    'i'
  );
  if (disabledRegex.test(tplStr)) {
    return false;
  }

  const enabledRegex = new RegExp(
    `(?:${ruleGroup})\\s*\\(\\s*"${t}"\\s*\\)`,
    'i'
  );
  if (enabledRegex.test(tplStr)) {
    return true;
  }

  return false;
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

/* ------- Extract & display data settings ------- */
function parseGlobalACheckpoints(fullText) {
  const results = [];
  const regexGlobalA = /(?:Global|全局|グローバル)\.A\s*=\s*(?:Array|Matriz|数组|配列)\s*\(\s*/;
  const matchGA = fullText.match(regexGlobalA);
  if (!matchGA) return results;

  const startIdx = matchGA.index + matchGA[0].length;
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

  const regexVector = /(?:Vector|矢量|ベクトル|Vetor)\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/;
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
  const regex = new RegExp(`(?:Global|全局|グローバル)\\.${varName}\\s*=\\s*(?:Array|Matriz|数组|配列)\\s*\\(`);
  const match = fullText.match(regex);
  if (!match) return [];

  const startIdx = match.index + match[0].length;
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
  const regex = new RegExp(`(?:Global|全局|グローバル)\\.${varName}\\s*=\\s*(?:Array|Matriz|数组|配列)\\s*\\(`);
  const match = fullText.match(regex);
  if (!match) return results;

  const startIdx = match.index + match[0].length;
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
  const regexVector = /(?:Vector|矢量|ベクトル|Vetor)\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/g;
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

function parseGlobalArrayBooleans(fullText, varName) {
  const results = [];
  const regex = new RegExp(`(?:Global|全局|グローバル)\\.${varName}\\s*=\\s*(?:Array|Matriz|数组|配列)\\s*\\(`);
  const match = fullText.match(regex);
  if (!match) return results;

  const startIdx = match.index + match[0].length;
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
    const t = token.trim();
    const lower = t.toLowerCase();
    if (lower === "true" || lower === "真") results.push(true);
    else if (lower === "false" || lower === "假") results.push(false);
    else if (lower === "verdadeiro" || lower === "falso") {
      results.push(lower === "verdadeiro");
    }
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

/* ------- Settings section ------- */
function renderGlobalBans(fullText) {
  const globalBans = parseGlobalWorkshopBans(fullText);
  if (globalBans.length === 0) return null;

  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("global-ban-icons");

  globalBans.forEach(banName => {
    const span = document.createElement("span");
    span.classList.add("global-ban-icon");
    span.textContent = banName;
    span.title = banName;
    iconsContainer.appendChild(span);
  });

  return iconsContainer;
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

  card.addEventListener("click", () => {
    if (!isEditMode) return;
    openEditModal(originalIndex);
  });

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
  const container = document.getElementById("mapSettings");
  lastFullText = fullText;

  lastParsedWorkshopSettings = parseWorkshopSettings(fullText);

  const globalInfos = container.querySelector(".global-infos");
  globalInfos.innerHTML = "";

  let bansContainer = globalInfos.querySelector(".global-bans");
  if (!bansContainer) {
    bansContainer = document.createElement("div");
    bansContainer.classList.add("global-bans");
    globalInfos.appendChild(bansContainer);
  }

  let settingsButtons = globalInfos.querySelector(".settings-buttons");
  if (!settingsButtons) {
    settingsButtons = document.createElement("div");
    settingsButtons.classList.add("settings-buttons");
    globalInfos.appendChild(settingsButtons);
  }

  let editModeBtn = document.getElementById("editModeBtn");
  if (!editModeBtn) {
    editModeBtn = document.createElement("button");
    editModeBtn.id = "editModeBtn";
    editModeBtn.classList.add("edit-mode-btn");
    editModeBtn.textContent = isEditMode ? "Exit edit" : "Edit mode";
  } else {
    editModeBtn.textContent = isEditMode ? "Exit edit" : "Edit mode";
  }
  if (editModeBtn.dataset.listenerInstalled !== "true") {
    editModeBtn.dataset.listenerInstalled = "true";
    editModeBtn.addEventListener("click", () => {
      isEditMode = !isEditMode;
      editModeBtn.textContent = isEditMode ? "Exit edit" : "Edit mode";
      container.querySelectorAll(".checkpoint-card").forEach(card => {
        if (isEditMode) card.classList.add("editable");
        else            card.classList.remove("editable");
      });
    });
  }

  if (!settingsButtons.contains(editModeBtn)) {
    settingsButtons.appendChild(editModeBtn);
  }

  bansContainer.innerHTML = "";
  const bansIconsEl = renderGlobalBans(fullText);
  if (bansIconsEl) {
    bansIconsEl.querySelectorAll(".global-ban-icon").forEach(span => {
      bansContainer.appendChild(span);
    });
    globalInfos.classList.remove("no-bans");
  } else {
    globalInfos.classList.add("no-bans");
  }

  Array.from(container.children).forEach(child => {
    if (child !== globalInfos) {
      container.removeChild(child);
    }
  });

  const dataModel = extractAllData(fullText);
  currentDataModel = dataModel;

  if (dataModel.checkpoints.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "Aucun checkpoint (Global.A) trouvé dans le texte.";
    msg.classList.add("empty-message");
    container.appendChild(msg);
    return;
  }

  dataModel.checkpoints.forEach((coords, idx) => {
    const card = createCheckpointCard(idx, coords, dataModel);
    container.appendChild(card);
  });

  updateCardNumbers();
  if (isEditMode) {
    container.querySelectorAll(".checkpoint-card").forEach(card => {
      card.classList.add("editable");
    });
  }
}

/* ------- Convertor ------- */
async function doConvert(fullText, lang) {
  const globalBans = parseGlobalWorkshopBans(fullText);
  const lobbyBlock = extractLobbyBlock(fullText, lang);
  const mapDataBlock = extractMapDataBlock(fullText, lang);
  debug('Bloc "actions" de Map Data extrait.');

  let tpl = await loadTemplate(lang);
  debug("Template chargé.");

  const newRule = buildRule(mapDataBlock, lang);
  tpl = replaceMapData(tpl, newRule, lang);

  const modeMapNames = extractModeMapNames(fullText);
  debug("Modes & maps extraits : " + JSON.stringify(modeMapNames));
  for (const [modeName, fullMapEntry] of Object.entries(modeMapNames)) {
    tpl = insertMapNameIntoTemplate(tpl, modeName, fullMapEntry, lang);
  }

  try {
    const creditsBlock = extractMapCredits(fullText, lang);
    debug("Bloc Credits extrait.");
    tpl = insertMapCreditsIntoTemplate(tpl, creditsBlock, lang);
  } catch (e) {
    debug("Aucun bloc Credits trouvé : " + e.message);
  }

  tpl = insertWorkshopBansIntoTemplate(tpl, globalBans, lang);

  if (lobbyBlock) {
    tpl = insertLobbyIntoTemplate(tpl, lobbyBlock, lang);
  }

  const globalLocalplayerBlock = extractGlobalLocalplayerBlock(fullText);
  if (globalLocalplayerBlock) {
    tpl = insertDifficultyHudBlock(tpl, globalLocalplayerBlock, lang);
  }

  return tpl;
}

/* ------- Modal editor mode ------- */
function openEditModal(idx) {
  editIndex = idx;
  const modal = document.getElementById("editModal");
  const fieldsContainer = document.getElementById("editFieldsContainer");
  fieldsContainer.innerHTML = "";

  const coords    = currentDataModel.checkpoints[idx];
  const kills     = currentDataModel.killMap[idx]   || [];
  const pins      = currentDataModel.pinMap[idx]    || [];
  const abilities = currentDataModel.abilityMap[idx] || {};
  const banMap = currentDataModel.banMap;

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.textContent = "Coordinates (X, Y, Z)";
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    const coordRow = document.createElement("div");
    coordRow.classList.add("orb-row");

    const inX = document.createElement("input");
    inX.type = "number";
    inX.step = "0.001";
    inX.value = coords.x;
    inX.id = "editCoordX";
    coordRow.appendChild(inX);

    const inY = document.createElement("input");
    inY.type = "number";
    inY.step = "0.001";
    inY.value = coords.y;
    inY.id = "editCoordY";
    coordRow.appendChild(inY);

    const inZ = document.createElement("input");
    inZ.type = "number";
    inZ.step = "0.001";
    inZ.value = coords.z;
    inZ.id = "editCoordZ";
    coordRow.appendChild(inZ);

    wrapper.appendChild(coordRow);
    fieldsContainer.appendChild(wrapper);
  }

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.textContent = "Kill orbs";
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    kills.forEach((kb, i) => {
      const row = document.createElement("div");
      row.classList.add("orb-row");
      row.dataset.orbIndex = i;

      const kx = document.createElement("input");
      kx.type = "number";
      kx.step = "0.001";
      kx.value = kb.pos.x;
      kx.classList.add("kill-x"); row.appendChild(kx);

      const ky = document.createElement("input");
      ky.type = "number";
      ky.step = "0.001";
      ky.value = kb.pos.y;
      ky.classList.add("kill-y"); row.appendChild(ky);

      const kz = document.createElement("input");
      kz.type = "number";
      kz.step = "0.001";
      kz.value = kb.pos.z;
      kz.classList.add("kill-z"); row.appendChild(kz);

      const kr = document.createElement("input");
      kr.type = "number";
      kr.step = "0.001";
      kr.value = kb.radius !== null ? kb.radius : 0;
      kr.classList.add("kill-r"); row.appendChild(kr);

      const btnDel = document.createElement("button");
      btnDel.type = "button";
      btnDel.textContent = "–";
      btnDel.title = "Remove this kill orb";
      btnDel.style.background = "#c62828";
      btnDel.style.color = "#fff";
      btnDel.style.border = "none";
      btnDel.style.borderRadius = "4px";
      btnDel.style.width = "24px";
      btnDel.style.cursor = "pointer";
      btnDel.addEventListener("click", () => row.remove());
      row.appendChild(btnDel);

      wrapper.appendChild(row);
    });

    const addKillBtn = document.createElement("button");
    addKillBtn.type = "button";
    addKillBtn.textContent = "+ Add kill orb";
    addKillBtn.style.marginTop = "6px";
    addKillBtn.style.padding = "4px 8px";
    addKillBtn.style.background = "#1976d2";
    addKillBtn.style.color = "#fff";
    addKillBtn.style.border = "none";
    addKillBtn.style.borderRadius = "4px";
    addKillBtn.style.cursor = "pointer";
    addKillBtn.addEventListener("click", () => {
      const row = document.createElement("div");
      row.classList.add("orb-row");

      ["kill-x", "kill-y", "kill-z", "kill-r"].forEach(cls => {
        const inp = document.createElement("input");
        inp.type = "number";
        inp.step = "0.001";
        inp.value = 0;
        inp.classList.add(cls);
        row.appendChild(inp);
      });
      const btnDel = document.createElement("button");
      btnDel.type = "button";
      btnDel.textContent = "–";
      btnDel.style.background = "#c62828";
      btnDel.style.color = "#fff";
      btnDel.style.border = "none";
      btnDel.style.borderRadius = "4px";
      btnDel.style.width = "24px";
      btnDel.style.cursor = "pointer";
      btnDel.addEventListener("click", () => row.remove());
      row.appendChild(btnDel);

      wrapper.appendChild(row);
    });
    wrapper.appendChild(addKillBtn);

    fieldsContainer.appendChild(wrapper);
  }

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.textContent = "Bounce orbs";
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    pins.forEach((pb, i) => {
      const row = document.createElement("div");
      row.classList.add("orb-row");
      row.dataset.pinIndex = i;

      const px = document.createElement("input");
      px.type = "number";
      px.step = "0.001";
      px.value = pb.pos.x;
      px.classList.add("pin-x"); row.appendChild(px);

      const py = document.createElement("input");
      py.type = "number";
      py.step = "0.001";
      py.value = pb.pos.y;
      py.classList.add("pin-y"); row.appendChild(py);

      const pz = document.createElement("input");
      pz.type = "number";
      pz.step = "0.001";
      pz.value = pb.pos.z;
      pz.classList.add("pin-z"); row.appendChild(pz);

      const pf = document.createElement("input");
      pf.type = "number";
      pf.step = "0.001";
      pf.value = pb.force != null ? pb.force : 0;
      pf.classList.add("pin-f"); row.appendChild(pf);

      const lockLabel = document.createElement("label");
      const lockChk = document.createElement("input");
      lockChk.type = "checkbox";
      lockChk.checked = pb.locked;
      lockChk.classList.add("pin-locked");
      lockLabel.appendChild(lockChk);
      lockLabel.appendChild(document.createTextNode("Lock"));
      row.appendChild(lockLabel);

      const u5Label = document.createElement("label");
      const u5Chk = document.createElement("input");
      u5Chk.type = "checkbox";
      u5Chk.checked = pb.givesUlt5;
      u5Chk.classList.add("pin-ult5");
      u5Label.appendChild(u5Chk);
      u5Label.appendChild(document.createTextNode("Dao"));
      row.appendChild(u5Label);

      const u6Label = document.createElement("label");
      const u6Chk = document.createElement("input");
      u6Chk.type = "checkbox";
      u6Chk.checked = pb.givesUlt6;
      u6Chk.classList.add("pin-ult6");
      u6Label.appendChild(u6Chk);
      u6Label.appendChild(document.createTextNode("Shift"));
      row.appendChild(u6Label);

      const btnDel = document.createElement("button");
      btnDel.type = "button";
      btnDel.textContent = "–";
      btnDel.style.background = "#c62828";
      btnDel.style.color = "#fff";
      btnDel.style.border = "none";
      btnDel.style.borderRadius = "4px";
      btnDel.style.width = "24px";
      btnDel.style.cursor = "pointer";
      btnDel.addEventListener("click", () => row.remove());
      row.appendChild(btnDel);

      wrapper.appendChild(row);
    });

    const addPinBtn = document.createElement("button");
    addPinBtn.type = "button";
    addPinBtn.textContent = "+ Add bounce orb";
    addPinBtn.style.marginTop = "6px";
    addPinBtn.style.padding = "4px 8px";
    addPinBtn.style.background = "#1976d2";
    addPinBtn.style.color = "#fff";
    addPinBtn.style.border = "none";
    addPinBtn.style.borderRadius = "4px";
    addPinBtn.style.cursor = "pointer";
    addPinBtn.addEventListener("click", () => {
      const row = document.createElement("div");
      row.classList.add("orb-row");

      ["pin-x", "pin-y", "pin-z", "pin-f"].forEach(cls => {
        const inp = document.createElement("input");
        inp.type = "number";
        inp.step = "0.001";
        inp.value = 0;
        inp.classList.add(cls);
        row.appendChild(inp);
      });
      ["pin-locked", "pin-ult5", "pin-ult6"].forEach(cls => {
        const label = document.createElement("label");
        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.classList.add(cls);
        label.appendChild(chk);
        label.appendChild(document.createTextNode(cls.replace("pin-", "")));
        row.appendChild(label);
      });
      const btnDel = document.createElement("button");
      btnDel.type = "button";
      btnDel.textContent = "–";
      btnDel.style.background = "#c62828";
      btnDel.style.color = "#fff";
      btnDel.style.border = "none";
      btnDel.style.borderRadius = "4px";
      btnDel.style.width = "24px";
      btnDel.style.cursor = "pointer";
      btnDel.addEventListener("click", () => row.remove());
      row.appendChild(btnDel);

      wrapper.appendChild(row);
    });
    wrapper.appendChild(addPinBtn);

    fieldsContainer.appendChild(wrapper);
  }

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.textContent = "Abilities";
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    const ultLabel = document.createElement("label");
    const ultChk = document.createElement("input");
    ultChk.type = "checkbox";
    ultChk.checked = !!abilities.ultimate;
    ultChk.id = "editAbilityUlt";
    ultLabel.appendChild(ultChk);
    ultLabel.appendChild(document.createTextNode("Ultimate available"));
    wrapper.appendChild(ultLabel);

    const dashLabel = document.createElement("label");  
    const dashChk = document.createElement("input");
    dashChk.type = "checkbox";
    dashChk.checked = !!abilities.dash;
    dashChk.id = "editAbilityDash";
    dashLabel.appendChild(dashChk);
    dashLabel.appendChild(document.createTextNode("Dash available"));
    wrapper.appendChild(dashLabel);

    fieldsContainer.appendChild(wrapper);
  }

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.textContent = "Checkpoint-specific Bans";
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    Object.entries(banMap).forEach(([banKey, arr]) => {
      const label = document.createElement("label");
      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.classList.add("edit-ban-" + banKey);
      chk.checked = arr.includes(idx);
      label.appendChild(chk);
      const text = {
        Multi: "Ban Multi",
        Create: "Ban Create",
        Dead: "Ban Dead",
        Emote: "Ban Emote",
        Climb: "Ban Climb",
        Bhop: "Ban Bhop",
        Stand: "Ban Stand",
        Djump: "Ban Djump",
        SaveDouble: "Ban SaveDouble"
      }[banKey] || banKey;
      label.appendChild(document.createTextNode(text));
      wrapper.appendChild(label);
    });

    fieldsContainer.appendChild(wrapper);
  }

  modal.style.display = "flex";

  document.getElementById("closeModal2").onclick = () => modal.style.display = "none";
  document.getElementById("cancelChangesBtn").onclick = () => modal.style.display = "none";
}

document.getElementById("saveChangesBtn").addEventListener("click", () => {
  const idx = editIndex;
  if (idx == null) return;

  const newX = parseFloat(document.getElementById("editCoordX").value)  || 0;
  const newY = parseFloat(document.getElementById("editCoordY").value)  || 0;
  const newZ = parseFloat(document.getElementById("editCoordZ").value)  || 0;
  currentDataModel.checkpoints[idx] = { x: newX, y: newY, z: newZ };

  const killRows = Array.from(document.querySelectorAll("#editFieldsContainer .orb-row")).filter(r => r.querySelector(".kill-x"));
  currentDataModel.killMap[idx] = killRows.map(row => {
    const x = parseFloat(row.querySelector(".kill-x").value) || 0;
    const y = parseFloat(row.querySelector(".kill-y").value) || 0;
    const z = parseFloat(row.querySelector(".kill-z").value) || 0;
    const r = parseFloat(row.querySelector(".kill-r").value) || 0;
    return { pos: { x, y, z }, radius: r };
  });

  const pinRows = Array.from(document.querySelectorAll("#editFieldsContainer .orb-row")).filter(r => r.querySelector(".pin-x"));
  currentDataModel.pinMap[idx] = pinRows.map(row => {
    const x = parseFloat(row.querySelector(".pin-x").value) || 0;
    const y = parseFloat(row.querySelector(".pin-y").value) || 0;
    const z = parseFloat(row.querySelector(".pin-z").value) || 0;
    const f = parseFloat(row.querySelector(".pin-f").value) || 0;
    const locked = row.querySelector(".pin-locked").checked;
    const givesUlt5 = row.querySelector(".pin-ult5").checked;
    const givesUlt6 = row.querySelector(".pin-ult6").checked;
    return { pos: { x, y, z }, force: f, locked, givesUlt5, givesUlt6 };
  });

  const ultChk  = document.getElementById("editAbilityUlt").checked;
  const dashChk = document.getElementById("editAbilityDash").checked;
  currentDataModel.abilityMap[idx] = { ultimate: ultChk, dash: dashChk };

  Object.keys(currentDataModel.banMap).forEach(banKey => {
    const cb = document.querySelector(".edit-ban-" + banKey);
    if (!cb) return;
    const arr = currentDataModel.banMap[banKey];
    const isChecked = cb.checked;
    const already = arr.includes(idx);
    if (isChecked && !already) {
      arr.push(idx);
    } else if (!isChecked && already) {
      currentDataModel.banMap[banKey] = arr.filter(n => n !== idx);
    }
  });

  document.getElementById("editModal").style.display = "none";
  renderMapSettingsWithModel(currentDataModel);
});

function renderMapSettingsWithModel(dataModel) {
  const container   = document.getElementById("mapSettings");
  const editModeBtn = document.getElementById("editModeBtn");
  const globalInfos = container.querySelector(".global-infos");

  if (editModeBtn && editModeBtn.parentNode === container) {
    container.removeChild(editModeBtn);
  }

  container.innerHTML = "";

  if (editModeBtn) {
    container.appendChild(editModeBtn);
  }

  globalInfos.innerHTML = "";
  globalInfos.classList.remove("no-bans");

  if (!editModeBtn.dataset.listenerInstalled) {
    editModeBtn.dataset.listenerInstalled = "true";
    editModeBtn.addEventListener("click", () => {
      isEditMode = !isEditMode;
      editModeBtn.textContent = isEditMode ? "Exit edit" : "Edit mode";
      container.querySelectorAll(".checkpoint-card").forEach(card => {
        if (isEditMode) card.classList.add("editable");
        else            card.classList.remove("editable");
      });
    });
  }
  editModeBtn.textContent = isEditMode ? "Exit edit" : "Edit mode";
  globalInfos.appendChild(editModeBtn);

  const bansIconsEl = renderGlobalBans(lastFullText);
  if (bansIconsEl) {
    globalInfos.appendChild(bansIconsEl);
    globalInfos.classList.remove("no-bans");
  } else {
    globalInfos.classList.add("no-bans");
  }

  container.appendChild(globalInfos);

  if (dataModel.checkpoints.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "Aucun checkpoint (Global.A) trouvé dans le texte.";
    msg.classList.add("empty-message");
    container.appendChild(msg);
    return;
  }

  dataModel.checkpoints.forEach((coords, idx) => {
    const card = createCheckpointCard(idx, coords, dataModel);
    container.appendChild(card);
  });

  updateCardNumbers();

  if (isEditMode) {
    container.querySelectorAll(".checkpoint-card").forEach(card => {
      card.classList.add("editable");
    });
  }
}

/* ------- Modal Global Settings ------- */
function buildGlobalSettingsFormFields() {
  const form = document.getElementById("globalSettingsForm");
  if (!form) return;
  form.innerHTML = "";

  const rowMapName = document.createElement("div");
  rowMapName.classList.add("modal-row");
  rowMapName.innerHTML = `
    <label for="mapNameInput" class="modal-label">Map name :</label>
    <input type="text" id="mapNameInput" class="modal-input" readonly />
  `;
  form.appendChild(rowMapName);

  const rowGlobalBans = document.createElement("div");
  rowGlobalBans.classList.add("modal-row");
  rowGlobalBans.innerHTML = `
    <label class="modal-label">Global bans :</label>
    <div id="globalBansContainer" class="bans-container"></div>
  `;
  form.appendChild(rowGlobalBans);

  const rowEditorMode = document.createElement("div");
  rowEditorMode.classList.add("modal-row");
  rowEditorMode.innerHTML = `
    <label for="editorModeToggle" class="modal-label">Editor mode :</label>
    <select id="editorModeToggle" class="modal-select">
      <option value="off">Off</option>
      <option value="on">On</option>
    </select>
  `;
  form.appendChild(rowEditorMode);

  const rowDifficultyHUD = document.createElement("div");
  rowDifficultyHUD.classList.add("modal-row");
  rowDifficultyHUD.innerHTML = `
    <label for="difficultyHUDSelect" class="modal-label">Difficulty display HUD :</label>
    <select id="difficultyHUDSelect" class="modal-select">
      <option value="playtest">Playtest</option>
      <option value="easy-">Easy −</option>
      <option value="easy">Easy</option>
      <option value="easy+">Easy +</option>
      <option value="medium-">Medium −</option>
      <option value="medium">Medium</option>
      <option value="medium+">Medium +</option>
      <option value="hard-">Hard −</option>
      <option value="hard">Hard</option>
      <option value="hard+">Hard +</option>
      <option value="veryhard-">Very hard −</option>
      <option value="veryhard">Very hard</option>
      <option value="veryhard+">Very hard +</option>
      <option value="extreme-">Extreme −</option>
      <option value="extreme">Extreme</option>
      <option value="extreme+">Extreme +</option>
      <option value="hell">Hell</option>
      <option value="off">Don't display</option>
    </select>
  `;
  form.appendChild(rowDifficultyHUD);

  const rowPlaytest = document.createElement("div");
  rowPlaytest.classList.add("modal-row");
  rowPlaytest.innerHTML = `
    <label for="playtestToggle" class="modal-label">Playtest display :</label>
    <select id="playtestToggle" class="modal-select">
      <option value="off">Off</option>
      <option value="on">On</option>
    </select>
  `;
  form.appendChild(rowPlaytest);

  const rowValidator = document.createElement("div");
  rowValidator.classList.add("modal-row");
  rowValidator.innerHTML = `
    <label for="validatorToggle" class="modal-label">Basic map validator :</label>
    <select id="validatorToggle" class="modal-select">
      <option value="off">Off</option>
      <option value="on">On</option>
    </select>
  `;
  form.appendChild(rowValidator);

  const rowPortals = document.createElement("div");
  rowPortals.classList.add("modal-row");
  rowPortals.innerHTML = `
    <label for="portalsToggle" class="modal-label">Enable portals :</label>
    <select id="portalsToggle" class="modal-select">
      <option value="off">Off</option>
      <option value="on">On</option>
    </select>
  `;
  form.appendChild(rowPortals);

  const rowButtons = document.createElement("div");
  rowButtons.classList.add("modal-buttons2");
  rowButtons.innerHTML = `
    <button type="button" id="saveGlobalChangesBtn" class="btn btn-save">Save</button>
    <button type="button" id="cancelGlobalChangesBtn" class="btn btn-cancel">Cancel</button>
  `;
  form.appendChild(rowButtons);
}

function addGlobalSettingsButton() {
  const container = document.getElementById("mapSettings");
  const globalInfos = container.querySelector(".global-infos .settings-buttons");
  if (!globalInfos) return;

  if (document.getElementById("globalSettingsBtn")) return;

  const btn = document.createElement("button");
  btn.id = "globalSettingsBtn";
  btn.textContent = "Global settings";
  btn.classList.add("global-edit-mode-btn");
  btn.style.marginLeft = "8px";
  btn.addEventListener("click", openGlobalSettingsModal);

  globalInfos.appendChild(btn);
}

function openGlobalSettingsModal() {
  const modal = document.getElementById("globalSettingsModal");
  if (!modal) return;

  buildGlobalSettingsFormFields();

  const mapNameInput = document.getElementById("mapNameInput");
  const modeMapNames = extractModeMapNames(lastFullText || "");
  const names = Object.values(modeMapNames);
  mapNameInput.value = names.length
    ? names.join(" | ")
    : "(aucun nom de map détecté)";

  const validatorOn = parseBasicMapValidator(lastFullText || "");
  const activeBansRaw = parseGlobalWorkshopBans(lastFullText || "");
  const activeBansNorm = activeBansRaw.map(b => b.trim().toLowerCase());

  const globalBansContainer = document.getElementById("globalBansContainer");
  globalBansContainer.innerHTML = "";

  globalBansContainer.style.display = "grid";
  globalBansContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(220px, 1fr))";
  globalBansContainer.style.gap = "8px";

  GLOBAL_BANS.forEach(fullBanName => {
    const bareBanName = fullBanName.replace(/^\s*BAN\s+/i, "").trim();

    const label = document.createElement("label");
    label.classList.add("ban-label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.padding = "6px 10px";
    label.style.background = "#40444b";
    label.style.border = "1px solid #cccccc";
    label.style.borderRadius = "4px";
    label.style.cursor = "pointer";
    label.style.userSelect = "none";
    label.style.boxShadow = "0 1px 2px rgba(0,0,0,0.1)";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("global-ban-checkbox");
    checkbox.style.marginRight = "6px";

    if (activeBansNorm.includes(bareBanName.toLowerCase())) {
      checkbox.checked = true;
    }

    const spanText = document.createElement("span");
    spanText.textContent = fullBanName;
    spanText.style.fontSize = "0.9em";
    spanText.style.color = "#ffffff";

    label.appendChild(checkbox);
    label.appendChild(spanText);
    globalBansContainer.appendChild(label);
  });

  const lang = document.getElementById("lang").value || "en-US";
  const parsedIndex = parseDifficultyIndex(lastFullText || "", lang);
  fillDifficultyFields(parsedIndex);

  document.getElementById("editorModeToggle").value = lastParsedWorkshopSettings.editorMode ? "on" : "off";
  document.getElementById("validatorToggle").value = validatorOn ? "on" : "off";
  document.getElementById("portalsToggle").value = lastParsedWorkshopSettings.portals ? "on" : "off";

  document.getElementById("saveGlobalChangesBtn")
          .addEventListener("click", saveGlobalSettings);
  document.getElementById("cancelGlobalChangesBtn")
          .addEventListener("click", closeGlobalSettingsModal);
  const closeSpan = document.querySelector("#globalSettingsModal .modal-close2");
  if (closeSpan) {
    closeSpan.addEventListener("click", closeGlobalSettingsModal);
  }

  window.addEventListener("click", onWindowClickForGlobalModal);

  modal.style.display = "flex";
}

function onWindowClickForGlobalModal(e) {
  const modal = document.getElementById("globalSettingsModal");
  if (e.target === modal) {
    closeGlobalSettingsModal();
  }
}

function closeGlobalSettingsModal() {
  const modal = document.getElementById("globalSettingsModal");
  if (modal) {
    modal.style.display = "none";
    window.removeEventListener("click", onWindowClickForGlobalModal);
  }
}

function saveGlobalSettings() {
  const checkboxes = document.querySelectorAll(".global-ban-checkbox");
  const newActiveBans = [];
  checkboxes.forEach(cb => {
    if (cb.checked) {
      const banName = cb.parentElement.textContent.trim();
      newActiveBans.push(banName);
    }
  });

  globalSettings.editorMode   = (document.getElementById("editorModeToggle").value === "on");
  globalSettings.difficultyHUD = document.getElementById("difficultyHUDSelect").value;
  globalSettings.playtest      = document.getElementById("playtestToggle").value;
  globalSettings.validator     = document.getElementById("validatorToggle").value;
  globalSettings.portals       = document.getElementById("portalsToggle").value;

  isEditMode = globalSettings.editorMode;
  const editModeBtn = document.getElementById("editModeBtn");
  if (editModeBtn) {
    editModeBtn.textContent = isEditMode ? "Exit edit" : "Edit mode";
    document
      .getElementById("mapSettings")
      .querySelectorAll(".checkpoint-card")
      .forEach(card => {
        if (isEditMode) card.classList.add("editable");
        else            card.classList.remove("editable");
      });
  }

  closeGlobalSettingsModal();
}

document.addEventListener("DOMContentLoaded", () => {
  const btnConvert   = document.getElementById("convert-btn");
  const btnTranslate = document.getElementById("translate-btn");

  if (btnConvert) {
    btnConvert.addEventListener("click", () => {
      setTimeout(addGlobalSettingsButton, 100);
    });
  }
  if (btnTranslate) {
    btnTranslate.addEventListener("click", () => {
      setTimeout(addGlobalSettingsButton, 100);
    });
  }
});