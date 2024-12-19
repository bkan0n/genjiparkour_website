<?php
require_once 'config.php';

$page_number = isset($_GET['page_number']) ? (int)$_GET['page_number'] : 1;
$page_size = isset($_GET['page_size']) ? (int)$_GET['page_size'] : 10;
$type = isset($_GET['type']) ? $_GET['type'] : null;

function fetchNewsfeed($apiKey, $apiRoot, $page_number, $page_size, $type) {
    $url = rtrim($apiRoot, '/') . '/v1/newsfeed?page_size=' . $page_size . '&page_number=' . $page_number;

    if ($type) {
        $url .= '&type=' . urlencode($type);
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'X-API-KEY: ' . $apiKey
    ]);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        $error = curl_error($ch);
        curl_close($ch);
        header('Content-Type: application/json');
        echo json_encode(['error' => "Request error: $error"]);
        exit;
    }

    curl_close($ch);

    $data = json_decode($response, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Invalid JSON response: ' . json_last_error_msg()]);
        exit;
    }

    return $data;
}

header('Content-Type: application/json');

$newsfeed = fetchNewsfeed($apiKey, $apiRoot, $page_number, $page_size, $type);

if (!empty($newsfeed)) {
    $totalResults = null;
    foreach ($newsfeed as $item) {
        if (isset($item['total_results'])) {
            $totalResults = $item['total_results'];
            break;
        }
    }

    echo json_encode([
        'total_results' => $totalResults,
        'data' => $newsfeed
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
} else {
    echo json_encode(['error' => 'No newsfeed data found']);
}
