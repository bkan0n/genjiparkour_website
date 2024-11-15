<?php
$apiUrl = getenv('X_API_ROOT') . '/v1/maps/popularcreators';
$apiKey = getenv('X_API_KEY');

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');

if ($response === false) {
    echo json_encode(['error' => 'Request failed']);
} else {
    $data = json_decode($response, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'Invalid JSON received']);
    }
}
