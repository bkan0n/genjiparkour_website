<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}
require BASE_PATH . 'discord/config.php';

function log_event($message) {
    $logDir = __DIR__ . '/logs';

    if (!is_dir($logDir)) {
        @mkdir($logDir, 0777, true);
    }

    $logFile = $logDir . '/security.log';
    $maxFileSize = 5 * 1024 * 1024;

    if (file_exists($logFile) && filesize($logFile) >= $maxFileSize) {
        $timestamp = date('Y-m-d_H-i-s');
        @rename($logFile, $logDir . "/security_$timestamp.log");
    }

    $logEntry = date("Y-m-d H:i:s") . " - " . $message . "\n";
    if (!@file_put_contents($logFile, $logEntry, FILE_APPEND)) {
        error_log("Failed to write to log file: $logFile");
    }
}

if (isset($_SESSION['user_id'])) {
    log_event("User logged out: " . $_SESSION['user_id']);
}

session_unset();
session_destroy();

$redirectUrl = isset($_GET['redirect']) ? $_GET['redirect'] : '../index.php';
header('Location: ' . $redirectUrl);
exit;
?>
