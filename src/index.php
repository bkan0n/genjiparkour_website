<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/');
}
$glitchtipDsn = getenv('GLITCHTIP_DSN');
require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($selectedLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="Genji Parkour">
    <meta property="og:description" content="The Official Genji Parkour Website. Find Genji Parkour maps, open lootboxes, and more!">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://genji.pk/">
    <meta property="og:image" content="https://genji.pk/assets/img/favicon-high.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="theme-color" content="#FD0054">
    <title>Genji Parkour - Home</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="js/sentry_min.js"></script>
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/index.css">
    <script src="js/layout.js" defer></script>
</head>
<body>
    <div class="bg-container">
        <img src="assets/img/bg4k-3.webp" alt="Background" class="background-image">
    </div>
    <div id="smoke-background"></div>
    <?php include 'navbar.php'; ?>
    <section class="hero" id="hero1">
        <div class="hero-content">
            <div class="side-section left">
                <p class="recent-stats"><?= htmlspecialchars($translations['hero']['packOpening']) ?></p>
                <a href="lootbox.php" class="cta-btn"><?= htmlspecialchars($translations['hero']['clickHere']) ?></a>
            </div>
            <div class="side-section right">
                <p class="recent-stats"><?= htmlspecialchars($translations['hero']['comingSoon']) ?></p>
                <a href="#" class="cta-btn"><?= htmlspecialchars($translations['hero']['comingSoon']) ?></a>
            </div>
        </div>
    </section>
    <?php include 'footer.php'; ?>
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
    <script>
(function () {
    function fetchDsn() {
        return fetch('api/getDsn.php')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch DSN');
                }
                return response.json();
            })
            .then((data) => {
                if (!data.dsn) {
                    throw new Error('DSN is missing from the response');
                }
                return data.dsn;
            });
    }

    function initializeSentry(dsn) {
        Sentry.init({
            dsn: dsn,
            tracesSampleRate: 0.01,
        });
        console.log('Sentry initialized successfully');
    }

    window.addEventListener('load', () => {
        fetchDsn()
            .then((dsn) => initializeSentry(dsn))
            .catch((error) => {
                console.error('Error initializing Sentry:', error);
            });
    });
})();
    </script>
</body>
</html>