<?php
require '../config.php';

if (isset($_GET['user_id'])) {
    $userId = $_GET['user_id'];

    $url = "$apiRoot/v1/lootbox/users/$userId/keys";

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer $apiKey",
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    if ($response === false) {
        echo json_encode(['error' => 'Failed to connect to API', 'curl_error' => curl_error($ch)]);
    } else {
        http_response_code(200);
        echo $response;
    }

    curl_close($ch);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Missing user_id parameter']);
}
