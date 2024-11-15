<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/');
}

require __DIR__ . '/../discord/session_init.php';

function is_animated($image) {
    return (substr($image, 0, 2) == "a_") ? ".gif" : ".png";
}

$user_id = $_SESSION['user_id'] ?? null;
$user_avatar = $_SESSION['user_avatar'] ?? null;
$username = $_SESSION['username'] ?? "Guest";
$user_flags = $_SESSION['user_flags'] ?? 0;
$user_premium = $_SESSION['user_premium'] ?? 0;

$avatar_url = $user_id && $user_avatar ? "https://cdn.discordapp.com/avatars/$user_id/$user_avatar" . is_animated($user_avatar) : "assets/img-2/default-avatar.jpg";
$banner_url = isset($_SESSION['user_banner']) ? "https://cdn.discordapp.com/banners/$user_id/{$_SESSION['user_banner']}" . is_animated($_SESSION['user_banner']) : null;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Profile</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style> 
        .header-banner img { width: 100%; border-radius: 10px; }
        .header-avatar img { border-radius: 50%; width: 100px; height: 100px; }
        .header-username { font-size: 24px; font-weight: bold; }
        .header-badges img { margin: 5px; }
    </style>
</head>
<body>
    <main class="container-profile">
        <div class="user-card">
            <?php if ($banner_url): ?>
                <div class="header-banner">
                    <img src="<?php echo htmlspecialchars($banner_url); ?>?size=300" alt="User Banner">
                </div>
            <?php endif; ?>

            <div class="header-top">
                <div class="header-avatar">
                    <img src="<?php echo htmlspecialchars($avatar_url); ?>" alt="User Avatar">
                </div>
                <div class="header-text">
                    <span class="header-username"><?php echo htmlspecialchars($username); ?></span>
                </div>
                <p class="text-muted"><small><?php echo htmlspecialchars($user_id ?? "Unknown"); ?></small></p>
                
                <div class="header-badges">
                    <?php
                    for ($i = 0; $i < 20; $i++) {
                        if ($user_flags & (1 << $i)) {
                            echo '<img src="assets/img/badges/' . $i . '.svg" height="22" alt="Badge">';
                        }
                    }
                    if ($user_premium > 0) echo '<img src="assets/img/badges/nitro.svg" height="22" alt="Nitro Badge">';
                    if ($user_premium > 1) echo '<img src="assets/img/badges/boost.svg" height="22" alt="Boost Badge">';
                    ?>
                </div>
            </div>

            <div class="body-wrapper mt-4">
                <a class="btn btn-lg btn-danger btn-block" href="discord/logout.php">LOG OUT</a>
            </div>
        </div>
    </main>
</body>
</html>
