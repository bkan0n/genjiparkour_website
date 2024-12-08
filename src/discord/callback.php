<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

require BASE_PATH . 'discord/config.php';

$_SESSION['LAST_ACTIVITY'] = time();
session_regenerate_id(true);

function log_event($message) {
    $logFile = __DIR__ . '/logs/security.log';
    $logEntry = date("Y-m-d H:i:s") . " - " . $message . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}

if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
}
if ($_SESSION['login_attempts'] > 5 && (time() - ($_SESSION['LAST_ACTIVITY'] ?? 0) < 900)) {
    log_event("Rate limit exceeded for IP: " . $_SERVER['REMOTE_ADDR']);
    exit("Too many login attempts. Try again later");
}

$code = filter_input(INPUT_GET, 'code', FILTER_SANITIZE_SPECIAL_CHARS);
$state = filter_input(INPUT_GET, 'state', FILTER_SANITIZE_SPECIAL_CHARS);

if (!$code || !$state || $state !== $_SESSION['state']) {
    log_event("Invalid or missing state parameter. State: {$state}");
    exit('Invalid or missing state parameter');
}
unset($_SESSION['state']);
$_SESSION['login_attempts']++;

$tokenUrl = DISCORD_API_URL . '/oauth2/token';
$data = [
    'client_id' => DISCORD_CLIENT_ID,
    'client_secret' => DISCORD_CLIENT_SECRET,
    'grant_type' => 'authorization_code',
    'code' => $code,
    'redirect_uri' => DISCORD_REDIRECT_URI,
    'scope' => 'identify guilds guilds.members.read'
];

$options = [
    'http' => [
        'header' => 'Content-type: application/x-www-form-urlencoded',
        'method' => 'POST',
        'content' => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$response = @file_get_contents($tokenUrl, false, $context);

if ($response === FALSE) {
    log_event("Failed to connect to token endpoint.");
    exit('Failed to connect to token endpoint');
}

$tokenData = json_decode($response, true);

if (!isset($tokenData['access_token'])) {
    log_event("Failed to retrieve access token: " . json_encode($tokenData));
    exit('Failed to retrieve access token');
}

$encryption_key = openssl_random_pseudo_bytes(32);
$_SESSION['encryption_key'] = base64_encode($encryption_key);
$_SESSION['access_token'] = openssl_encrypt($tokenData['access_token'], 'aes-256-cbc', $encryption_key, 0, '1234567890123456');

$access_token = openssl_decrypt($_SESSION['access_token'], 'aes-256-cbc', $encryption_key, 0, '1234567890123456');

$userUrl = DISCORD_API_URL . '/users/@me';
$options = [
    'http' => [
        'header' => 'Authorization: Bearer ' . $access_token
    ]
];

$context = stream_context_create($options);
$userResponse = @file_get_contents($userUrl, false, $context);
$userData = json_decode($userResponse, true);

if (!isset($userData['id'])) {
    log_event("Failed to retrieve user information: " . json_encode($userData));
    exit('Failed to retrieve user information');
}

$_SESSION['user_id'] = filter_var($userData['id'], FILTER_SANITIZE_SPECIAL_CHARS);
$_SESSION['username'] = filter_var($userData['username'], FILTER_SANITIZE_SPECIAL_CHARS);
$_SESSION['user_avatar'] = filter_var($userData['avatar'], FILTER_SANITIZE_SPECIAL_CHARS);
$_SESSION['user_flags'] = $userData['public_flags'] ?? 0;
$_SESSION['user_premium'] = $userData['premium_type'] ?? 0;
$_SESSION['session_expired'] = false;
$_SESSION['LAST_ACTIVITY'] = time();

$guildsUrl = DISCORD_API_URL . '/users/@me/guilds';
$options = [
    'http' => [
        'header' => 'Authorization: Bearer ' . $access_token
    ]
];

$context = stream_context_create($options);
$guildsResponse = @file_get_contents($guildsUrl, false, $context);
$guildsData = json_decode($guildsResponse, true);

$_SESSION['user_guilds'] = [];
if (is_array($guildsData)) {
    foreach ($guildsData as $guild) {
        $_SESSION['user_guilds'][] = [
            'id' => filter_var($guild['id'], FILTER_SANITIZE_SPECIAL_CHARS),
            'name' => filter_var($guild['name'], FILTER_SANITIZE_SPECIAL_CHARS),
            'icon' => filter_var($guild['icon'], FILTER_SANITIZE_SPECIAL_CHARS)
        ];
    }
}

$returnUrl = $_SESSION['return_url'] ?? REDIRECT_URL . 'index.php';
unset($_SESSION['return_url']);

$targetGuildId = '842778964673953812';
$authorizedRoleIds = ['842790097312153610', '1128014001318666423'];

$guild = null;
foreach ($guildsData as $g) {
    if ($g['id'] === $targetGuildId) {
        $guild = $g;
        break;
    }
}

if (!$guild) {
    log_event("User {$userData['id']} is not a member of discord {$targetGuildId}");
    header('Location: ' . $returnUrl);
}

$memberUrl = DISCORD_API_URL . "/users/@me/guilds/{$targetGuildId}/member";

$options = [
    'http' => [
        'header' => 'Authorization: Bearer ' . $access_token,
        'method' => 'GET'
    ]
];

$context = stream_context_create($options);
$memberResponse = @file_get_contents($memberUrl, false, $context);

$httpcode = 0;
if ($http_response_header) {
    foreach ($http_response_header as $header) {
        if (preg_match('/^HTTP\/.* (\d+)/', $header, $matches)) {
            $httpcode = intval($matches[1]);
            break;
        }
    }
}

if ($memberResponse === FALSE || $httpcode !== 200) {
    log_event("Failed to retrieve member information for user {$userData['id']} in guild {$targetGuildId}. HTTP Code: {$httpcode}");
    header('Location: ' . $returnUrl);
    exit('Error fetching user data. Some functionnalities will be removed');
}

$memberData = json_decode($memberResponse, true);

if (!isset($memberData['roles'])) {
    log_event("Invalid member data received: " . $memberResponse);

    header('Location: ' . $returnUrl);
    exit('Error fetching user data. Some functionnalities will be removed');
}

$userRoles = $memberData['roles'];
$hasAuthorizedRole = false;

foreach ($userRoles as $roleId) {
    if (in_array($roleId, $authorizedRoleIds)) {
        $hasAuthorizedRole = true;
        break;
    }
}

if ($hasAuthorizedRole) {
    $_SESSION['is_moderator'] = true;
} else {
    $_SESSION['is_moderator'] = false;
}

header('Location: ' . $returnUrl);
exit;
?>
