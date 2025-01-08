<?php
require '../config.php';

$endpoint = '/v1/completions/statistics/time-played/rank';
$url = $apiRoot . $endpoint;

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "X-API-KEY: $apiKey"
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Erreur cURL: ' . curl_error($ch);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

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
?>