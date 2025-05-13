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
    <title>Genji Parkour - Maps</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/search.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/search.js" defer></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>
    <div class="container">
        <div class="tab-buttons">
            <button onclick="selectSection('mapSearch')" id="mapSearchBtn">
                <?= htmlspecialchars($translations['search']['mapSearch']) ?>
            </button>
            <button onclick="selectSection('completions')" id="completionsBtn">
                <?= htmlspecialchars($translations['search']['completions']) ?>
            </button>
            <button onclick="selectSection('guide')" id="guideBtn">
                <?= htmlspecialchars($translations['search']['guides']) ?>
            </button>
            <button onclick="selectSection('personalRecords')" id="personalRecordsBtn">
                <?= htmlspecialchars($translations['search']['personalRecords']) ?>
            </button>
        </div>
        <div class="selected-mode-container">
            <div class="selected-mode" id="selectedMode">
                <?= htmlspecialchars($translations['search']['selectMode']) ?>
            </div>
            <div class="filter-actions" id="filterActions" style="display: none;">
                <div class="toolbar-container">
                    <div id="icon-name" class="icon-name"></div>
                    <div class="toolbar">
                        <div class="selection-circle"></div>
                    </div>
                </div>  
            </div>
        </div>
        <div class="filter-section" id="dynamicFilters">
            <div class="filters-container" id="filtersContainer"></div>
        </div>
        <div class="loading-bar" id="loadingContainer">
            <div class="line"></div>
        </div>
        <div class="results-container" id="resultsContainer"></div>
        <div class="pagination-container" id="paginationContainer"></div>
    </div>
    <?php include 'footer.php'; ?>
</body>
</html>
