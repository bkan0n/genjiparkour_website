<?php
require '../config.php';

header("Content-Type: application/json");

if (!$apiKey || !$apiRoot) {
    echo json_encode(["error" => "Configuration missing"]);
    exit;
}

$locale = $_GET['locale'] ?? 'en';
$value = $_GET['value'] ?? '';
$pageSize = $_GET['page_size'] ?? 10;

if (empty($value)) {
    echo json_encode(["error" => "The 'value' parameter is required."]);
    exit;
}

$apiUrl = $apiRoot . "/v1/autocomplete/map-names/{$locale}?value=" . urlencode($value) . "&page_size=" . $pageSize;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(["error" => "cURL error: " . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

$data = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["error" => "Invalid JSON response"]);
    exit;
}

$results = [];
foreach ($data as $item) {
    $results[] = [
        'map_name' => $item['map_name'],
        'translated_map_name' => $item['translated_map_name'] ?? $item['map_name']
    ];
}

echo json_encode($results);
?>