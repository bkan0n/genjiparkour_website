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

//Sentry
error_reporting(E_ALL);
ini_set('display_errors', 'Off');
ini_set('log_errors', 'On');

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

    set_error_handler(function ($severity, $message, $file, $line) {
        throw new \ErrorException($message, 0, $severity, $file, $line);
    });

    register_shutdown_function(function () {
        $error = error_get_last();
        if ($error !== null) {
            \Sentry\captureMessage('Fatal error: ' . $error['message']);
            http_response_code(500);
            echo 'A fatal error occurred. Please try again later.';
        }
    });
} else {
    error_log('Sentry DSN is not configured');
}