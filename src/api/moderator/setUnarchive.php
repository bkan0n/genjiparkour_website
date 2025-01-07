<?php

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Seules les requêtes POST sont autorisées"]);
    exit;
}

$inputData = file_get_contents('php://input');

$data = json_decode($inputData, true);

if (!is_array($data) || empty($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Le format des données envoyées est invalide ou vide"]);
    exit;
}

foreach ($data as $item) {
    if (!isset($item['map_code']) || empty($item['map_code'])) {
        http_response_code(400);
        echo json_encode(["error" => "Le champ requis 'map_code' est manquant ou vide"]);
        exit;
    }
}

$apiUrl = rtrim($apiRoot, '/') . '/v1/maps/unarchive';
$options = [
    'http' => [
        'header'  => [
            "Content-Type: application/json",
            "X-API-Key: $apiKey"
        ],
        'method'  => 'POST',
        'content' => json_encode($data)
    ]
];

$context  = stream_context_create($options);
$response = file_get_contents($apiUrl, false, $context);

if ($response === FALSE) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la communication avec l'API distante"]);
    exit;
}

header('Content-Type: application/json');
echo $response;