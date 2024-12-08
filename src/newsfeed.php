<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/');
}

require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
require BASE_PATH . "api/getNewsfeed.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Newsfeed</title>
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/newsfeed.css">
    <script src="js/layout.js" defer></script>
    <script src="js/newsfeed.js" defer></script>
</head>
<body>
<nav class="navbar">
        <div class="navbar-left">
            <img src="assets/img-2/favicon.png" alt="Logo" class="logo-icon" id="logoIcon">
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
                    <li><a href="news.php"><?= htmlspecialchars($translations['navbar']['news']) ?></a></li>
                    <li><a href="tutorial.php"><?= htmlspecialchars($translations['navbar']['tutorial']) ?></a></li>
                    <li><a href="graphs.php"><?= htmlspecialchars($translations['navbar']['statistics']) ?></a></li>
                </ul>
            </li>
        </ul>
        <div class="navbar-right">
            <a href="moderator.php" class="moderator-btn">
                <img src="assets/img-2/moderator-dashboard.png" alt="Moderator Dashboard" class="moderator-icon">
            </a>
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
    <div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center;">
        <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;">
        </div>
    </div>
    <div class="newsfeed-container">
        <?php foreach ($newsfeed as $item): ?>
            <div class="news-card <?= htmlspecialchars($item['type']) ?>">
                <div class="genjibot-header">
                    <img class="genjibot-logo" src="assets/profile/genjibot.png" alt="GenjiBot Logo">
                    <div class="genjibot-text">
                        <span class="genjibot-name">GenjiBot</span>
                        <span class="genjibot-app">APP</span>
                    </div>
                </div>
                <?php if ($item['type'] === 'role'): ?>
                    <img class="role-banner" src="assets/img-2/card-banner.png" alt="Role Banner">
                <?php endif; ?>
                <?php if ($item['type'] === 'new_map'): ?>
                    <?php 
                        $difficultyLogo = preg_replace('/[+\-\s]/', '', strtolower($item['data']['map']['difficulty'])) . '.png';
                    ?>
                    <img class="difficulty-badge" src="assets/ranks/<?= htmlspecialchars($difficultyLogo) ?>" alt="<?= htmlspecialchars($item['data']['map']['difficulty']) ?> Badge">
                <?php endif; ?>
                <div class="news-header">
                    <?php if ($item['type'] === 'new_map'): ?>
                        <h3><?= htmlspecialchars($item['data']['user']['nickname']) ?> has submitted a new <?= htmlspecialchars($item['data']['map']['difficulty']) ?> map on <?= htmlspecialchars($item['data']['map']['map_name']) ?>!</h3>
                        <p>
                            Use the command <code>/map-search map_code:<?= htmlspecialchars($item['data']['map']['map_code']) ?></code> 
                            <span class="click-here">or 
                                <a href="javascript:void(0)" onclick="openMapDetailsModal('<?= htmlspecialchars($item['data']['map']['map_code']) ?>')">Click here</a>
                            </span>
                            to see the details!
                        </p>
                    <?php elseif ($item['type'] === 'role'): ?>
                        <h3><?= htmlspecialchars($item['data']['user']['nickname']) ?> got promoted!</h3>
                        <div class="role-container">
                            <ul>
                                <?php foreach ($item['data']['user']['roles'] as $role): ?>
                                    <?php
                                    $normalizedRole = normalizeRole($role);
                                    $roleClass = $roleColors[$normalizedRole] ?? 'default';
                                    ?>
                                    <li class="role-item <?= htmlspecialchars($roleClass) ?>">
                                        <?= htmlspecialchars($role) ?>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php elseif ($item['type'] === 'guide'): ?>
                        <h3><?= htmlspecialchars($item['data']['user']['nickname']) ?> has posted a guide for <?= htmlspecialchars($item['data']['map']['map_code']) ?></h3>
                        <a href="<?= htmlspecialchars($item['data']['map']['guide'][0]) ?>" target="_blank">Watch the guide</a>
                    <?php endif; ?>
                </div>
                <?php if ($item['type'] === 'new_map'): ?>
                    <div class="news-thumbnail">
                        <?php 
                            $imageName = strtolower(str_replace([' ', '(', ')'], '', $item['data']['map']['map_name'])) . '.png';
                        ?>
                        <img src="assets/banners/<?= htmlspecialchars($imageName) ?>" alt="<?= htmlspecialchars($item['data']['map']['map_name']) ?>">
                    </div>
                <?php endif; ?>
                <div class="timestamp" data-timestamp="<?= htmlspecialchars($item['timestamp']) ?>">
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <div id="detailsModalOverlay" class="modal-overlay-custom" style="display:none;">
        <div id="detailsModalBox" class="modal-box-custom">
            <span id="detailsModalClose" class="modal-close-button" onclick="closeDetailsModal()">&times;</span>
            <div id="modalDetailsContainer"></div>
        </div>
    </div>
    <div class="pagination-container"></div>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</body>
</html>
