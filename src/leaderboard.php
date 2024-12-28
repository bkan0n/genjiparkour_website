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
    <title>Genji Parkour - Leaderboard</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/leaderboard.css">
    <script src="js/layout.js" defer></script>
    <script src="js/leaderboard.js" defer></script>
</head>
<body>
    <div id="wrapper">
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
    <div id="creditsModal" class="modal-overlay" style="display: none;"></div>
    <div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center;">
        <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;">
        </div>
    </div>
    <div class="container">
        <form method="GET" action="leaderboard.php" class="form-container">
            <div class="custom-select" id="search-by-select">
                <div class="select-trigger" id="search-by-trigger">
                    <?= htmlspecialchars($translations['leaderboard']['searchBy_nameOrTag'] ?? 'Name/Tag') ?>
                </div>
                <i class="fas fa-sliders-h filter-icon"></i>
                <div class="custom-options select-hide" id="search-by-options">
                    <div class="custom-option" data-value="nickname">
                        <?= htmlspecialchars($translations['leaderboard']['searchBy_name'] ?? 'Name') ?>
                    </div>
                    <div class="custom-option" data-value="discord_tag">
                        <?= htmlspecialchars($translations['leaderboard']['searchBy_discordTag'] ?? 'Tag') ?>
                    </div>
                    <div class="custom-option" data-value="player_both" selected>
                        <?= htmlspecialchars($translations['leaderboard']['searchBy_nameOrTag'] ?? 'Name/Tag') ?>
                    </div>
                </div>
            </div>

            <input type="text" name="search" id="search-input" placeholder="<?= htmlspecialchars($translations['leaderboard']['placeholder'] ?? 'Search by Name/Tag...') ?>">
            <input type="hidden" id="selected-search-by" value="player_both">

            <div class="custom-select-large" id="sort-select">
                <div class="select-trigger" id="sort-trigger">
                    <?= htmlspecialchars($translations['leaderboard']['sortBy'] ?? 'Sort by') ?>
                </div>
                <div class="custom-options select-hide" id="sort-options">
                    <div class="custom-option" data-value="xp_amount">
                        <?= htmlspecialchars($translations['leaderboard']['sortBy_xp'] ?? 'XP') ?>
                    </div>
                    <div class="custom-option" data-value="wr_count">
                        <?= htmlspecialchars($translations['leaderboard']['sortBy_worldRecords'] ?? 'World records') ?>
                    </div>
                    <div class="custom-option" data-value="map_count">
                        <?= htmlspecialchars($translations['leaderboard']['sortBy_mapsMade'] ?? 'Maps made') ?>
                    </div>
                    <div class="custom-option" data-value="playtest_count">
                        <?= htmlspecialchars($translations['leaderboard']['sortBy_playtestVotes'] ?? 'Playtest votes') ?>
                    </div>
                </div>
            </div>
            <input type="hidden" id="selected-sort" value="">

            <div class="custom-select-large" id="rank-select">
                <div class="select-trigger" id="rank-trigger">
                    <?= htmlspecialchars($translations['leaderboard']['rank'] ?? 'Search rank') ?>
                </div>
                <div class="custom-options select-hide" id="rank-options">
                    <div class="custom-option" data-value="">
                        <?= htmlspecialchars($translations['leaderboard']['rank_allRanks'] ?? 'All ranks') ?>
                    </div>
                    <div class="custom-option" data-value="Ninja">
                        <?= htmlspecialchars($translations['leaderboard']['rank_ninja'] ?? 'Ninja') ?>
                    </div>
                    <div class="custom-option" data-value="Jumper">
                        <?= htmlspecialchars($translations['leaderboard']['rank_jumper'] ?? 'Jumper') ?>
                    </div>
                    <div class="custom-option" data-value="Skilled">
                        <?= htmlspecialchars($translations['leaderboard']['rank_skilled'] ?? 'Skilled') ?>
                    </div>
                    <div class="custom-option" data-value="Pro">
                        <?= htmlspecialchars($translations['leaderboard']['rank_pro'] ?? 'Pro') ?>
                    </div>
                    <div class="custom-option" data-value="Master">
                        <?= htmlspecialchars($translations['leaderboard']['rank_master'] ?? 'Master') ?>
                    </div>
                    <div class="custom-option" data-value="Grandmaster">
                        <?= htmlspecialchars($translations['leaderboard']['rank_grandmaster'] ?? 'Grandmaster') ?>
                    </div>
                    <div class="custom-option" data-value="God">
                        <?= htmlspecialchars($translations['leaderboard']['rank_god'] ?? 'God') ?>
                    </div>
                </div>
            </div>
            <input type="hidden" id="selected-rank" value="">

            <button type="submit" class="reset-filters-btn">
                <?= htmlspecialchars($translations['leaderboard']['resetFilters'] ?? 'Reset filters') ?>
            </button>
        </form>

        <div id="checkboxes-container">
            <input type="checkbox" id="toggle_xp" class="toggle-col" data-col="xp" checked>
            <label for="toggle_xp"><span></span> <?= htmlspecialchars($translations['leaderboard']['toggleColumn_xp']) ?> <ins><i></i></ins></label>

            <input type="checkbox" id="toggle_tier" class="toggle-col" data-col="tier" checked>
            <label for="toggle_tier"><span></span> <?= htmlspecialchars($translations['leaderboard']['toggleColumn_tier']) ?> <ins><i></i></ins></label>

            <input type="checkbox" id="toggle_skill-rank" class="toggle-col" data-col="skill-rank" checked>
            <label for="toggle_skill-rank"><span></span> <?= htmlspecialchars($translations['leaderboard']['toggleColumn_rank']) ?> <ins><i></i></ins></label>

            <input type="checkbox" id="toggle_wr" class="toggle-col" data-col="wr" checked>
            <label for="toggle_wr"><span></span> <?= htmlspecialchars($translations['leaderboard']['toggleColumn_worldRecords']) ?> <ins><i></i></ins></label>

            <input type="checkbox" id="toggle_maps" class="toggle-col" data-col="maps" checked>
            <label for="toggle_maps"><span></span> <?= htmlspecialchars($translations['leaderboard']['toggleColumn_maps']) ?> <ins><i></i></ins></label>

            <input type="checkbox" id="toggle_playtest" class="toggle-col" data-col="playtest" checked>
            <label for="toggle_playtest"><span></span> <?= htmlspecialchars($translations['leaderboard']['toggleColumn_playtest']) ?> <ins><i></i></ins></label>

            <input type="checkbox" id="toggle_discord-tag" class="toggle-col" data-col="discord-tag" checked>
            <label for="toggle_discord-tag"><span></span> <?= htmlspecialchars($translations['leaderboard']['toggleColumn_discordTag']) ?> <ins><i></i></ins></label>
        </div>
        <div id="leaderboard-container">
            <div class="table-wrapper">
                <table id="leaderboard"></table>
            </div>
        </div>
        <div class="pagination-container" id="paginationContainer"></div>
    </div>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <a id="creditsBtn" class="footer-button"><?= htmlspecialchars($translations['footer']['credits']) ?></a>
        <div class="footer-right">Joe is cool</div>
    </footer>
</div>
</body>
</html>
