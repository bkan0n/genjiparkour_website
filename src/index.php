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
    <title>Genji Parkour - Home</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/index.css">
    <script src="js/layout.js" defer></script>
</head>
<body>
    <div class="bg-container">
        <img src="assets/img/bg4k-3.webp" alt="Background" class="background-image">
    </div>
    <div id="smoke-background"></div>
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
                        <span class="lang-name"><?= htmlspecialchars($selectedLangData['name']) ?></span>
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
    <div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.7); z-index: 9999;">
        <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;"></div>
    </div>
    <section class="hero" id="hero1">
        <div class="scroll-indicator">
            <a href="#next-section" class="scroll-btn"><i class="fas fa-chevron-down"></i></a>
        </div>
        <div class="hero-content">
            <div class="side-section left">
                <p class="recent-stats"><?= htmlspecialchars($translations['hero']['packOpening']) ?></p>
                <a href="lootbox.php" class="cta-btn"><?= htmlspecialchars($translations['hero']['clickHere']) ?></a>
            </div>
            <div class="side-section right">
                <p class="recent-stats"><?= htmlspecialchars($translations['hero']['comingSoon']) ?></p>
                <a href="#" class="cta-btn"><?= htmlspecialchars($translations['hero']['comingSoon']) ?></a>
            </div>
        </div>
    </section>
    <section id="next-section" class="achievements">
        <h2><?= htmlspecialchars($translations['achievements']['latestEvents']) ?></h2>
        <div class="event-grid">
            <div class="event-item">
                <h3><?= htmlspecialchars($translations['achievements']['event1']) ?></h3>
                <p><?= htmlspecialchars($translations['achievements']['event1Desc']) ?></p>
            </div>
            <div class="event-item">
                <h3><?= htmlspecialchars($translations['achievements']['event2']) ?></h3>
                <p><?= htmlspecialchars($translations['achievements']['event2Desc']) ?></p>
            </div>
            <div class="event-item">
                <h3><?= htmlspecialchars($translations['achievements']['event3']) ?></h3>
                <p><?= htmlspecialchars($translations['achievements']['event3Desc']) ?></p>
            </div>
        </div>
    </section>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
    <script>
    particlesJS("smoke-background", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 1000 } },
            "color": { "value": "#aaaaaa" },
            "opacity": { "value": 0.2, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.05 } },
            "size": { "value": 30, "random": true, "anim": { "enable": true, "speed": 3, "size_min": 10 } },
            "move": { "enable": true, "speed": 0.3, "direction": "top-right", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": false },
                "onclick": { "enable": false },
                "resize": true
            }
        },
        "retina_detect": true
    });

    </script>
</body>
</html>