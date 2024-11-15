<?php
require 'config.php';

$key_type = $_GET['key_type'] ?? null;
$apiRoot = "{$apiRoot}/v1/lootbox/keys";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');
echo $response;
