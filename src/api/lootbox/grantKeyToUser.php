<?php
header('Content-Type: application/json');
require '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_POST['user_id']) || empty($_POST['key_type'])) {
    echo json_encode(['error' => 'User ID and Key Type are required.']);
    exit;
}

$userId = $_POST['user_id'];
$keyType = $_POST['key_type'];

$apiRoot = getenv('X_API_ROOT');
$apiKey = getenv('X_API_KEY');

if (!$apiRoot || !$apiKey) {
    echo json_encode(['error' => 'API configuration is missing.']);
    exit;
}

$apiUrl = "$apiRoot/v1/lootbox/user/$userId/keys/$keyType";

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'cURL error: ' . curl_error($ch)]);
} else if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => 'Key granted successfully.']);
} else {
    echo json_encode(['error' => "Failed with HTTP code $httpCode", 'response' => $response]);
}

curl_close($ch);
?>
