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
    <title>Genji Parkour - Home</title>
    <link rel="icon" type="image/png" href="assets/img-2/favicon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/style-main.css">
    <script src="js/layout.js" defer></script>
</head>
<body>
    <div class="bg-container">
        <img src="assets/img-2/bg4k-3.webp" alt="Background" class="background-image">
    </div>
    <div id="smoke-background"></div>
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
            <li><a href="search.php?section=mapSearch">Maps</a></li>
            <li><a href="search.php?section=guide">Guides</a></li>
            <li><a href="search.php?section=completions">Completions</a></li>
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

    <section class="hero" id="hero1">
        <div class="scroll-indicator">
            <a href="#next-section" class="scroll-btn"><i class="fas fa-chevron-down"></i></a>
        </div>
        <div class="hero-content">
            <div class="side-section left">
                <p class="recent-stats">Pack opening</p>
                <a href="lootbox.php" class="cta-btn">Click here</a>
            </div>
            <div class="side-section right">
                <p class="recent-stats">Newsfeed</p>
                <a href="#" class="cta-btn">Coming soon</a>
            </div>
        </div>
    </section>
    <section id="next-section" class="achievements">
        <h2>Latest Events</h2>
        <div class="event-grid">
            <div class="event-item">
                <h3>Parkour World Tournaments</h3>
                <p>The ultimate test of skill and speed</p>
            </div>
            <div class="event-item">
                <h3>New Parkour Maps Released</h3>
                <p>Challenge yourself with our latest set of thrilling maps</p>
            </div>
            <div class="event-item">
                <h3>Top Scorers of 2024</h3>
                <p>See the latest leaderboard and scores from the community</p>
            </div>
        </div>
    </section>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool
        </div>
    </footer>
    <script>
    particlesJS("smoke-background", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 1000 } },
            "color": { "value": "#aaaaaa" },
            "opacity": { "value": 0.2, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.05 } },
            "size": { "value": 30, "random": true, "anim": { "enable": true, "speed": 3, "size_min": 10 } },
            "move": { "enable": true, "speed": 0.3, "direction": "top-right", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": false },
                "onclick": { "enable": false },
                "resize": true
            }
        },
        "retina_detect": true
    });
    </script>
</body>
</html>