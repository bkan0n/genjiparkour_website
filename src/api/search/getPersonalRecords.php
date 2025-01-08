<?php
require '../config.php';
header("Content-Type: application/json");

if (!$apiKey) {
    echo json_encode(["error" => "API key not set."]);
    http_response_code(500);
    exit;
}
if (!$apiRoot) {
    echo json_encode(["error" => "API root not set."]);
    http_response_code(500);
    exit;
}

$user_id = $_GET['user_id'] ?? null;
if (!$user_id) {
    $filters = json_decode(file_get_contents("php://input"), true);
    $user_id = $filters['user_id'] ?? null;
}

if (!$user_id) {
    echo json_encode(["error" => "user_id is required."]);
    http_response_code(400);
    exit;
}

function buildEndpointUrl($user_id, $map_code = null, $difficulty = null, $user = null, $discord_tag = null, $time = null, $medal = null, $page_size = 25, $page_number = 1) {
    global $apiRoot;

    if (!$user_id) {
        throw new Exception("user_id is required");
    }

    $endpoint = $apiRoot . "/v1/completions/personal/$user_id";
    $params = [];

    if ($map_code !== null) $params['map_code'] = $map_code;
    if ($difficulty !== null) $params['difficulty'] = $difficulty;
    if ($user !== null) $params['user'] = $user;
    if ($discord_tag !== null) $params['discord_tag'] = $discord_tag;
    if ($time !== null) $params['time'] = $time;
    if ($medal !== null) $params['medal'] = $medal;
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

    $response = curl_exec($ch);
    if ($response === false) {
        $error_msg = curl_error($ch);
        curl_close($ch);
        return ["error" => "cURL error: $error_msg"];
    }

    curl_close($ch);
    return json_decode($response, true) ?: ["error" => "Failed to decode JSON response."];
}

$filters = json_decode(file_get_contents("php://input"), true) ?? [];
$page_size = $filters['page_size'] ?? 25;
$page_number = $filters['page_number'] ?? 1;

try {
    $url = buildEndpointUrl(
        $user_id,
        $filters['map_code'] ?? null,
        $filters['difficulty'] ?? null,
        $filters['user'] ?? null,
        $filters['discord_tag'] ?? null,
        $filters['time'] ?? null,
        $filters['medal'] ?? null,
        $page_size,
        $page_number
    );

    $response = getJsonResponse($url);

    $total_results = $response[0]['total_results'] ?? 0;
    $total_pages = ceil($total_results / $page_size);

    $formatted_response = array_map(function($result) {
        return [
            "map_code" => $result["map_code"] ?? "N/A",
            "nickname" => $result["nickname"] ?? "N/A",
            "discord_tag" => $result["discord_tag"] ?? "N/A",
            "difficulty" => $result["difficulty"] ?? "N/A",
            "time" => $result["time"] ?? 0,
            "medal" => $result["medal"] ?? "N/A"
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
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
    http_response_code(400);
    exit;
}
