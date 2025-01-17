<?php
$webhookUrl = getenv("DISCORD_WEBHOOK_URL");

function sendErrorToDiscord($message) {
    global $webhookUrl;
    $data = json_encode(["content" => $message]);

    $options = [
        'http' => [
            'header' => "Content-Type: application/json\r\nContent-Length: " . strlen($data) . "\r\n",
            'method' => 'POST',
            'content' => $data
        ]
    ];

    $context = stream_context_create($options);
    file_get_contents($webhookUrl, false, $context);
}

$data = json_decode(file_get_contents('php://input'), true);
if ($data) {
    $message = "**JavaScript Error:**\n- Message: {$data['message']}\n- Source: {$data['source']}\n- Line: {$data['lineno']}\n- Column: {$data['colno']}\n- Error: {$data['error']}";
    if (isset($data['eventType'])) {
        $message .= "\n- Event Type: {$data['eventType']}\n- Event Target: {$data['eventTarget']}";
    }
    sendErrorToDiscord($message);
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}