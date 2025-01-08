<?php
require '../config.php';

header('Content-Type: application/json');

try {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiRoot . "/v1/maps/statistics/difficulty");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "X-API-KEY: $apiKey"
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        throw new Exception("Erreur cURL : " . curl_error($ch));
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode !== 200) {
        throw new Exception("Erreur API : Code HTTP " . $httpCode);
    }

    curl_close($ch);

    echo $response;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
