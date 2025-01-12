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

//Js error
function sendErrorToDiscord($message) {
    global $webhookUrl;

    if (strpos($message, 'moz-extension://') !== false || strpos($message, 'chrome-extension://') !== false) {
        return;
    }

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


//Sentry
require_once __DIR__ . '/vendor/autoload.php';

$dsn = getenv('GLITCHTIP_DSN');

if ($dsn) {
    \Sentry\init([
        'dsn' => $dsn,
        'traces_sample_rate' => 0.01, 
    ]);

    set_exception_handler(function (Throwable $exception) {
        \Sentry\captureException($exception);
        http_response_code(500);
        echo 'An unexpected error occurred. Please try again later';
    });
} else {
    error_log('Sentry DSN is not configured');
}


//Php error
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
