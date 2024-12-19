<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/');
}

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
    <nav class="navbar">
        <div class="navbar-left">
            <img src="assets/img/favicon.png" alt="Logo" class="logo-icon" id="logoIcon">
            <span class="logo-text">GENJI PARKOUR</span>
        </div>
        <ul class="navbar-menu">
            <li><a href="index.php"><?= htmlspecialchars($translations['navbar']['home']) ?></a></li>
            <li><a href="leaderboard.php"><?= htmlspecialchars($translations['navbar']['leaderboard']) ?></a></li>
            <li class="dropdown-nav">
                <button class="dropdown-toggle-nav">
                <?= htmlspecialchars($translations['navbar']['search']) ?> <span class="arrow"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="search.php?section=mapSearch"><?= htmlspecialchars($translations['navbar']['maps']) ?></a></li>
                    <li><a href="search.php?section=guide"><?= htmlspecialchars($translations['navbar']['guides']) ?></a></li>
                    <li><a href="search.php?section=completions"><?= htmlspecialchars($translations['navbar']['completions']) ?></a></li>
                </ul>
            </li>
            <li class="dropdown-nav">
                <button class="dropdown-toggle-nav">
                <?= htmlspecialchars($translations['navbar']['community']) ?> <span class="arrow"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="newsfeed.php"><?= htmlspecialchars($translations['navbar']['newsfeed']) ?></a></li>
                    <li><a href="newsfeed.php?type=announcement"><?= htmlspecialchars($translations['navbar']['announcements']) ?></a></li>
                    <li><a href="tutorial.php"><?= htmlspecialchars($translations['navbar']['tutorial']) ?></a></li>
                    <li><a href="graphs.php"><?= htmlspecialchars($translations['navbar']['statistics']) ?></a></li>
                </ul>
            </li>
        </ul>
        <div class="navbar-right">
            <?php if (isset($_SESSION['is_moderator']) && $_SESSION['is_moderator'] === true): ?>
                <a href="moderator.php" class="moderator-btn">
                    <img src="assets/img/moderator-dashboard.png" alt="Moderator Dashboard" class="moderator-icon">
                </a>
            <?php endif; ?>
            <ul class="lang-menu">
                <li class="lang-dropdown-nav">
                    <button class="dropdown-toggle-nav">
                    <i class="flag <?= htmlspecialchars($selectedLangData['flag']) ?>"></i>
                    <?= htmlspecialchars($selectedLangData['name']) ?>
                    <span class="arrow"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <?php foreach ($languages as $langCode => $langData): ?>
                            <li>
                                <a href="?lang=<?= htmlspecialchars($langCode) ?>" 
                                class="<?= isset($langData['translated']) && $langData['translated'] ? '' : 'unavailable' ?>"
                                data-message="<?= htmlspecialchars($langData['modalMessage']) ?>"
                                data-close-text="<?= htmlspecialchars($langData['closeButtonText']) ?>">
                                    <i class="flag <?= htmlspecialchars($langData['flag']) ?>"></i>
                                    <?= htmlspecialchars($langData['name']) ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </li>
            </ul>
            <a href="https://dsc.gg/genjiparkour" target="_blank" class="discord-logo">
                <i class="fab fa-discord"></i>
            </a>
            <?php if (isset($_SESSION['user_avatar'])): ?>
                <div class="user-avatar-dropdown">
                    <img src="https://cdn.discordapp.com/avatars/<?php echo htmlspecialchars($_SESSION['user_id']); ?>/<?php echo htmlspecialchars($_SESSION['user_avatar']); ?>.png" alt="User Avatar" class="user-avatar" id="avatar-icon" />
                    <ul class="dropdown-menu avatar-menu">
                        <li><a href="lootbox.php"><?= htmlspecialchars($translations['navbar']['lootbox']) ?></a></li>
                        <li><a id="user-profile"><?= htmlspecialchars($translations['navbar']['profile']) ?></a></li>
                        <li><a id="user-rankcard"><?= htmlspecialchars($translations['navbar']['rank_card']) ?></a></li>
                    </ul>
                </div>
            <?php else: ?>
                <a href="discord/login.php" class="login-btn"><?= htmlspecialchars($translations['navbar']['login']) ?></a>
            <?php endif; ?>
        </div>
    </nav>
    <div id="translationModal" style="display: none;">
        <div class="modal-content-translation">
            <p id="modalMessage"></p>
            <button id="closeModal">Close</button>
        </div>
    </div>
    <div class="modal-profile" id="profileModal">
        <div id="profileModalContent" class="modal-content">
            <?php include BASE_PATH . 'modal/profile.php'; ?>
        </div>
    </div>
    <div id="rankCardModal" class="modal-overlay" style="display: none;"></div>
    <div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center;">
        <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;">
        </div>
    </div>
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
        <button id="giveKeyButton" style="background-color: #2b2b2b; color: white; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">
        <?= htmlspecialchars($translations['lootbox']['give_key']) ?>
        </button>
          <div id="key-count" class="key-display"></div>
          <div class="button-container">
            <button class="generate btn shadow yellow" 
                  onclick="/*ga('send', 'event', 'Generate box', 'Click', 'Open loot box');*/">
                  <?= htmlspecialchars($translations['lootbox']['open_pack']) ?>
            </button>
            <button class="info-button">?
              <div class="info-tooltip">
                <div><span class="rarity-common"><?= htmlspecialchars($translations['lootbox']['common']) ?></span>: 80%</div>
                <div><span class="rarity-rare"><?= htmlspecialchars($translations['lootbox']['rare']) ?></span>: 16%</div>
                <div><span class="rarity-epic"><?= htmlspecialchars($translations['lootbox']['epic']) ?></span>: 3%</div>
                <div><span class="rarity-legendary"><?= htmlspecialchars($translations['lootbox']['legendary']) ?></span>: 1%</div>
              </div>
            </button>
          </div>
        </div>
    </main>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</body>
</html>
