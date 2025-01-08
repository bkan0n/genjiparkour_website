<?php
require '../config.php';
header("Content-Type: application/json");

if (!$apiKey) {
    echo json_encode(["error" => "API key not set."]);
    exit;
}
if (!$apiRoot) {
    echo json_encode(["error" => "API root not set."]);
    exit;
}

$map_code = $_GET['map_code'] ?? null;

if ($map_code === null || trim($map_code) === '') {
    echo json_encode(["error" => "map_code is required."]);
    exit;
}

$url = $apiRoot . "/v1/maps/statistics/completions/" . urlencode($map_code);

$response = getJsonResponse($url);

if (isset($response['error'])) {
    echo json_encode($response);
    exit;
}

echo json_encode($response);

function getJsonResponse($url) {
    global $apiKey;

    $ch = curl_init();
    if ($ch === false) {
        return ["error" => "Failed to initialize cURL session."];
    }

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'X-API-KEY: ' . $apiKey
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        $error_msg = curl_error($ch);
        curl_close($ch);
        return ["error" => "cURL error: $error_msg"];
    }

    curl_close($ch);

    $decoded = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return ["error" => "Invalid JSON response from API", "raw_response" => $response];
    }

    return $decoded;
}
