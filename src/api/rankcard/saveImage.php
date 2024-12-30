<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $imageData = $data['image'] ?? null;
    $userId = $data['user_id'] ?? null;

    if (!$imageData || !$userId) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Données d\'image ou user_id manquantes.']);
        exit;
    }

    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $imageData = base64_decode($imageData);

    $directory = __DIR__ . "/rankcardRequests";
    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }

    $timestamp = time();
    $fileName = "rank_card_{$userId}_{$timestamp}.png";
    $filePath = $directory . '/' . $fileName;

    if (file_put_contents($filePath, $imageData)) {
        //$baseUrl = 'http://localhost/leaderboard_project/api/rankcard/rankcardRequests';
        $baseUrl = 'https://test.genji.pk/api/rankcard/rankcardRequests';
        $imageUrl = $baseUrl . '/' . $fileName;

        echo json_encode(['status' => 'success', 'url' => $imageUrl]);
        exit;
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Impossible de sauvegarder l\'image.']);
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Méthode non autorisée.']);
    exit;
}