<?php
require_once 'config.php';

function translateText($text, $targetLang) {
    global $translationApiKey;
    global $translationApiRoot;

    if ($targetLang === 'cn') {
        $targetLang = 'zh';
        $text = preg_replace('/<[^>]*>/', '', $text);
    }

    $postData = [
        'q' => $text,
        'source' => 'auto',
        'target' => $targetLang,
        'format' => 'text',
        'api_key' => $translationApiKey
    ];

    $ch = curl_init($translationApiRoot);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        return json_decode($response, true)['translatedText'] ?? '';
    } else {
        return "Translation failed";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputText = $_POST['text'] ?? '';
    $targetLang = $_POST['targetLang'] ?? 'en';

    if (!empty($inputText)) {
        $result = translateText($inputText, $targetLang);
        header('Content-Type: application/json');
        echo json_encode(["translatedText" => $result]);
    } else {
        echo json_encode(["error" => "No text provided"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

?>
