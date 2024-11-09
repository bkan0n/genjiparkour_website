<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}
require BASE_PATH . 'discord/config.php';

$returnUrl = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : REDIRECT_URL . 'home.php';
$_SESSION['return_url'] = $returnUrl;

$_SESSION['state'] = bin2hex(random_bytes(16));
$discordAuthUrl = DISCORD_API_URL . '/oauth2/authorize?' . http_build_query([
    'client_id' => DISCORD_CLIENT_ID,
    'redirect_uri' => DISCORD_REDIRECT_URI,
    'response_type' => 'code',
    'scope' => 'identify guilds',
    'state' => $_SESSION['state']
]);

header('Location: ' . $discordAuthUrl);
exit;
?>
