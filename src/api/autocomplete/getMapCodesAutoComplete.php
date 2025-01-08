<?php
require '../config.php';

header("Content-Type: application/json");

if (!$apiKey || !$apiRoot) {
    echo json_encode(["error" => "Configuration missing"]);
    exit;
}

$value = $_GET['value'] ?? '';
$pageSize = $_GET['page_size'] ?? 10;

if (empty($value)) {
    echo json_encode(["error" => "The 'value' parameter is required."]);
    exit;
}

$url = $apiRoot . "/v1/autocomplete/map-codes?" . http_build_query([
    'value' => $value,
    'page_size' => $pageSize
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);

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

echo json_encode($data);
?>
