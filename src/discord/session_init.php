<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

if (session_status() === PHP_SESSION_NONE) {
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params([
        'lifetime' => 31536000,
        'path' => $cookieParams['path'],
        'domain' => $cookieParams['domain'],
        'secure' => $cookieParams['secure'],
        'httponly' => $cookieParams['httponly'],
    ]);

    session_start();
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

if (!isset($_SESSION['LAST_ACTIVITY'])) {
    $_SESSION['LAST_ACTIVITY'] = time();
    //error_log("[SESSION_INIT] Session initialized. LAST_ACTIVITY: " . $_SESSION['LAST_ACTIVITY']);
}