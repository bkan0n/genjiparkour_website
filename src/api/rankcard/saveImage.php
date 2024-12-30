<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $imageData = $data['image'] ?? null;
    $userId = $data['user_id'] ?? null;

    if (!$imageData || !$userId) {
        http_response_code(400);
        echo "Erreur : Données d'image ou user_id manquantes.";
        exit;
    }

    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $imageData = base64_decode($imageData);

    $filePath = __DIR__ . "/rankcardRequests/rank_card_{$userId}.png";

    if (file_put_contents($filePath, $imageData)) {
        header('Content-Type: image/png');
        readfile($filePath);
    } else {
        http_response_code(500);
        echo "Erreur : Impossible de sauvegarder l'image.";
    }
} else {
    http_response_code(405);
    echo "Erreur : Méthode non autorisée.";
}