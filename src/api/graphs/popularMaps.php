<?php
header('Content-Type: application/json');

$apiUrl = getenv('X_API_ROOT') . '/v1/maps/popular';
$apiKey = getenv('X_API_KEY');

$ch = curl_init($apiUrl);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "X-API-KEY: $apiKey"
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'Request Error: ' . curl_error($ch)]);
} else {
    $data = json_decode($response, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        echo json_encode($data, JSON_PRETTY_PRINT);
    } else {
        echo json_encode(['error' => 'JSON decoding error: ' . json_last_error_msg()]);
    }
}

curl_close($ch);
?>
