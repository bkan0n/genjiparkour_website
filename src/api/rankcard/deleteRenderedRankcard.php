<?php
require_once '../config.php';

header('Content-Type: application/json; charset=UTF-8');

session_start();

$user_id = $_GET['user_id'] ?? $_SESSION['user_id'] ?? null;

$headers = getallheaders();
if (!isset($headers['X-API-KEY'])) {
    http_response_code(400);
    echo json_encode(['error' => 'API Key required']);
    exit;
}

$apiKey = $headers['X-API-KEY'];

if (!$user_id) {
    http_response_code(400);
    echo json_encode(['error' => 'user_id required']);
    exit;
}

$imageName = "rank_card_{$user_id}.png";

$imagePath = "rankcardRequests/{$imageName}";

if (file_exists($imagePath)) {
    if (unlink($imagePath)) {
        echo json_encode(['success' => 'Image deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete the image']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Image not found']);
}
?>