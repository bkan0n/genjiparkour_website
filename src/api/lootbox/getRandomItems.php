<?php
require 'config.php';

if (isset($_GET['user_id']) && isset($_GET['key_type'])) {
    $userId = $_GET['user_id'];
    $keyType = $_GET['key_type'];

    $url = "$apiRoot/v1/lootbox/users/$userId/keys/$keyType";

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
        $responseData = json_decode($response, true);

        $nonce = bin2hex(random_bytes(16));
        
        if (isset($responseData) && is_array($responseData)) {
            $formattedResponse = [
                "rewards" => $responseData,
                "nonce" => $nonce
            ];

            session_start();
            $_SESSION['reward_nonce'] = $nonce;

            http_response_code(200);
            echo json_encode($formattedResponse);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'No rewards found in the API response']);
        }
    }

    curl_close($ch);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Missing user_id or key_type parameter']);
}
