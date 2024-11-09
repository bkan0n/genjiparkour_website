<?php
define('BASE_PATH', __DIR__ . '/');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Session Expired</title>
    <link rel="stylesheet" href="styles/style-session_expired.css">
</head>
<body>
    <div class="modal-overlay">
        <div class="modal-content" id="sessionModalContent">
            <?php
            session_start();
            $avatar_url = isset($_SESSION['user_id']) && isset($_SESSION['user_avatar']) ? 
                "https://cdn.discordapp.com/avatars/{$_SESSION['user_id']}/{$_SESSION['user_avatar']}.png" : 
                "assets/default-avatar.png";
            $username = $_SESSION['username'] ?? "Guest";
            ?>
            <img src="<?php echo htmlspecialchars($avatar_url); ?>" alt="User Avatar" class="avatar">
            <div class="username"><?php echo htmlspecialchars($username); ?></div>
            <div class="user-id">Your session has expired</div>
            <button id="loginButton" onclick="redirectToLogin()">Login</button>
            <button id="stayDisconnectedButton" onclick="closeSessionModal()">Stay Disconnected</button>
        </div>
    </div>
</body>
</html>
