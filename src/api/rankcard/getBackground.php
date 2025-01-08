<?php

require_once '../config.php';

session_start();
$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["error" => "user_id est requis"]);
    exit;
}

$apiUrl = "{$apiRoot}/v1/rank_card/settings/background/{$user_id}";

$ch = curl_init($apiUrl);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion à l'API."]);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode(["error" => "Erreur de l'API: Code {$httpCode}"]);
    exit;
}

$data = json_decode($response, true);
if (!$data) {
    http_response_code(500);
    echo json_encode(["error" => "Réponse JSON invalide."]);
    exit;
}

header('Content-Type: application/json');
echo json_encode($data);

curl_close($ch);

?>
