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
    <script src="js/layout.js" defer></script>
    <script type="module" src="js/convertor.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>

<div class="container">
    <div class="tab-buttons" id="mainTabs">
        <button onclick="selectSection('convertMap')" id="convertMapBtn" class="active">Convert map</button>
        <button onclick="selectSection('help')"      id="helpBtn">Help ?</button>
        <button onclick="selectSection('mapSettings')" id="mapSettingsBtn">Map settings</button>
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
        <button id="convert-btn">convert data</button>

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

        <button id="translate-btn" style="margin-left:0.5em">translate data</button>
      </div>

      <textarea class="mapdata" placeholder="mapdata here"></textarea>

      <div class="footer">Version 1.0</div>
    </div>

    <div id="help" class="content" style="display: none;">
      <h2>Help ?</h2>
      <p>
          Example
      </p>
      <ul>
        <li>Étape 1 : Copy</li>
        <li>Étape 2 : Paste</li>
        <li>Étape 3 : Select client language</li>
        <li>Étape 4 : Click to convert</li>
      </ul>
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
          <button type="button" id="saveChangesBtn">Save</button>
          <button type="button" id="cancelChangesBtn">Cancel</button>
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

</div>

<?php include 'footer.php'; ?>
</body>
</html>
