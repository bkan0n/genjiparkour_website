<?php
require 'config.php';

$reward_type = $_GET['reward_type'] ?? null;
$key_type = $_GET['key_type'] ?? null;
$rarity = $_GET['rarity'] ?? null;

$query_params = array_filter(compact('reward_type', 'key_type', 'rarity'));
$api_url = "{$apiRoot}/v1/lootbox/rewards" . (count($query_params) ? '?' . http_build_query($query_params) : "");

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');
echo $response;
