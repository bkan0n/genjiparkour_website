<?php
require_once '../config.php';

header('Content-Type: text/html; charset=UTF-8');

session_start();
$user_id = $_GET['user_id'] ?? $_SESSION['user_id'] ?? null;

if (!$user_id) {
    http_response_code(400);
    echo "Error : user_id required";
    exit;
}

$apiUrl = "{$apiRoot}/v1/rank_card/test/{$user_id}";

$ReceivedApiKey = $_SERVER['HTTP_X_API_KEY'] ?? null;

if (!$ReceivedApiKey) {
    http_response_code(400);
    echo json_encode(['error' => 'API Key required']);
    exit;
}

if ($ReceivedApiKey !== $apiKey) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid API Key']);
    exit;
}

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo "Erreur de connexion à l'API : " . curl_error($ch);
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($httpCode !== 200) {
    echo "Erreur de l'API : Code {$httpCode}";
    exit;
}

$data = json_decode($response, true);
if (!$data) {
    echo "Erreur : Réponse JSON invalide.";
    exit;
}

curl_close($ch);

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rank Card</title>
    <link rel="stylesheet" href="../../styles/bot_card.css">
</head>
<body>
<main role="main" class="main">
    <div id="rankCardContent">
        <div class="rank-card">
            <div class="background">
            <img src="<?= htmlspecialchars('../../' . ($data['background_url'] ?? 'default-background.webp')) ?>" alt="Background">
            </div>
            <div class="content-rankcard ">
                <div class="player-name"><?= htmlspecialchars($data['nickname']) ?></div>
                <div class="main-container">
                    <div class="rank-details-container">
                        <div class="rank-section-container">
                            <div class="rank-section">
                                <div class="medals-header">
                                    <span></span>
                                    <div class="medals-icons">
                                    <span><img src="../../assets/medals/gold.png" alt="Gold Medal" class="medals-icons"></span>
                                    <span><img src="../../assets/medals/silver.png" alt="Silver Medal" class="medals-icons"></span>
                                    <span><img src="../../assets/medals/bronze.png" alt="Bronze Medal" class="medals-icons"></span>
                                    </div>
                                </div>
                                <?php foreach ($data['difficulties'] as $level => $stats): ?>
                                    <div class="rank-row">
                                        <span class="rank-title"><?= htmlspecialchars(strtoupper($level)) ?></span>
                                        <div class="progress-container">
                                            <div class="progress-bar">
                                                <div class="progress <?= htmlspecialchars(strtolower(str_replace(' ', '-', $level))) ?>" 
                                                    style="width: <?= ($stats['completed'] / $stats['total']) * 100 ?>%;"></div>
                                            </div>
                                            <div class="progress-text">
                                                <?= htmlspecialchars($stats['completed']) ?> / <?= htmlspecialchars($stats['total']) ?>
                                            </div>
                                        </div>
                                        <div class="medals-values">
                                            <span><?= htmlspecialchars($stats['gold']) ?></span>
                                            <span><?= htmlspecialchars($stats['silver']) ?></span>
                                            <span><?= htmlspecialchars($stats['bronze']) ?></span>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                            <div class="combined-container">
                                <div class="badges-container">
                                    <?php foreach ($data['badges'] as $badge): ?>
                                        <?php if (!empty($badge['url'])): ?>
                                            <img src="<?= htmlspecialchars('../../' . $badge['url']) ?>" alt="<?= htmlspecialchars($badge['name'] ?? 'Badge') ?>" class="badge">
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </div>
                                <div class="stats-section">
                                    <div class="stat-item">
                                        <span class="stat-label">Maps</span>
                                        <span class="stat-value"><?= htmlspecialchars($data['total_maps_created']) ?></span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Playtests</span>
                                        <span class="stat-value"><?= htmlspecialchars($data['total_playtests']) ?></span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">World Records</span>
                                        <span class="stat-value"><?= htmlspecialchars($data['world_records']) ?></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="player-info">
                            <span class="player-rank-name"><?= htmlspecialchars($data['rank_name']) ?></span>
                            <img src="<?= htmlspecialchars('../../' . ($data['avatar_url'] ?? 'assets/default_avatar.png')) ?>" alt="Player Avatar" class="player-avatar">
                            <img src="<?= htmlspecialchars('../../' . ($data['rank_url'] ?? 'assets/default_rank.png')) ?>" alt="Player Rank Badge" class="player-rank-badge">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</body>
</html>
