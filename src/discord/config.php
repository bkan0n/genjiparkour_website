<?php

require_once __DIR__ . '/vendor/autoload.php';
$webhookUrl = getenv("GLITCHTIP_DSN");
\Sentry\init(['dsn' => $webhookUrl ]);

$webhookUrl = getenv("DISCORD_WEBHOOK_URL");

if (strpos($_SERVER['REQUEST_URI'], '/api/') === 0) {
    header('Content-Type: application/json');
}

function sendErrorToDiscord($message) {
    global $webhookUrl;
    $data = json_encode(["content" => $message]);

    $options = [
        'http' => [
            'header' => "Content-Type: application/json\r\nContent-Length: " . strlen($data) . "\r\n",
            'method' => 'POST',
            'content' => $data
        ]
    ];

    $context = stream_context_create($options);
    file_get_contents($webhookUrl, false, $context);
}

function errorHandler($errno, $errstr, $errfile, $errline) {
    $message = "**PHP Error:**\n- Type: [$errno]\n- Message: $errstr\n- File: $errfile\n- Line: $errline";
    sendErrorToDiscord($message);
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred.']);
    exit;
}

function exceptionHandler($exception) {
    $message = "**Unhandled Exception:**\n- Message: {$exception->getMessage()}\n- File: {$exception->getFile()}\n- Line: {$exception->getLine()}";
    sendErrorToDiscord($message);
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred.']);
    exit;
}

function shutdownHandler() {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        $message = "**Fatal Error:**\n- Type: [{$error['type']}]\n- Message: {$error['message']}\n- File: {$error['file']}\n- Line: {$error['line']}";
        sendErrorToDiscord($message);
        http_response_code(500);
        echo json_encode(['error' => 'A fatal error occurred.']);
        exit;
    }
}

set_error_handler("errorHandler");
set_exception_handler("exceptionHandler");
register_shutdown_function("shutdownHandler");

if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params(31536000);
    session_start();
}

$nonce = base64_encode(random_bytes(16));

if (!headers_sent()) {
    header("Content-Security-Policy: default-src 'self' https://test.genji.pk https://genji.pk; img-src 'self' https://cdn.discordapp.com https://mdbootstrap.com data: https://tenor.com https://media.tenor.com https://c.tenor.com; script-src 'self' 'unsafe-inline' https://ajax.googleapis.com https://code.jquery.com https://cdn.jsdelivr.net https://kit.fontawesome.com https://youtube.com https://youtu.be https://stackpath.bootstrapcdn.com https://cdnjs.cloudflare.com https://analytics.bkan0n.com https://browser.sentry-cdn.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://kit.fontawesome.com https://use.fontawesome.com https://stackpath.bootstrapcdn.com; font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com https://use.fontawesome.com https://kit.fontawesome.com https://stackpath.bootstrapcdn.com; frame-src 'self' https://www.youtube.com https://tenor.com https://media.tenor.com https://c.tenor.com; connect-src 'self' https://test.genji.pk https://genji.pk https://tenor.googleapis.com https://g.tenor.com https://analytics.bkan0n.com/api/send data:; frame-ancestors 'none'; base-uri 'self';");
    $allowed_origins = ["https://genji.pk", "https://test.genji.pk"];
    if (in_array($_SERVER['HTTP_ORIGIN'] ?? '', $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    }
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}


if (!defined('DISCORD_CLIENT_ID')) {
    define('DISCORD_CLIENT_ID', getenv('DISCORD_CLIENT_ID'));
}

if (!defined('DISCORD_CLIENT_SECRET')) {
    define('DISCORD_CLIENT_SECRET', getenv('DISCORD_CLIENT_SECRET'));
}

if (!defined('DISCORD_API_URL')) {
    define('DISCORD_API_URL', 'https://discord.com/api/v10');
}

if (!defined('ENCRYPTION_KEY')) {
    if (!isset($_SESSION['encryption_key'])) {
        $_SESSION['encryption_key'] = bin2hex(random_bytes(16));
    }
    define('ENCRYPTION_KEY', $_SESSION['encryption_key']);
}

if (!defined('REDIRECT_URL')) {
    if ($_SERVER['HTTP_HOST'] === 'localhost') {
        define('REDIRECT_URL', 'http://localhost/leaderboard_project/');
    } elseif ($_SERVER['HTTP_HOST'] === 'test.genji.pk') {
        define('REDIRECT_URL', 'https://test.genji.pk/');
    } elseif ($_SERVER['HTTP_HOST'] === 'genji.pk') {
        define('REDIRECT_URL', 'https://genji.pk/');
    }
}

if (!defined('DISCORD_REDIRECT_URI')) {
    define('DISCORD_REDIRECT_URI', REDIRECT_URL . 'discord/callback.php');
}

$_SESSION['LAST_ACTIVITY'] = time();
