<?php
$dsn = getenv('GLITCHTIP_DSN');

if (!$dsn) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(["error" => "DSN not configured in environment variables."]);
    exit;
}

http_response_code(200);
header('Content-Type: application/json');
echo json_encode(["dsn" => $dsn]);
?>
