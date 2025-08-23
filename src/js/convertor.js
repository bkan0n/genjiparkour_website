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
let translations = {};
let draggedCard = null;
let draggedIndex = null;
window.selectSection = selectSection;
const Diff = window.Diff;
const container = document.getElementById("mapSettings");

let lastParsedWorkshopSettings = {
  editorMode: false,
  portals: false,
  playtest: false
};

const globalSettings = {
  editorMode: false,
  difficultyHUD: "off",
  playtest: "off",
  validator: "on",
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

const KW_GLOBAL = '(?:Global|全局|グローバル)';
const KW_ARRAY  = '(?:Array|数组|配列)';
const KW_COMBO  = '(?:Workshop\\s*Setting\\s*Combo|地图工坊设置组合|ワークショップ設定コンボ)';

const GLOBAL_BANS = [
  "Ban Multiclimb ■ 封禁蹭留 ■ 무한 벽타기 금지",
  "Ban Deathbhop ■ 封禁死小 ■ 죽음 콩콩이 금지",
  "Ban Standcreate ■ 封禁站卡 ■ 서서 콩콩이 생성 금지",
  "Ban Deathbhop ■ 封禁死小 ■ 죽음 콩콩이 금지",
  "Ban Emote Savehop ■ 封禁表情留小 ■ 감정표현 콩콩이 금지",
  "Ban Wallclimb ■ 封禁爬墙 ■ 벽타기 금지",
  "Ban Save Double ■ 封禁留二段跳 ■ 이단점프 킵 금지",
  "Require Bhop Available ■ 留小跳进点 ■ 도착 시 콩콩이 필요",
  "Require Djump Available ■ 留二段跳进点 ■ 도착 시 이단 점프 필요",
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

const HERO_FILE_MAP = {
  GENJI:  "mechanics/Genji.opy",
  HANZO:  "mechanics/Hanzo.opy",
  KIRIKO: "mechanics/Kiriko.opy",
  HAZARD: "mechanics/Hazard.opy"
};

/*----- Multilang ------*/
async function loadTranslations() {
    try {
        const response = await fetch("translations/translations.json");
        const data = await response.json();
        
        const currentLangData = data[currentLang] || {};
        
        const { newsfeed = {}, convertor = {} } = currentLangData;
        
        translations = { newsfeed, convertor };

        //console.log("Traductions chargées :", translations);
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

function t(path, params = {}) {
    const parts = path.split('.');
    let result = translations;
    for (const part of parts) {
        result = result?.[part];
        if (!result) break;
    }
    if (!result) {
        return path;
    }
    for (const key in params) {
        result = result.replace(`{${key}}`, params[key]);
        if (!result) {
            console.error(`Clé de traduction introuvable: ${path}`);
            return path;
        }
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
  document.querySelectorAll('#mainTabs button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.convert-map-layout').forEach(sec => {
    if (sec) { sec.style.display = 'none'; sec.classList.remove('active'); }
  });
  document.querySelectorAll('.content').forEach(c => { if (c) c.style.display = 'none'; });

  const section = document.getElementById(id);
  const button  = document.getElementById(id + 'Btn');

  if (!section || !button) {
    console.warn('[selectSection] section/button introuvable:', { id, section, button });
    return;
  }
  section.style.display = 'block';
  section.classList.add('active');
  button.classList.add('active');
}

window.selectSection = (id) => {
  try { return selectSection(id); }
  catch (e) { console.error('[selectSection] failed:', e); }
};

document.addEventListener('DOMContentLoaded', () => {
  const bind = (btnId, sectionId) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.addEventListener('click', () => selectSection(sectionId));
  };
  bind('convertMapBtn', 'convertMap');
  bind('helpBtn', 'help');
  bind('mapSettingsBtn', 'mapSettings');

  const defaultSection = document.getElementById('convertMap') ? 'convertMap' : null;
  if (defaultSection) selectSection(defaultSection);
});

/* -------------- Boutons Convert & Copy -------------- */
document.addEventListener("DOMContentLoaded", async () => {
  selectSection("convertMap");
  await loadTranslations();

  const btnConvert    = document.getElementById("convert-btn");
  const btnTranslate  = document.getElementById("translate-btn");
  const btnCopy       = document.querySelector(".copy-btn");
  const textarea      = document.querySelector(".mapdata");
  const langEl        = document.getElementById("lang");
  const targetEl      = document.getElementById("targetLang");

  btnConvert.addEventListener("click", async () => {
    isEditMode = false;
    const editModeBtn = document.getElementById("editModeBtn");
    if (editModeBtn) editModeBtn.textContent = t("convertor.edit_mode");
    document.querySelectorAll(".checkpoint-card").forEach(card =>
      card.classList.remove("editable")
    );

    showLoader();
    btnConvert.disabled    = true;
    btnConvert.textContent = "Processing…";
    try {
      const lang     = langEl.value || "en-US";
      const fullText = textarea.value;

      const resultTpl = await doConvert(fullText, lang);

      textarea.value = resultTpl;
      renderMapSettings(fullText);
    } catch (err) {
      console.error(err);
      showErrorMessage("Error: " + err.message);
    } finally {
      hideLoader();
      btnConvert.disabled    = false;
      btnConvert.textContent = t("convertor.convert_data");
      await checkForDiff();
    }
  });

  btnTranslate.addEventListener("click", async () => {
    isEditMode = false;
    const editModeBtn = document.getElementById("editModeBtn");
    if (editModeBtn) editModeBtn.textContent = t("convertor.edit_mode");
    document.querySelectorAll(".checkpoint-card").forEach(card =>
      card.classList.remove("editable")
    );

    const clientLang = langEl.value || "en-US";
    const targetLang = targetEl.value || "en-US";
    const fullText   = textarea.value;

    const tpl = await doTranslate(fullText, clientLang, targetLang);

    textarea.value = tpl;
    renderMapSettings(fullText);
    await checkForDiff();
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

/* ------- Cache, overpy  ------- */
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

async function inlineIncludes(src, baseHref) {
  const re = /^[ \t]*#!include\s+"([^"]+)"[ \t]*;?[^\n]*$/gm;

  let out = "", last = 0, m;
  while ((m = re.exec(src))) {
    out += src.slice(last, m.index);

    const relPath = m[1].trim();
    const fileUrl  = new URL(relPath, baseHref);
    const childDir = fileUrl.href.replace(/[^/]+$/, "");

    debug(`Including ${relPath} → ${fileUrl.href}`);
    const r = await fetch(fileUrl.href);
    if (!r.ok) throw new Error(`HTTP ${r.status} fetching ${relPath}`);

    const txt = await r.text();
    const expanded = await inlineIncludes(txt, childDir);

    out += expanded;
    last = re.lastIndex;
  }

  return out + src.slice(last);
}


function normalizeNewlines(s) {
  return s.replace(/\r\n?/g, '\n');
}

function cleanSourceG(src) {
  src = normalizeNewlines(src);

  return src
    .replace(/^[ \t]*#!define\s+editortoggle[^\n]*\n?/gm, '')
    .replace(/^[ \t]*editortoggle\([^\n]*\)\s*\n?/gm, '')
    .replace(/^[ \t]*__script__\([^)]+\)[ \t]*;?[ \t]*\n/gm, '')
    .replace(/\beditoron\b/g, 'false');
}

function addMapPolyfills(src) {
  const polyfills = [
    '#!define skirmishMap []',
    '#!define tdmMap []',
    '#!define controlMap []',
    '#!define escortMap []',
    '#!define hybridMap []',
    '#!define pushMap []',
    '#!define flashpointMap []',
  ].join('\n') + '\n';
  return polyfills + src.replace(/\r\n?/g, '\n');
}

function findFirstBraceUnderflow(src) {
  const lines = normalizeNewlines(src).split('\n');
  let paren = 0, brace = 0;
  const strip = s =>
    s.replace(/\/\/.*$/,'')
     .replace(/\/\*[\s\S]*?\*\//g, '')
     .replace(/"([^"\\]|\\.)*"/g, '""')
     .replace(/'([^'\\]|\\.)*'/g, "''");
  for (let i = 0; i < lines.length; i++) {
    const s = strip(lines[i]);
    for (const ch of s) {
      if (ch === '(') paren++;
      else if (ch === ')') paren--;
      else if (ch === '{') brace++;
      else if (ch === '}') brace--;
      if (paren < 0 || brace < 0) return { line: i + 1, raw: lines[i] };
    }
  }
  return null;
}

function patchTestDataStub(src) {
  const hasDefine = /^[ \t]*#!define\s+testData\b/m.test(src);
  if (hasDefine) return src;

  return src.replace(
    /^[ \t]*testData[ \t]*$/m,
    'rule "TestData (stub)":\n    return'
  );
}

function patchEditorDefaultOn(src) {
  const hasDefine = /^[ \t]*#!define\s+editorDefaultOn\b/m.test(src);
  if (hasDefine) return src;

  const usesCallSyntax = /\beditorDefaultOn\s*\(/.test(src);
  const def = usesCallSyntax
    ? '#!define editorDefaultOn() false\n'
    : '#!define editorDefaultOn false\n';

  return def + src;
}

function expandImportHeroToInclude(src) {
  src = normalizeNewlines(src);

  src = src.replace(
    /^[ \t]*#!define\s+importHero\s*\(\s*Hero\s*\)\s*__script__\([^)]+\)[^\n]*\n?/mi,
    ""
  );

  src = src.replace(
    /^[ \t]*importHero\s*\(([\s\S]*?)\)\s*$/gmi,
    (full, arg) => {
      const m = /"(GENJI|HANZO|KIRIKO|HAZARD)"/i.exec(arg);
      if (!m) {
        debug(`[compile] importHero: héros introuvable dans: ${arg}`);
        return "";
      }
      const heroKey = m[1].toUpperCase();
      const file    = HERO_FILE_MAP[heroKey];
      if (!file) {
        debug(`[compile] importHero: mapping manquant pour ${heroKey}`);
        return "";
      }
      debug(`[compile] importHero → #!include "${file}"`);
      return `#!include "${file}"`;
    }
  );

  return src;
}

async function loadTemplate(lang) {
  const cacheUrl = new URL(`framework-templates/framework-template_${lang}.js`, import.meta.url).href;

  async function cacheExists(url) {
    try {
      const res = await fetch(url, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  }

  if (await cacheExists(cacheUrl)) {
    debug(`Loading from cache for ${lang}`);
    const mod = await import(cacheUrl);
    return mod.frameworkTemplate;
  }

  debug(`Compiling new template for ${lang}`);
  const overpy = (window.window || window.OverPy || window.Overpy);
  if (!overpy) throw new Error('OverPy UMD not found');
  await overpy.readyPromise;

  const rawBase   = 'https://cdn.jsdelivr.net/gh/tylovejoy/genji-framework@1.10.4A/';
  const entryFile = 'framework.opy';
  const resp      = await fetch(rawBase + entryFile);
  if (!resp.ok) throw new Error(`HTTP ${resp.status} on ${entryFile}`);
  let src = await resp.text();

  src = expandImportHeroToInclude(src);
  src = await inlineIncludes(src, rawBase);
  src = cleanSourceG(src);
  src = patchTestDataStub(src);
  src = addMapPolyfills(src);
  src = patchEditorDefaultOn(src);

  if (lang === 'zh-CN') {
    src = src.replace(/^[ \t]*#!define\s+enableInvisCommand[^\n]*\n?/gm, '');
    src = '#!define enableInvisCommand false\n' + src;
    debug('Désactivation de enableInvisCommand pour zh-CN');
  }

  const underflow = findFirstBraceUnderflow(src);
  if (underflow) {
    const lines = src.split('\n');
    const center = underflow.line;
    const from = Math.max(0, center - 15);
    const to   = Math.min(lines.length, center + 15);
    console.debug(
      '[FIRST UNDERFLOW at line ' + center + ']\n' +
      lines.slice(from, to)
           .map((l,i)=>String(from+i+1).padStart(3,' ')+' '+l)
           .join('\n')
    );
  }
  console.debug(
    '[SRC HEAD]\n' +
    src.split('\n').slice(0, 60).map((l,i)=>String(i+1).padStart(3,' ')+ ' ' + l).join('\n')
  );

  const { result } = await overpy.compile(src, lang, rawBase, entryFile);
  const tpl = result;

  const esc = tpl.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
  const moduleText =
    `// framework-template_${lang}.js (auto)\n` +
    `export const frameworkTemplate = \`${esc}\n\`;\n`;

  await fetch(new URL(`compile.php?file=framework-templates/framework-template_${lang}.js`, import.meta.url).href, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ module: moduleText })
  });

  debug(`Cache saved as framework-template_${lang}.js`);
  return tpl;
}

/* ------- Construct map data rule ------- */
function buildRule(mapdata, lang) {
  const lines = mapdata.trim().split("\n");
  const indented = lines.map(l => "    " + l).join("\n");

  const NEW_TITLE = 'Ø Map Data - 数据录入 <---- INSERT HERE / 在这输入';

  let ruleText;
  if (lang === "zh-CN") {
    ruleText = `规则("${NEW_TITLE}") {
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
    ruleText = `rule("${NEW_TITLE}") {
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
    ruleText = `ルール("${NEW_TITLE}") {
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
    ruleText = `rule ("${NEW_TITLE}") {
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
    ruleText = `regla ("${NEW_TITLE}") {
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
    ruleText = `regra ("${NEW_TITLE}") {
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
    ruleText = `regel ("${NEW_TITLE}") {
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
    ruleText = `rule ("${NEW_TITLE}") {
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
  const markers = [
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE',
    'Ø Map Data - 数据录入 <---- INSERT HERE / 在这输入'
  ];

  let startRule;
  if (lang === "zh-CN")      startRule = "规则";
  else if (lang === "ja-JP") startRule = "ルール";
  else if (lang === "es-MX") startRule = "regla";
  else if (lang === "pt-BR") startRule = "regra";
  else if (lang === "de-DE") startRule = "regel";
  else                       startRule = "rule";

  let markerIdx = -1, usedMarker = null;
  for (const m of markers) {
    const idx = tpl.indexOf(m);
    if (idx >= 0) { markerIdx = idx; usedMarker = m; break; }
  }
  if (markerIdx < 0) {
    console.warn(`replaceMapData : marqueur non trouvé, on conserve le texte original.`);
    return tpl;
  }

  const start = tpl.lastIndexOf(startRule, markerIdx);
  if (start < 0) {
    console.warn(`replaceMapData : début de règle ("${startRule}") introuvable, on conserve le texte original.`);
    return tpl;
  }

  let brace = 0, end = -1;
  for (let i = start; i < tpl.length; i++) {
    if (tpl[i] === "{") brace++;
    else if (tpl[i] === "}") {
      brace--;
      if (brace === 0) { end = i + 1; break; }
    }
  }
  if (end < 0) {
    console.warn(`replaceMapData : fin de règle introuvable, on conserve le texte original.`);
    return tpl;
  }

  return tpl.slice(0, start) + newRule + tpl.slice(end);
}

/* ------- Extract map data ------- */
function extractMapDataBlock(fullText, lang) {
  const markers = [
    'Ø Map Data - 数据录入 <---- INSERT HERE / 在这输入',
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这输入',
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE / 在这入力',
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - 数据录入 <---- INSERT HERE',
    '<tx0C0000000000D297><fg00FFFFFF> Map Data - Data Entry <---- INSERT HERE',
    'Map Data <---- INSERT YOUR MAP DATA HERE',
    'Map Data     <---- INSERT YOUR MAP DATA HERE"',
    'Map Data - 数据录入 <---- INSERT HERE / 在这输入'
  ];

  let headerIdx = -1;
  for (const m of markers) {
    const idx = fullText.indexOf(m);
    if (idx >= 0) { headerIdx = idx; break; }
  }
  if (headerIdx < 0) {
    showErrorMessage("No map data rule found");
    return "";
  }

  const afterHeader = fullText.slice(headerIdx);

  let actionsRegex;
  if (lang === "zh-CN")       actionsRegex = /动作\s*\{\s*([\s\S]*?)\s*\}/i;
  else if (lang === "ko-KR")  actionsRegex = /action\s*\{\s*([\s\S]*?)\s*\}/i;
  else if (lang === "ja-JP")  actionsRegex = /アクション\s*\{\s*([\s\S]*?)\s*\}/i;
  else if (lang === "ru-RU")  actionsRegex = /actions\s*\{\s*([\s\S]*?)\s*\}/i;
  else if (lang === "es-MX")  actionsRegex = /acciones\s*\{\s*([\s\S]*?)\s*\}/i;
  else if (lang === "pt-BR")  actionsRegex = /ações\s*\{\s*([\s\S]*?)\s*\}/i;
  else if (lang === "de-DE")  actionsRegex = /aktionen\s*\{\s*([\s\S]*?)\s*\}/i;
  else                        actionsRegex = /actions\s*\{\s*([\s\S]*?)\s*\}/i;

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

function sanitizeMapDataAssignments(text) {
  if (!text) return text;

  const reSetGlobalVar = new RegExp(
    String.raw`^[ \t]*Set\s+Global\s+Variable\s*\(\s*(?:DashExploitToggle|HudStoreEdit)\s*,[\s\S]*?\)\s*;?[ \t]*\r?\n?`,
    "gmi"
  );
  text = text.replace(reSetGlobalVar, "");

  const reDotAssign = new RegExp(
    String.raw`^[ \t]*(?:Global|全局|グローバル)\.(?:DashExploitToggle|HudStoreEdit)\s*=\s*[^\r\n;]+;?[ \t]*\r?\n?`,
    "gmi"
  );
  text = text.replace(reDotAssign, "");

  return text;
}

/* ------- Extract & insert difficulty ------- */
function logDiff(...args) {
  //try { console.log("[DIFF]", ...args); } catch (_) {}
}

function sliceAround(str, pos, radius = 120) {
  const start = Math.max(0, pos - radius);
  const end = Math.min(str.length, pos + radius);
  return str.slice(start, end);
}

function normalizeSpaces(s) {
  return String(s)
    .replace(/\uFEFF/g, "")
    .replace(/[\u200B\u200C\u200D]/g, "")
    .replace(/[\u00A0\u2007\u202F\u2000-\u200A]/g, " ");
}
function normalizeBrackets(s) {
  return String(s)
    .replace(/[\uFF3B\u3010\u3016\u3014\u27E6\u2983\u2985\u301A]/g, "[")
    .replace(/[\uFF3D\u3011\u3017\u3015\u27E7\u2984\u2986\u301B]/g, "]");
}
function normalizeDigits(s) {
  return String(s).replace(/[\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]/g, ch => {
    const cp = ch.codePointAt(0);
    if (cp >= 0xFF10 && cp <= 0xFF19) return String(cp - 0xFF10);
    if (cp >= 0x0660 && cp <= 0x0669) return String(cp - 0x0660);
    if (cp >= 0x06F0 && cp <= 0x06F9) return String(cp - 0x06F0);
    return ch;
  });
}
function normalizeLine(s) {
  return normalizeDigits(normalizeBrackets(normalizeSpaces(s)));
}

/* ----------------- Utilitaires de parsing ----------------- */
function findMatchingParen(text, openIdx) {
  let depth = 1, inQ = false;
  for (let i = openIdx + 1; i < text.length; i++) {
    const ch = text[i], prev = text[i - 1];
    if (ch === '"' && prev !== "\\") { inQ = !inQ; continue; }
    if (inQ) continue;
    if (ch === "(") depth++;
    else if (ch === ")") { depth--; if (depth === 0) return i; }
  }
  return -1;
}
function findMatchingBrace(text, openIdx) {
  let depth = 1, inQ = false;
  for (let i = openIdx + 1; i < text.length; i++) {
    const ch = text[i], prev = text[i - 1];
    if (ch === '"' && prev !== "\\") { inQ = !inQ; continue; }
    if (inQ) continue;
    if (ch === "{") depth++;
    else if (ch === "}") { depth--; if (depth === 0) return i; }
  }
  return -1;
}
function splitTopLevelArgs(argListStr) {
  const args = [];
  let cur = "", p = 0, b = 0, q = false;
  for (let k = 0; k < argListStr.length; k++) {
    const ch = argListStr[k], prev = argListStr[k - 1];
    if (ch === '"' && prev !== "\\") q = !q;
    if (!q) {
      if (ch === "(") p++;
      else if (ch === ")") p--;
      else if (ch === "[") b++;
      else if (ch === "]") b--;
      if (ch === "," && p === 0 && b === 0) { args.push(cur.trim()); cur = ""; continue; }
    }
    cur += ch;
  }
  if (cur.trim()) args.push(cur.trim());
  return args;
}

function isHudLine(lineNorm) {
  const en = /difficulty\s*display\s*hud/i.test(lineNorm);
  const zh = /难度/.test(lineNorm) && /顶部/.test(lineNorm) && /hud/i.test(lineNorm);
  return en || zh;
}

function extractIndexFromHudLine(rawLine) {
  if (!rawLine) return null;

  const lineNorm = normalizeLine(rawLine);
  if (!isHudLine(lineNorm)) return null;

  let m;
  const reBr = /\[\s*([0-9]+)\s*\]/g;
  let last = null;
  while ((m = reBr.exec(lineNorm))) last = m[1];
  if (last !== null) {
    const v = parseInt(last, 10);
    if (Number.isFinite(v)) return v;
  }

  m = /:\s*([0-9]+)\b/.exec(lineNorm);
  if (m) {
    const v = parseInt(m[1], 10);
    if (Number.isFinite(v)) return v;
  }

  try {
    const cps = Array.from(rawLine).map(c => c.codePointAt(0).toString(16));
    logDiff("extractIndexFromHudLine: candidate non parsée (raw) =", rawLine);
    logDiff("extractIndexFromHudLine: codepoints =", cps.join(" "));
    logDiff("extractIndexFromHudLine: normalisé =", lineNorm);
  } catch (_e) {}
  return null;
}

function extractWorkshopHudIndex(fullText) {
  const mKey = /(?:\bworkshop\b|地图工坊|ワークショップ)/i.exec(fullText);
  if (!mKey) { logDiff("workshop: mot-clé introuvable"); return null; }

  const afterKeyPos = mKey.index + mKey[0].length;
  const openBrace = fullText.indexOf("{", afterKeyPos);
  if (openBrace < 0) { logDiff("workshop: '{' introuvable après mot-clé"); return null; }

  const closeBrace = findMatchingBrace(fullText, openBrace);
  if (closeBrace < 0) { logDiff("workshop: '}' appariée introuvable"); return null; }

  const body = fullText.slice(openBrace + 1, closeBrace);
  const lines = body.split(/\r?\n/);

  for (const rawLine of lines) {
    const v = extractIndexFromHudLine(rawLine);
    if (v !== null) {
      logDiff("extractWorkshopHudIndex: ligne HUD capturée (raw) =", rawLine);
      logDiff("extractWorkshopHudIndex: valeur =", v);
      return v;
    }
  }

  logDiff("extractWorkshopHudIndex: pas de ligne HUD trouvée dans workshop. Extrait:\n" + body);
  return null;
}

function extractWorkshopHudIndexLoose(fullText) {
  const lines = fullText.split(/\r?\n/);
  for (const rawLine of lines) {
    const v = extractIndexFromHudLine(rawLine);
    if (v !== null) {
      logDiff("extractWorkshopHudIndexLoose: ligne HUD capturée (raw) =", rawLine);
      logDiff("extractWorkshopHudIndexLoose: valeur =", v);
      return v;
    }
  }
  logDiff("extractWorkshopHudIndexLoose: aucune ligne HUD trouvée dans tout le texte");
  return null;
}

function extractIndexFromGlobalArray(fullText) {
  const re = new RegExp(
    `${KW_GLOBAL}\\.Difficultyhud\\s*=\\s*${KW_ARRAY}\\s*\\(\\s*${KW_COMBO}\\s*\\(`,
    "i"
  );
  const m = re.exec(fullText);
  if (!m) { logDiff("extractIndexFromGlobalArray: non trouvé"); return null; }

  const comboOpen = m.index + m[0].lastIndexOf("(");
  const comboClose = findMatchingParen(fullText, comboOpen);
  if (comboClose < 0) { logDiff("extractIndexFromGlobalArray: parenthèses non appariées"); return null; }

  const inside = fullText.slice(comboOpen + 1, comboClose);
  const args = splitTopLevelArgs(inside);

  const raw = String(args[2] || "").trim();
  const idx = parseInt(raw, 10);
  if (Number.isFinite(idx)) {
    logDiff("extractIndexFromGlobalArray: trouvé =", idx);
    return idx;
  }
  logDiff("extractIndexFromGlobalArray: 3e arg non-numérique =", args[2]);
  return null;
}

function extractIndexFromSetGlobal(fullText) {
  const reSet = new RegExp(
    `(?:Set\\s+Global\\s+Variable|设置\\s*全局\\s*变量|グローバル変数を設定)\\s*\\(\\s*Difficultyhud\\s*,`,
    "i"
  );
  const mB = reSet.exec(fullText);
  if (!mB) { logDiff("extractIndexFromSetGlobal: non trouvé"); return null; }

  const openSet = fullText.indexOf("(", mB.index);
  if (openSet < 0) return null;
  const closeSet = findMatchingParen(fullText, openSet);
  if (closeSet < 0) return null;

  const setBody = fullText.slice(openSet + 1, closeSet);

  const reCombo = new RegExp(`${KW_COMBO}\\s*\\(`, "i");
  const relCombo = setBody.search(reCombo);
  if (relCombo < 0) { logDiff("extractIndexFromSetGlobal: pas de Combo(...) dans Set"); return null; }

  const openComboRel = setBody.indexOf("(", relCombo);
  if (openComboRel < 0) return null;

  let depth = 1, inQ = false, closeComboRel = -1;
  for (let i = openComboRel + 1; i < setBody.length; i++) {
    const ch = setBody[i], prev = setBody[i - 1];
    if (ch === '"' && prev !== "\\") { inQ = !inQ; continue; }
    if (inQ) continue;
    if (ch === "(") depth++;
    else if (ch === ")") { depth--; if (depth === 0) { closeComboRel = i; break; } }
  }
  if (closeComboRel < 0) return null;

  const comboBody = setBody.slice(openComboRel + 1, closeComboRel);
  const args = splitTopLevelArgs(comboBody);
  const idx = parseInt(String(args[2] || "").trim(), 10);
  if (Number.isFinite(idx)) {
    logDiff("extractIndexFromSetGlobal: trouvé =", idx);
    return idx;
  }
  logDiff("extractIndexFromSetGlobal: 3e arg non-numérique =", args[2]);
  return null;
}

function extractDifficultyValue(fullText) {
  let v = extractWorkshopHudIndex(fullText);
  if (v === null) v = extractWorkshopHudIndexLoose(fullText);
  if (v !== null) { logDiff("extractDifficultyValue: priorité workshop =", v); return v; }

  const g = extractIndexFromGlobalArray(fullText);
  if (g !== null) { logDiff("extractDifficultyValue: fallback global array =", g); return g; }

  const s = extractIndexFromSetGlobal(fullText);
  if (s !== null) { logDiff("extractDifficultyValue: fallback set global =", s); return s; }

  logDiff("extractDifficultyValue: aucune valeur trouvée");
  return null;
}

function applyDifficultyIndexToTemplate(tpl, wanted) {
  const newIndex = parseInt(String(wanted).trim(), 10);
  if (!Number.isFinite(newIndex)) { logDiff("applyDifficulty: wanted non-numérique =", wanted); return tpl; }

  const m = /Set\s*Global\s*Variable\s*\(\s*Difficultyhud\s*,/i.exec(tpl);
  if (!m) { logDiff("applyDifficulty: Set Global Variable(Difficultyhud, ...) introuvable"); return tpl; }

  const openSet = tpl.indexOf("(", m.index);
  if (openSet < 0) return tpl;
  const closeSet = findMatchingParen(tpl, openSet);
  if (closeSet < 0) return tpl;

  const beforeSet = tpl.slice(0, openSet + 1);
  const setBody   = tpl.slice(openSet + 1, closeSet);
  const afterSet  = tpl.slice(closeSet);

  const relCombo = setBody.search(/Workshop\s*Setting\s*Combo\s*\(/i);
  if (relCombo < 0) { logDiff("applyDifficulty: Combo(...) introuvable dans Set"); return tpl; }

  const openComboRel = setBody.indexOf("(", relCombo);
  if (openComboRel < 0) return tpl;

  let depth = 1, inQ = false, closeComboRel = -1;
  for (let i = openComboRel + 1; i < setBody.length; i++) {
    const ch = setBody[i], prev = setBody[i - 1];
    if (ch === '"' && prev !== "\\") { inQ = !inQ; continue; }
    if (inQ) continue;
    if (ch === "(") depth++;
    else if (ch === ")") { depth--; if (depth === 0) { closeComboRel = i; break; } }
  }
  if (closeComboRel < 0) { logDiff("applyDifficulty: fermeture Combo non trouvée"); return tpl; }

  const beforeCombo = setBody.slice(0, openComboRel + 1);
  const comboBody   = setBody.slice(openComboRel + 1, closeComboRel);
  const afterCombo  = setBody.slice(closeComboRel);

  const args = splitTopLevelArgs(comboBody);
  if (args.length < 4) {
    logDiff("applyDifficulty: args Combo insuffisants:", args.length, args);
    return tpl;
  }

  logDiff("applyDifficulty: 3e arg (avant) =", args[2]);
  args[2] = String(newIndex);
  logDiff("applyDifficulty: 3e arg (après) =", args[2]);

  const newComboBody = args.join(", ");
  const newSetBody   = beforeCombo + newComboBody + afterCombo;
  const out          = beforeSet + newSetBody + afterSet;

  try {
    const check = /Workshop\s*Setting\s*Combo\s*\(([^)]*)\)/i.exec(out);
    if (check) {
      const postArgs = splitTopLevelArgs(check[1]);
      logDiff("applyDifficulty: vérif post-écriture 3e arg =", postArgs[2]);
      const anchor = out.indexOf(check[0]);
      logDiff("applyDifficulty: contexte autour de Combo():\n" + sliceAround(out, anchor, 180));
    }
  } catch (e) {
    logDiff("applyDifficulty: vérif post-écriture erreur:", e && e.message);
  }

  return out;
}

function fillDifficultyFieldsFromValue(diffValue) {
  const diffElem = document.getElementById("difficultyHUDSelect");
  if (!diffElem) {
    if (typeof logDiff === "function") logDiff("fillDifficultyFieldsFromValue: #difficultyHUDSelect introuvable");
    return;
  }

  const TOKEN_TO_INDEX = Object.fromEntries(DIFFICULTY_MAP.map((t, i) => [t, i]));

  function normToken(s) {
    if (s == null) return null;
    s = String(s)
      .replace(/<[^>]*>/g, "")
      .toLowerCase()
      .trim();

    s = s
      .replace(/\s+/g, " ")
      .replace(/very\s*hard/g, "veryhard")
      .replace(/do\s*not\s*display|don['’]?\s*t\s*display|不显示|표시\s*x/i, "off");

    s = s.replace(/\s*\+\s*$/,"+").replace(/\s*-\s*$/,"-");

    if (/^playtest/.test(s)) return "playtest";
    if (/^easy\+$/.test(s)) return "easy+";
    if (/^easy-$/.test(s)) return "easy-";
    if (/^easy$/.test(s))  return "easy";
    if (/^medium\+$/.test(s)) return "medium+";
    if (/^medium-$/.test(s)) return "medium-";
    if (/^medium$/.test(s))  return "medium";
    if (/^hard\+$/.test(s)) return "hard+";
    if (/^hard-$/.test(s)) return "hard-";
    if (/^hard$/.test(s))  return "hard";
    if (/^veryhard\+$/.test(s)) return "veryhard+";
    if (/^veryhard-$/.test(s)) return "veryhard-";
    if (/^veryhard$/.test(s))  return "veryhard";
    if (/^extreme\+$/.test(s)) return "extreme+";
    if (/^extreme-$/.test(s)) return "extreme-";
    if (/^extreme$/.test(s))  return "extreme";
    if (/^hell$/.test(s))     return "hell";
    if (/^off$/.test(s))      return "off";

    return s;
  }

  let index = null;
  if (diffValue != null && /^\s*\d+\s*$/.test(String(diffValue))) {
    index = parseInt(String(diffValue).trim(), 10);
  } else if (diffValue != null) {
    const tok = normToken(diffValue);
    if (tok && TOKEN_TO_INDEX.hasOwnProperty(tok)) index = TOKEN_TO_INDEX[tok];
  }

  if (index == null || !Number.isFinite(index)) {
    if (typeof logDiff === "function") logDiff("fillDifficultyFieldsFromValue: diffValue illisible =", diffValue);
    return;
  }

  const maxIdx = Math.min(DIFFICULTY_MAP.length - 1, Math.max(0, diffElem.options.length - 1));
  if (index > maxIdx) index = maxIdx;
  if (index < 0) index = 0;

  try {
    diffElem.selectedIndex = index;
  } catch (_) {}

  const wantedToken = DIFFICULTY_MAP[index];
  if (diffElem.value !== wantedToken) {
    let matched = false;
    for (let i = 0; i < diffElem.options.length; i++) {
      const opt = diffElem.options[i];
      if ((opt.value || "").toLowerCase() === wantedToken) {
        diffElem.selectedIndex = i;
        matched = true;
        break;
      }
    }

    if (!matched) {
      for (let i = 0; i < diffElem.options.length; i++) {
        const opt = diffElem.options[i];
        const label = String(opt.text || opt.label || "").toLowerCase();
        if (label.includes(wantedToken.replace("+", " + ").replace("-", " - ").replace("veryhard","very hard"))) {
          diffElem.selectedIndex = i;
          matched = true;
          break;
        }
      }
    }
  }

  if (typeof logDiff === "function") {
    logDiff("fillDifficultyFieldsFromValue: input =", diffValue, "=> index =", index, "token =", DIFFICULTY_MAP[index]);
    const chosen = diffElem.options[diffElem.selectedIndex];
    logDiff("fillDifficultyFieldsFromValue: UI set to idx", diffElem.selectedIndex, "value", chosen && chosen.value, "text", chosen && chosen.text);
  }
}

function applyDifficultyValue(fullText, lang, wanted) {
  const log = (typeof logDiff === "function") ? logDiff : (...a) => { try { console.log("[DIFF]", ...a); } catch(_){} };

  const _findMatchingParen = (typeof findMatchingParen === "function") ? findMatchingParen : function(text, openIdx) {
    let depth = 1, inQ = false;
    for (let i = openIdx + 1; i < text.length; i++) {
      const ch = text[i], prev = text[i - 1];
      if (ch === '"' && prev !== "\\") { inQ = !inQ; continue; }
      if (inQ) continue;
      if (ch === "(") depth++;
      else if (ch === ")") { depth--; if (depth === 0) return i; }
    }
    return -1;
  };

  const _splitTopLevelArgs = (typeof splitTopLevelArgs === "function") ? splitTopLevelArgs : function(argListStr) {
    const args = [];
    let cur = "", p = 0, b = 0, q = false;
    for (let k = 0; k < argListStr.length; k++) {
      const ch = argListStr[k], prev = argListStr[k - 1];
      if (ch === '"' && prev !== "\\") q = !q;
      if (!q) {
        if (ch === "(") p++;
        else if (ch === ")") p--;
        else if (ch === "[") b++;
        else if (ch === "]") b--;
        if (ch === "," && p === 0 && b === 0) { args.push(cur.trim()); cur = ""; continue; }
      }
      cur += ch;
    }
    if (cur.trim()) args.push(cur.trim());
    return args;
  };

  function findMatchingBrace(text, openIdx) {
    let depth = 1, inQ = false;
    for (let i = openIdx + 1; i < text.length; i++) {
      const ch = text[i], prev = text[i - 1];
      if (ch === '"' && prev !== "\\") { inQ = !inQ; continue; }
      if (inQ) continue;
      if (ch === "{") depth++;
      else if (ch === "}") { depth--; if (depth === 0) return i; }
    }
    return -1;
  }

  function normalizeSpaces(s) {
    return String(s)
      .replace(/\uFEFF/g, "")
      .replace(/[\u200B\u200C\u200D]/g, "")
      .replace(/[\u00A0\u2007\u202F\u2000-\u200A]/g, " ");
  }
  function normalizeBrackets(s) {
    return String(s)
      .replace(/[\uFF3B\u3010\u3016\u3014\u27E6\u2983\u2985\u301A]/g, "[")
      .replace(/[\uFF3D\u3011\u3017\u3015\u27E7\u2984\u2986\u301B]/g, "]");
  }
  function normalizeDigits(s) {
    return String(s).replace(/[\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]/g, ch => {
      const cp = ch.codePointAt(0);
      if (cp >= 0xFF10 && cp <= 0xFF19) return String(cp - 0xFF10);
      if (cp >= 0x0660 && cp <= 0x0669) return String(cp - 0x0660);
      if (cp >= 0x06F0 && cp <= 0x06F9) return String(cp - 0x06F0);
      return ch;
    });
  }
  function normalizeLine(s) { return normalizeDigits(normalizeBrackets(normalizeSpaces(s))); }

  const TOKEN_TO_IDX = Object.fromEntries(DIFFICULTY_MAP.map((t, i) => [t, i]));

  function normToken(s) {
    s = String(s || "").toLowerCase().replace(/<[^>]*>/g, "").trim();
    s = s.replace(/\s+/g, " ");
    s = s.replace(/very\s*hard/g, "veryhard");
    if (/do\s*not\s*display|don['’]?\s*t\s*display|不显示|표시\s*x/.test(s)) s = "off";
    s = s.replace(/\s*\+\s*$/,"+").replace(/\s*-\s*$/,"-");
    if (s.startsWith("playtest")) return "playtest";
    return s;
  }

  function computeIndex(w) {
    if (w == null) return null;
    const str = String(w).trim();
    if (/^\d+$/.test(str)) {
      let n = parseInt(str, 10);
      if (!Number.isFinite(n)) return null;
      n = Math.max(0, Math.min(17, n));
      return n;
    }
    const tok = normToken(str);
    if (TOKEN_TO_IDX.hasOwnProperty(tok)) return TOKEN_TO_IDX[tok];
    return null;
  }

  const idx = computeIndex(wanted);
  logDiff("applyDifficultyValue: wanted =", wanted, "=> idx =", idx);
  if (idx == null) return fullText;

  let text = fullText;

  (function updateWorkshopBlock(){
    const key = /(workshop|地图工坊|ワークショップ)\s*\{/i.exec(text);
    if (!key) { log("applyDifficultyValue: workshop block introuvable (ok)"); return; }
    const openBrace = text.indexOf("{", key.index + key[0].length);
    if (openBrace < 0) { log("applyDifficultyValue: '{' après workshop introuvable"); return; }
    const closeBrace = findMatchingBrace(text, openBrace);
    if (closeBrace < 0) { log("applyDifficultyValue: '}' du workshop introuvable"); return; }

    const head = text.slice(0, openBrace + 1);
    const body = text.slice(openBrace + 1, closeBrace);
    const tail = text.slice(closeBrace);

    const lines = body.split(/\r?\n/);
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const norm = normalizeLine(raw);
      const isHud = /difficulty\s*display\s*hud/i.test(norm) ||
                    (/难度/.test(norm) && /顶部/.test(norm) && /hud/i.test(norm));
      if (!isHud) continue;

      const next = norm.replace(/\[\s*\d+\s*\]/g, `[${idx}]`)
                       .replace(/:\s*\d+\b/g, `: ${idx}`);
      if (next !== norm) {
        lines[i] = next;
        changed = true;
        logDiff("applyDifficultyValue: workshop line modifiée ->", next);
        break;
      } else {
        lines[i] = norm.replace(/(\S)\s*$/, `$1 [${idx}]`);
        changed = true;
        logDiff("applyDifficultyValue: workshop line: ajout [idx] ->", lines[i]);
        break;
      }
    }

    if (changed) {
      text = head + lines.join("\n") + tail;
    } else {
      logDiff("applyDifficultyValue: workshop: aucune ligne HUD à modifier");
    }
  })();

  (function updateSetGlobal(){
    const re = /Set\s*Global\s*Variable\s*\(\s*Difficultyhud\s*,/ig;
    let m, count = 0;

    while ((m = re.exec(text))) {
      const openSet = text.indexOf("(", m.index);
      const closeSet = _findMatchingParen(text, openSet);
      if (openSet < 0 || closeSet < 0) { re.lastIndex = m.index + m[0].length; continue; }

      const setBody = text.slice(openSet + 1, closeSet);

      const relCombo = setBody.search(/Workshop\s*Setting\s*Combo\s*\(/i);
      if (relCombo < 0) { re.lastIndex = closeSet + 1; continue; }

      const openComboRel = setBody.indexOf("(", relCombo);
      let depth = 1, inQ = false, closeComboRel = -1;
      for (let i = openComboRel + 1; i < setBody.length; i++) {
        const ch = setBody[i], prev = setBody[i - 1];
        if (ch === '"' && prev !== "\\") { inQ = !inQ; continue; }
        if (inQ) continue;
        if (ch === "(") depth++;
        else if (ch === ")") { depth--; if (depth === 0) { closeComboRel = i; break; } }
      }
      if (closeComboRel < 0) { re.lastIndex = closeSet + 1; continue; }

      const beforeCombo = setBody.slice(0, openComboRel + 1);
      const comboBody   = setBody.slice(openComboRel + 1, closeComboRel);
      const afterCombo  = setBody.slice(closeComboRel);

      const args = _splitTopLevelArgs(comboBody);
      if (args.length >= 3) {
        logDiff("applyDifficultyValue:SetGlobal avant idx =", args[2]);
        args[2] = String(idx);
        const newComboBody = args.join(", ");
        const newSetBody   = beforeCombo + newComboBody + afterCombo;
        text = text.slice(0, openSet + 1) + newSetBody + text.slice(closeSet);
        re.lastIndex = openSet + 1 + newSetBody.length; // reprendre après remplacement
        count++;
      } else {
        re.lastIndex = closeSet + 1;
      }
    }
    logDiff("applyDifficultyValue:SetGlobal remplacés =", count);
  })();

  (function updateGlobalArray(){
    const re = /(?:Global|全局|グローバル)\.Difficultyhud\s*=\s*Array\s*\(\s*Workshop\s*Setting\s*Combo\s*\(/ig;
    let m, count = 0;

    while ((m = re.exec(text))) {
      const comboOpen = m.index + m[0].lastIndexOf("(");
      const comboClose = _findMatchingParen(text, comboOpen);
      if (comboClose < 0) { re.lastIndex = m.index + m[0].length; continue; }

      const inside = text.slice(comboOpen + 1, comboClose);
      const args = _splitTopLevelArgs(inside);
      if (args.length >= 3) {
        logDiff("applyDifficultyValue:GlobalArray avant idx =", args[2]);
        args[2] = String(idx);
        const newInside = args.join(", ");
        text = text.slice(0, comboOpen + 1) + newInside + text.slice(comboClose);
        re.lastIndex = comboOpen + 1 + newInside.length;
        count++;
      } else {
        re.lastIndex = comboClose + 1;
      }
    }
    logDiff("applyDifficultyValue:GlobalArray remplacés =", count);
  })();

  logDiff("applyDifficultyValue: DONE (idx =", idx, ")");
  return text;
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


/* ------- Parse & Insert map name ------- */
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

/* ------- Extract & Insert credits and colors ------- */
function extractMapCredits(fullText, lang) {
  if (lang === "ja-JP") {
    const jaHeaders = [
      /ルール\("<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE \/ (在这入力|在这输入)"\)/,
      /ルール\("☞ Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE \/ (在这入力|在这输入)"\)/
    ];
    let headerMatch = null;
    for (const re of jaHeaders) {
      const m = fullText.match(re);
      if (m) { headerMatch = m; break; }
    }
    if (!headerMatch) {
      throw new Error('Impossible de trouver "ルール(…Credits and Colors…)" (ja-JP).');
    }
    const startIdx = fullText.indexOf(headerMatch[0]);
    const braceOpenIdx = fullText.indexOf("{", startIdx + headerMatch[0].length);
    if (braceOpenIdx < 0) throw new Error('Accolade ouvrante introuvable après “ルール(…)”.');

    let level = 1, i = braceOpenIdx + 1;
    for (; i < fullText.length; i++) {
      if (fullText[i] === "{") level++;
      else if (fullText[i] === "}") { level--; if (level === 0) break; }
    }
    if (level !== 0) throw new Error('Accolade fermante introuvable pour la règle (ja-JP).');

    const outerCloseIdx = i;
    const ruleBlock = fullText.slice(braceOpenIdx + 1, outerCloseIdx);

    const keyword = "アクション";
    const mAction = ruleBlock.match(new RegExp(`${keyword}\\s*\\{`));
    if (!mAction) throw new Error(`Bloc "${keyword} { … }" introuvable (ja-JP).`);

    const relActionOpen = ruleBlock.indexOf("{", mAction.index + mAction[0].lastIndexOf("{"));
    if (relActionOpen < 0) throw new Error(`Accolade ouvrante introuvable pour "${keyword}" (ja-JP).`);
    const absoluteActionOpen = braceOpenIdx + 1 + relActionOpen;

    let level2 = 1, j = absoluteActionOpen + 1;
    for (; j < fullText.length; j++) {
      if (fullText[j] === "{") level2++;
      else if (fullText[j] === "}") { level2--; if (level2 === 0) break; }
    }
    if (level2 !== 0) throw new Error(`Accolade fermante introuvable pour "${keyword}" (ja-JP).`);

    const actionClose = j;
    return fullText.slice(absoluteActionOpen + 1, actionClose).trim();
  }

  let keyword;
  if (lang === "zh-CN")      keyword = "动作";
  else if (lang === "pt-BR") keyword = "ações";
  else if (lang === "es-MX") keyword = "acciones";
  else if (lang === "de-DE") keyword = "aktionen";
  else if (lang === "ko-KR") keyword = "action";
  else if (lang === "ru-RU") keyword = "actions";
  else                       keyword = "actions";

  const markers = [
    '☞ Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入',
    '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入',
    '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE',
    'Credits here - 作者名字 <---- INSERT HERE / 在这输入 '
  ];

  let idxMarker = -1;
  for (const mk of markers) {
    idxMarker = fullText.indexOf(mk);
    if (idxMarker >= 0) break;
  }

  if (idxMarker < 0) {
    const legacyRegex = /Credits here\s*-\s*作者名字\s*<---- INSERT HERE \/ 在这入力/i;
    const mLegacy = fullText.match(legacyRegex);
    if (!mLegacy) {
      throw new Error(`Marqueur introuvable (nouveau "☞ …", anciens "<tx…>" ou legacy).`);
    }
    idxMarker = mLegacy.index;
  }

  const sliceAfter = fullText.slice(idxMarker);
  const relIdx = sliceAfter.search(new RegExp(`${keyword}\\s*\\{`, "i"));
  if (relIdx < 0) throw new Error(`Bloc "${keyword} { … }" introuvable après le marqueur Credits.`);

  const braceOpenIdx2 = fullText.indexOf("{", idxMarker + relIdx);
  if (braceOpenIdx2 < 0) throw new Error(`Accolade ouvrante introuvable pour "${keyword}".`);

  let level3 = 1, k = braceOpenIdx2 + 1;
  for (; k < fullText.length; k++) {
    if (fullText[k] === "{") level3++;
    else if (fullText[k] === "}") { level3--; if (level3 === 0) break; }
  }
  if (level3 !== 0) throw new Error(`Accolade fermante introuvable pour "${keyword}".`);

  const braceCloseIdx2 = k;
  return fullText.slice(braceOpenIdx2 + 1, braceCloseIdx2).trim();
}

function sanitizeRHS(rhsRaw) {
  let rhs = (rhsRaw || "").trim();

  rhs = rhs.replace(/[);\s]+$/, "");

  const opens  = (rhs.match(/\(/g) || []).length;
  const closes = (rhs.match(/\)/g) || []).length;

  if (closes > opens) {
    let extra = closes - opens;
    while (extra > 0 && rhs.endsWith(")")) {
      rhs = rhs.slice(0, -1);
      extra--;
    }
  } else if (opens > closes) {
    rhs += ")".repeat(opens - closes);
  }

  return rhs;
}

function _parseCreditsData(creditsActionsText) {
  const mSetName  = creditsActionsText.match(/Set\s+Global\s+Variable\s*\(\s*Name\s*,\s*Custom String\(\s*"(.*?)"\s*\)\s*\)\s*;?/i);
  const mDotName  = creditsActionsText.match(/Global\.Name\s*=\s*Custom String\(\s*"(.*?)"\s*\)\s*;?/i);
  const name = mSetName ? mSetName[1] : (mDotName ? mDotName[1] : null);

  const mSetCode  = creditsActionsText.match(/Set\s+Global\s+Variable\s*\(\s*Code\s*,\s*Custom String\(\s*"(.*?)"\s*\)\s*\)\s*;?/i);
  const mDotCode  = creditsActionsText.match(/Global\.Code\s*=\s*Custom String\(\s*"(.*?)"\s*\)\s*;?/i);
  const code = mSetCode ? mSetCode[1] : (mDotCode ? mDotCode[1] : null);

  const colors = {};

  const reSetIdx = /Set\s+Global\s+Variable\s+At\s+Index\s*\(\s*ColorConfig\s*,\s*([^\s,)[\]]+)\s*,\s*([^)]+)\)\s*;?/gi;
  let m;
  while ((m = reSetIdx.exec(creditsActionsText))) {
    const idx = m[1].trim();
    const rhs = sanitizeRHS(m[2]);
    colors[idx] = rhs;
  }

  const reDotIdx = /Global\.ColorConfig\s*\[\s*([^\]\r\n]+?)\s*\]\s*=\s*([^\r\n;]+)\s*;?/gi;
  while ((m = reDotIdx.exec(creditsActionsText))) {
    const idx = m[1].trim();
    const rhs = sanitizeRHS(m[2]);
    colors[idx] = rhs;
  }

  return { name, code, colors };
}

function insertMapCreditsIntoTemplate(tpl, creditsBlock, lang) {
  if (!creditsBlock || !creditsBlock.trim()) return tpl;

  const src = _parseCreditsData(creditsBlock);

  const NEW_TITLE = '☞ Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入';
  const OLD_ZH    = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE / 在这输入';
  const OLD_INTL  = '<tx0C00000000044B55><fg0FFFFFFF> Credits and Colors here - 作者代码HUD颜色 <---- INSERT HERE';

  const reRuleStart = new RegExp(
    String.raw`^[ \t]*(?:rule|规则|ルール)\s*\(\s*"(?:` +
    NEW_TITLE.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + "|" +
    OLD_ZH.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + "|" +
    OLD_INTL.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") +
    String.raw`|Credits here - 作者名字 <---- INSERT HERE \/ 在这入力[^"]*?)"\s*\)\s*\{`,
    "mi"
  );
  const mRule = tpl.match(reRuleStart);
  if (!mRule) return tpl;

  const reTitleLine = new RegExp(
    String.raw`^([ \t]*(?:rule|规则|ルール)\s*\(\s*")([^"]*)("\s*\)\s*\{)`,
    "mi"
  );
  tpl = tpl.replace(reTitleLine, (_a, p1, _old, p3) => `${p1}${NEW_TITLE}${p3}`);

  const headerOpenBrace = tpl.indexOf("{", mRule.index);
  if (headerOpenBrace < 0) return tpl;

  function _findActionsBlockBounds(tplStr, lg, fromIndex) {
    let word;
    switch (lg) {
      case "ja-JP": word = "アクション"; break;
      case "zh-CN": word = "动作";      break;
      case "ko-KR": word = "action";    break;
      case "ru-RU": word = "actions";   break;
      case "es-MX": word = "acciones";  break;
      case "pt-BR": word = "ções".normalize("NFKD").replace(/[\u0300-\u036f]/g,""); break;
      case "de-DE": word = "aktionen";  break;
      default:      word = "actions";   break;
    }
    if (lang === "pt-BR") word = "ações";

    const rel = tplStr.slice(fromIndex).search(new RegExp(`${word}\\s*\\{`, "i"));
    if (rel < 0) return null;

    const actHdrIdx = fromIndex + rel;
    const open = tplStr.indexOf("{", actHdrIdx);
    if (open < 0) return null;

    let level = 1, i = open + 1;
    for (; i < tplStr.length; i++) {
      const ch = tplStr[i];
      if (ch === "{") level++;
      else if (ch === "}") { level--; if (level === 0) break; }
    }
    if (level !== 0) return null;
    return { start: open + 1, end: i };
  }

  const bounds = _findActionsBlockBounds(tpl, lang, headerOpenBrace);
  if (!bounds) return tpl;

  let actions = tpl.slice(bounds.start, bounds.end);

  if (src.name != null) {
    const reSetName = /Set\s+Global\s+Variable\s*\(\s*Name\s*,\s*Custom String\(\s*"(.*?)"\s*\)\s*\)\s*;?/i;
    const reDotName = /Global\.Name\s*=\s*Custom String\(\s*"(.*?)"\s*\)\s*;?/i;

    if (reSetName.test(actions)) {
      actions = actions.replace(reSetName, `Set Global Variable(Name, Custom String("${src.name}"));`);
    } else if (reDotName.test(actions)) {
      actions = actions.replace(reDotName, `Set Global Variable(Name, Custom String("${src.name}"));`);
    } else {
      actions = actions.replace(
        /("Filling this[\s\S]*?")\s*[\r\n]+/,
        `$1\n\t\tSet Global Variable(Name, Custom String("${src.name}"));\n`
      );
    }
  }

  if (src.code != null) {
    const reSetCode = /Set\s+Global\s+Variable\s*\(\s*Code\s*,\s*Custom String\(\s*"(.*?)"\s*\)\s*\)\s*;?/i;
    const reDotCode = /Global\.Code\s*=\s*Custom String\(\s*"(.*?)"\s*\)\s*;?/i;

    if (reSetCode.test(actions)) {
      actions = actions.replace(reSetCode, `Set Global Variable(Code, Custom String("${src.code}"));`);
    } else if (reDotCode.test(actions)) {
      actions = actions.replace(reDotCode, `Set Global Variable(Code, Custom String("${src.code}"));`);
    } else {
      const reAfterName = /Set\s+Global\s+Variable\s*\(\s*Name\s*,[^\r\n]*\)\s*;?[ \t]*\r?\n/;
      if (reAfterName.test(actions)) {
        actions = actions.replace(reAfterName, (m) => m + `\t\tSet Global Variable(Code, Custom String("${src.code}"));\n`);
      } else {
        actions = actions.replace(
          /("Filling this[\s\S]*?")\s*[\r\n]+/,
          `$1\n\t\tSet Global Variable(Code, Custom String("${src.code}"));\n`
        );
      }
    }
  }

  for (const [idxRaw, rhsRaw] of Object.entries(src.colors)) {
    const rhs = sanitizeRHS(rhsRaw);

    const idxEsc = idxRaw.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

    const reSetColorFull = new RegExp(
      String.raw`Set\s+Global\s+Variable\s+At\s+Index\s*\(\s*ColorConfig\s*,\s*` +
      idxEsc +
      String.raw`\s*,\s*([\s\S]*?)\)\s*\)\s*;?`,
      "i"
    );

    if (reSetColorFull.test(actions)) {
      actions = actions.replace(
        reSetColorFull,
        `Set Global Variable At Index(ColorConfig, ${idxRaw}, ${rhs});`
      );
      continue;
    }

    const reDotColor = new RegExp(
      String.raw`Global\.ColorConfig\s*\[\s*` + idxEsc + String.raw`\s*\]\s*=\s*([^\r\n;]+)\s*;?`,
      "i"
    );
    if (reDotColor.test(actions)) {
      actions = actions.replace(
        reDotColor,
        `Set Global Variable At Index(ColorConfig, ${idxRaw}, ${rhs});`
      );
      continue;
    }

    actions = actions.replace(
      /\s*$/,
      `\n\t\tSet Global Variable At Index(ColorConfig, ${idxRaw}, ${rhs});\n`
    );
  }

  actions = actions.replace(/\)\s*;\s*\)\s*;/g, ');');

  return tpl.slice(0, bounds.start) + actions + tpl.slice(bounds.end);
}


/* ------ Extract & Insert addons ------ */
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

/* ------- Extract Workshop settings ------- */
function parseGlobalWorkshopBans(fullText) {
  const set = new Set();

  const m = fullText.match(/(?:workshop|地图工坊|ワークショップ)\s*\{([\s\S]*?)\}/i);
  if (!m) return [];

  const block = m[1];
  const lines = block.split(/\r?\n/);

  const ON_OFF_WORD = "(?:on|off|开启|关闭|활성화|비활성화|вкл\\.|выкл\\.|activado|desactivado|ligado|desligado|ein|aus)";

  for (const raw of lines) {
    const line = String(raw).trim();
    if (!line) continue;

    const m2 = line.match(new RegExp(
      String.raw`^\s*(ban|require)\s+([^:：]+?)\s*[:：]\s*${ON_OFF_WORD}\s*$`,
      "i"
    ));
    if (!m2) continue;

    const kind = m2[1].toLowerCase();
    const name = m2[2].trim();

    const label = (kind === "ban") ? `Ban ${name}` : `Require ${name}`;
    set.add(label);
  }

  const byKey = new Map();
  for (const lbl of set) byKey.set(normalizeBanKey(lbl), lbl);
  return Array.from(byKey.values());
}

function normalizeBanKey(s) {
  let x = String(s)
    .replace(/\uFEFF/g, "")
    .replace(/[\u00A0\u2000-\u200B]/g, " ")
    .toLowerCase()
    .trim();

  x = x.replace(/^\s*(ban|require)\s+/, "");

  x = x.split("■")[0];
  x = x.split(":")[0];
  x = x.split("：")[0];

  x = x.replace(/\s*[-–—]\s*.*$/, "");

  x = x.replace(/\s+/g, " ").trim();
  return x;
}

function standardizeWorkshopBansForTemplate(fullText) {
  const detected = parseGlobalWorkshopBans(fullText);
  const activeKeys = new Set(detected.map(normalizeBanKey));

  const out = [];
  const seen = new Set();
  for (const label of GLOBAL_BANS) {
    const k = normalizeBanKey(label);
    if (activeKeys.has(k) && !seen.has(k)) {
      out.push(label);
      seen.add(k);
    }
  }
  return out;
}

function extractWorkshopSettings(fullText) {
  const regex = /(?:workshop|地图工坊|ワークショップ)\s*\{([\s\S]*?)\}/i;
  const match = fullText.match(regex);
  return match ? match[1].trim() : "";
}

function insertWorkshopSettings(tpl, workshopSettingsBlock, lang) {
  if (workshopSettingsBlock && workshopSettingsBlock.trim().length > 0) {
    let reExtensions;
    switch (lang) {
      case "es-MX":
        reExtensions = /^(\s*)extensiones\s*\{/mi;
        break;
      case "pt-BR":
        reExtensions = /^(\s*)extensões\s*\{/mi;
        break;
      case "de-DE":
        reExtensions = /^(\s*)Erweiterungen\s*\{/mi;
        break;
      case "ja-JP":
        reExtensions = /^(\s*)拡張\s*\{/mi;
        break;
      case "zh-CN":
        reExtensions = /^(\s*)扩展\s*\{/mi;
        break;
      default:
        reExtensions = /^(\s*)extensions\s*\{/mi;
    }

    const mExt = tpl.match(reExtensions);
    if (!mExt) {
      return tpl;
    }

    const baseIndent = mExt[1] || "";
    const innerIndent = baseIndent + "    ";

    const lines = workshopSettingsBlock.split(/\r?\n/);
    const indentedLines = lines
      .map(line => innerIndent + line.trim())
      .join("\n");

    let workshopKeyword;
    switch (lang) {
      case "zh-CN":
        workshopKeyword = "地图工坊";
        break;
      case "ja-JP":
        workshopKeyword = "ワークショップ";
        break;
      default:
        workshopKeyword = "workshop";
    }

    const workshopBlock =
      `${baseIndent}${workshopKeyword} {\n` +
      `${indentedLines}\n` +
      `${baseIndent}}\n\n`;

    const insertPos = mExt.index;
    return tpl.slice(0, insertPos) + workshopBlock + tpl.slice(insertPos);
  }

  if (Array.isArray(bans) && bans.length > 0) {
    let blockRegex;
    if (lang === "zh-CN") {
      blockRegex = /^(?<indent>\s*)地图工坊\s*\{/mi;
    } else if (lang === "ja-JP") {
      blockRegex = /^(?<indent>\s*)ワークショップ\s*\{/mi;
    } else {
      blockRegex = /^(?<indent>\s*)workshop\s*\{/mi;
    }

    const mWork = tpl.match(blockRegex);
    if (!mWork) {
      return tpl;
    }

    const indentBase = (mWork.groups && mWork.groups.indent) != null
      ? mWork.groups.indent
      : "";

    const workshopIdx = mWork.index;
    const openBraceIdx = tpl.indexOf("{", workshopIdx);
    if (openBraceIdx < 0) {
      return tpl;
    }

    let level = 1;
    let i = openBraceIdx + 1;
    for (; i < tpl.length; i++) {
      if (tpl[i] === "{") {
        level++;
      } else if (tpl[i] === "}") {
        level--;
        if (level === 0) break;
      }
    }
    if (level !== 0) {
      return tpl;
    }
    const closeBraceIdx = i;

    const before = tpl.slice(0, openBraceIdx + 1);
    const after = tpl.slice(closeBraceIdx);
    return `${before}\n${bansText}\n${after}`;
  }

  return tpl;
}

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

  const rePlaytest = /Playtest display\s*-\s*游戏测试\s*:\s*([^\r\n]+)/i;
  const mPlay = block.match(rePlaytest);
  if (mPlay) {
    const val = mPlay[1].trim().toLowerCase();
    const truthy = ["on", "开启", "활성화", "вкл.", "activado", "ligado", "ein"];
    result.playtest = truthy.includes(val);
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

function insertBasicMapValidator(tplStr, clientLang, shouldDisable) {
  let disabledWord, ruleWord;
  switch (clientLang) {
    case "zh-CN":
      disabledWord = "禁用";
      ruleWord     = "规则";
      break;
    case "ja-JP":
      disabledWord = "無効";
      ruleWord     = "ルール";
      break;
    case "es-MX":
      disabledWord = "deshabilitado";
      ruleWord     = "regla";
      break;
    case "pt-BR":
      disabledWord = "desabilitado";
      ruleWord     = "regra";
      break;
    case "de-DE":
      disabledWord = "deaktiviert";
      ruleWord     = "regel";
      break;
    case "ko-KR":
      disabledWord = "disabled";
      ruleWord     = "rule";
      break;
    case "ru-RU":
      disabledWord = "disabled";
      ruleWord     = "rule";
      break;
    default:
      disabledWord = "disabled";
      ruleWord     = "rule";
  }

  const titleEscaped = 'Addon\\s*\\|\\s*SUB\\s*Basic\\s*Map\\s*Validator';
  const openParen    = '\\(\\s*"' + titleEscaped + '"\\s*\\)';

  const regexRuleLine = new RegExp(
    `^([ \\t]*)(` +
      `${ruleWord}\\s*${openParen}` +
    `)`,
    "m"
  );

  if (shouldDisable) {
    const regexAlreadyDisabled = new RegExp(
      `^[ \\t]*${disabledWord}\\s+${ruleWord}\\s*${openParen}`,
      "m"
    );
    if (regexAlreadyDisabled.test(tplStr)) {
      return tplStr;
    }

    return tplStr.replace(regexRuleLine, (_match, indent, rulePart) => {
      return `${indent}${disabledWord} ${rulePart}`;
    });
  }
  else {
    const regexDisablePrefix = new RegExp(
      `^([ \\t]*)${disabledWord}\\s+(` +
        `${ruleWord}\\s*${openParen}` +
      `)`,
      "m"
    );
    return tplStr.replace(regexDisablePrefix, (_match, indent, rulePart) => {
      return `${indent}${rulePart}`;
    });
  }
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
  const checkpoints = [];
  const teleportMap = {};

  const regexGlobalA = /(?:Global|全局|グローバル)\.A\s*=\s*(?:Array|Matriz|数组|配列)\s*\(\s*/;
  const matchGA = fullText.match(regexGlobalA);
  if (!matchGA) {
    return { checkpoints, teleportMap };
  }

  let level = 1;
  let i = matchGA.index + matchGA[0].length;
  for (; i < fullText.length; i++) {
    if (fullText[i] === '(') level++;
    else if (fullText[i] === ')') {
      level--;
      if (level === 0) break;
    }
  }
  const inside = fullText.slice(matchGA.index + matchGA[0].length, i);

  const elements = [];
  let current = '', depth = 0;
  for (const c of inside) {
    if (c === '(') {
      depth++; current += c;
    } else if (c === ')') {
      depth--; current += c;
    } else if (c === ',' && depth === 0) {
      elements.push(current.trim());
      current = '';
    } else {
      current += c;
    }
  }
  if (current.trim()) elements.push(current.trim());

  const vectorRegex = /^(?:Vector|矢量|ベクトル|Vetor)\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)$/;
  const tpRegex = new RegExp(
    `^(?:Array|Matriz|数组|配列)\\s*\\(\\s*` +
      `(Vector\\([^)]*\\))` +
      `\\s*,\\s*` +
      `(Vector\\([^)]*\\))` +
    `\\s*\\)$`
  );

  elements.forEach(elem => {
    let m = elem.match(vectorRegex);
    if (m) {
      checkpoints.push({
        x: parseFloat(m[1]),
        y: parseFloat(m[2]),
        z: parseFloat(m[3])
      });
      return;
    }

    const mt = elem.match(tpRegex);
    if (mt) {
      const parseV = vStr => {
        const mm = vStr.match(vectorRegex);
        return {
          x: parseFloat(mm[1]),
          y: parseFloat(mm[2]),
          z: parseFloat(mm[3])
        };
      };
      const start = parseV(mt[1]);
      const end   = parseV(mt[2]);
      const idx = checkpoints.length;

      checkpoints.push(start);
      teleportMap[idx] = { start, end };
      return;
    }

  });

  return { checkpoints, teleportMap };
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

/* ------ REORDER CPS ------*/
container.addEventListener("dragover", (e) => {
  if (!isEditMode) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
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

function moveCard(i, offset) {
  const cards = Array.from(container.querySelectorAll(".checkpoint-card"));
  const targetIdx = i + offset;
  if (targetIdx < 0 || targetIdx >= cards.length) return;

  const card    = cards[i];
  const other   = cards[targetIdx];

  if (offset === -1) {
    container.insertBefore(card, other);
  } else {
    container.insertBefore(other, card);
  }

  swapDataModelEntries(i, targetIdx);

  updateCardNumbers();
  saveEditorSettings();
  renderMapSettingsWithModel(currentDataModel);
}

function swapDataModelEntries(i, j) {
  const m = currentDataModel;
  [m.checkpoints[i], m.checkpoints[j]] = [m.checkpoints[j], m.checkpoints[i]];
  [m.teleportMap[i], m.teleportMap[j]] = [m.teleportMap[j], m.teleportMap[i]];

  [m.killMap[i],    m.killMap[j]]    = [m.killMap[j],    m.killMap[i]];
  [m.pinMap[i],     m.pinMap[j]]     = [m.pinMap[j],     m.pinMap[i]];
  [m.abilityMap[i], m.abilityMap[j]] = [m.abilityMap[j], m.abilityMap[i]];

  [m.CustomPortalStart[i],    m.CustomPortalStart[j]]    = [m.CustomPortalStart[j],    m.CustomPortalStart[i]];
  [m.CustomPortalEndpoint[i], m.CustomPortalEndpoint[j]] = [m.CustomPortalEndpoint[j], m.CustomPortalEndpoint[i]];
  [m.CustomPortalCP[i],       m.CustomPortalCP[j]]       = [m.CustomPortalCP[j],       m.CustomPortalCP[i]];
  for (const banKey in m.banMap) {
    m.banMap[banKey] = m.banMap[banKey].map(idx => {
      if (idx === i) return j;
      if (idx === j) return i;
      return idx;
    });
  }
  [m.originalIndices[i], m.originalIndices[j]] = [m.originalIndices[j], m.originalIndices[i]];
}

/* ------- Settings section ------- */
function renderGlobalBans(fullText) {
  const globalBans = parseGlobalWorkshopBans(fullText);
  if (globalBans.length === 0) return null;

  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("global-bans");

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
  const { checkpoints, teleportMap } = parseGlobalACheckpoints(fullText);

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

  const allStarts = parseGlobalArrayVectors(fullText, "CustomPortalStart");
  const allEnds   = parseGlobalArrayVectors(fullText, "CustomPortalEndpoint");
  const allCPs    = parseGlobalArrayNumbers(fullText, "CustomPortalCP").map(n => parseInt(n, 10));

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

  const portalMap = {};
  allStarts.forEach((start, i) => {
    const end = allEnds[i] || { x:0, y:0, z:0 };
    const cp  = Number.isFinite(allCPs[i]) ? allCPs[i] : 0;
    if (!portalMap[cp]) portalMap[cp] = [];
    portalMap[cp].push({ start, end, cp });
  });

  const CustomPortalStart    = [];
  const CustomPortalEndpoint = [];
  const CustomPortalCP       = [];

  (checkpoints || []).forEach((_, i) => {
    const list = portalMap[i] || [];
    CustomPortalStart[i]    = list.map(p => p.start);
    CustomPortalEndpoint[i] = list.map(p => p.end);
    CustomPortalCP[i]       = list.length > 0 ? list[0].cp : i;
  });

  return {
    checkpoints,
    killMap,
    pinMap,
    abilityMap,
    banMap,
    portalMap,
    teleportMap,
    CustomPortalStart,
    CustomPortalEndpoint,
    CustomPortalCP,
    originalIndices: checkpoints.map((_, idx) => idx)
  };
}

function createCheckpointCard(idx, coords, data) {
  const { killMap, pinMap, abilityMap, banMap, portalMap } = data;
  const originalIndex = data.originalIndices ? data.originalIndices[idx] : idx

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
  originalLabel.textContent = t("convertor.original_position", { index: originalIndex });
  rightGroup.appendChild(originalLabel);

  header.appendChild(rightGroup);
  card.appendChild(header);

  card.addEventListener("click", () => {
    if (!isEditMode) return;
    openEditModal(originalIndex);
  });

  const tp = data.teleportMap[idx];
  if (tp) {
    const secTp = document.createElement("div");
    secTp.classList.add("section");
    const title = document.createElement("div");
    title.classList.add("section__title");
    title.textContent = t("convertor.teleport");
    secTp.appendChild(title);

    const item = document.createElement("div");
    item.classList.add("detail");

    const dot = document.createElement("span");
    dot.classList.add("circle", "circle-purple");
    item.appendChild(dot);

    const sx = coords.x.toFixed(3),
          sy = coords.y.toFixed(3),
          sz = coords.z.toFixed(3);
    const ex = tp.end.x.toFixed(3),
          ey = tp.end.y.toFixed(3),
          ez = tp.end.z.toFixed(3);

    const txt = document.createElement("span");
    txt.classList.add("detail__text");
    txt.textContent = t("convertor.from_to", {sx, sy, sz, ex, ey, ez});
    item.appendChild(txt);

    secTp.appendChild(item);
    card.appendChild(secTp);
  }

  const kills = killMap[idx] || [];
  if (kills.length > 0) {
    const sectionKill = document.createElement("div");
    sectionKill.classList.add("section");
    const titleKill = document.createElement("div");
    titleKill.classList.add("section__title");
    titleKill.textContent = t("convertor.kill_orbs");
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
      textSpan.textContent = t("convertor.position_radius", {px, py, pz, r});
      item.appendChild(textSpan);

      itemsKill.appendChild(item);
    });
    sectionKill.appendChild(itemsKill);
    card.appendChild(sectionKill);
  }

  const pins = pinMap[idx] || [];
  if (pins.length > 0) {
    const sectionPin = document.createElement("div");
    sectionPin.classList.add("section");
    const titlePin = document.createElement("div");
    titlePin.classList.add("section__title");
    titlePin.textContent = t("convertor.bounce_orbs");
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
      textSpan.textContent = t("convertor.pin_info", {
        x: px,
        y: py,
        z: pz,
        f: f,
        locked: pb.locked ? t("convertor.true") : t("convertor.false")
      });
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

  const portals = portalMap[idx] || [];
  if (portals.length > 0) {
    const section = document.createElement("div");
    section.classList.add("section");
    const title = document.createElement("div");
    title.classList.add("section__title");
    title.textContent = t("convertor.portals");
    section.appendChild(title);

    const container = document.createElement("div");
    container.classList.add("section__items");
    portals.forEach(p => {
      const item = document.createElement("div");
      item.classList.add("detail");

      const dot = document.createElement("span");
      dot.classList.add("circle", "circle-purple");
      dot.style.backgroundColor = "#8e44ad";
      item.appendChild(dot);

      const sx = p.start.x.toFixed(3),
            sy = p.start.y.toFixed(3),
            sz = p.start.z.toFixed(3);
      const ex = p.end.x.toFixed(3),
            ey = p.end.y.toFixed(3),
            ez = p.end.z.toFixed(3);

      const txt = document.createElement("span");
      txt.classList.add("detail__text");
      txt.textContent = t("convertor.from_to", {sx, sy, sz, ex, ey, ez});
      item.appendChild(txt);

      container.appendChild(item);
    });

    section.appendChild(container);
    card.appendChild(section);
  }

  const abilities = abilityMap[idx] || {};
  if (abilities.ultimate || abilities.dash) {
    const sectionAbil = document.createElement("div");
    sectionAbil.classList.add("section");
    const titleAbil = document.createElement("div");
    titleAbil.classList.add("section__title");
    titleAbil.textContent = t("convertor.abilities");
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

  const hasAnyBan = banList.some(({ arr }) => arr.includes(idx));
  if (hasAnyBan) {
    const sectionBan = document.createElement("div");
    sectionBan.classList.add("section", "section--bans");
    const titleBan = document.createElement("div");
    titleBan.classList.add("section__title");
    titleBan.textContent = t("convertor.bans");
    sectionBan.appendChild(titleBan);

    const banIcons2 = document.createElement("div");
    banIcons2.classList.add("ban-icons");
    banList.forEach(({ arr, icon }) => {
      if (arr.includes(idx)) {
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
    if (!isEditMode) {
      e.preventDefault();
      return;
    }
    draggedCard = this;
    draggedIndex = idx;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "");
  });
  card.addEventListener("dragover", function (e) {
    if (!isEditMode) return; 
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });
  card.addEventListener("drop", function (e) {
    if (!isEditMode) return; 
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
      const cards = Array.from(container.querySelectorAll(".checkpoint-card"));
      const newIndex = cards.indexOf(draggedCard);
      swapDataModelEntries(draggedIndex, newIndex);
      updateCardNumbers();
      saveEditorSettings();
      renderMapSettingsWithModel(currentDataModel);
      draggedCard = null;
      draggedIndex = null;
    });
  card.addEventListener("dragend", () => { draggedCard = null; });

  const moveControls = document.createElement("div");
  moveControls.classList.add("move-controls");
  const upBtn = document.createElement("button");
  upBtn.type = "button";
  upBtn.textContent = "↑";
  upBtn.title = t("convertor.move_up");
  const downBtn = document.createElement("button");
  downBtn.type = "button";
  downBtn.textContent = "↓";
  downBtn.title = t("convertor.move_down");
  moveControls.append(upBtn, downBtn);
  card.appendChild(moveControls);

  const toggleMoveButtons = () => {
    upBtn.disabled   = !isEditMode;
    downBtn.disabled = !isEditMode;
    upBtn.classList.toggle("disabled",   !isEditMode);
    downBtn.classList.toggle("disabled", !isEditMode);
  };
  toggleMoveButtons();

  upBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isEditMode) return;
    moveCard(idx, -1);
  });
  downBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isEditMode) return;
    moveCard(idx, +1);
  });

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
    editModeBtn.textContent = isEditMode ? t("convertor.exit_edit") : t("convertor.edit_mode");
  } else {
    editModeBtn.textContent = isEditMode ? t("convertor.exit_edit") : t("convertor.edit_mode");
  }
  if (editModeBtn.dataset.listenerInstalled !== "true") {
    editModeBtn.dataset.listenerInstalled = "true";
    editModeBtn.addEventListener("click", () => {
      isEditMode = !isEditMode;
      editModeBtn.textContent = isEditMode ? t("convertor.exit_edit") : t("convertor.edit_mode");
      document.querySelectorAll(".checkpoint-card").forEach(card => {
        card.classList.toggle("editable", isEditMode);
        card.querySelectorAll(".move-controls button").forEach(btn => {
          btn.disabled = !isEditMode;
        });
      });
    });
  }

  if (!settingsButtons.contains(editModeBtn)) {
    settingsButtons.appendChild(editModeBtn);
  }

  let globalSettingsBtn = document.getElementById("globalSettingsBtn");
  if (!globalSettingsBtn) {
    globalSettingsBtn = document.createElement("button");
    globalSettingsBtn.id = "globalSettingsBtn";
    globalSettingsBtn.textContent = t("convertor.global_settings");
    globalSettingsBtn.classList.add("global-edit-mode-btn");
    globalSettingsBtn.style.marginLeft = "8px";
    globalSettingsBtn.addEventListener("click", openGlobalSettingsModal);
  }

  if (!settingsButtons.contains(globalSettingsBtn)) {
    settingsButtons.appendChild(globalSettingsBtn);
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
    msg.textContent = "No map data found";
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

function temporaryReplace(text) {
  if (!text) return text;
  return text.replace(
    /(设置不可见\(\s*事件玩家\s*,\s*)无(\s*\);)/g,
    "$1全部禁用$2"
  );
}

/* ------- Convertor ------- */
async function doConvert(fullText, lang) {
  const lobbyBlock            = extractLobbyBlock(fullText, lang);
  let mapDataBlock            = extractMapDataBlock(fullText, lang);
  mapDataBlock                = sanitizeMapDataAssignments(mapDataBlock); 
  const workshopSettingsBlock = extractWorkshopSettings(fullText);
  const isValidatorOn         = parseBasicMapValidator(fullText);
  debug('Bloc "actions" de Map Data extrait.');

  let tpl = await loadTemplate(lang);
  debug("Template chargé.");

  const newRule = buildRule(mapDataBlock, lang);
  const safeRule = sanitizeMapDataAssignments(newRule);
  tpl = replaceMapData(tpl, safeRule, lang);

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

  if (lobbyBlock) {
    tpl = insertLobbyIntoTemplate(tpl, lobbyBlock, lang);
  }

  if (workshopSettingsBlock) {
    tpl = insertWorkshopSettings(tpl, workshopSettingsBlock, lang);
  }

  const localized = getLocalizedOnOff(lang);
  const canonicalBans = standardizeWorkshopBansForTemplate(fullText);
  if (canonicalBans.length) {
    tpl = applyWorkshopBansUpdate(tpl, lang, canonicalBans, localized);
  }

  const sourceDiffValue = extractDifficultyValue(fullText);

  tpl = applyDifficultyIndexToTemplate(tpl, sourceDiffValue);

  tpl = insertBasicMapValidator(tpl, lang, !isValidatorOn);

  tpl = temporaryReplace(tpl);

  return tpl;
}

async function doTranslate(fullText, clientLang, targetLang) {
  try {
    lastParsedWorkshopSettings = parseWorkshopSettings(fullText);

    await loadKeywordTranslations();
    await loadModesNames();
    await loadMapNameTranslations();
    await loadHeroesNames();
    await loadIconTranslations();

    let lobbyBlock            = extractLobbyBlock(fullText, clientLang);
    let mapDataBlock          = extractMapDataBlock(fullText, clientLang);
    const modeMapNames        = extractModeMapNames(fullText);
    let workshopSettingsBlock = extractWorkshopSettings(fullText);
    const sourceDiffValue     = extractDifficultyValue(fullText, clientLang);

    let creditsBlock = "";
    try { creditsBlock = extractMapCredits(fullText, clientLang); } catch (_) {}
    lobbyBlock            = translateLobbyBlock(lobbyBlock, clientLang, targetLang);
    mapDataBlock          = translateFromTo(mapDataBlock,     clientLang, targetLang);
    mapDataBlock          = sanitizeMapDataAssignments(mapDataBlock);
    creditsBlock          = translateFromTo(creditsBlock,     clientLang, targetLang);
    creditsBlock          = translateHeroNames(creditsBlock,  heroesNames, clientLang, targetLang);
    workshopSettingsBlock = translateFromTo(workshopSettingsBlock, clientLang, targetLang);

    let tpl = await loadTemplate(targetLang);

    const newRule = buildRule(mapDataBlock, targetLang);
    tpl = replaceMapData(tpl, newRule, targetLang);

    for (const [modeNameLocalized, fullMapEntry] of Object.entries(modeMapNames)) {
      const modeKey         = findModeKey(modeNameLocalized, clientLang);
      const targetModeName  = getTargetModeName(modeKey, targetLang, modeNameLocalized);

      const tokens     = fullMapEntry.trim().split(/\s+/);
      const mapId      = tokens[tokens.length - 1];
      const rawMapName = tokens.slice(0, tokens.length - 1).join(" ");

      let translatedMapName = rawMapName;
      const mapKey = Object.keys(mapNamesTranslations || {}).find(key => {
        const dict = mapNamesTranslations[key];
        return dict && dict[clientLang] === rawMapName;
      });
      if (mapKey && mapNamesTranslations[mapKey][targetLang]) {
        translatedMapName = mapNamesTranslations[mapKey][targetLang];
      } else {
        translatedMapName = translateFromTo(rawMapName, clientLang, targetLang);
      }

      const newFullMapEntry = `${translatedMapName} ${mapId}`;
      tpl = insertMapNameIntoTemplate(tpl, targetModeName, newFullMapEntry, targetLang);
    }

    if (creditsBlock) {
      tpl = insertMapCreditsIntoTemplate(tpl, creditsBlock, targetLang);
    }

    const isValidator = parseBasicMapValidator(fullText);
    tpl = insertBasicMapValidator(tpl, targetLang, !isValidator);

    if (lobbyBlock) {
      tpl = insertLobbyIntoTemplate(tpl, lobbyBlock, targetLang);
    }

    if (workshopSettingsBlock) {
      tpl = insertWorkshopSettings(tpl, workshopSettingsBlock, targetLang);
    }

    if (sourceDiffValue != null) {
      tpl = applyDifficultyValue(tpl, targetLang, String(sourceDiffValue));
    }

    {
      const localized      = getLocalizedOnOff(targetLang);
      const canonicalBans  = standardizeWorkshopBansForTemplate(fullText);
      if (canonicalBans.length) {
        tpl = applyWorkshopBansUpdate(tpl, targetLang, canonicalBans, localized);
      }
    }


    return tpl;
  } catch (e) {
    console.error("[doTranslate] error:", e);
    return fullText;
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
    <label for="mapNameInput" class="modal-label">${t("convertor.map_name")}</label>
    <div class="map-name-input-wrapper">
      <div class="map-name-text-wrapper">
        <input type="text" id="mapNameInput" class="modal-input2"/>
        <div class="map-name-suggestions-container"></div>
      </div>
      <select id="mapVariantSelect" class="modal-select2"></select>
    </div>
  `;
  form.appendChild(rowMapName);

  const rowGlobalBans = document.createElement("div");
  rowGlobalBans.classList.add("modal-row");
  rowGlobalBans.innerHTML = `
    <label class="modal-label">${t("convertor.global_bans")}</label>
    <div id="globalBansContainer" class="bans-container"></div>
  `;
  form.appendChild(rowGlobalBans);

  const rowEditorMode = document.createElement("div");
  rowEditorMode.classList.add("modal-row");
  rowEditorMode.innerHTML = `
    <label for="editorModeToggle" class="modal-label">${t("convertor.editor_mode")}</label>
    <select id="editorModeToggle" class="modal-select">
      <option value="off">${t("convertor.off")}</option>
      <option value="on">${t("convertor.on")}</option>
    </select>
  `;
  form.appendChild(rowEditorMode);

  const rowDifficultyHUD = document.createElement("div");
  rowDifficultyHUD.classList.add("modal-row");
  rowDifficultyHUD.innerHTML = `
    <label for="difficultyHUDSelect" class="modal-label">${t("convertor.difficulty_displayHUD")}</label>
    <select id="difficultyHUDSelect" class="modal-select">
      <option value="playtest">${t("convertor.playtest")}</option>
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
      <option value="off">${t("convertor.dont_display")}</option>
    </select>
  `;
  form.appendChild(rowDifficultyHUD);

  const rowPlaytest = document.createElement("div");
  rowPlaytest.classList.add("modal-row");
  rowPlaytest.innerHTML = `
    <label for="playtestToggle" class="modal-label">${t("convertor.playtest_display")}</label>
    <select id="playtestToggle" class="modal-select">
      <option value="off">${t("convertor.off")}</option>
      <option value="on">${t("convertor.on")}</option>
    </select>
  `;
  form.appendChild(rowPlaytest);

  const rowValidator = document.createElement("div");
  rowValidator.classList.add("modal-row");
  rowValidator.innerHTML = `
    <label for="validatorToggle" class="modal-label">${t("convertor.basic_validator")}</label>
    <select id="validatorToggle" class="modal-select">
      <option value="off">${t("convertor.off")}</option>
      <option value="on">${t("convertor.on")}</option>
    </select>
  `;
  form.appendChild(rowValidator);

  const rowPortals = document.createElement("div");
  rowPortals.classList.add("modal-row");
  rowPortals.innerHTML = `
    <label for="portalsToggle" class="modal-label">${t("convertor.enable_portals")}</label>
    <select id="portalsToggle" class="modal-select">
      <option value="off">${t("convertor.off")}</option>
      <option value="on">${t("convertor.on")}</option>
    </select>
  `;
  form.appendChild(rowPortals);

  const rowButtons = document.createElement("div");
  rowButtons.classList.add("modal-buttons2");
  rowButtons.innerHTML = `
    <button type="button" id="saveGlobalChangesBtn" class="btn btn-save">${t("convertor.save")}</button>
    <button type="button" id="cancelGlobalChangesBtn" class="btn btn-cancel">${t("convertor.cancel")}</button>
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
  btn.textContent = t("convertor.global_settings");
  btn.classList.add("global-edit-mode-btn");
  btn.style.marginLeft = "8px";
  btn.addEventListener("click", openGlobalSettingsModal);

  globalInfos.appendChild(btn);
}

async function openGlobalSettingsModal() {
  const modal = document.getElementById("globalSettingsModal");
  if (!modal) return;

  buildGlobalSettingsFormFields();

  const modeMapNames = extractModeMapNames(lastFullText || "");
  const fullEntries  = Object.values(modeMapNames);

  const mapNameInput  = document.getElementById("mapNameInput");
  mapNameInput.setAttribute("autocomplete", "off");
  document.getElementById("globalSettingsForm").setAttribute("autocomplete", "off");
  const variantSelect = document.getElementById("mapVariantSelect");

  if (fullEntries.length === 0) {
    mapNameInput.value      = "(No map name detected)";
    variantSelect.innerHTML = "";
  }
  else {
    const fullMapEntry = fullEntries[0].trim();
    const tokens       = fullMapEntry.split(/\s+/);
    const rawId        = tokens[tokens.length - 1];
    const rawName      = tokens.slice(0, tokens.length - 1).join(" ");

    console.log("DEBUG mapName rawName =", rawName, "rawId =", rawId);

    await loadMapNameTranslations();
    const clientLang = document.getElementById("lang").value || "en-US";
    const targetLang = document.getElementById("targetLang").value || clientLang;

    let mapKeyFound = null;
    for (const key of Object.keys(mapNamesTranslations || {})) {
      const dict = mapNamesTranslations[key];
      if (dict && dict[clientLang] === rawName) {
        mapKeyFound = key;
        break;
      }
    }

    let displayRawName = rawName;
    if (mapKeyFound) {
      const dict    = mapNamesTranslations[mapKeyFound];
      const tName   = dict[targetLang];
      if (tName) {
        displayRawName = tName;
      }
    }
    mapNameInput.value = displayRawName;

    variantSelect.innerHTML = "";
    if (mapKeyFound) {
      const variants = (mapNamesTranslations[mapKeyFound].variants || {});
      Object.entries(variants).forEach(([variantKey, variantId]) => {
        const opt = document.createElement("option");
        opt.textContent = variantKey.charAt(0).toUpperCase() + variantKey.slice(1);
        opt.value       = variantKey;
        if (variantId === rawId) opt.selected = true;
        variantSelect.appendChild(opt);
      });
    }

  (function initMapNameSuggestions() {
    const mapNameInput  = document.getElementById("mapNameInput");
    const wrapper       = mapNameInput.closest(".map-name-input-wrapper");
    let suggestionsContainer = wrapper.querySelector(".map-name-suggestions-container");

    if (!suggestionsContainer) {
      suggestionsContainer = document.createElement("div");
      suggestionsContainer.classList.add("map-name-suggestions-container");
      wrapper.appendChild(suggestionsContainer);
    }

    function clearSuggestions() {
      suggestionsContainer.innerHTML = "";
      suggestionsContainer.style.display = "none";
    }

    function populateVariants(mapKey, selectedId) {
      variantSelect.innerHTML = "";
      const variants = mapNamesTranslations[mapKey].variants || {};
      Object.entries(variants).forEach(([variantKey, variantId]) => {
        const opt = document.createElement("option");
        opt.value       = variantKey;
        opt.textContent = variantKey.charAt(0).toUpperCase() + variantKey.slice(1);
        if (String(variantId) === String(selectedId)) opt.selected = true;
        variantSelect.appendChild(opt);
      });
    }

    mapNameInput.addEventListener("input", () => {
      const filter = mapNameInput.value.trim().toLowerCase();
      clearSuggestions();
      if (filter.length < 2) return;

      const clientLang = document.getElementById("lang").value || "en-US";
      const matches = Object.entries(mapNamesTranslations)
        .filter(([, dict]) => (dict[clientLang] || "").toLowerCase().includes(filter))
        .slice(0, 10);

      if (!matches.length) return;

      matches.forEach(([mapKey, dict]) => {
        const item = document.createElement("div");
        item.classList.add("suggestion-item");
        item.textContent = dict[clientLang];
        item.addEventListener("mousedown", () => {
          const fullEntries = Object.values(extractModeMapNames(lastFullText || ""));
          const rawId = fullEntries[0]?.split(/\s+/).pop();
          mapNameInput.value = dict[clientLang];
          populateVariants(mapKey, rawId);
          clearSuggestions();
        });
        suggestionsContainer.appendChild(item);
      });

      suggestionsContainer.style.display = "block";
    });

    mapNameInput.addEventListener("blur", () => {
      setTimeout(clearSuggestions, 100);
    });

    mapNameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const clientLang = document.getElementById("lang").value || "en-US";
        const typed = mapNameInput.value.trim();
        const found = Object.entries(mapNamesTranslations)
          .find(([, dict]) => dict[clientLang] === typed);
        if (found) {
          const [mapKey] = found;
          const fullEntries = Object.values(extractModeMapNames(lastFullText || ""));
          const rawId = fullEntries[0]?.split(/\s+/).pop();
          populateVariants(mapKey, rawId);
        }
        clearSuggestions();
      }
    });

    const fullEntries = Object.values(extractModeMapNames(lastFullText || ""));
    if (fullEntries.length) {
      const rawId   = fullEntries[0].split(/\s+/).pop();
      const clientLang = document.getElementById("lang").value || "en-US";
      const rawName    = fullEntries[0].split(/\s+/).slice(0, -1).join(" ");
      const foundKey = Object.entries(mapNamesTranslations)
        .find(([, dict]) => dict[clientLang] === rawName)?.[0];
      if (foundKey) populateVariants(foundKey, rawId);
    }
  })();

  }

  const validatorOn    = parseBasicMapValidator(lastFullText || "");
  const activeBansRaw = parseGlobalWorkshopBans(lastFullText || "");
  const activeKeys    = new Set(activeBansRaw.map(normalizeBanKey));

  const globalBansContainer = document.getElementById("globalBansContainer");
  globalBansContainer.innerHTML = "";
  globalBansContainer.style.display            = "grid";
  globalBansContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(220px, 1fr))";
  globalBansContainer.style.gap                = "8px";
  GLOBAL_BANS.forEach(fullBanName => {
    const label = document.createElement("label");
    label.classList.add("ban-label");
    Object.assign(label.style, {
      display:       "flex",
      alignItems:    "center",
      padding:       "6px 10px",
      background:    "#40444b",
      border:        "1px solid #cccccc",
      borderRadius:  "4px",
      cursor:        "pointer",
      userSelect:    "none",
      boxShadow:     "0 1px 2px rgba(0,0,0,0.1)"
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("global-ban-checkbox");
    checkbox.style.marginRight = "6px";
    const key = normalizeBanKey(fullBanName);
    if (activeKeys.has(key)) {
      checkbox.checked = true;
    }

    const spanText = document.createElement("span");
    spanText.textContent   = fullBanName;
    spanText.style.fontSize = "0.9em";
    spanText.style.color    = "#ffffff";

    label.appendChild(checkbox);
    label.appendChild(spanText);
    globalBansContainer.appendChild(label);
  });

  const lang = document.getElementById("lang").value || "en-US";
  const diffValue = extractDifficultyValue(lastFullText || "", lang);
  fillDifficultyFieldsFromValue(diffValue);

  document.getElementById("editorModeToggle").value = lastParsedWorkshopSettings.editorMode ? "on" : "off";
  document.getElementById("validatorToggle").value  = validatorOn ? "on" : "off";
  document.getElementById("portalsToggle").value    = lastParsedWorkshopSettings.portals ? "on" : "off";
  document.getElementById("playtestToggle").value   = lastParsedWorkshopSettings.playtest ? "on" : "off";

  document.getElementById("saveGlobalChangesBtn").addEventListener("click", saveGlobalSettings);
  document.getElementById("cancelGlobalChangesBtn").addEventListener("click", closeGlobalSettingsModal);
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


/* ------- Save Global Settings ------- */
function getNewActiveBans() {
  const checkboxes = document.querySelectorAll(".global-ban-checkbox");
  return Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.parentElement.textContent.trim());
}

function updateGlobalSettingsFromForm() {
  globalSettings.editorMode    = (document.getElementById("editorModeToggle").value === "on");
  globalSettings.difficultyHUD = document.getElementById("difficultyHUDSelect").value;
  globalSettings.playtest      = document.getElementById("playtestToggle").value;
  globalSettings.validator     = document.getElementById("validatorToggle").value;
  globalSettings.portals       = document.getElementById("portalsToggle").value;
}

function resolveMapKeyAndVariant() {
  const rawMapNameVisible = document.getElementById("mapNameInput").value;
  const chosenVariantKey  = document.getElementById("mapVariantSelect").value;
  const clientLang        = document.getElementById("lang").value || "en-US";

  let mapKeyFound = null;
  for (const key of Object.keys(mapNamesTranslations || {})) {
    if (mapNamesTranslations[key][clientLang] === rawMapNameVisible) {
      mapKeyFound = key;
      break;
    }
  }
  let chosenVariantId = null;
  if (mapKeyFound) {
    chosenVariantId = (mapNamesTranslations[mapKeyFound].variants || {})[chosenVariantKey] || null;
  }

  return { rawMapNameVisible, mapKeyFound, chosenVariantId };
}

function getLocalizedOnOff(clientLang) {
  switch (clientLang) {
    case "zh-CN": return { on: "开启", off: "关闭" };
    case "ja-JP": return { on: "ON",   off: "OFF" };
    case "ko-KR": return { on: "활성화", off: "비활성화" };
    case "ru-RU": return { on: "Вкл.", off: "Выкл." };
    case "es-MX": return { on: "Activado",   off: "Desactivado" };
    case "pt-BR": return { on: "Ligado",     off: "Desligado" };
    case "de-DE": return { on: "Ein",        off: "Aus" };
    default:      return { on: "On",         off: "Off" };
  }
}

function applyOnOffReplacements(text, localized, settings) {
  const editorVal   = settings.editorMode ? localized.on : localized.off;
  const playtestVal = settings.playtest === "on" ? localized.on : localized.off;
  const portalsVal  = settings.portals === "on" ? localized.on : localized.off;

  const RULES = [
    { label: "Editor mode - 作图模式", value: editorVal },
    { label: "Playtest display - 游戏测试", value: playtestVal },
    { label: "enable portals control maps - 启用传送门 占点地图", value: portalsVal },
  ];

  const ON_OFF_WORD = "(?:on|off|开启|关闭|활성화|비활성화|вкл\\.|выкл\\.|activado|desactivado|ligado|desligado|ein|aus)";

  const reBlock = new RegExp(
    String.raw`(^[ \t]*(?:workshop|地图工坊|ワークショップ)\s*\{)([\s\S]*?)(^\s*\})`,
    "mi"
  );
  const m = reBlock.exec(text);

  const esc = s => s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  if (m) {
    const pOpen  = m[1];
    let   inner  = m[2];
    const pClose = m[3];

    const missingLines = [];
    for (const { label, value } of RULES) {
      const labelPat = esc(label).replace(/\s+/g, "\\s*");
      const reLine   = new RegExp(String.raw`^([ \t]*)(${labelPat})\s*[:：]\s*${ON_OFF_WORD}\s*$`, "mi");

      if (reLine.test(inner)) {
        inner = inner.replace(reLine, (full, indent, foundLabel) => `${indent}${foundLabel} : ${value}`);
      } else {
        missingLines.push({ label, value });
      }
    }

    if (missingLines.length === 0) {
      return text.slice(0, m.index) + pOpen + inner + pClose + text.slice(m.index + m[0].length);
    }

    let indent = "    ";
    const lines = inner.split(/\r?\n/);
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim() !== "") {
        const mm = lines[i].match(/^([ \t]*)/);
        if (mm && mm[1] != null) indent = mm[1];
        break;
      }
    }

    let newInner = inner;
    if (!/\n$/.test(newInner)) newInner += "\n";
    for (const { label, value } of missingLines) {
      newInner += `${indent}${label} : ${value}\n`;
    }

    return text.slice(0, m.index) + pOpen + newInner + pClose + text.slice(m.index + m[0].length);
  }

  const missingAtAll = RULES;
  if (missingAtAll.length > 0) {
    const lines = missingAtAll.map(({ label, value }) => `    ${label} : ${value}`).join("\n");
    const block = `workshop {\n${lines}\n}\n\n`;
    return block + text;
  }

  return text;
}

function applyValidatorToggle(text, clientLang, settings) {
  let disabledWord, ruleWord;
  switch (clientLang) {
    case "zh-CN": disabledWord = "禁用"; ruleWord = "规则"; break;
    case "ja-JP": disabledWord = "無効"; ruleWord = "ルール"; break;
    case "es-MX": disabledWord = "deshabilitado"; ruleWord = "regla"; break;
    case "pt-BR": disabledWord = "desabilitado";   ruleWord = "regra"; break;
    case "de-DE": disabledWord = "deaktiviert";    ruleWord = "regel"; break;
    default:      disabledWord = "disabled";       ruleWord = "rule";
  }

  const titlePattern = 'Addon\\s*\\|\\s*SUB\\s*Basic\\s*Map\\s*Validator[^"]*';
  if (settings.validator === "on") {
    text = text.replace(
      new RegExp(`(?<=^[ \\t]*)${disabledWord}\\s+(${ruleWord}\\s*\\(\\s*"${titlePattern}"\\))`, "mi"),
      "$1"
    );
  } else {
    text = text.replace(
      new RegExp(`(^[ \\t]*)(` +
        `${ruleWord}\\s*\\(\\s*"${titlePattern}"\\)` +
      `)`, "mi"),
      `$1${disabledWord} $2`
    );
  }
  return text;
}

function applyDifficultyIndex(text, clientLang, settings) {
  let idx = DIFFICULTY_MAP.indexOf(settings.difficultyHUD);
  if (idx < 0) idx = DIFFICULTY_MAP.length - 1;

  let comboKeyword;
  switch (clientLang) {
    case "zh-CN":
      comboKeyword = "地图工坊设置组合";
      break;
    case "ja-JP":
      comboKeyword = "ワークショップ設定コンボ";
      break;
    case "es-MX":
      comboKeyword = "Combinado de la configuración del Workshop";
      break;
    case "pt-BR":
      comboKeyword = "Caixa de Combinação de Configurações do Workshop";
      break;
    default:
      comboKeyword = "Workshop Setting Combo";
  }

  const escapedKeyword = comboKeyword.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  const re = new RegExp(
    `(${escapedKeyword}\\s*\\([\\s\\S]*?,\\s*)(\\d+)(\\s*\\))`,
    "i"
  );

  return text.replace(re, `$1${idx}$3`);
}

function applyMapEntryUpdate(text, resolution) {
  const { rawMapNameVisible, mapKeyFound, chosenVariantId } = resolution;
  if (!mapKeyFound || !chosenVariantId) return text;

  const newFullMapEntry = `${rawMapNameVisible} ${chosenVariantId}`;
  const lang = document.getElementById("lang")?.value || "en-US";

  const SKIRMISH_NAMES = {
    "en-US": "Skirmish",
    "de-DE": "Übungsgefecht",
    "es-ES": "Escaramuza",
    "es-MX": "Escaramuza",
    "fr-FR": "Échauffement",
    "it-IT": "Schermaglia",
    "ja-JP": "スカーミッシュ",
    "ko-KR": "연습 전투",
    "pl-PL": "Potyczka",
    "pt-BR": "Confronto",
    "ru-RU": "Разминка",
    "th-TH": "บู๊ซ้อมรบ",
    "tr-TR": "Müsademe",
    "zh-CN": "突击模式",
    "zh-TW": "衝突戰"
  };
  const skirmish = SKIRMISH_NAMES[lang] || SKIRMISH_NAMES["en-US"];
  const enabledMapsPattern = `(?:enabled\\s+maps|mapas\\s+habilitados|mapas\\s+ativados|verfügbare\\s+karten|启用地图|有効なマップ)`;

  const reAll = new RegExp(`${enabledMapsPattern}\\s*\\{[\\s\\S]*?\\}`, "gi");
  text = text.replace(reAll, match => {
    return match.replace(/\{[\s\S]*\}/, "{\n\n}");
  });

  const reSkirmish = new RegExp(
    `(${skirmish.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\s*\\{[\\s\\S]*?` +
    `${enabledMapsPattern}\\s*\\{)([\\s\\S]*?)(\\})`,
    "i"
  );

  text = text.replace(reSkirmish, (_, p1, _oldContent, p3) => {
    return `${p1}\n    ${newFullMapEntry}\n${p3}`;
  });

  return text;
}

function applyWorkshopBansUpdate(text, clientLang, newActiveBans, localized) {
  const banOnValue = localized.on;
  const ON_OFF_WORD = "(?:on|off|开启|关闭|활성화|비활성화|вкл\\.|выкл\\.|activado|desactivado|ligado|desligado|ein|aus)";

  const reBlock = new RegExp(
    String.raw`(^[ \t]*(?:workshop|地图工坊|ワークショップ)\s*\{)([\s\S]*?)(^\s*\})`,
    "mi"
  );

  return text.replace(reBlock, (match, pOpen, inner, pClose) => {
    const lines = inner.split(/\r?\n/);

    const reBanRequire = new RegExp(
      String.raw`^\s*(?:ban|require)\s+[^:：]+[:：]\s*${ON_OFF_WORD}\s*$`,
      "i"
    );
    const kept = lines.filter(line => !reBanRequire.test(line));

    let indent = "    ";
    const mIndent = inner.match(/^[ \t]+/m);
    if (mIndent && mIndent[0]) indent = mIndent[0];

    const bansText = (newActiveBans && newActiveBans.length)
      ? newActiveBans.map(n => `${indent}${n}: ${banOnValue}`).join("\n")
      : "";

    const keptTrimmed = kept.join("\n").trim();
    let rebuilt = "";
    if (bansText && keptTrimmed) {
      rebuilt = `\n${bansText}\n${keptTrimmed}\n`;
    } else if (bansText) {
      rebuilt = `\n${bansText}\n`;
    } else if (keptTrimmed) {
      rebuilt = `\n${keptTrimmed}\n`;
    } else {
      rebuilt = `\n`;
    }

    return `${pOpen}${rebuilt}${pClose}`;
  });
}


async function saveGlobalSettings() {
  const clientLang     = document.getElementById("lang").value || "en-US";
  const textarea       = document.querySelector(".mapdata");
  const originalText   = textarea.value;

  const newActiveBans  = getNewActiveBans();
  updateGlobalSettingsFromForm();
  const resolution     = resolveMapKeyAndVariant();
  const localized      = getLocalizedOnOff(clientLang);

  let text = originalText;
  text = applyOnOffReplacements(text, localized, globalSettings);
  text = applyValidatorToggle(text, clientLang, globalSettings);
  const wanted = (globalSettings.playtest === "on") ? "playtest" : globalSettings.difficultyHUD;
  text = applyDifficultyValue(text, clientLang, wanted);
  text = applyMapEntryUpdate(text, resolution);
  text = applyWorkshopBansUpdate(text, clientLang, newActiveBans, localized);

  textarea.value = text;
  lastFullText   = text;
  renderMapSettings(text);
  console.log("✅ globalSettings sauvegardés :", {
    ...globalSettings,
    activeGlobalBans: newActiveBans,
    mapKey:           resolution.mapKeyFound,
    variantId:        resolution.chosenVariantId
  });
  closeGlobalSettingsModal();
  showConfirmationMessage("Settings have been saved");
}

/* ------- Modal editor mode ------- */
function openEditModal(idx) {
  editIndex = idx;
  const modal = document.getElementById("editModal");
  const fieldsContainer = document.getElementById("editFieldsContainer");
  fieldsContainer.innerHTML = "";

  const checkpoint = currentDataModel.checkpoints[idx];
  const tp         = currentDataModel.teleportMap[idx];
  const coords     = tp ? tp.start : currentDataModel.checkpoints[idx];
  const kills      = currentDataModel.killMap[idx]   || [];
  const pins       = currentDataModel.pinMap[idx]    || [];
  const abilities  = currentDataModel.abilityMap[idx] || {};
  const banMap     = currentDataModel.banMap;

  const portalStarts = currentDataModel.CustomPortalStart[idx]    || [];
  const portalEnds   = currentDataModel.CustomPortalEndpoint[idx] || [];
  const cpValue      = currentDataModel.CustomPortalCP[idx] != null ? currentDataModel.CustomPortalCP[idx] : idx;

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.textContent = t("convertor.coordinates");
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    const coordRow = document.createElement("div");
    coordRow.classList.add("orb-row");

    const inX = document.createElement("input");
    inX.type = "number"; inX.step = "0.001"; inX.value = coords.x; inX.id = "editCoordX";
    coordRow.appendChild(inX);

    const inY = document.createElement("input");
    inY.type = "number"; inY.step = "0.001"; inY.value = coords.y; inY.id = "editCoordY";
    coordRow.appendChild(inY);

    const inZ = document.createElement("input");
    inZ.type = "number"; inZ.step = "0.001"; inZ.value = coords.z; inZ.id = "editCoordZ";
    coordRow.appendChild(inZ);

    wrapper.appendChild(coordRow);
    fieldsContainer.appendChild(wrapper);
  }

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.classList.add("sub-header");
    title.textContent = t("convertor.teleport");
    title.style.fontWeight = "600";
    title.style.margin = "8px 0 4px";
    wrapper.appendChild(title);

    if (tp) {
      const row = document.createElement("div");
      row.classList.add("orb-row");
      row.dataset.tpKind = "start-end";

      const startDifferent =
        !(tp.start.x === checkpoint.x && tp.start.y === checkpoint.y && tp.start.z === checkpoint.z);
      if (startDifferent) {
        ["x","y","z"].forEach(axis => {
          const inp = document.createElement("input");
          inp.type = "number"; inp.step = "0.001";
          inp.value = tp.start[axis];
          inp.classList.add(`tp-start-${axis}`);
          row.appendChild(inp);
        });
      }

      ["x","y","z"].forEach(axis => {
        const inp = document.createElement("input");
        inp.type = "number"; inp.step = "0.001";
        inp.value = tp.end[axis];
        inp.classList.add(`tp-end-${axis}`);
        row.appendChild(inp);
      });

      const btnDelTp = document.createElement("button");
      btnDelTp.type = "button";
      btnDelTp.textContent = "–";
      Object.assign(btnDelTp.style, {
        marginLeft:  "8px",
        padding:     "4px",
        background:  "#c62828",
        color:       "#fff",
        border:      "none",
        borderRadius:"4px",
        cursor:      "pointer"
      });
      btnDelTp.title = "Remove this teleport";
      btnDelTp.addEventListener("click", () => {
        delete currentDataModel.teleportMap[idx];
        openEditModal(idx);
      });
      row.appendChild(btnDelTp);

      wrapper.appendChild(row);
    }
    else {
      const btnAdd = document.createElement("button");
      btnAdd.type = "button";
      btnAdd.textContent = t("convertor.add_teleport");;
      Object.assign(btnAdd.style, {
        marginTop:   "6px",
        padding:     "4px 8px",
        background:  "#8e44ad",
        color:       "#fff",
        border:      "none",
        borderRadius:"4px",
        cursor:      "pointer"
      });
      btnAdd.addEventListener("click", () => {
        const cp = currentDataModel.checkpoints[idx];
        currentDataModel.teleportMap[idx] = {
          start: { x: cp.x, y: cp.y, z: cp.z },
          end:   { x:0, y:0, z:0 }
        };
        openEditModal(idx);
      });
      wrapper.appendChild(btnAdd);
    }

    fieldsContainer.appendChild(wrapper);
  }

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.classList.add("sub-header");
    title.textContent = t("convertor.kill_orbs");
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    kills.forEach((kb, i) => {
      const row = document.createElement("div");
      row.classList.add("orb-row");
      row.dataset.orbIndex = i;

      ["x","y","z"].forEach(axis => {
        const inp = document.createElement("input");
        inp.type = "number"; inp.step = "0.001";
        inp.value = kb.pos[axis];
        inp.classList.add(`kill-${axis}`);
        row.appendChild(inp);
      });
      const kr = document.createElement("input");
      kr.type = "number"; kr.step = "0.001";
      kr.value = kb.radius != null ? kb.radius : 0;
      kr.classList.add("kill-r");
      row.appendChild(kr);

      const btnDel = document.createElement("button");
      btnDel.type = "button"; btnDel.textContent = "–"; btnDel.title = "Remove this kill orb";
      Object.assign(btnDel.style, {
        background: "#c62828", color: "#fff", border: "none",
        borderRadius: "4px", width: "24px", cursor: "pointer"
      });
      btnDel.addEventListener("click", () => row.remove());
      row.appendChild(btnDel);

      wrapper.appendChild(row);
    });

    const addKillBtn = document.createElement("button");
    addKillBtn.type = "button"; addKillBtn.textContent = t("convertor.add_kill_orb");
    Object.assign(addKillBtn.style, {
      marginTop: "6px", padding: "4px 8px", background: "#1976d2",
      color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"
    });
    addKillBtn.addEventListener("click", () => {
      const row = document.createElement("div");
      row.classList.add("orb-row");
      ["kill-x","kill-y","kill-z","kill-r"].forEach(cls => {
        const inp = document.createElement("input");
        inp.type = "number"; inp.step = "0.001"; inp.value = 0;
        inp.classList.add(cls);
        row.appendChild(inp);
      });
      const btnDel = document.createElement("button");
      btnDel.type = "button"; btnDel.textContent = "–";
      Object.assign(btnDel.style, {
        background: "#c62828", color: "#fff", border: "none",
        borderRadius: "4px", width: "24px", cursor: "pointer"
      });
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
    title.classList.add("sub-header");
    title.textContent = t("convertor.bounce_orbs");
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    pins.forEach((pb, i) => {
      const row = document.createElement("div");
      row.classList.add("orb-row");
      row.dataset.pinIndex = i;

      ["x","y","z","f"].forEach((fld, ix) => {
        const inp = document.createElement("input");
        inp.type = "number"; inp.step = "0.001";
        inp.value = fld === "f" ? pb.force : pb.pos[fld];
        inp.classList.add(`pin-${fld}`);
        row.appendChild(inp);
      });

      ["locked","ult5","ult6"].forEach(flag => {
        const label = document.createElement("label");
        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.checked = pb[
          flag === "locked" ? "locked" :
          flag === "ult5"   ? "givesUlt5" :
                              "givesUlt6"
        ];
        chk.classList.add(`pin-${flag}`);
        label.appendChild(chk);
        label.appendChild(document.createTextNode(
          flag === "locked" ? t("convertor.lock_orb") :
          flag === "ult5"   ? t("convertor.ultimate")  : t("convertor.dash")
        ));
        row.appendChild(label);
      });

      const btnDel = document.createElement("button");
      btnDel.type = "button"; btnDel.textContent = "–";
      Object.assign(btnDel.style, {
        background: "#c62828", color: "#fff", border: "none",
        borderRadius: "4px", width: "24px", cursor: "pointer"
      });
      btnDel.addEventListener("click", () => row.remove());
      row.appendChild(btnDel);

      wrapper.appendChild(row);
    });

    const addPinBtn = document.createElement("button");
    addPinBtn.type = "button"; addPinBtn.textContent = t("convertor.add_bounce_orb");
    Object.assign(addPinBtn.style, {
      marginTop: "6px", padding: "4px 8px", background: "#1976d2",
      color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"
    });
    addPinBtn.addEventListener("click", () => {
      const row = document.createElement("div");
      row.classList.add("orb-row");
      ["pin-x","pin-y","pin-z","pin-f"].forEach(cls => {
        const inp = document.createElement("input");
        inp.type = "number"; inp.step = "0.001"; inp.value = 0;
        inp.classList.add(cls);
        row.appendChild(inp);
      });
      ["pin-locked","pin-ult5","pin-ult6"].forEach(cls => {
        const label = document.createElement("label");
        const chk = document.createElement("input");
        chk.type = "checkbox"; chk.classList.add(cls);
        label.appendChild(chk);
        label.appendChild(document.createTextNode(
          cls === "pin-locked" ? t("convertor.lock_orb") :
          cls === "pin-ult5"   ? t("convertor.ultimate")  : t("convertor.dash")
        ));
        row.appendChild(label);
      });
      const btnDel = document.createElement("button");
      btnDel.type = "button"; btnDel.textContent = "–";
      Object.assign(btnDel.style, {
        background: "#c62828", color: "#fff", border: "none",
        borderRadius: "4px", width: "24px", cursor: "pointer"
      });
      btnDel.addEventListener("click", () => row.remove());
      row.appendChild(btnDel);
      wrapper.appendChild(row);
    });
    wrapper.appendChild(addPinBtn);

    fieldsContainer.appendChild(wrapper);
  }

  {
    const w = document.createElement("div");
    const r = document.createElement("div");
    r.classList.add("sub-header");
    r.textContent = t("convertor.custom_portals");
    r.style.cssText = "font-weight:600;margin-bottom:4px;";
    w.appendChild(r);

    portalStarts.forEach((start, i) => {
      const block = document.createElement("div");
      block.classList.add("portal-block");
      block.dataset.portalIndex = i;
      block.style.marginBottom = "8px";

      const hdr = document.createElement("div");
      hdr.textContent = `#${i+1}`;
      hdr.style.fontWeight = "500";
      block.appendChild(hdr);

      ["Start","End"].forEach(kind => {
        const row = document.createElement("div");
        row.textContent = `${kind}:`;
        block.appendChild(row);
        ["X","Y","Z"].forEach(axis => {
          const inp = document.createElement("input");
          inp.type="number"; inp.step="0.001";
          const src = kind==="Start" ? portalStarts : portalEnds;
          const obj = src[i] || {x:0,y:0,z:0};
          inp.value = obj[axis.toLowerCase()];
          inp.id    = `portal${kind}${axis}_${i}`;
          inp.style.marginRight = "4px";
          block.appendChild(inp);
        });
        block.appendChild(document.createElement("br"));
      });

      const cpRow = document.createElement("div");
      cpRow.style.margin = "4px 0 6px";
      const lbl = document.createElement("label");
      lbl.textContent = "CP:";
      lbl.style.marginRight = "8px";
      const cpInp = document.createElement("input");
      cpInp.type="number"; cpInp.step="1"; cpInp.value=cpValue;
      cpInp.id = `portalCP_${i}`;
      cpInp.style.width="60px";
      cpRow.appendChild(lbl);
      cpRow.appendChild(cpInp);
      block.appendChild(cpRow);

      const del = document.createElement("button");
      del.type="button"; del.textContent="–";
      del.style.cssText="background:#c62828;color:#fff;border:none;border-radius:4px;padding:2px 6px;cursor:pointer;";
      del.addEventListener("click", ()=> block.remove());
      block.appendChild(del);

      w.appendChild(block);
    });

    const add = document.createElement("button");
    add.type="button";
    add.textContent= t("convertor.add_portal");
    add.style.cssText="margin-top:6px;padding:4px 8px;background:#1976d2;color:#fff;border:none;border-radius:4px;cursor:pointer;";
    add.addEventListener("click", () => {
      portalStarts.push({x:0,y:0,z:0});
      portalEnds.push(  {x:0,y:0,z:0});
      currentDataModel.CustomPortalStart[idx]    = portalStarts;
      currentDataModel.CustomPortalEndpoint[idx] = portalEnds;
      currentDataModel.CustomPortalCP[idx]       = cpValue;
      openEditModal(idx);
    });
    w.appendChild(add);

    fieldsContainer.appendChild(w);
  }

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.classList.add("sub-header");
    title.textContent = t("convertor.abilities");
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    ["ultimate","dash"].forEach(key => {
      const label = document.createElement("label");
      const chk   = document.createElement("input");
      chk.type    = "checkbox";
      chk.checked = !!abilities[key];
      chk.id      = `editAbility${key.charAt(0).toUpperCase() + key.slice(1)}`;
      label.appendChild(chk);
      label.appendChild(document.createTextNode(
        key === "ultimate" ? t("convertor.ultimate_available") : t("convertor.dash_available")
      ));
      wrapper.appendChild(label);
    });
    fieldsContainer.appendChild(wrapper);
  }

  {
    const wrapper = document.createElement("div");
    const title   = document.createElement("div");
    title.classList.add("sub-header");
    title.textContent = t("convertor.cp_specific_bans");
    title.style.fontWeight = "600";
    title.style.marginBottom = "4px";
    wrapper.appendChild(title);

    Object.entries(banMap).forEach(([banKey, arr]) => {
      const label = document.createElement("label");
      const chk   = document.createElement("input");
      chk.type    = "checkbox";
      chk.checked = arr.includes(idx);
      chk.classList.add(`edit-ban-${banKey}`);
      label.appendChild(chk);
      label.appendChild(document.createTextNode(banKey));
      wrapper.appendChild(label);
    });
    fieldsContainer.appendChild(wrapper);
  }
  
  {
    const buttonsContainer = modal.querySelector('.modal-buttons3');
    if (!buttonsContainer.querySelector('.delete-checkpoint-btn')) {
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = t("convertor.remove_checkpoint");
      deleteBtn.classList.add("delete-checkpoint-btn");
      buttonsContainer.insertBefore(deleteBtn, buttonsContainer.firstChild);
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deleteCheckpoint(editIndex);
      });
    }
  }

  document.getElementById("closeModal2").onclick = () => modal.style.display = "none";
  window.addEventListener("click", onWindowClickForEditorModal);
  document.getElementById("cancelEditorChangesBtn").addEventListener("click", () => {
    modal.style.display = "none";
    showErrorMessage("Changes have been cancelled");
  });

  modal.style.display = "flex";
}

function onWindowClickForEditorModal(e) {
  const modal = document.getElementById("editModal");
  if (e.target === modal) {
    closeSettingsModal();
  }
}

function closeSettingsModal() {
  const modal = document.getElementById("editModal");
  if (modal) {
    modal.style.display = "none";
    window.removeEventListener("click", onWindowClickForEditorModal);
  }
}

function applyEditorModalToModel() {
  const idx = editIndex;
  if (idx == null) return;

  const newX = parseFloat(document.getElementById("editCoordX").value) || 0;
  const newY = parseFloat(document.getElementById("editCoordY").value) || 0;
  const newZ = parseFloat(document.getElementById("editCoordZ").value) || 0;
  currentDataModel.checkpoints[idx] = { x: newX, y: newY, z: newZ };

  const endEls = document.querySelectorAll(".tp-end-x");
  if (endEls.length) {
    const checkpoint = currentDataModel.checkpoints[idx];
    const sxEl = document.querySelector(".tp-start-x");
    const syEl = document.querySelector(".tp-start-y");
    const szEl = document.querySelector(".tp-start-z");
    const s = {
      x: sxEl ? parseFloat(sxEl.value)||0 : checkpoint.x,
      y: syEl ? parseFloat(syEl.value)||0 : checkpoint.y,
      z: szEl ? parseFloat(szEl.value)||0 : checkpoint.z
    };
    const e = {
      x: parseFloat(document.querySelector(".tp-end-x").value)||0,
      y: parseFloat(document.querySelector(".tp-end-y").value)||0,
      z: parseFloat(document.querySelector(".tp-end-z").value)||0
    };
    currentDataModel.teleportMap[idx] = { start: s, end: e };
  } else {
    delete currentDataModel.teleportMap[idx];
  }

  const killRows = Array.from(
    document.querySelectorAll("#editFieldsContainer .orb-row")
  ).filter(r => r.querySelector(".kill-x"));
  currentDataModel.killMap[idx] = killRows.map(row => {
    const x = parseFloat(row.querySelector(".kill-x").value) || 0;
    const y = parseFloat(row.querySelector(".kill-y").value) || 0;
    const z = parseFloat(row.querySelector(".kill-z").value) || 0;
    const r = parseFloat(row.querySelector(".kill-r").value) || 0;
    return { pos: { x, y, z }, radius: r };
  });

  const pinRows = Array.from(
    document.querySelectorAll("#editFieldsContainer .orb-row")
  ).filter(r => r.querySelector(".pin-x"));
  currentDataModel.pinMap[idx] = pinRows.map(row => {
    const x = parseFloat(row.querySelector(".pin-x").value) || 0;
    const y = parseFloat(row.querySelector(".pin-y").value) || 0;
    const z = parseFloat(row.querySelector(".pin-z").value) || 0;
    const f = parseFloat(row.querySelector(".pin-f").value) || 0;
    const locked   = row.querySelector(".pin-locked").checked;
    const givesUlt5 = row.querySelector(".pin-ult5").checked;
    const givesUlt6 = row.querySelector(".pin-ult6").checked;
    return { pos: { x, y, z }, force: f, locked, givesUlt5, givesUlt6 };
  });

  const ultChk  = document.getElementById("editAbilityUltimate").checked;
  const dashChk = document.getElementById("editAbilityDash").checked;
  currentDataModel.abilityMap[idx] = { ultimate: ultChk, dash: dashChk };

  Object.keys(currentDataModel.banMap).forEach(banKey => {
    const cb = document.querySelector(".edit-ban-" + banKey);
    if (!cb) return;
    const arr       = currentDataModel.banMap[banKey];
    const isChecked = cb.checked;
    const already   = arr.includes(idx);
    if (isChecked && !already) {
      arr.push(idx);
    } else if (!isChecked && already) {
      currentDataModel.banMap[banKey] = arr.filter(n => n !== idx);
    }
  });

  const blocks = Array.from(document.querySelectorAll("#editFieldsContainer .portal-block"));
  const newStarts = [], newEnds = [], newCPs = [];
  blocks.forEach(blk => {
    const i = +blk.dataset.portalIndex;
    const s = {}, e = {};
    ["X","Y","Z"].forEach(ax => {
      s[ax.toLowerCase()] = parseFloat(blk.querySelector(`#portalStart${ax}_${i}`).value) || 0;
      e[ax.toLowerCase()] = parseFloat(blk.querySelector(`#portalEnd${ax}_${i}`).value)   || 0;
    });
    const cp = parseInt(blk.querySelector(`#portalCP_${i}`).value, 10);
    newStarts.push(s);
    newEnds.push(e);
    newCPs.push(isNaN(cp) ? idx : cp);
  });
  currentDataModel.CustomPortalStart[idx]    = newStarts;
  currentDataModel.CustomPortalEndpoint[idx] = newEnds;
  currentDataModel.CustomPortalCP[idx]       = newCPs[0] != null ? newCPs[0] : idx;
  currentDataModel.portalMap[idx] = newStarts.map((start, j) => ({
    start,
    end: newEnds[j],
    cp: newCPs[j] != null ? newCPs[j] : idx
  }));
}

document.getElementById("saveEditorChangesBtn").addEventListener("click", () => {
    applyEditorModalToModel();
    document.getElementById("editModal").style.display = "none";
    saveEditorSettings();
    renderMapSettingsWithModel(currentDataModel);
    showConfirmationMessage("Settings have been saved");
});

function renderMapSettingsWithModel(dataModel) {
  const container           = document.getElementById("mapSettings");
  const editModeBtn         = document.getElementById("editModeBtn");
  const globalSettingsBtn   = document.getElementById("globalSettingsBtn");
  const globalInfos         = container.querySelector(".global-infos");

  if (editModeBtn && editModeBtn.parentNode) {
    editModeBtn.parentNode.removeChild(editModeBtn);
  }
  if (globalSettingsBtn && globalSettingsBtn.parentNode) {
    globalSettingsBtn.parentNode.removeChild(globalSettingsBtn);
  }

  container.innerHTML = "";

  globalInfos.innerHTML = "";
  globalInfos.classList.remove("no-bans");

  let settingsButtons = globalInfos.querySelector(".settings-buttons");
  if (!settingsButtons) {
    settingsButtons = document.createElement("div");
    settingsButtons.classList.add("settings-buttons");
  } else {
    settingsButtons.innerHTML = "";
  }

  if (editModeBtn) {
    settingsButtons.appendChild(editModeBtn);
  }
  if (globalSettingsBtn) {
    settingsButtons.appendChild(globalSettingsBtn);
  }


  if (editModeBtn && !editModeBtn.dataset.listenerInstalled) {
    editModeBtn.dataset.listenerInstalled = "true";
    editModeBtn.addEventListener("click", () => {
      isEditMode = !isEditMode;
      editModeBtn.textContent = isEditMode ? t("convertor.exit_edit") : t("convertor.edit_mode");
      document.querySelectorAll(".checkpoint-card").forEach(card => {
        card.classList.toggle("editable", isEditMode);
        card.querySelectorAll(".move-controls button").forEach(btn => {
          btn.disabled = !isEditMode;
        });
      });
    });
  }

  if (editModeBtn) {
    editModeBtn.textContent = isEditMode ? t("convertor.exit_edit") : t("convertor.edit_mode");
  }
  if (!settingsButtons.contains(globalSettingsBtn)) {
    settingsButtons.appendChild(globalSettingsBtn);
  }

  const bansIconsEl = renderGlobalBans(lastFullText);
  if (bansIconsEl) {
    globalInfos.appendChild(bansIconsEl);
    globalInfos.classList.remove("no-bans");
  } else {
    globalInfos.classList.add("no-bans");
  }

  container.appendChild(globalInfos);
  globalInfos.appendChild(settingsButtons);

  if (!dataModel.checkpoints || dataModel.checkpoints.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = t("convert.mapdata_error");
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

/* ------- Save & delete editor mode ------- */
function updateMapDataRule(dataModel, lang) {
  const dicts = {
    "default": { G: "Global",    A: "Array",    V: "Vector",    T: "True", F: "False" },
    "zh-CN":   { G: "全局",       A: "数组",      V: "矢量",       T: "真",    F: "假"    },
    "ja-JP":   { G: "グローバル", A: "配列",      V: "ベクトル",   T: "True", F: "False" }
  };
  const { G, A, V, T, F } = dicts[lang] || dicts["default"];

  const lines = [];

  const arrA = [];
  dataModel.checkpoints.forEach((c, i) => {
    const tp = dataModel.teleportMap[i];
    if (tp) {
      const Astart = `${V}(${tp.start.x.toFixed(3)}, ${tp.start.y.toFixed(3)}, ${tp.start.z.toFixed(3)})`;
      const Aend   = `${V}(${tp.end.x.toFixed(3)},   ${tp.end.y.toFixed(3)},   ${tp.end.z.toFixed(3)})`;
      arrA.push(`${A}(${Astart}, ${Aend})`);
    } else {
      arrA.push(`${V}(${c.x.toFixed(3)}, ${c.y.toFixed(3)}, ${c.z.toFixed(3)})`);
    }
  });

  lines.push(`${G}.A = ${A}(${arrA.join(', ')});`);

  const arrH = [], arrI = [], arrKillNum = [];
  dataModel.checkpoints.forEach((_, idx) => {
    (dataModel.killMap[idx] || []).forEach(kb => {
      const x = Number.isFinite(kb?.pos?.x) ? kb.pos.x : 0;
      const y = Number.isFinite(kb?.pos?.y) ? kb.pos.y : 0;
      const z = Number.isFinite(kb?.pos?.z) ? kb.pos.z : 0;
      const r = Number.isFinite(kb.radius)      ? kb.radius   : 0;
      arrH.push(`${V}(${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)})`);
      arrI.push(r.toFixed(3));
      arrKillNum.push(idx);
    });
  });
  lines.push(`${G}.H = ${A}(${arrH.join(', ')});`);
  lines.push(`${G}.I = ${A}(${arrI.join(', ')});`);
  lines.push(`${G}.killballnumber = ${A}(${arrKillNum.join(', ')});`);

  const arrDao   = Object.entries(dataModel.abilityMap || {})
    .filter(([,a]) => a && a.ultimate)
    .map(([i]) => i);
  const arrShift = Object.entries(dataModel.abilityMap || {})
    .filter(([,a]) => a && a.dash)
    .map(([i]) => i);
  lines.push(`${G}.Dao   = ${A}(${arrDao.join(', ')});`);
  lines.push(`${G}.SHIFT = ${A}(${arrShift.join(', ')});`);

  lines.push(`${G}.EditSelectIdArray = ${A}();`);

  const arrTQ     = [], arrEM = [], arrT5 = [], arrT6 = [], arrBTL = [], arrPinNum = [];
  dataModel.checkpoints.forEach((_, idx) => {
    (dataModel.pinMap[idx] || []).forEach(pb => {
      const x = Number.isFinite(pb?.pos?.x)  ? pb.pos.x    : 0;
      const y = Number.isFinite(pb?.pos?.y)  ? pb.pos.y    : 0;
      const z = Number.isFinite(pb?.pos?.z)  ? pb.pos.z    : 0;
      const f = Number.isFinite(pb.force)    ? pb.force    : 0;
      arrTQ.push(`${V}(${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)})`);
      arrEM.push(f.toFixed(3));
      arrT5.push(pb.givesUlt5 ? T : F);
      arrT6.push(pb.givesUlt6 ? T : F);
      arrBTL.push(pb.locked   ? T : F);
      arrPinNum.push(idx);
    });
  });

  const ps = [], pe = [], pc = [];
  dataModel.checkpoints.forEach((_,i) => {
    (dataModel.CustomPortalStart[i]||[]).forEach((v,j) => {
      ps.push(`${V}(${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)})`);
      const e = (dataModel.CustomPortalEndpoint[i]||[])[j]||{x:0,y:0,z:0};
      pe.push(`${V}(${e.x.toFixed(3)}, ${e.y.toFixed(3)}, ${e.z.toFixed(3)})`);
      pc.push(dataModel.CustomPortalCP[i]!=null?dataModel.CustomPortalCP[i]:i);
    });
  });

  lines.push(`${G}.TQ               = ${A}(${arrTQ.join(', ')});`);
  lines.push(`${G}.EditMode         = ${A}(${arrEM.join(', ')});`);
  lines.push(`${G}.TQ5              = ${A}(${arrT5.join(', ')});`);
  lines.push(`${G}.TQ6              = ${A}(${arrT6.join(', ')});`);
  lines.push(`${G}.BounceToggleLock = ${A}(${arrBTL.join(', ')});`);
  lines.push(`${G}.pinballnumber    = ${A}(${arrPinNum.join(', ')});`);

  lines.push(`${G}.LeaderBoardFull         = ${A}();`);
  lines.push(`${G}.Difficultyhud           = ${A}(0, ${F});`);

  lines.push(`${G}.CustomPortalStart    = ${A}(${ps.join(", ")});`);
  lines.push(`${G}.CustomPortalEndpoint = ${A}(${pe.join(", ")});`);
  lines.push(`${G}.CustomPortalCP       = ${A}(${pc.join(", ")});`);

  lines.push(`${G}.HudStoreEdit            = ${A}();`);
  lines.push(`${G}.Cachedcredits           = ${A}(0, 0);`);

  for (const [banKey, arr] of Object.entries(dataModel.banMap)) {
    lines.push(`${G}.Ban${banKey} = ${A}(${arr.join(', ')});`);
  }

  return lines.join('\n');
}

function saveEditorSettings() {
  const ta   = document.querySelector('#convertMap textarea.mapdata');
  if (!ta) return;
  const lang = document.getElementById('lang').value || 'en-US';
  const raw  = ta.value;

  const mapdata = updateMapDataRule(currentDataModel, lang);
  const newRule = buildRule(mapdata, lang);

  const replaced = replaceMapData(raw, newRule, lang);
  ta.value     = replaced;
  lastFullText = replaced;
}

function deleteCheckpoint(idx) {
  if (idx == null) return;

  currentDataModel.checkpoints.splice(idx, 1);
  currentDataModel.CustomPortalStart.splice(idx, 1);
  currentDataModel.CustomPortalEndpoint.splice(idx, 1);
  currentDataModel.CustomPortalCP.splice(idx, 1);
  currentDataModel.CustomPortalCP = currentDataModel.CustomPortalCP.map(cp =>
    cp > idx ? cp - 1 : cp
  );

  const newKillMap = {};
  Object.entries(currentDataModel.killMap).forEach(([key, arr]) => {
    const k = Number(key);
    if (k === idx) return;
    const nk = k > idx ? k - 1 : k;
    newKillMap[nk] = arr;
  });
  currentDataModel.killMap = newKillMap;

  const newPinMap = {};
  Object.entries(currentDataModel.pinMap).forEach(([key, arr]) => {
    const k = Number(key);
    if (k === idx) return;
    const nk = k > idx ? k - 1 : k;
    newPinMap[nk] = arr;
  });
  currentDataModel.pinMap = newPinMap;

  const newAbility = {};
  Object.entries(currentDataModel.abilityMap).forEach(([key, val]) => {
    const k = Number(key);
    if (k === idx) return;
    const nk = k > idx ? k - 1 : k;
    newAbility[nk] = val;
  });
  currentDataModel.abilityMap = newAbility;

  Object.keys(currentDataModel.banMap).forEach(banKey => {
    currentDataModel.banMap[banKey] = currentDataModel.banMap[banKey]
      .filter(i => i !== idx)
      .map(i => i > idx ? i - 1 : i);
  });

  const newPortalMap = {};
  currentDataModel.CustomPortalStart.forEach((starts, i) => {
    starts.forEach((start, j) => {
      const end = currentDataModel.CustomPortalEndpoint[i][j];
      const cp  = currentDataModel.CustomPortalCP[i];
      if (!newPortalMap[i]) newPortalMap[i] = [];
      newPortalMap[i].push({ start, end, cp });
    });
  });
  currentDataModel.portalMap = newPortalMap;

  document.getElementById("editModal").style.display = "none";
  saveEditorSettings();
  renderMapSettingsWithModel(currentDataModel);
}

/* ------- Diffchecker ------- */
let lastDefaultTemplate = "";
async function ensureDefaultTemplate(lang) {
  if (!lastDefaultTemplate) {
    lastDefaultTemplate = await loadTemplate(lang);
  }
  return lastDefaultTemplate;
}

async function checkForDiff() {
  const lang = document.getElementById("lang").value || "en-US";
  const defaultTpl = await ensureDefaultTemplate(lang);
  const current   = document.querySelector(".mapdata").value;
  const patch = Diff.createPatch("mapdata", defaultTpl, current, "", "");
  const hasChanges = !/^\(\*\* No changes \*\*\)/m.test(patch) && patch.split("\n").length > 5;
  document.getElementById("diff-btn").style.display = hasChanges ? "inline-block" : "none";
  return patch;
}

const diffBtn     = document.getElementById("diff-btn");
const diffModal   = document.getElementById("diffModal");
const diffContent = document.getElementById("diffContent");

document.querySelector(".modal-close").addEventListener("click", () => diffModal.classList.remove("show"));
window.addEventListener('click', function(event) {
  if (event.target === diffModal) {
    diffModal.classList.remove('show');
  }
});

diffBtn.addEventListener("click", async () => {
  const patch = await checkForDiff();
  const lines = patch
    .split("\n")
    .filter(l => /^[\+\-]{1}[^+\-\-]/.test(l))
    .map(line => {
      const escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const cls = line.startsWith("+")
        ? "added"
        : line.startsWith("-")
        ? "removed"
        : "";
      return `<div class="diff-line ${cls}">${escaped}</div>`;
    });
  diffContent.innerHTML = lines.join("");
  diffModal.classList.add("show");
});
