<?php
require_once '../config.php';

header('Content-Type: application/json');

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (
    isset($input['user_id']) && is_numeric($input['user_id']) &&
    isset($input['usernames']) && is_array($input['usernames'])
) {
    $userId = $input['user_id'];
    $usernames = $input['usernames'];

    $url = $apiRoot . "/v1/settings/users/" . $userId . "/overwatch";

    $postData = json_encode([
        "usernames" => $usernames
    ]);

    $ch = curl_init($url);

    $headers = [
        'Content-Type: application/json',
        'X-API-KEY: ' . $apiKey
    ];
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "cURL error: " . curl_error($ch)
        ]);
        exit;
    }

    $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $decodedResponse = json_decode($response, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        if ($httpStatusCode >= 200 && $httpStatusCode < 300) {
            echo json_encode([
                "success" => true,
                "api_response" => $decodedResponse
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "error" => $decodedResponse
            ]);
        }
    } else {
        if ($httpStatusCode >= 200 && $httpStatusCode < 300) {
            echo json_encode([
                "success" => true,
                "api_response_raw" => $response
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "error" => "Invalid API response: " . $response
            ]);
        }
    }

} else {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "User ID and usernames are required and must be valid"
    ]);
}
?>