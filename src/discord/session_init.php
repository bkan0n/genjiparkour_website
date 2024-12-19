<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

if (!defined('SESSION_TIMEOUT')) {
    define('SESSION_TIMEOUT', 600);
}

ini_set('session.gc_maxlifetime', SESSION_TIMEOUT);
ini_set('session.cookie_lifetime', 0);

if (session_status() === PHP_SESSION_NONE) {
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

session_regenerate_id(true);

if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > SESSION_TIMEOUT)) {
    $_SESSION['session_expired'] = true;
    session_write_close();
    //error_log("Session expired set to true");
} else {
    $_SESSION['LAST_ACTIVITY'] = time();
    $_SESSION['session_expired'] = false;
    session_write_close();
    //error_log("Session expired set to false");
}