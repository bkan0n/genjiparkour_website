<?php
require_once '../config.php';

if (!isset($apiKey) || !isset($apiRoot)) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "API configuration is missing. Check your config.php file."
    ]);
    exit;
}

$apiUrl = rtrim($apiRoot, '/') . "/v1/autocomplete/map-mechanics";

$curl = curl_init($apiUrl);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPGET, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);

$response = curl_exec($curl);

if (curl_errno($curl)) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Failed to fetch data from the API: " . curl_error($curl)
    ]);
    exit;
}

$httpStatus = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);

if ($httpStatus === 200) {
    header('Content-Type: application/json');
    echo $response;
} else {
    http_response_code($httpStatus);
    echo json_encode([
        "error" => true,
        "message" => "API request failed with status code $httpStatus",
        "response" => $response
    ]);
}
?>
