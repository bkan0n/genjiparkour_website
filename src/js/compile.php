<?php
header('Content-Type: application/json');

$payload = json_decode(file_get_contents('php://input'), true);

if (!isset($payload['module']) || !is_string($payload['module'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing module field']);
    exit;
}

$fileParam = isset($_GET['file']) && is_string($_GET['file'])
    ? $_GET['file']
    : 'framework-template.js';

if (strpos($fileParam, "\0") !== false ||
    strpos($fileParam, "../") !== false ||
    strpos($fileParam, "./") === 0 ||
    substr($fileParam, 0, 1) === '/' ) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file path']);
    exit;
}

$cachePath = realpath(__DIR__) . DIRECTORY_SEPARATOR . $fileParam;

if ($cachePath === false) {
    $cachePath = __DIR__ . DIRECTORY_SEPARATOR . $fileParam;
}

$dir = dirname($cachePath);
if (!is_dir($dir)) {
    if (!mkdir($dir, 0755, true) && !is_dir($dir)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create directory']);
        exit;
    }
}

if (false === file_put_contents($cachePath, $payload['module'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write file']);
    exit;
}

echo json_encode(['ok' => true]);