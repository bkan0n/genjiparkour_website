<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/');
}

require BASE_PATH . "discord/session_init.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Genji Parkour - Leaderboard</title>
    <link rel="icon" type="image/png" href="assets/img-2/favicon.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/style-leaderboard.css">
    <script src="js/layout.js" defer></script>
    <script src="js/leaderboard.js" defer></script>
</head>
<body>
    <div id="wrapper">
    <nav class="navbar">
        <div class="navbar-left">
            <img src="assets/img-2/favicon.png" alt="Logo" class="logo-icon">
            <span class="logo-text">GENJI PARKOUR</span>
        </div>
        <ul class="navbar-menu">
            <li><a href="index.php">Home</a></li>
            <li><a href="leaderboard.php">Leaderboard</a></li>
            <li class="dropdown-nav">
                <button class="dropdown-toggle-nav">
                Search <span class="arrow"></span>
                </button>
                <ul class="dropdown-menu">
            <li><a href="search.php">Maps</a></li>
            <li><a href="search.php">Guides</a></li>
            <li><a href="search.php">Completions</a></li>
            </ul>
        </li>
        <li class="dropdown-nav">
            <button class="dropdown-toggle-nav">
            Community <span class="arrow"></span>
            </button>
            <ul class="dropdown-menu">
            <li><a href="news.php">News</a></li>
            <li><a href="tutorial.php">Tutorial</a></li>
            <li><a href="graphs.php">Statistics</a></li>
            </ul>
        </li>
        </ul>
        <div class="navbar-right">
            <a href="https://dsc.gg/genjiparkour" target="_blank" class="discord-logo">
                <i class="fab fa-discord"></i>
            </a>
            <?php if (isset($_SESSION['user_avatar'])): ?>
                <div class="user-avatar-dropdown">
                    <img src="https://cdn.discordapp.com/avatars/<?php echo htmlspecialchars($_SESSION['user_id']); ?>/<?php echo htmlspecialchars($_SESSION['user_avatar']); ?>.png" alt="User Avatar" class="user-avatar" id="avatar-icon" />
                    <ul class="dropdown-menu avatar-menu">
                        <li><a href="lootbox.php">Lootbox</a></li>
                        <li><a id="user-profile">Profile</a></li>
                    </ul>
                </div>
            <?php else: ?>
                <a href="discord/login.php" class="login-btn">Login</a>
            <?php endif; ?>
        </div>
    </nav>
    <div class="modal-profile" id="profileModal">
        <div id="profileModalContent" class="modal-content">
            <?php include BASE_PATH . 'modal/profile.php'; ?>
        </div>
    </div>
    <div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center;">
        <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;">
        </div>
    </div>
        <div class="container">
            <h1> </h1>
            <form method="GET" action="leaderboard.php" class="form-container">
                <div class="custom-select" id="search-by-select">
                    <div class="select-trigger" id="search-by-trigger"></div>
                    <i class="fas fa-sliders-h filter-icon"></i>
                    <div class="custom-options select-hide" id="search-by-options">
                        <div class="custom-option" data-value="nickname">Name</div>
                        <div class="custom-option" data-value="discord_tag">Tag</div>
                        <div class="custom-option" data-value="player_both" selected>Name/Tag</div>
                    </div>
                </div>

                <input type="text" name="search" id="search-input" placeholder="Search by Name/Tag...">
                <input type="hidden" id="selected-search-by" value="player_both">

                <div class="custom-select-large" id="sort-select">
                    <div class="select-trigger" id="sort-trigger">Sort by</div>
                    <div class="custom-options select-hide" id="sort-options">
                        <div class="custom-option" data-value="xp_amount">XP</div>
                        <div class="custom-option" data-value="wr_count">World records</div>
                        <div class="custom-option" data-value="map_count">Maps made</div>
                        <div class="custom-option" data-value="playtest_count">Playtest votes</div>
                    </div>
                </div>

                <div class="custom-select-large" id="rank-select">
                    <div class="select-trigger" id="rank-trigger">Search rank</div>
                    <div class="custom-options select-hide" id="rank-options">
                        <div class="custom-option" data-value="">All ranks</div>
                        <div class="custom-option" data-value="Ninja">Ninja</div>
                        <div class="custom-option" data-value="Jumper">Jumper</div>
                        <div class="custom-option" data-value="Skilled">Skilled</div>
                        <div class="custom-option" data-value="Pro">Pro</div>
                        <div class="custom-option" data-value="Master">Master</div>
                        <div class="custom-option" data-value="Grandmaster">Grandmaster</div>
                        <div class="custom-option" data-value="God">God</div>
                    </div>
                </div>

                <input type="hidden" name="sort_column" id="selected-sort" value="<?php echo isset($_GET['sort_column']) ? htmlspecialchars($_GET['sort_column'], ENT_QUOTES, 'UTF-8') : 'xp_amount'; ?>">
                <input type="hidden" name="skill_rank" id="selected-rank" value="<?php echo isset($_GET['skill_rank']) ? htmlspecialchars($_GET['skill_rank'], ENT_QUOTES, 'UTF-8') : ''; ?>">
                <input type="hidden" name="search_by" id="selected-search-by" value="<?php echo isset($_GET['search_by']) ? htmlspecialchars($_GET['search_by'], ENT_QUOTES, 'UTF-8') : 'player_both'; ?>">
                <button type="submit" class="reset-filters-btn">Reset filters</button>

            </form>
            <div id="checkboxes-container">
                <input type="checkbox" id="toggle_xp" class="toggle-col" data-col="xp" checked>
                <label for="toggle_xp"><span></span> XP <ins><i></i></ins></label>
                <input type="checkbox" id="toggle_tier" class="toggle-col" data-col="tier" checked>
                <label for="toggle_tier"><span></span> Tier <ins><i></i></ins></label>
                <input type="checkbox" id="toggle_skill-rank" class="toggle-col" data-col="skill-rank" checked>
                <label for="toggle_skill-rank"><span></span> Rank <ins><i></i></ins></label>
                <input type="checkbox" id="toggle_wr" class="toggle-col" data-col="wr" checked>
                <label for="toggle_wr"><span></span> WR <ins><i></i></ins></label>
                <input type="checkbox" id="toggle_maps" class="toggle-col" data-col="maps" checked>
                <label for="toggle_maps"><span></span> Maps <ins><i></i></ins></label>
                <input type="checkbox" id="toggle_playtest" class="toggle-col" data-col="playtest" checked>
                <label for="toggle_playtest"><span></span> Playtest <ins><i></i></ins></label>
                <input type="checkbox" id="toggle_discord-tag" class="toggle-col" data-col="discord-tag" checked>
                <label for="toggle_discord-tag"><span></span> TAG <ins><i></i></ins></label>
            </div>
            <div id="leaderboard-container">
                <div class="table-wrapper">
                    <table id="leaderboard"></table>
                </div>
            </div>
            <div class="pagination-container"></div>
        </div>
    </div>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</div>
</body>
</html>
