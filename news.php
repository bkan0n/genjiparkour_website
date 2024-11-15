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
    <link rel="icon" type="image/png" href="assets/img-2/favicon.png">
    <title>Genji Parkour - News</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/style-news.css">
    <script src="js/layout.js" defer></script>
</head>
<body>
    <nav>
        <div class="logo">
            <img src="assets/img-2/favicon.png" alt="Logo" class="custom-icon">
            <a href="index.php">GENJI PARKOUR</a>
        </div>
        <div class="nav-links">
            <a href="index.php">Home</a>
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
            <input type="checkbox" id="burgerMenuScroll" />
            <span></span>
            <span></span>
            <span></span>
            <ul class="menuItem hidden" id="menuItems">
                <li><a href="search.php">Maps search</a></li>
                <li><a href="news.php">News & Events</a></li>
                <li><a href="graphs.php">Graphs</a></li>
                <li><a href="#">Submit completion</a></li>
            </ul>
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
    <main class="news-container">
        <div class="news-item">
            <h2 class="news-title">Lorem ipsum</h2>
            <p class="news-date">Date: xxxx</p>
            <p class="news-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
        </div>

        <div class="news-item">
            <h2 class="news-title">Lorem ipsum</h2>
            <p class="news-date">Date: xxxx</p>
            <p class="news-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
        </div>

        <div class="news-item">
            <h2 class="news-title">Lorem ipsum</h2>
            <p class="news-date">Date: xxxx</p>
            <p class="news-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
        </div>
    </main>

    <div class="pagination">
        <button class="prev">Previous</button>
        <button class="next">Next</button>
    </div>

    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</body>
</html>
