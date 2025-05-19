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
    <script src="js/convertor.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>

<div class="container">
    <div class="tab-buttons" id="mainTabs">
        <button onclick="selectSection('convertMap')" id="convertMapBtn" class="active">Convert map</button>
        <button onclick="selectSection('help')"      id="helpBtn">Help ?</button>
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
            <li>bounce /kill orbs (per cp)</li>
            <li>ult and dash plugin</li>
          </ul>
        </div>
        <div class="column maybe">
          <h3>Maybe</h3>
          <ul>
            <li>Names (detected only in some cases)</li>
            <li>Sky cp’s (will load, won’t function)</li>
            <li>Teams in some modes and numbers</li>
          </ul>
        </div>
        <div class="column no">
          <h3>No</h3>
          <ul>
            <li>orbs / kills that work for entire map</li>
            <li>Custom added code</li>
            <li>hud text and in world texts</li>
            <li>bans</li>
            <li>custom portals</li>
            <li>titles</li>
            <li>if’s, returns or aborts in rule data</li>
            <li>everything else</li>
          </ul>
        </div>
      </div>

      <div class="convert-controls">
        <label for="lang">Client language:</label>
        <select id="lang">
          <option>English [en-US]</option>
        </select>
        <button id="convert-btn">convert data</button>
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
</div>

<?php include 'footer.php'; ?>
</body>
</html>
