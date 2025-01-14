<?php
require_once __DIR__ . '/vendor/autoload.php';

$dsn = getenv('GLITCHTIP_DSN');

\Sentry\init([
    'dsn' => $dsn,
    'default_integrations' => true,
    'traces_sample_rate' => 1.0,
    'before_send' => function (\Sentry\Event $event) {
        error_log('Événement Sentry capturé : ' . var_export($event, true));
        return $event;
    },
]);

try {
    throw new Exception('Test d\'exception pour Sentry');
} catch (Exception $e) {
    \Sentry\captureException($e);
    echo 'Exception capturée et envoyée à Sentry.';
}
