<?php
require_once '../config.php';
header("Content-Type: application/json");

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

$required = ['code', 'name', 'checkpoints', 'creator_ids'];
foreach ($required as $f) {
    if (!isset($data[$f]) || $data[$f] === '' || (is_array($data[$f]) && count($data[$f]) === 0)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required parameter: $f"]);
        exit;
    }
}

$input = [];
$input['code']        = $data['code'];
$input['name']        = $data['name'];
$input['checkpoints'] = (int)$data['checkpoints'];

if (!is_array($data['creator_ids'])) {
    http_response_code(400);
    echo json_encode(['error' => 'creator_ids must be an array']);
    exit;
}

$input['creator_ids'] = array_map('intval', $data['creator_ids']);

$optional = [
    'description', 'guide_urls', 'gold', 'silver', 'bronze',
    'category', 'difficulty', 'mechanics', 'restrictions', 'map_id'
];
foreach ($optional as $f) {
    if (isset($data[$f]) && $data[$f] !== '') {
        $input[$f] = $data[$f];
    }
}

$payload = [
    'code'        => $input['code'],
    'name'        => $input['name'],
    'checkpoints' => $input['checkpoints'],
    'creator_ids' => $input['creator_ids'],
];
foreach ($optional as $f) {
    if (array_key_exists($f, $input)) {
        if (in_array($f, ['gold','silver','bronze','map_id'])) {
            $payload[$f] = (float)$input[$f];
        } else {
            $payload[$f] = $input[$f];
        }
    }
}

$url = "https://apitest.genji.pk/v2/maps/playtests";
$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER  => true,
    CURLOPT_POST            => true,
    CURLOPT_POSTFIELDS      => json_encode($payload),
    CURLOPT_HTTPHEADER      => [
        'Content-Type: application/json',
        'X-API-KEY: ' . $apiKey
    ],
    CURLOPT_SSL_VERIFYPEER  => false,
]);

$response = curl_exec($ch);
if ($response === false) {
    $err = curl_error($ch);
    curl_close($ch);
    http_response_code(502);
    echo json_encode(["error" => "cURL error: $err"]);
    exit;
}
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
