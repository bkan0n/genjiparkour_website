<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

require BASE_PATH . "translations/load_translations.php";

session_start();
$user_id = $_SESSION['user_id'] ?? null;
$user_avatar = $_SESSION['user_avatar'] ?? null;
$avatar_url = $user_id && $user_avatar ? "https://cdn.discordapp.com/avatars/$user_id/$user_avatar" . is_animated($user_avatar) : "assets/img/default-avatar.jpg";
$username = $_SESSION['username'] ?? "Guest";

function is_animated($image) {
    return (substr($image, 0, 2) == "a_") ? ".gif" : ".png";
}
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($selectedLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Rank Card</title>
    <link rel="stylesheet" href="styles/rank_card.css">
</head>
<body>
    <div class="rank-card-container">
        <button class="close-modal" aria-label="Close Modal">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="header-container">
            <div class="user-info">
                <div class="header-avatar">
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
            </div>
        </div>
        <div id="rankCardContent" class="tab-content active"></div>
        <div id="badgeMasteryContent" class="tab-content hidden"></div>
        <div id="loadingContainer" class="loading-bar"></div>
    </div>
</body>
</html>
