<?php
require_once '../config.php';
header('Content-Type: application/json');

if (empty($_GET['user_id'])) {
    echo json_encode(['error' => 'Missing user_id']);
    http_response_code(400);
    exit;
}

$user_id = preg_replace('/[^0-9]/', '', $_GET['user_id']);
$cache_file = __DIR__ . "/cache/avatar_{$user_id}.json";
$cache_duration = 604800;

if (file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_duration)) {
    echo file_get_contents($cache_file);
    exit;
}

$discordApi = "https://discord.com/api/v10/users/{$user_id}";
$opts = [
    "http" => [
        "header" => "Authorization: Bot $bot_token\r\n"
    ]
];

$context = stream_context_create($opts);
$response = @file_get_contents($discordApi, false, $context);

if ($response === FALSE) {
    echo json_encode(['error' => 'Discord API error or user not found']);
    http_response_code(404);
    exit;
}

$data = json_decode($response, true);
if (!$data || !isset($data['id'])) {
    echo json_encode(['error' => 'User not found']);
    http_response_code(404);
    exit;
}

$avatar_hash = $data['avatar'] ?? null;
$discriminator = $data['discriminator'] ?? "0";
$avatar_url = $avatar_hash
    ? "https://cdn.discordapp.com/avatars/{$data['id']}/{$avatar_hash}." . (str_starts_with($avatar_hash, 'a_') ? 'gif' : 'png')
    : "https://cdn.discordapp.com/embed/avatars/" . ((int)$discriminator % 5) . ".png";

$result = json_encode([
    "user_id" => $data['id'],
    "username" => $data['username'],
    "avatar_hash" => $avatar_hash,
    "discriminator" => $discriminator,
    "avatar_url" => $avatar_url
], JSON_UNESCAPED_SLASHES);

file_put_contents($cache_file, $result);

echo $result;
exit;
?>
