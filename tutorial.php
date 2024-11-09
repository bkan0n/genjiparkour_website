<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/');
}

require BASE_PATH . "discord/session_init.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Tutorial</title>
    <link rel="icon" type="image/png" href="assets/favicon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/style-tutorial.css">
    <script src="js/discord.js" defer></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
    <nav>
        <div class="logo">
            <img src="assets/favicon.png" alt="Logo" class="custom-icon">
            <a href="home.php">GENJI PARKOUR</a>
        </div>
        <div class="nav-links">
            <a href="home.php">Home</a>
            <a href="leaderboard.php">Leaderboard</a>
            <a href="https://dsc.gg/genjiparkour" target="_blank">Discord</a>
            <a href="tutorial.php">Tutorial</a>
        </div>
        <div class="menu--right" role="navigation">
            <div class="auth-links">
                <?php if (isset($_SESSION['user_avatar'])): ?>
                    <div class="user-avatar-dropdown">
                        <img src="https://cdn.discordapp.com/avatars/<?php echo htmlspecialchars($_SESSION['user_id']); ?>/<?php echo htmlspecialchars($_SESSION['user_avatar']); ?>.png" alt="User Avatar" class="user-avatar" id="avatar-icon" />
                    </div>
                <?php else: ?>
                    <a href="discord/login.php" class="btn-discord">
                    <i class="fa-solid fa-circle-user"></i>
                    </a>
                <?php endif; ?>
            </div>
            <div class="menuToggle" id="burgerMenu">
                <input type="checkbox" id="burgerMenuScroll"/>
                <span></span>
                <span></span>
                <span></span>
                <ul class="menuItem">
                    <li><a href="search.php">Maps search</a></li>
                    <li><a href="news.php">News & Events</a></li>
                    <li><a href="graphs.php">Graphs</a></li>
                    <li><a href="#">Submit completion</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="modal" id="profileModal">
        <div class="modal-content">
            <?php include 'modal/profile.php'; ?>
        </div>
    </div>
    <div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center;">
        <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;">
        </div>
    </div>
    <main>
        <section class="hero-section" id="hero1">
            <div class="hero-content">
                <h1>Genji Parkour Techs</h1>
                <p>Shade's guide about all Genji parkour techs</p>
            </div>
            <div class="hero-video">
                <iframe src="https://www.youtube.com/embed/2IhslwdsJuY" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="scroll-indicator">
                <a href="#hero2" class="scroll-btn"><i class="fas fa-chevron-down"></i></a>
            </div>
        </section>

        <section class="hero-section" id="hero2">
            <div class="hero-image">
                <img src="assets/parkour_tutorial.jpg" alt="Techniques Avancées" loading="lazy">
            </div>
            <div class="hero-content">
                <h1>Genji Parkour Tutorial</h1>
                <p>A complete tutorial that will allow you to practice all techs</p>
                <p>Code : <span class="highlight-code">HBARG</span></p>
            </div>
            <div class="scroll-indicator2">
                <a href="#hero3" class="scroll-btn2"><i class="fas fa-chevron-down"></i></a>
            </div>
        </section>

        <section class="hero-section" id="hero3">
            <div class="hero-content">
                <h1>Jackherer the Speedrunner</h1>
                <p>Check out the most famous speedrunner in the West, aka Jack</p>
            </div>
            <div class="hero-video">
                <iframe src="https://www.youtube.com/embed/GOrlrqjSJlQ?si=O8WsfQVV8kCjAkpE" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</body>
</html>
