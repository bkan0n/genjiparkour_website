<?php
header("Content-Type: application/json");

// Check if the API key is set
$api_key = getenv("X-API-KEY");
if (!$api_key) {
    echo json_encode(["error" => "API key not set."]);
    exit;
}

function buildMapSearchUrl(
    $map_code = null,
    $map_type = null,
    $map_name = null,
    $creator = null,
    $mechanic = null,
    $restriction = null,
    $difficulty = null,
    $minimum_quality = null,
    $only_playtest = null,
    $only_maps_with_medals = null,
    $page_size = null,
    $page_number = null,
    $count_only = false
) {
    $endpoint = "https://api.genji.pk/v1/mapsearch";
    $params = [];

    if ($map_code !== null) $params['map_code'] = $map_code;
    if ($map_type !== null) $params['map_type'] = $map_type;
    if ($map_name !== null) $params['map_name'] = $map_name;
    if ($creator !== null) $params['creator'] = $creator;
    if ($mechanic !== null) $params['mechanic'] = $mechanic;
    if ($restriction !== null) $params['restriction'] = $restriction;
    if ($difficulty !== null) $params['difficulty'] = $difficulty;
    if ($minimum_quality !== null) $params['minimum_quality'] = $minimum_quality;
    if ($only_playtest !== null) $params['only_playtest'] = $only_playtest === 'true' ? true : false;
    if ($only_maps_with_medals !== null) $params['only_maps_with_medals'] = $only_maps_with_medals === 'true' ? true : false;

    if (!$count_only) {
        $params['page_size'] = $page_size;
        $params['page_number'] = $page_number;
    }

    $query_string = http_build_query($params, '', '&', PHP_QUERY_RFC3986);
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
        'X-API-KEY: ' . getenv("X-API-KEY")
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
$is_count_request = isset($filters['count_only']) ? $filters['count_only'] : false;
$page_size = $filters['page_size'] ?? 25;
$page_number = $filters['page_number'] ?? 1;

if ($is_count_request) {
    $url = buildMapSearchUrl(
        $filters['map_code'] ?? null,
        $filters['map_type'] ?? null,
        $filters['map_name'] ?? null,
        $filters['creator'] ?? null,
        $filters['mechanic'] ?? null,
        $filters['restriction'] ?? null,
        $filters['difficulty'] ?? null,
        $filters['minimum_quality'] ?? null,
        $filters['only_playtest'] ?? null,
        $filters['only_maps_with_medals'] ?? null
    );
    $response = getJsonResponse($url);

    $total_results = $response[0]['total_results'] ?? 0;

    echo json_encode(['total_results' => $total_results]);
    exit;
}

$url = buildMapSearchUrl(
    $filters['map_code'] ?? null,
    $filters['map_type'] ?? null,
    $filters['map_name'] ?? null,
    $filters['creator'] ?? null,
    $filters['mechanic'] ?? null,
    $filters['restriction'] ?? null,
    $filters['difficulty'] ?? null,
    $filters['minimum_quality'] ?? null,
    $filters['only_playtest'] ?? null,
    $filters['only_maps_with_medals'] ?? null,
    $page_size,
    $page_number
);

$response = getJsonResponse($url);

if (isset($response[0]['total_results'])) {
    $total_results = $response[0]['total_results'];
    $total_pages = ceil($total_results / $page_size);
    $response['pagination'] = [
        'total_results' => $total_results,
        'page_size' => $page_size,
        'page_number' => $page_number,
        'total_pages' => $total_pages
    ];
}

echo json_encode($response);
