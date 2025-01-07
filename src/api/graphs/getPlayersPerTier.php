<?php
require '../config.php';

$apiUrl = getenv('X_API_ROOT') . '/v1/ranks/statistics/xp/players';
$apiKey = getenv('X_API_KEY');

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "X-API-KEY: $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

header('Content-Type: application/json');

if ($response === false) {
    echo json_encode(['error' => 'Request failed']);
} elseif ($httpCode !== 200) {
    echo json_encode(['error' => "API returned HTTP code $httpCode"]);
} else {
    $data = json_decode($response, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'Invalid JSON received']);
    }
}
