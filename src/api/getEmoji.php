<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emojiId = filter_input(INPUT_POST, 'emojiId', FILTER_SANITIZE_NUMBER_INT);
    $emojiName = htmlspecialchars($_POST['emojiName'] ?? '', ENT_QUOTES, 'UTF-8');

    if (!$emojiId) {
        http_response_code(400);
        echo json_encode(["error" => "ID d'émoji manquant"]);
        exit;
    }

    $emojiUrl = "https://cdn.discordapp.com/emojis/{$emojiId}.png";

    $headers = @get_headers($emojiUrl);
    if (!$headers || strpos($headers[0], '200') === false) {
        http_response_code(404);
        echo json_encode(["error" => "Émoji introuvable"]);
        exit;
    }

    echo json_encode(["emoji" => "<img src='{$emojiUrl}' alt='{$emojiName}' class='discord-emoji'>"]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Méthode non autorisée"]);
}
?>
