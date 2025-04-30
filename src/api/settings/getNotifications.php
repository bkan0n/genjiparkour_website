<?php
require_once '../config.php';

if (isset($_GET['user_id']) && is_numeric($_GET['user_id'])) {
    $userId = intval($_GET['user_id']);

    $url = $apiRoot . "/v1/settings/users/" . $userId . "/notifications";

    $ch = curl_init($url);

    $headers = [
        'Content-Type: application/json',
        'X-API-KEY: ' . $apiKey
    ];

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode(["error" => "cURL Error #: " . curl_error($ch)]);
        exit;
    }

    curl_close($ch);

    if ($response) {
        $data = json_decode($response, true);

        if (is_array($data)) {
            echo json_encode($data);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Invalid response from API"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Internal server error"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "User ID is required and should be a valid integer"]);
}