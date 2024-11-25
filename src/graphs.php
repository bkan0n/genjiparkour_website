<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/');
}
require BASE_PATH . "discord/session_init.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Graphs</title>
    <link rel="icon" type="image/png" href="assets/img-2/favicon.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/style-graphs.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/DrawSVGPlugin.min.js" defer></script>
    <script src="js/graphs.js" defer></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
    <nav class="navbar">
        <div class="navbar-left">
            <img src="assets/img-2/favicon.png" alt="Logo" class="logo-icon">
            <span class="logo-text">GENJI PARKOUR</span>
        </div>
        <ul class="navbar-menu">
            <li><a href="index.php">Home</a></li>
            <li><a href="leaderboard.php">Leaderboard</a></li>
            <li class="dropdown-nav">
                <button class="dropdown-toggle-nav">
                Search <span class="arrow"></span>
                </button>
                <ul class="dropdown-menu">
            <li><a href="search.php">Maps</a></li>
            <li><a href="search.php">Guides</a></li>
            <li><a href="search.php">Completions</a></li>
            </ul>
        </li>
        <li class="dropdown-nav">
            <button class="dropdown-toggle-nav">
            Community <span class="arrow"></span>
            </button>
            <ul class="dropdown-menu">
            <li><a href="news.php">News</a></li>
            <li><a href="tutorial.php">Tutorial</a></li>
            <li><a href="graphs.php">Statistics</a></li>
            </ul>
        </li>
        </ul>
        <div class="navbar-right">
            <a href="https://dsc.gg/genjiparkour" target="_blank" class="discord-logo">
                <i class="fab fa-discord"></i>
            </a>
            <?php if (isset($_SESSION['user_avatar'])): ?>
                <div class="user-avatar-dropdown">
                    <img src="https://cdn.discordapp.com/avatars/<?php echo htmlspecialchars($_SESSION['user_id']); ?>/<?php echo htmlspecialchars($_SESSION['user_avatar']); ?>.png" alt="User Avatar" class="user-avatar" id="avatar-icon" />
                    <ul class="dropdown-menu avatar-menu">
                        <li><a href="lootbox.php">Lootbox</a></li>
                        <li><a id="user-profile">Profile</a></li>
                    </ul>
                </div>
            <?php else: ?>
                <a href="discord/login.php" class="login-btn">Login</a>
            <?php endif; ?>
        </div>
    </nav>
    <div class="modal-profile" id="profileModal">
        <div id="profileModalContent" class="modal-content">
            <?php include BASE_PATH . 'modal/profile.php'; ?>
        </div>
    </div>
    <div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center;">
        <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;">
        </div>
    </div>
    <main class="container">
        <div class="pie-chart-container">
            <title></title>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 778 590">
                <circle class="background-circle" cx="389" cy="294" r="160" fill="none" stroke="#bdbdbd" stroke-width="40" />
                <circle class="inner-circle" cx="389" cy="294" r="160" fill="none" stroke="#fff" stroke-width="20" />
                <text x="389" y="294" class="pie-title-text" text-anchor="middle" alignment-baseline="middle" font-family="Roboto" font-size="24" font-weight="bold" fill="#333">
                    Ranks distribution
                </text>
                <text id="hover-text" x="389" y="294" font-size="18" fill="#333" font-family="Roboto" text-anchor="middle" opacity="0">
                </text>
                <g id="rings-container" class="mt-rings" fill="none" stroke-miterlimit="10" stroke-width="30"></g>
                <g id="lines-container" stroke="#333" stroke-width="1"></g>
                <g id="figures-container" class="mt-figures"></g>
            </svg>
            <div class="difficulty-selection">
                <label for="rankSelect"></label>
                <select id="rankSelect">
                    <option value="normalRanks">Skill ranks</option>
                    <option value="communityRanks">Community ranks</option>
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
                <select id="difficultySelect">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Very Hard">Very hard</option>
                    <option value="Extreme">Extreme</option>
                    <option value="Hell">Hell</option>
                </select>
            </div>
        </div>
        <div class="XP-container">
            <canvas id="xpRankChart"></canvas>
        </div>
    </main>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</body>
</html>
