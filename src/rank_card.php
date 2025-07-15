<?php
if (!defined('BASE_PATH')) { define('BASE_PATH', __DIR__ . '/'); }

require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";

if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit;
}

include BASE_PATH . "discord/header.php";

?>

<!DOCTYPE html>
<html lang="<?= htmlspecialchars($selectedLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Dashboard</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/rank_card.css">
    <script src="js/layout.js" defer></script>
    <script src="js/rank_card.js" defer></script>
</head>
<body>
<?php include 'navbar.php'?>
<main role="main" class="main">
    <div class="rank-card-container">
        <div class="header-container">
            <div class="user-info">
                <div class="header-avatar2">
                    <img src="<?php echo htmlspecialchars($avatar_url); ?>" alt="User Avatar">
                </div>
                <h2 class="username"><?php echo htmlspecialchars($username); ?></h2>
            </div>
            <div class="button-group">
                <button id="btnRankCard" class="active"><?= htmlspecialchars($translations['rank_card']['tab_rankcard']) ?></button>
                <button id="btnBadges"><?= htmlspecialchars($translations['rank_card']['tab_badges']) ?></button>
            </div>
            <div class="search-container">
                <input type="text" id="searchUserName" placeholder="<?= htmlspecialchars($translations['rank_card']['search_placeholder']) ?>" />
                <button id="searchButton"><?= htmlspecialchars($translations['rank_card']['search_button']) ?></button>
                <button id="resetFilter"><?= htmlspecialchars($translations['rank_card']['reset_filter_button']) ?></button>
            </div>
        </div>
        <div id="rankCardContent" class="tab-content active"></div>
        <div id="badgeMasteryContent" class="tab-content hidden"></div>
        <div id="badgeViewer" class="badge-viewer-overlay">
            <div class="badge-viewer-container">
                <img src="" alt="Badge Enlarged" id="badgeViewerImage" class="badge-viewer-rotatable">
                <button class="badge-viewer-close" onclick="closeBadgeViewer()"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </div>
        <div id="loadingContainer" class="loading-bar"></div>
        <div id="buttonContainer">
            <button class="change-button-settings" id="changeBadges"><?= htmlspecialchars($translations['rank_card']['change_badges_button']) ?></button>
            <button class="change-button-settings" id="changeAvatar"><?= htmlspecialchars($translations['rank_card']['change_avatar_button']) ?></button>
            <button class="change-button-settings" id="changeBackground"><?= htmlspecialchars($translations['rank_card']['change_background_button']) ?></button>
        </div>
        <input type="hidden" id="currentUserId" value="<?= htmlspecialchars($user_id) ?>">
    </div>
</main>
<?php include 'footer.php'?>
</body>
</html>