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