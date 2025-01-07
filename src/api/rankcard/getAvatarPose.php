<?php

require_once '../config.php';

session_start();
$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["error" => "user_id est requis dans la session"]);
    exit;
}

$apiUrl = "{$apiRoot}/v1/rank_card/settings/avatar/pose/{$user_id}";

$response = file_get_contents($apiUrl);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion à l'API"]);
    exit;
}

http_response_code(200);
header('Content-Type: application/json');
echo $response;

?>