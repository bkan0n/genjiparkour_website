<?php
require '../config.php';

$reward_type = $_GET['reward_type'] ?? null;
$key_type = $_GET['key_type'] ?? null;
$rarity = $_GET['rarity'] ?? null;

$query_params = array_filter(compact('reward_type', 'key_type', 'rarity'));
$api_url = "{$apiRoot}/v1/lootbox/rewards" . (count($query_params) ? '?' . http_build_query($query_params) : "");

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $http_code !== 200) {
    header('Content-Type: application/json', true, $http_code ?: 500);
    echo json_encode([
        'error' => 'Failed to fetch rewards',
        'http_code' => $http_code,
        'response' => $response ?: 'No response from API'
    ]);
    exit;
}

header('Content-Type: application/json');
echo $response;