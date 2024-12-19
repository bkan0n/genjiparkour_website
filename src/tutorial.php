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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Tutorial</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/tutorial.css">
    <script src="js/discord.js" defer></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
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
    <main>
        <section class="hero-section" id="hero1">
            <div class="hero-content">
                <h1><?= htmlspecialchars($translations['tutorial']['genjiParkourTechsTitle']) ?></h1>
                <p><?= htmlspecialchars($translations['tutorial']['genjiParkourTechsDescription']) ?></p>
            </div>
            <div class="hero-video">
                <iframe src="https://www.youtube.com/embed/2IhslwdsJuY" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="scroll-indicator">
                <a href="#hero2" class="scroll-btn"><i class="fas fa-chevron-down"></i></a>
            </div>
        </section>
        <section class="hero-section" id="hero2">
            <div class="hero-image">
                <img src="assets/img/parkour_tutorial.jpg" alt="<?= htmlspecialchars($translations['tutorial']['techniquesImageAlt']) ?>" loading="lazy">
            </div>
            <div class="hero-content">
                <h1><?= htmlspecialchars($translations['tutorial']['tutorialTitle']) ?></h1>
                <p><?= htmlspecialchars($translations['tutorial']['tutorialDescription']) ?></p>
                <p><?= htmlspecialchars($translations['tutorial']['codeLabel']) ?>: <span class="highlight-code"><?= htmlspecialchars($translations['tutorial']['codeValue']) ?></span></p>
            </div>
            <div class="scroll-indicator2">
                <a href="#hero3" class="scroll-btn2"><i class="fas fa-chevron-down"></i></a>
            </div>
        </section>

        <section class="hero-section" id="hero3">
            <div class="hero-content">
                <h1><?= htmlspecialchars($translations['tutorial']['speedrunnerTitle']) ?></h1>
                <p><?= htmlspecialchars($translations['tutorial']['speedrunnerDescription']) ?></p>
            </div>
            <div class="hero-video">
                <iframe src="https://www.youtube.com/embed/GOrlrqjSJlQ?si=O8WsfQVV8kCjAkpE" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
        </section>
    </main>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</body>
</html>
