<?php
require '../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $input = json_decode(file_get_contents("php://input"), true);

    $user_id          = $input['user_id']          ?? null;
    $notificationType = $input['notification_type'] ?? null;
    $enabled          = $input['enabled']          ?? null;

    if (!$user_id || !$notificationType || !isset($enabled)) {
        echo json_encode([
            'status'  => 'error',
            'message' => 'Invalid request (missing user_id or notification_type or enabled)'
        ]);
        exit;
    }

    $apiUrl = $apiRoot . "/v1/settings/users/$user_id/notifications/$notificationType";

    $payload = filter_var($enabled, FILTER_VALIDATE_BOOLEAN);
    $body    = json_encode($payload);

    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'X-API-KEY: ' . $apiKey,
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    if ($curlErr) {
        echo json_encode([
            'status'  => 'error',
            'message' => 'cURL Error',
            'detail'  => $curlErr
        ]);
        exit;
    }    

    if ($httpCode === 200) {
        echo json_encode([
            'status'  => 'success',
            'message' => 'Notification updated'
        ]);
    } else {
        echo json_encode([
            'status'   => 'error',
            'message'  => 'API request failed',
            'httpCode' => $httpCode,
            'rawBody'  => $response,
            'response' => json_decode($response, true)
        ]);
    }
}