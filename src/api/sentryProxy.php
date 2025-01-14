<?php
require_once __DIR__ . '/vendor/autoload.php';

\Sentry\init([
    'dsn' => getenv('GLITCHTIP_DSN'),
]);

$allowed_origins = ["https://genji.pk", "https://test.genji.pk"];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
header('Access-Control-Allow-Origin: ' . ($origin && in_array($origin, $allowed_origins) ? $origin : '*'));
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid payload']);
    exit;
}

if (isset($data['message'])) {
    \Sentry\captureMessage($data['message'], \Sentry\Severity::error());
}

if (isset($data['exception'])) {
    \Sentry\captureException(new \Exception($data['exception']));
}

http_response_code(200);
echo json_encode(['status' => 'success', 'message' => 'Error logged successfully']);