<?php
require_once '../config.php';

session_start();
$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["error" => "user_id est requis dans la session"]);
    exit;
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!isset($input['background']['name']) || !isset($input['background']['url'])) {
    http_response_code(400);
    echo json_encode(["error" => "Les champs 'name' et 'url' sont requis dans 'background'"]);
    exit;
}

$backgroundName = htmlspecialchars($input['background']['name'], ENT_QUOTES, 'UTF-8');
$backgroundURL = htmlspecialchars($input['background']['url'], ENT_QUOTES, 'UTF-8');

$encodedBackgroundName = rawurlencode($backgroundName);

$url = $apiRoot . "/v1/rank_card/settings/background/$user_id/$encodedBackgroundName";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["url" => $backgroundURL]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);

if ($response === false) {
    error_log("Erreur CURL : " . curl_error($ch));
    echo json_encode(["error" => "Erreur CURL : " . curl_error($ch)]);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

error_log("Code HTTP retourné : $httpCode");
error_log("Réponse de l'API externe : $response");

if ($httpCode === 201) {
    echo $response;
} else {
    http_response_code($httpCode);
    echo json_encode(["error" => "Failed to set background", "response" => $response]);
}
?>
