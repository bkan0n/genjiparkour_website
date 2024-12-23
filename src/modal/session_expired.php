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
<button id="stayDisconnectedButton" onclick="closeSessionModal()">Stay disconnected</button>
