<?php
if (!defined('BASE_PATH')) { define('BASE_PATH', __DIR__ . '/'); }

require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($selectedLang) ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <title>Genji Parkour - Lootbox</title>
    <link href="styles/lootbox2.css" rel="stylesheet">
    <link href="styles/layout.css" rel="stylesheet">
    <link href="styles/lootbox.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" defer></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" defer></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js" defer></script>
    <script src="js/lootbox.js" defer></script>
    <script src="js/layout.js" defer></script>
    <script>
    <?php if (isset($_SESSION['user_id'])): ?>
        const userId = "<?php echo htmlspecialchars($_SESSION['user_id']); ?>";
    <?php else: ?>
        const userId = null;
    <?php endif; ?>
    </script>
</head>
<body class="overwatch">
    <?php include 'navbar.php'; ?>
    <main role="main" class="main container">
        <div class="card-container">
          <div class="card-section">
            <div id="box" class="loot-card-stack">
              <div class="loot-card card1"></div>
              <div class="loot-card card2"></div>
              <div class="loot-card card3"></div>
            </div>
            <ul id="crate"></ul>
          </div>
        </div>
        <div class="centered-container">
          <div class="key-selection-container">
            <button id="key-type-button" class="btn shadow yellow">Select Key Type</button>
            <div id="key-dropdown" class="dropdown-key"></div>
          </div>
          <div id="key-count" class="key-display"></div>
          <div class="button-container">
            <button class="generate btn shadow yellow" 
                  onclick="/*ga('send', 'event', 'Generate box', 'Click', 'Open loot box');*/">
                  <?= htmlspecialchars($translations['lootbox']['open_pack']) ?>
            </button>
            <button class="info-button">?</button>
            <div id="infoModal" class="modal-lootbox">
                <div class="modal-infos">
                  <button class="close-button" aria-label="Close Modal">
                      <i class="fa-solid fa-xmark"></i>
                  </button>
                    <div class="info-tooltip">
                        <div><span class="rarity-common"><?= htmlspecialchars($translations['lootbox']['common']) ?></span>: 80%</div>
                        <div><span class="rarity-rare"><?= htmlspecialchars($translations['lootbox']['rare']) ?></span>: 16%</div>
                        <div><span class="rarity-epic"><?= htmlspecialchars($translations['lootbox']['epic']) ?></span>: 3%</div>
                        <div><span class="rarity-legendary"><?= htmlspecialchars($translations['lootbox']['legendary']) ?></span>: 1%</div>
                    </div>
                    <p><?= htmlspecialchars($translations['lootbox']['lootbox_infos']) ?></p>
                    <div id="reward-buttons">
                        <button class="filter-button" data-type="background"><?= htmlspecialchars($translations['lootbox']['rewards_types']['background']) ?></button>
                        <button class="filter-button" data-type="spray"><?= htmlspecialchars($translations['lootbox']['rewards_types']['spray']) ?></button>
                        <button class="filter-button" data-type="skin-pose"><?= htmlspecialchars($translations['lootbox']['rewards_types']['skin']) ?> & <?= htmlspecialchars($translations['lootbox']['rewards_types']['pose']) ?></button>
                    </div>
                    <div id="rewards-container"></div>
                </div>
            </div>
          </div>
        </div>
    </main>
    <?php include 'footer.php'; ?>
</body>
</html>
