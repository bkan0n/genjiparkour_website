<?php
require 'config.php';
header("Content-Type: application/json");
if (!$apiKey) {
    echo json_encode(["error" => "API key not set."]);
    exit;
}
if (!$apiRoot) {
    echo json_encode(["error" => "API root not set."]);
    exit;
}

function buildGuideUrl($map_code = null, $page_size = 25, $page_number = 1) {
    global $apiRoot;
    $endpoint = $apiRoot . "/v1/maps/guides";
    $params = [];

    if ($map_code !== null) $params['map_code'] = $map_code;
    $params['page_size'] = $page_size;
    $params['page_number'] = $page_number;

    $query_string = http_build_query($params);
    return $endpoint . ($query_string ? '?' . $query_string : '');
}

function getJsonResponse($url) {
    $ch = curl_init();
    if ($ch === false) {
        return ["error" => "Failed to initialize cURL session."];
    }

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'X-API-KEY: ' . getenv("X_API_KEY")
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);
    if ($response === false) {
        $error_msg = curl_error($ch);
        curl_close($ch);
        return ["error" => "cURL error: $error_msg"];
    }

    curl_close($ch);
    return json_decode($response, true) ?: ["error" => "Failed to decode JSON response."];
}

$filters = json_decode(file_get_contents("php://input"), true);
$page_size = $filters['page_size'] ?? 25;
$page_number = $filters['page_number'] ?? 1;

$url = buildGuideUrl(
    $filters['map_code'] ?? null,
    $page_size,
    $page_number
);

$response = getJsonResponse($url);

$total_results = $response[0]['total_results'] ?? 0;
$total_pages = ceil($total_results / $page_size);

$formatted_response = array_map(function($result) {
    return [
        "map_code" => $result["map_code"] ?? "N/A",
        "url" => $result["url"] ?? "N/A"
    ];
}, $response);

echo json_encode([
    "results" => $formatted_response,
    "pagination" => [
        "total_results" => $total_results,
        "page_size" => $page_size,
        "page_number" => $page_number,
        "total_pages" => $total_pages
    ]
]);
