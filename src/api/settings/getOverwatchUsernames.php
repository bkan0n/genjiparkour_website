<?php
require_once '../config.php';

if (isset($_GET['user_id']) && is_numeric($_GET['user_id'])) {
    $userId = intval($_GET['user_id']);

    $url = $apiRoot . "/v1/settings/users/" . $userId . "/overwatch";

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
        echo "cURL Error #: " . curl_error($ch);
        exit;
    }

    curl_close($ch);

    if ($response) {
        $data = json_decode($response, true);

        if (isset($data['usernames'])) {
            echo json_encode([
                "user_id" => $userId,
                "usernames" => $data['usernames']
            ]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Bad request syntax or unsupported method"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Internal server error"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "User ID is required and should be a valid integer"]);
}

?>
