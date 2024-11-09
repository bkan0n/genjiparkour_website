<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}
require BASE_PATH . 'discord/session_init.php';

header('Content-Type: application/json');

$sessionExpired = $_SESSION['session_expired'] ?? false;
echo json_encode(['session_expired' => $sessionExpired]);
?>
