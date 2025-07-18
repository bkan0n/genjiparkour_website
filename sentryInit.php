<?php
require_once __DIR__ . '/vendor/autoload.php';

error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('log_errors', '1');

$dsn = getenv('SENTRY_DSN');
if ($dsn) {
    Sentry\init([
        'dsn' => $dsn,
        'environment' => 'production',
        'release' => 'genji-pk@1.0.0',
        'error_types' => E_ALL,
    ]);
}

set_error_handler(function ($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) {
        return false;
    }
    $exception = new ErrorException($message, 0, $severity, $file, $line);
    Sentry\captureException($exception);
    return false;
});

set_exception_handler(function ($exception) {
    Sentry\captureException($exception);
    http_response_code(500);
    echo "Une erreur est survenue.";
});

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        $exception = new ErrorException(
            $error['message'],
            0,
            $error['type'],
            $error['file'],
            $error['line']
        );
        Sentry\captureException($exception);
    }
});
