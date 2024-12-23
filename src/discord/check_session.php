<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

require BASE_PATH . 'discord/session_init.php';

header('Content-Type: application/json');

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);
if (isset($data['isPolling']) && $data['isPolling'] === true) {
    $_SESSION['IS_POLLING'] = true;
} else {
    $_SESSION['IS_POLLING'] = false;
}

$sessionExpired = $_SESSION['session_expired'] ?? false;
echo json_encode(['session_expired' => $sessionExpired]);
?>