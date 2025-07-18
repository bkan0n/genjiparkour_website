<?php
error_reporting(E_ALL);

if (!defined('SENTRY_INITIALIZED')) {
    define('SENTRY_INITIALIZED', true);

    $dsn = getenv('SENTRY_DSN') ?: (defined('SENTRY_DSN') ? SENTRY_DSN : '');

    if (!empty($dsn)) {

        $dsnParts = parse_url($dsn);
        $hostParts = explode('.', $dsnParts['host']);
        $ingestSubdomain = $hostParts[0];
        $projectId = trim($dsnParts['path'], '/');
        $sentryKey = $dsnParts['user'];

        function sendToSentry($data, $ingestSubdomain, $projectId, $sentryKey) {
            $url = "https://{$ingestSubdomain}.ingest.us.sentry.io/api/{$projectId}/store/";

            $data['event_id'] = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                mt_rand(0, 0xffff), mt_rand(0, 0xffff),
                mt_rand(0, 0xffff),
                mt_rand(0, 0x0fff) | 0x4000,
                mt_rand(0, 0x3fff) | 0x8000,
                mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
            );

            $payload = array_merge([
                'timestamp' => date('c'),
                'platform' => 'php',
                'logger' => 'php-error-handler',
                'sdk' => [
                    'name' => 'sentry.php.custom',
                    'version' => '1.0.0'
                ]
            ], $data);

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json',
                "X-Sentry-Auth: Sentry sentry_version=7, sentry_key={$sentryKey}, sentry_client=sentry.php.custom/1.0.0"
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_TIMEOUT, 2);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            
            curl_close($ch);
            
            return $httpCode === 200 ? $payload['event_id'] : null;
        }

        set_error_handler(function ($severity, $message, $file, $line) use ($ingestSubdomain, $projectId, $sentryKey) {
            if (!(error_reporting() & $severity)) return false;
            
            $level = 'error';
            if ($severity & E_WARNING) $level = 'warning';
            elseif ($severity & E_NOTICE) $level = 'info';
            
            $eventId = sendToSentry([
                'message' => $message,
                'level' => $level,
                'exception' => [
                    'values' => [[
                        'type' => 'Error',
                        'value' => $message,
                        'stacktrace' => [
                            'frames' => [[
                                'filename' => $file,
                                'lineno' => $line,
                                'function' => '',
                                'in_app' => true
                            ]]
                        ]
                    ]]
                ]
            ], $ingestSubdomain, $projectId, $sentryKey);
            return false;
        });

        set_exception_handler(function ($exception) use ($ingestSubdomain, $projectId, $sentryKey) {
            $eventId = sendToSentry([
                'message' => $exception->getMessage(),
                'level' => 'error',
                'exception' => [
                    'values' => [[
                        'type' => get_class($exception),
                        'value' => $exception->getMessage(),
                        'stacktrace' => [
                            'frames' => array_map(function($trace) {
                                return [
                                    'filename' => $trace['file'] ?? '',
                                    'lineno' => $trace['line'] ?? 0,
                                    'function' => $trace['function'] ?? '',
                                    'in_app' => true
                                ];
                            }, $exception->getTrace())
                        ]
                    ]]
                ]
            ], $ingestSubdomain, $projectId, $sentryKey);
            http_response_code(500);
            echo json_encode(['error' => 'An error has occured']);
        });

        register_shutdown_function(function () use ($ingestSubdomain, $projectId, $sentryKey) {
            $error = error_get_last();
            if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
                $eventId = sendToSentry([
                    'message' => $error['message'],
                    'level' => 'fatal',
                    'exception' => [
                        'values' => [[
                            'type' => 'FatalError',
                            'value' => $error['message'],
                            'stacktrace' => [
                                'frames' => [[
                                    'filename' => $error['file'],
                                    'lineno' => $error['line'],
                                    'function' => '',
                                    'in_app' => true
                                ]]
                            ]
                        ]]
                    ]
                ], $ingestSubdomain, $projectId, $sentryKey);
            }
        });
    }
}