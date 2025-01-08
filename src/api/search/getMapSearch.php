<?php
require '../config.php';
session_start();
header("Content-Type: application/json");

if (!$apiKey) {
    echo json_encode(["error" => "API key not set."]);
    exit;
}
if (!$apiRoot) {
    echo json_encode(["error" => "API root not set."]);
    exit;
}

$user_id = $_SESSION['user_id'] ?? null;

function buildMapSearchUrl(
    $map_code = null,
    $map_type = null,
    $map_name = null,
    $creator = null,
    $mechanics = null,
    $restrictions = null,
    $difficulty = null,
    $minimum_quality = null,
    $only_playtest = null,
    $only_maps_with_medals = null,
    $ignore_completions = null,
    $page_size = null,
    $page_number = null,
    $count_only = false,
    $desc = null,
    $user_id = null
) {
    global $apiRoot;
    $endpoint = $apiRoot . "/v1/maps/search";
    $params = [];

    if ($map_code !== null) $params['map_code'] = $map_code;
    if ($map_type !== null) $params['map_type'] = $map_type;
    if ($map_name !== null) $params['map_name'] = $map_name;
    if ($creator !== null) $params['creator'] = $creator;
    if ($difficulty !== null) $params['difficulty'] = $difficulty;
    if ($minimum_quality !== null) $params['minimum_quality'] = $minimum_quality;
    if ($only_playtest !== null) {
        $params['only_playtest'] = filter_var($only_playtest, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
    }
    if ($only_maps_with_medals !== null) {
        $params['only_maps_with_medals'] = filter_var($only_maps_with_medals, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
    }
    if ($ignore_completions !== null) {
        $params['ignore_completions'] = filter_var($ignore_completions, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
    }
    if ($desc !== null) $params['desc'] = $desc;
    if (!$count_only) {
        $params['page_size'] = $page_size;
        $params['page_number'] = $page_number;
    }

    if ($user_id !== null) {
        $params['user_id'] = $user_id;
    }

    if ($mechanics !== null && is_array($mechanics)) {
        foreach ($mechanics as $mechanic) {
            $params[] = "mechanics=" . urlencode($mechanic);
        }
    } elseif ($mechanics !== null) {
        $params['mechanics'] = $mechanics;
    }

    if ($restrictions !== null && is_array($restrictions)) {
        foreach ($restrictions as $restriction) {
            $params[] = "restrictions=" . urlencode($restriction);
        }
    } elseif ($restrictions !== null) {
        $params['restrictions'] = $restrictions;
    }

    $query_string = implode('&', array_map(
        fn($key, $value) => is_int($key) ? $value : "$key=$value",
        array_keys($params),
        $params
    ));
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
    error_log("API Request URL: " . $url);
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

$filters = json_decode(file_get_contents("php://input"), true);
$page_size = $filters['page_size'] ?? 25;
$page_number = $filters['page_number'] ?? 1;
$desc = $filters['desc'] ?? null;

$url = buildMapSearchUrl(
    $filters['map_code'] ?? null,
    $filters['map_type'] ?? null,
    $filters['map_name'] ?? null,
    $filters['creator'] ?? null,
    $filters['mechanics'] ?? null,
    $filters['restrictions'] ?? null,
    $filters['difficulty'] ?? null,
    $filters['minimum_quality'] ?? null,
    $filters['only_playtest'] ?? null,
    $filters['only_maps_with_medals'] ?? null,
    $filters['ignore_completions'] ?? null,
    $page_size,
    $page_number,
    false,
    $desc,
    $user_id
);

$response = getJsonResponse($url);

if (isset($response['error'])) {
    echo json_encode($response);
    exit;
}

$response = array_map(function ($map) {
    $map['time'] = isset($map['time']) && is_numeric($map['time']) 
        ? (int) $map['time'] 
        : null;

    $valid_medals = ['Gold', 'Silver', 'Bronze'];
    $map['medal_type'] = isset($map['medal_type']) && in_array($map['medal_type'], $valid_medals, true) 
        ? $map['medal_type'] 
        : null;

    return $map;
}, $response);

$total_results = $response[0]['total_results'] ?? 0;
$total_pages = ceil($total_results / $page_size);
$response['pagination'] = [
    'total_results' => $total_results,
    'page_size' => $page_size,
    'page_number' => $page_number,
    'total_pages' => $total_pages
];

echo json_encode($response);
