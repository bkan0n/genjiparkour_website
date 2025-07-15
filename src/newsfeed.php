<?php
if (!defined('BASE_PATH')) { define('BASE_PATH', __DIR__ . '/'); }

require BASE_PATH . '/../sentryInit.php';
require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($selectedLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Newsfeed</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/newsfeed.css">
    <script src="js/layout.js" defer></script>
    <script src="js/newsfeed.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>
    <div id="detailsModalOverlay" class="modal-overlay-custom" style="display:none;">
        <div id="detailsModalBox" class="modal-box-custom">
            <span id="detailsModalClose" class="modal-close-button" onclick="closeDetailsModal()">&times;</span>
            <div id="modalDetailsContainer"></div>
        </div>
    </div>
    <div class="newsfeed-header">
        <div class="custom-select-large">
            <span class="select-trigger"><?= htmlspecialchars($translations['newsfeed']['search_by_filter']) ?></span>
            <div class="custom-options">
                <div class="custom-option" data-value="map_edit"><?= htmlspecialchars($translations['newsfeed']['map_edit_filter']) ?></div>
                <div class="custom-option" data-value="guide"><?= htmlspecialchars($translations['newsfeed']['guide_filter']) ?></div>
                <div class="custom-option" data-value="new_map"><?= htmlspecialchars($translations['newsfeed']['new_map_filter']) ?></div>
                <div class="custom-option" data-value="role"><?= htmlspecialchars($translations['newsfeed']['role_filter']) ?></div>
                <div class="custom-option" data-value="record"><?= htmlspecialchars($translations['newsfeed']['record_filter']) ?></div>
                <div class="custom-option" data-value="announcement"><?= htmlspecialchars($translations['newsfeed']['announcement_filter']) ?></div>
            </div>
        </div>
        <button class="reset-filters-btn"><?= htmlspecialchars($translations['newsfeed']['reset_filter']) ?></button>
    </div>
    <div class="newsfeed">
        <div class="main-container">
            <div class="newsfeed-container" id="newsfeedContainer"></div>
            <div class="pagination-container" id="paginationContainer"></div>
        </div>
    </div>
    <?php include 'footer.php'; ?>
</body>
</html>
