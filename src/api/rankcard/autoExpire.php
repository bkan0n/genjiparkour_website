<?php
$directory = __DIR__ . '/rankcardRequests';

$expirationTime = 300;

$files = glob($directory . '/rank_card_*.png');

foreach ($files as $file) {
    if (preg_match('/rank_card_\d+_(\d+)\.png$/', $file, $matches)) {
        $fileTimestamp = (int) $matches[1];

        if (time() - $fileTimestamp > $expirationTime) {
            unlink($file);
            echo "Expired images have been deleted : $file\n";
        }
    }
}