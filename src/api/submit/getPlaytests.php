<?php
require_once '../config.php';
header("Content-Type: application/json");

if (!isset($_GET['user_id']) || !is_numeric($_GET['user_id'])) {
    echo json_encode(["error" => "Missing or invalid required parameter: user_id"]);
    exit;
}

$url = "https://apitest.genji.pk/v2/maps/playtests";

$params = [
    'user_id' => (int)$_GET['user_id']
];

if (!empty($_GET['code'])) {
    $params['code'] = $_GET['code'];
}
if (!empty($_GET['category'])) {
    $params['category'] = $_GET['category'];
}
if (!empty($_GET['name'])) {
    $params['name'] = $_GET['name'];
}
if (!empty($_GET['creator_id'])) {
    $params['creator_id'] = (string)$_GET['creator_id'];
}
if (!empty($_GET['mechanics'])) {
    $params['mechanics'] = $_GET['mechanics'];
}
if (!empty($_GET['restrictions'])) {
    $params['restrictions'] = $_GET['restrictions'];
}
if (!empty($_GET['difficulty'])) {
    $params['difficulty'] = $_GET['difficulty'];
}
if (!empty($_GET['participation_filter'])) {
    $params['participation_filter'] = $_GET['participation_filter'];
}
if (!empty($_GET['page_size'])) {
    $params['page_size'] = (int)$_GET['page_size'];
}
if (!empty($_GET['page_number'])) {
    $params['page_number'] = max(1, (int)$_GET['page_number']);
}

$query = http_build_query($params);
$finalUrl = $url . "?$query";

$response = getJsonResponse($finalUrl);

if (isset($response['error'])) {
    echo json_encode($response);
    exit;
}

foreach ($response as &$playtest) {
    if (isset($playtest['creator_ids']) && is_array($playtest['creator_ids'])) {
        $playtest['creator_ids'] = array_map('strval', $playtest['creator_ids']);
    }

    if (isset($playtest['playtest']['participants']) && is_array($playtest['playtest']['participants'])) {
        $playtest['playtest']['participants'] = array_map('strval', $playtest['playtest']['participants']);
    }

    if (isset($playtest['playtest']['thread_id'])) {
        $playtest['playtest']['thread_id'] = (string)$playtest['playtest']['thread_id'];
    }

    if (isset($playtest['id'])) {
        $playtest['id'] = (string)$playtest['id'];
    }
}

echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

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
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

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
?>