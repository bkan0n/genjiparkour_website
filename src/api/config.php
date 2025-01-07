<?php
$apiRoot = getenv("X_API_ROOT");
$apiKey = getenv("X_API_KEY");
$translationApiKey = getenv("TRANSLATION_API_KEY");
$translationApiRoot = getenv("TRANSLATION_API_ROOT");
$webhookUrl = getenv("DISCORD_WEBHOOK_URL");
$tenorApiKey = getenv("TENOR_API_KEY");

if (strpos($_SERVER['REQUEST_URI'], '/api/') === 0) {
    header('Content-Type: application/json');
}

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

function errorHandler($errno, $errstr, $errfile, $errline) {
    $message = "**PHP Error:**\n- Type: [$errno]\n- Message: $errstr\n- File: $errfile\n- Line: $errline";
    sendErrorToDiscord($message);
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred.']);
    exit;
}

function exceptionHandler($exception) {
    $message = "**Unhandled Exception:**\n- Message: {$exception->getMessage()}\n- File: {$exception->getFile()}\n- Line: {$exception->getLine()}";
    sendErrorToDiscord($message);
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred.']);
    exit;
}

function shutdownHandler() {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        $message = "**Fatal Error:**\n- Type: [{$error['type']}]\n- Message: {$error['message']}\n- File: {$error['file']}\n- Line: {$error['line']}";
        sendErrorToDiscord($message);
        http_response_code(500);
        echo json_encode(['error' => 'A fatal error occurred.']);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/sendJsError.php') === 0) {
    handleJsError();
}

set_error_handler("errorHandler");
set_exception_handler("exceptionHandler");
register_shutdown_function("shutdownHandler");
