<?php
$dsn = getenv("SENTRY_DSN");
require_once __DIR__ . '/../../sentryInit.php';

$apiRoot = getenv("X_API_ROOT");
$apiKey = getenv("X_API_KEY");
$translationApiKey = getenv("TRANSLATION_API_KEY");
$translationApiRoot = getenv("TRANSLATION_API_ROOT");
$webhookUrl = getenv("DISCORD_WEBHOOK_URL");
$tenorApiKey = getenv("TENOR_API_KEY");
$bot_token = getenv("DISCORD_BOT_TOKEN");

if (strpos($_SERVER['REQUEST_URI'], '/api/') === 0) {
    header('Content-Type: application/json');
}

