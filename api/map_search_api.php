<?php
header("Content-Type: application/json");

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
    $mechanics = null,
    $restrictions = null,
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
    if ($difficulty !== null) $params['difficulty'] = $difficulty;
    if ($minimum_quality !== null) $params['minimum_quality'] = $minimum_quality;
    if ($only_playtest !== null) $params['only_playtest'] = $only_playtest === 'true' ? true : false;
    if ($only_maps_with_medals !== null) $params['only_maps_with_medals'] = $only_maps_with_medals === 'true' ? true : false;
    if (!$count_only) {
        $params['page_size'] = $page_size;
        $params['page_number'] = $page_number;
    }

    // Mechanics et Restrictions []
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

    // Requête finale 
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
$page_size = $filters['page_size'] ?? 25;
$page_number = $filters['page_number'] ?? 1;

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
    $page_size,
    $page_number
);

$response = getJsonResponse($url);

$total_results = $response[0]['total_results'] ?? 0;
$total_pages = ceil($total_results / $page_size);
$response['pagination'] = [
    'total_results' => $total_results,
    'page_size' => $page_size,
    'page_number' => $page_number,
    'total_pages' => $total_pages
];

echo json_encode($response);
