<?php
require_once '../config.php';

if (isset($_GET['gifId'])) {
    $gifId = htmlspecialchars($_GET['gifId']);
    $apiUrl = "https://tenor.googleapis.com/v2/posts?ids=$gifId&key=" . $tenorApiKey;

    try {
        $response = file_get_contents($apiUrl);
        header('Content-Type: application/json');
        echo $response;
    } catch (Exception $e) {
        echo json_encode(["error" => "Erreur lors de la récupération du GIF."]);
    }
} else {
    echo json_encode(["error" => "ID du GIF manquant."]);
}
?>
