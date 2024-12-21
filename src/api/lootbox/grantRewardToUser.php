<?php
require '../config.php';

if (!isset($_POST['user_id']) || !isset($_POST['key_type']) || !isset($_POST['reward_type']) || !isset($_POST['reward_name']) || !isset($_POST['nonce'])) {
    echo json_encode(['error' => 'Missing required parameters']);
    exit;
}

session_start();
$userId = htmlspecialchars($_POST['user_id']);
$keyType = htmlspecialchars($_POST['key_type']);
$rewardType = htmlspecialchars($_POST['reward_type']);
$rewardName = htmlspecialchars($_POST['reward_name']);
$nonce = htmlspecialchars($_POST['nonce']);

if ($nonce !== $_SESSION['reward_nonce']) {
    echo json_encode(['error' => 'Invalid nonce']);
    exit;
}

$url = "{$apiRoot}/v1/lootbox/users/{$userId}/{$keyType}/{$rewardType}/{$rewardName}";
$data = json_encode([
    'nonce' => $nonce
]);

$options = [
    'http' => [
        'header' => [
            'X-API-KEY: ' . $apiKey,
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data)
        ],
        'method' => 'POST',
        'content' => $data
    ],
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

if ($response === false) {
    echo json_encode(['error' => 'API request failed']);
} else {
    unset($_SESSION['reward_nonce']);
    echo $response;
}
