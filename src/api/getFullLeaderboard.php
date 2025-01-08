<?php
require_once 'config.php';

$apiUrl = "{$apiRoot}/v1/ranks/leaderboard/all";

$search = $_GET['search'] ?? null;
$searchBy = $_GET['search_by'] ?? 'player_both';

$queryParams = [
    'name' => null,
    'tier_name' => $_GET['tier_name'] ?? null,
    'skill_rank' => $_GET['skill_rank'] ?? null,
    'sort_column' => $_GET['sort_column'] ?? 'xp_amount',
    'sort_direction' => $_GET['sort_direction'] ?? 'desc',
    'page_size' => $_GET['page_size'] ?? 25,
    'page_number' => $_GET['page_number'] ?? 1,
];

if ($search) {
    if ($searchBy === 'player_both') {
        $queryParams['name'] = $search;
    } elseif ($searchBy === 'nickname') {
        $queryParams['name'] = $search;
    } elseif ($searchBy === 'discord_tag') {
        $queryParams['discord_tag'] = $search;
    }
}

$queryString = http_build_query(array_filter($queryParams));
$fullApiUrl = "{$apiUrl}?{$queryString}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $fullApiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-KEY: ' . $apiKey
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    header('Content-Type: application/json');
    echo $response;
} else {
    http_response_code($httpCode);
    echo json_encode(['error' => 'Failed to fetch leaderboard data.']);
}
?>
