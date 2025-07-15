<?php
if (!defined('BASE_PATH')) { define('BASE_PATH', __DIR__ . '/'); }

require BASE_PATH . '/../sentryInit.php';
require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
require BASE_PATH . "discord/auth.php";
checkModeratorAccess();
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($selectedLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Moderator</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/moderator.css">
    <script src="js/layout.js" defer></script>
    <script src="js/moderator.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>
    <div class="container">
        <h2 class="wip-title">This page is WIP, only submit map, multiple archive and unarchive works</h2>
        <div class="tab-buttons">
            <button class="tab-button edit-user" id="edit-user-btn">Edit User</button>
            <button class="tab-button edit-map" id="edit-map-btn">Edit Map</button>
            <button class="tab-button edit-multiple" id="edit-multiple-btn">Edit Multiple</button>
        </div>
        <div class="tab-content" id="edit-map-content" style="display: none;">
            <button id="submit-map-button">Submit map</button>
            <input type="text" id="map-code-input" placeholder="Enter map code" />
            <div id="mapCodeSuggestionsContainer" class="map-code-suggestions-container"></div>
            <button id="map-search-button">Search</button>
        </div>
        <div class="tab-content" id="edit-user-content" style="display: none;">
            <button id="user-options-button">Others options</button>
            <input type="text" id="user-name-input" placeholder="Enter user name/discord id" />
            <div id="userNameSuggestionsContainer" class="username-suggestions-container"></div>
            <button id="user-search-button">Search</button>
        </div>
        <div id="map-results" class="map-results-container"></div>
        <div id="map-submit-container" class="map-submit-container"></div>
        <div id="user-edit-container" class="user-edit-container"></div>
        <div id="user-edit-multiple-container" class="user-edit-multiple-container"></div>
    </div>
    <?php include 'footer.php'; ?>
</body>
</html>
