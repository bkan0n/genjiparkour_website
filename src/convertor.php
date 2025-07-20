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
    <button onclick="selectSection('convertMap')" id="convertMapBtn" class="active"><?= htmlspecialchars($translations['convertor']['convert_map']) ?></button>
    <button onclick="selectSection('help')" id="helpBtn"><?= htmlspecialchars($translations['convertor']['help']) ?></button>
    <button onclick="selectSection('mapSettings')" id="mapSettingsBtn"><?= htmlspecialchars($translations['convertor']['edit_map_data']) ?></button>
  </div>

  <div id="convertMap" class="convert-map-layout">
    <button class="copy-btn"><?= htmlspecialchars($translations['convertor']['copy_to_clipboard']) ?></button>

    <p class="description">
      <?= htmlspecialchars($translations['convertor']['description_line_1']) ?><br>
      <?= htmlspecialchars($translations['convertor']['description_line_2']) ?><br>
      <?= htmlspecialchars($translations['convertor']['description_line_3']) ?><br>
      <?= htmlspecialchars($translations['convertor']['description_line_4']) ?>
    </p>

    <div class="import-info">
      <div class="column yes">
        <h3><?= htmlspecialchars($translations['convertor']['yes']) ?></h3>
        <ul>
          <li><?= htmlspecialchars($translations['convertor']['yes_1']) ?></li>
          <li><?= htmlspecialchars($translations['convertor']['yes_2']) ?></li>
          <li><?= htmlspecialchars($translations['convertor']['yes_3']) ?></li>
          <li><?= htmlspecialchars($translations['convertor']['yes_4']) ?></li>
          <li><?= htmlspecialchars($translations['convertor']['yes_5']) ?></li>
          <li><?= htmlspecialchars($translations['convertor']['yes_6']) ?></li>
        </ul>
      </div>
      <div class="column maybe">
        <h3><?= htmlspecialchars($translations['convertor']['maybe']) ?></h3>
        <ul>
          <li><?= htmlspecialchars($translations['convertor']['maybe_1']) ?></li>
          <li><?= htmlspecialchars($translations['convertor']['maybe_2']) ?></li>
        </ul>
      </div>
      <div class="column no">
        <h3><?= htmlspecialchars($translations['convertor']['no']) ?></h3>
        <ul>
          <li><?= htmlspecialchars($translations['convertor']['no_1']) ?></li>
          <li><?= htmlspecialchars($translations['convertor']['no_2']) ?></li>
          <li><?= htmlspecialchars($translations['convertor']['no_3']) ?></li>
          <li><?= htmlspecialchars($translations['convertor']['no_4']) ?></li>
        </ul>
      </div>
    </div>

    <div class="convert-controls">
      <label for="lang"><?= htmlspecialchars($translations['convertor']['pasta_language']) ?>:</label>
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
      <button id="convert-btn"><?= htmlspecialchars($translations['convertor']['convert_data']) ?></button>

      <label for="targetLang" style="margin-left:1em"><?= htmlspecialchars($translations['convertor']['target_language']) ?>:</label>
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

      <button id="translate-btn" style="margin-left:0.5em"><?= htmlspecialchars($translations['convertor']['translate_data']) ?></button>
      <button id="diff-btn" class="diff-btn" style="display:none;"><?= htmlspecialchars($translations['convertor']['diffchecker']) ?></button>
    </div>

    <textarea class="mapdata" placeholder="<?= htmlspecialchars($translations['convertor']['map_placeholder']) ?>"></textarea>
    <div class="footer">
      <span class="footer-left"><?= htmlspecialchars($translations['convertor']['footer_made_by']) ?></span>
      <span class="footer-right"><?= htmlspecialchars($translations['convertor']['footer_version']) ?></span>
    </div>
  </div>

  <div id="help" class="content active help-section">
    <div class="help-step">
      <strong><?= htmlspecialchars($translations['convertor']['step1']) ?></strong>
      <p><?= htmlspecialchars($translations['convertor']['step1_text']) ?></p>
      <img src="assets/abilities/copy-settings.webp" alt="Copy settings">
    </div>

    <div class="help-step">
      <strong><?= htmlspecialchars($translations['convertor']['step2']) ?></strong>
      <p><?= htmlspecialchars($translations['convertor']['step2_text']) ?></p>
      <img src="assets/abilities/text-area.webp" alt="Text area">
    </div>

    <div class="help-step">
      <strong><?= htmlspecialchars($translations['convertor']['step3']) ?></strong>
      <p><?= htmlspecialchars($translations['convertor']['step3_text']) ?></p>
      <ul>
        <code><?= htmlspecialchars($translations['convertor']['step3_convert']) ?></code>,
        <code><?= htmlspecialchars($translations['convertor']['step3_translate']) ?></code>
      </ul>
      <img src="assets/abilities/pasta-language.webp" alt="Language settings">
    </div>

    <div class="help-step">
      <strong><?= htmlspecialchars($translations['convertor']['step4']) ?></strong>
      <p><?= htmlspecialchars($translations['convertor']['step4_text']) ?></p>
      <img src="assets/abilities/edit-map-data.webp" alt="Edit map data">
    </div>

    <div class="help-step">
      <strong><?= htmlspecialchars($translations['convertor']['step5']) ?></strong>
      <p><?= htmlspecialchars($translations['convertor']['step5_text']) ?></p>
      <img src="assets/abilities/pasta-settings.webp" alt="Paste settings">
    </div>
  </div>

  <div id="mapSettings" class="convert-map-layout" style="display: none; flex-direction: column; gap: 8px; padding: 16px; position: relative;">
    <div class="global-infos">
      <div class="global-bans"></div>
      <div class="settings-buttons">
        <button id="globalSettingsBtn" class="global-edit-mode-btn"><?= htmlspecialchars($translations['convertor']['global_settings']) ?></button>
        <button id="editModeBtn" class="edit-mode-btn"><?= htmlspecialchars($translations['convertor']['edit_mode']) ?></button>
      </div>
    </div>

    <div class="empty-message"><?= htmlspecialchars($translations['convertor']['please_use_converter']) ?></div>
  </div>

  <div id="editModal" class="modal" style="display: none;">
    <div class="modal-content2">
      <span id="closeModal2" class="modal-close2">&times;</span>
      <h3><?= htmlspecialchars($translations['convertor']['edit_checkpoint']) ?></h3>
      <form id="editForm">
        <div id="editFieldsContainer"></div>
        <div class="modal-buttons3">
          <button type="button" id="saveEditorChangesBtn"><?= htmlspecialchars($translations['convertor']['save']) ?></button>
          <button type="button" id="cancelEditorChangesBtn"><?= htmlspecialchars($translations['convertor']['cancel']) ?></button>
        </div>
      </form>
    </div>
  </div>

  <div id="globalSettingsModal" class="modal" style="display: none;">
    <div class="modal-content2">
      <div class="modal-header">
        <span id="closeModal2" class="modal-close2">&times;</span>
      </div>
      <h3><?= htmlspecialchars($translations['convertor']['global_settings']) ?></h3>
      <form id="globalSettingsForm">
        <div class="modal-buttons2">
          <button type="button" id="saveGlobalChangesBtn"><?= htmlspecialchars($translations['convertor']['save']) ?></button>
          <button type="button" id="cancelGlobalChangesBtn"><?= htmlspecialchars($translations['convertor']['cancel']) ?></button>
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
