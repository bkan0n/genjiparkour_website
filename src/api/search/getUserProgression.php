<?php
require '../config.php';
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => true, "login_required" => true]);
    exit;
}

$userId = $_SESSION['user_id'];

if (!isset($_GET['map_code'])) {
    echo json_encode(["error" => "Missing required parameter: map_code"]);
    exit;
}

$mapCode = htmlspecialchars($_GET['map_code']);

if (!$apiKey || !$apiRoot) {
    echo json_encode(["error" => "Configuration missing"]);
    exit;
}

function buildApiUrl($userId, $mapCode) {
    global $apiRoot;
    return "{$apiRoot}/v1/completions/progression/{$userId}/{$mapCode}";
}

function getApiResponse($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'X-API-KEY: ' . getenv("X_API_KEY")
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);
    curl_close($ch);

    $decoded = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return ["error" => "Invalid JSON from API", "raw_response" => $response];
    }
    return $decoded;
}

$url = buildApiUrl($userId, $mapCode);

$response = getApiResponse($url);

if (isset($response['error'])) {
    echo json_encode($response);
    exit;
}

echo json_encode($response);
?>
