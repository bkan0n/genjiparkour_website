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
    <?php include 'navbar.php'; ?>
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
        <div class="loading-bar" id="loadingContainer">
            <div class="line"></div>
        </div>
        <div class="pagination-container" id="paginationContainer"></div>
    </div>
    <?php include 'footer.php'; ?>
</div>
</body>
</html>
