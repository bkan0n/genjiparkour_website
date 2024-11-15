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
    <script src="js/maps.js" defer></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
    <nav>
        <div class="logo">
            <img src="assets/img-2/favicon.png" alt="Logo" class="custom-icon">
            <a href="index.php">GENJI PARKOUR</a>
        </div>
        <div class="nav-links">
            <a href="index.php">Home</a>
            <a href="leaderboard.php">Leaderboard</a>
            <a href="https://dsc.gg/genjiparkour" target="_blank">Discord</a>
            <a href="tutorial.php">Tutorial</a>
        </div>
        <div class="menu--right" role="navigation">
            <div class="auth-links">
                <?php if (isset($_SESSION['user_avatar'])): ?>
                    <div class="user-avatar-dropdown">
                        <img src="https://cdn.discordapp.com/avatars/<?php echo htmlspecialchars($_SESSION['user_id']); ?>/<?php echo htmlspecialchars($_SESSION['user_avatar']); ?>.png" alt="User Avatar" class="user-avatar" id="avatar-icon" />
                    </div>
                <?php else: ?>
                    <a href="discord/login.php" class="btn-discord">
                    <i class="fa-solid fa-circle-user"></i>
                    </a>
                <?php endif; ?>
            </div>
        <div class="menuToggle" id="burgerMenu">
            <input type="checkbox" id="burgerMenuScroll" />
            <span></span>
            <span></span>
            <span></span>
            <ul class="menuItem hidden" id="menuItems">
                <li><a href="search.php">Maps search</a></li>
                <li><a href="news.php">News & Events</a></li>
                <li><a href="graphs.php">Graphs</a></li>
                <li><a href="#">Submit completion</a></li>
            </ul>
        </div>
    </nav>
    <div class="modal-profile" id="profileModal" style="display: none;">
        <div class="modal-content" id="profileModalContent">
            <?php include 'modal/profile.php'; ?>
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
                    <input type="text" id="map_name" placeholder="Map Name" oninput="showSuggestions(event)" />
                    <button class="remove-filter-btn">X</button>
                    <div id="suggestionsContainer" class="suggestions hidden"></div>
                </div>
            </div>
        </div>

        <div class="results-container" id="resultsContainer">
            <p></p>
        </div>
        <div class="pagination-container" id="paginationContainer"></div>
    </div>
    
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</body>
</html>
