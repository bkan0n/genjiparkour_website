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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Maps</title>
    <link rel="icon" type="image/png" href="assets/img-2/favicon.png">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/style-search.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/maps.js" defer></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
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
            <div class="tab-buttons">
                <button onclick="selectSection('mapSearch')" id="mapSearchBtn">Map Search</button>
                <button onclick="selectSection('completions')" id="completionsBtn">Completions</button>
                <button onclick="selectSection('guide')" id="guideBtn">Guides</button>
                <button onclick="selectSection('personalRecords')" id="personalRecordsBtn">Personal Records</button>
            </div>
            <div class="selected-mode-container">
                <div class="selected-mode" id="selectedMode">Select a search mode</div>
                <div class="filter-actions" id="filterActions" style="display: none;">
                    <button class="add-filter-btn" id="addFilterBtn" onmouseover="showFilterOptions()"></button>
                    <button class="apply-filters-btn" id="applyFiltersBtn" onclick="applyFilters()">✔</button>
                    <button class="clear-filters-btn" id="clearFiltersBtn" onclick="clearFilters()">✖</button>
                    <div class="filter-options" id="filterOptions" onmouseleave="hideFilterOptions()"></div>
                </div>
            </div>
            <div class="intuitive-mode" id="intuitiveMode" style= "display: none;">Add a filter or click ✔</div>
            <div class="filter-section" id="dynamicFilters">
                <div class="filters-container" id="filtersContainer">
                    <div class="filter">
                        <input type="text" id="mapNameInput"/>
                        <div id="mapNameSuggestionsContainer" class="suggestions"></div>
                    </div>
                    <div class="filter">
                        <input type="text" id="mapCodeInput"/>
                        <div id="mapCodeSuggestionsContainer" class="suggestions"></div>
                    </div>
                    <div class="filter">
                        <input type="text" id="nicknameInput"/>
                        <div id="nicknameSuggestionsContainer" class="suggestions"></div>
                    </div>
                </div>
            </div>
            <div id="loadingContainer">
                <div class="line"></div>
            </div>
            <div class="results-container" id="resultsContainer">
            </div>
            <div class="pagination-container" id="paginationContainer"></div>
        </div>
    <script>
    let user_id = <?= isset($_SESSION['user_id']) ? json_encode($_SESSION['user_id']) : 'null'; ?>;
    </script>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</body>
</html>
