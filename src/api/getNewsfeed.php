<?php
require_once 'config.php';
function fetchNewsfeed($apiKey, $apiRoot) {
    $url = rtrim($apiRoot, '/') . '/v1/newsfeed';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        $error = curl_error($ch);
        curl_close($ch);
        return ['error' => "Erreur lors de la requête : $error"];
    }

    curl_close($ch);

    $data = json_decode($response, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        return ['error' => 'Réponse JSON invalide : ' . json_last_error_msg()];
    }

    return $data;

    if (isset($newsfeed['error'])) {
        die('<p>Erreur : ' . htmlspecialchars($newsfeed['error']) . '</p>');
    }
}

$newsfeed = fetchNewsfeed($apiKey, $apiRoot);

function normalizeRole($role) {
    return preg_replace('/\s*\++$/', '', $role);
}

$roleColors = [
    'Ninja' => 'ninja',
    'Jumper' => 'jumper',
    'Skilled' => 'skilled',
    'Pro' => 'pro',
    'Master' => 'master',
    'Grandmaster' => 'grandmaster',
    'God' => 'god',
];
//error_log(print_r($newsfeed, true));
