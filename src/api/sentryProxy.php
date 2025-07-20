<?php
require_once 'config.php';

header('Content-Type: application/json');

preg_match('#https://(.+?)@(.+?)/(\d+)#', $dsn, $matches);
$publicKey = $matches[1];
$host = $matches[2];
$projectId = $matches[3];

$sentryApiUrl = "https://$host/api/$projectId/envelope/";
$body = file_get_contents('php://input');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($body)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid request']);
  exit;
}

$authHeader = implode(', ', [
  'Sentry sentry_version=7',
  "sentry_key=$publicKey",
  'sentry_client=custom-proxy/1.0'
]);

$ch = curl_init($sentryApiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'X-Sentry-Auth: ' . $authHeader,
  'Content-Type: application/x-sentry-envelope'
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

//file_put_contents(__DIR__ . '/sentry_debug.log', "---\n" . date('c') . "\nHTTP: $httpcode\n$response\n$error\n", FILE_APPEND);

curl_close($ch);

http_response_code($httpcode);
echo json_encode([
  'status' => $httpcode >= 200 && $httpcode < 300 ? 'success' : 'error',
  'sentry_response' => $response,
  'curl_error' => $error
]);
