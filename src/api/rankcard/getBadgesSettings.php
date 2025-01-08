<?php
require '../config.php';

session_start();

$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["error" => "user_id est requis"]);
    exit;
}

$url = "$apiRoot/v1/rank_card/settings/badges/$user_id";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode([
        "error" => "Failed to connect to API",
        "curl_error" => curl_error($ch),
        "url" => $url
    ]);
} else {
    $decodedResponse = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(500);
        echo json_encode([
            "error" => "Invalid JSON returned from API",
            "raw_response" => $response
        ]);
    } else {
        http_response_code(200);
        echo json_encode($decodedResponse);
    }
}

curl_close($ch);
