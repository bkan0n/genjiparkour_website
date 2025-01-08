<?php
require_once '../config.php';

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Méthode non autorisée. Utilisez POST"]);
    exit;
}

$inputData = json_decode(file_get_contents("php://input"), true);

$requiredFields = ["map_code", "map_type", "map_name", "difficulty", "checkpoints", "creator_id", "nickname"];
foreach ($requiredFields as $field) {
    if (!isset($inputData[$field]) || empty($inputData[$field])) {
        http_response_code(400);
        echo json_encode(["error" => "Le champ requis '$field' est manquant ou vide."]);
        exit;
    }
}

$payload = [
    "map_code" => $inputData["map_code"],
    "map_type" => $inputData["map_type"],
    "map_name" => $inputData["map_name"],
    "difficulty" => $inputData["difficulty"],
    "checkpoints" => (int) $inputData["checkpoints"],
    "creator_id" => (int) $inputData["creator_id"],
    "nickname" => $inputData["nickname"],
    "description" => $inputData["description"] ?? null,
    "mechanics" => $inputData["mechanics"] ?? null,
    "restrictions" => $inputData["restrictions"] ?? null,
    "guides" => $inputData["guides"] ?? null,
    "gold" => isset($inputData["gold"]) ? (int) $inputData["gold"] : null,
    "silver" => isset($inputData["silver"]) ? (int) $inputData["silver"] : null,
    "bronze" => isset($inputData["bronze"]) ? (int) $inputData["bronze"] : null
];

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "$apiRoot/v1/maps/submit",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "X-API-KEY: $apiKey"
    ]
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la communication avec l'API : " . curl_error($curl)]);
    curl_close($curl);
    exit;
}

curl_close($curl);

http_response_code($httpCode);
echo $response;