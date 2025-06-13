<?php
if (!defined('BASE_PATH')) { define('BASE_PATH', __DIR__ . '/'); }
require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($selectedLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Convertor</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/convertor.css">
    <script src="https://cdn.jsdelivr.net/gh/Zezombye/overpy@master/out/overpy_standalone.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/diff@5.1.0/dist/diff.min.js" defer></script>
    <script src="js/layout.js" defer></script>
    <script type="module" src="js/convertor.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>

<div class="container">
  <div class="tab-buttons" id="mainTabs">
      <button onclick="selectSection('convertMap')" id="convertMapBtn" class="active">Convert map</button>
      <button onclick="selectSection('help')"      id="helpBtn">Help ?</button>
      <button onclick="selectSection('mapSettings')" id="mapSettingsBtn">Edit map data</button>
  </div>

  <div id="convertMap" class="convert-map-layout">
    <button class="copy-btn">copy map to clipboard</button>

    <p class="description">
      Experimental feature that attempts to load mapdata from map pasta.<br>
      Copy the entire mode pasta in the text field, select your client language and press convert.<br>
      Only supports data pasted from overwatch. If you copy straight from the web interface, it might not work.<br>
      This is might not import everything and it’s on you to check your map for mistakes in converting.
    </p>

    <div class="import-info">
      <div class="column yes">
        <h3>Yes</h3>
        <ul>
          <li>Checkpoint positions</li>
          <li>Teleports</li>
          <li>Bounce /kill orbs (per cp)</li>
          <li>Ult and dash plugin</li>
          <li>Teams in some modes and numbers</li>
          <li>Workshop bans and bans per cp</li>
        </ul>
      </div>
      <div class="column maybe">
        <h3>Maybe</h3>
        <ul>
          <li>Addons rules</li>
          <li>Sky cp’s (will load, won’t function)</li>
        </ul>
      </div>
      <div class="column no">
        <h3>No</h3>
        <ul>
          <li>Orbs / kills that work for entire map</li>
          <li>Custom added code</li>
          <li>if’s, returns or aborts in rule data</li>
          <li>everything else</li>
        </ul>
      </div>
    </div>

    <div class="convert-controls">
      <label for="lang">Pasta language:</label>
      <select id="lang">
        <option value="en-US">English</option>
        <option value="zh-CN">简体中文</option>
        <option value="ja-JP">日本語</option>
        <option value="ko-KR">한국어</option>
        <option value="ru-RU">Русский</option>
        <option value="es-MX">Español</option>
        <option value="pt-BR">Português</option>
        <option value="de-DE">Deutsch</option>
      </select>
      <button id="convert-btn">Convert data</button>

      <label for="targetLang" style="margin-left:1em">Target language:</label>
      <select id="targetLang">
        <option value="en-US">English</option>
        <option value="zh-CN">简体中文</option>
        <option value="ja-JP">日本語</option>
        <option value="ko-KR">한국어</option>
        <option value="ru-RU">Русский</option>
        <option value="es-MX">Español</option>
        <option value="pt-BR">Português</option>
        <option value="de-DE">Deutsch</option>
      </select>

      <button id="translate-btn" style="margin-left:0.5em">Translate data</button>
      <button id="diff-btn" class="diff-btn" style="display:none;">Diffchecker</button>
    </div>

    <textarea class="mapdata" placeholder="mapdata here"></textarea>

    <div class="footer">Version 1.0</div>
  </div>

  <div id="help" class="content active help-section">
    <div class="help-step">
      <strong>Step 1</strong>
      <p>
        Copy settings from Overwatch.<br>
        Open the workshop editor on code <code>54CRY</code> and configure your map.
        You can also copy the settings from whatever map you want.
      </p>
      <img src="assets/abilities/copy-settings.webp" alt="Copy settings">
    </div>

    <div class="help-step">
      <strong>Step 2</strong>
      <p>
        Paste the settings into the text area below.<br>
      </p>
      <img src="assets/abilities/text-area.webp" alt="Text area">
    </div>

    <div class="help-step">
      <strong>Step 3</strong>
      <p>
        Make sure the “Pasta Language” in the selector matches your Overwatch client language.<br>
        Then choose:
      </p>
      <ul>
        <code>Convert Data</code> to update to the latest framework version, or
        <code>Translate Data</code> to update AND translate your pasta
      </ul>
      <img src="assets/abilities/pasta-language.webp" alt="Language settings">
    </div>

    <div class="help-step">
      <strong>Step 4</strong>
      <p>
        Access the **Edit Map Data** section to tweak your script directly.<br>
        Use the editor controls on the left to move, delete, or modify checkpoints.
      </p>
      <img src="assets/abilities/edit-map-data.webp" alt="Edit map data">
    </div>

    <div class="help-step">
      <strong>Step 5</strong>
      <p>
        Click the “Copy map to clipboard” button.<br>
        Then paste your final map code wherever you need it.
      </p>
      <img src="assets/abilities/pasta-settings.webp" alt="Paste settings">
    </div>
  </div>

  <div id="mapSettings" class="convert-map-layout" style="display: none; flex-direction: column; gap: 8px; padding: 16px; position: relative;">
    <div class="global-infos">
      <div class="global-bans"></div>
      <div class="settings-buttons">
        <button id="globalSettingsBtn" class="global-edit-mode-btn">Global settings</button>
        <button id="editModeBtn" class="edit-mode-btn">Edit mode</button>
      </div>
    </div>

    <div class="empty-message">Please use the converter first</div>
  </div>

  <div id="editModal" class="modal" style="display: none;">
    <div class="modal-content2">
      <span id="closeModal2" class="modal-close2">&times;</span>
      <h3>Edit Checkpoint</h3>
      <form id="editForm">
        <div id="editFieldsContainer"></div>
        <div class="modal-buttons3">
          <button type="button" id="saveEditorChangesBtn">Save</button>
          <button type="button" id="cancelEditorChangesBtn">Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <div id="globalSettingsModal" class="modal" style="display: none;">
    <div class="modal-content2">
      <div class="modal-header">
        <span id="closeModal2" class="modal-close2">&times;</span>
      </div>
      <h3>Global Settings</h3>
      <form id="globalSettingsForm">
        <div class="modal-buttons2">
          <button type="button" id="saveGlobalChangesBtn">Save</button>
          <button type="button" id="cancelGlobalChangesBtn">Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <div id="diffModal" class="modal-diff">
    <div class="modal-content3" style="max-width: 90vw; max-height: 80vh; overflow:auto; background:#2d2f36; padding:20px; border-radius:8px; color:#fff; position:relative;">
      <span class="modal-close" style="position:absolute; top:8px; right:12px; cursor:pointer; font-size:1.5rem; color:#ccc;">&times;</span>
      <pre id="diffContent" style="white-space: pre-wrap; font-family: monospace; font-size:0.9rem;"></pre>
    </div>
  </div>

</div>

<?php include 'footer.php'; ?>
</body>
</html>
