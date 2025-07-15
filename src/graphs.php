<?php
if (!defined('BASE_PATH')) { define('BASE_PATH', __DIR__ . '/'); }

require BASE_PATH . '/../sentryInit.php';
require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($selectedLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Graphs</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/graphs.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/DrawSVGPlugin.min.js" defer></script>
    <script src="js/graphs.js" defer></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>
    <main>
        <div class="container">
            <div class="graphs-grid">
                <div class="pie-chart-container">
                    <title></title>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 778 590">
                        <circle class="background-circle" cx="389" cy="294" r="160" fill="none" stroke="#bdbdbd" stroke-width="40" />
                        <circle class="inner-circle" cx="389" cy="294" r="160" fill="none" stroke="#fff" stroke-width="20" />
                        <text x="389" y="294" class="pie-title-text" text-anchor="middle" alignment-baseline="middle" font-family="Roboto" font-size="24" font-weight="bold" fill="#333">
                        <?= htmlspecialchars($translations['thead']['mapRankDistribution']) ?>
                        </text>
                        <text id="hover-text" x="389" y="294" font-size="18" fill="#333" font-family="Roboto" text-anchor="middle" opacity="0">
                        </text>
                        <g id="rings-container" class="mt-rings" fill="none" stroke-miterlimit="10" stroke-width="30"></g>
                        <g id="lines-container" stroke="#333" stroke-width="1"></g>
                        <g id="figures-container" class="mt-figures"></g>
                    </svg>
                    <div class="difficulty-selection">
                        <label for="rankSelect"></label>
                        <select id="rankSelect" class="fixed-button">
                            <option value="normalRanks"><?= htmlspecialchars($translations['chart']['skillRank']) ?></option>
                            <option value="communityRanks"><?= htmlspecialchars($translations['chart']['tierRank']) ?></option>
                        </select>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="difficultyBarChart" width="400" height="200"></canvas>
                </div>
                <div class="quality-container">
                    <canvas id="qualityDotChart" width="400" height="200"></canvas>
                </div>
                <div class="populars-maps-container">
                    <canvas id="mostPlayedMapsChart" width="400" height="200"></canvas>
                    <div class="difficulty-selection">
                        <label for="difficultySelect"></label>
                        <select id="difficultySelect" class="fixed-button">
                            <option value="Easy"><?= htmlspecialchars($translations['chart']['easy']) ?></option>
                            <option value="Medium"><?= htmlspecialchars($translations['chart']['medium']) ?></option>
                            <option value="Hard"><?= htmlspecialchars($translations['chart']['hard']) ?></option>
                            <option value="Very Hard"><?= htmlspecialchars($translations['chart']['very hard']) ?></option>
                            <option value="Extreme"><?= htmlspecialchars($translations['chart']['extreme']) ?></option>
                            <option value="Hell"><?= htmlspecialchars($translations['chart']['hell']) ?></option>
                        </select>
                    </div>
                </div>
                <div class="maps-count-container">
                    <canvas id="mapsCountChart" width="400" height="200"></canvas>
                </div>
                <div class="time-played-container">
                    <canvas id="timePlayedChart" width="400" height="200"></canvas>
                </div>
            </div>
        </div>
    </main>
    <?php include 'footer.php'; ?>
</body>
</html>
