<?php

require_once '../config.php';

session_start();
$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["error" => "user_id est requis dans la session"]);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$pose = $data['avatarPose'] ?? null;

if (!$pose) {
    http_response_code(400);
    echo json_encode(["error" => "Le paramètre 'avatarSkin' est requis"]);
    exit;
}

$apiUrl = "{$apiRoot}/v1/rank_card/settings/avatar/pose/{$user_id}/{$pose}";

$options = [
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n" .
                    "X-API-KEY: {$apiKey}\r\n",
        'ignore_errors' => true
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($apiUrl, false, $context);

$httpCode = intval(explode(' ', $http_response_header[0])[1]);

if ($httpCode !== 201) {
    http_response_code($httpCode);
    echo json_encode(["error" => "Erreur API: Code {$httpCode}", "response" => $response]);
    exit;
}

http_response_code(201);
header('Content-Type: application/json');
echo $response;

?>
