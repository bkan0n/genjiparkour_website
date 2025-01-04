<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
include BASE_PATH . "discord/header.php";
?>
<div class="modal-box">
    <button class="close-modal" aria-label="Close Modal">
        <i class="fa-solid fa-xmark"></i>
    </button>
    <h2></h2>
    <div class="credits-container">
        <h3><?= htmlspecialchars($translations['navbar']['website_creators']) ?></h3>
        <div id="websiteCreatorsList" class="contributors-list"></div>
        <h3><?= htmlspecialchars($translations['navbar']['contributors']) ?></h3>
        <div id="translatorsList" class="contributors-list"></div>
    </div>
</div>
