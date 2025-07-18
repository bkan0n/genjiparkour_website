<?php
if (!defined('BASE_PATH')) { define('BASE_PATH', __DIR__ . '/'); }

require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="<?= htmlspecialchars($selectedLang) ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Tutorial</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/tutorial.css">
    <script src="js/layout.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>
    <main>
        <section class="hero-section" id="hero1">
            <div class="hero-content">
                <h1><?= htmlspecialchars($translations['tutorial']['genjiParkourTechsTitle']) ?></h1>
                <p><?= htmlspecialchars($translations['tutorial']['genjiParkourTechsDescription']) ?></p>
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
                <img src="assets/img/parkour_tutorial.jpg" alt="<?= htmlspecialchars($translations['tutorial']['techniquesImageAlt']) ?>" loading="lazy">
            </div>
            <div class="hero-content">
                <h1><?= htmlspecialchars($translations['tutorial']['tutorialTitle']) ?></h1>
                <p><?= htmlspecialchars($translations['tutorial']['tutorialDescription']) ?></p>
                <p><?= htmlspecialchars($translations['tutorial']['codeLabel']) ?>: <span class="highlight-code"><?= htmlspecialchars($translations['tutorial']['codeValue']) ?></span></p>
            </div>
            <div class="scroll-indicator2">
                <a href="#hero3" class="scroll-btn2"><i class="fas fa-chevron-down"></i></a>
            </div>
        </section>
        <section class="hero-section" id="hero3">
            <div class="hero-content">
                <h1><?= htmlspecialchars($translations['tutorial']['mapCreation']) ?></h1>
                <p><?= htmlspecialchars($translations['tutorial']['mapCreationDescription']) ?></p>
            </div>
            <div class="hero-video">
                <iframe src="https://www.youtube.com/embed/fBhq3qhlQOM" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="scroll-indicator3">
                <a href="#hero4" class="scroll-btn3"><i class="fas fa-chevron-down"></i></a>
            </div>
        </section>
        <section class="hero-section" id="hero4">
            <div class="hero-video">
                <iframe src="https://www.youtube.com/embed/GOrlrqjSJlQ?si=O8WsfQVV8kCjAkpE" frameborder="0" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class="hero-content">
                <h1><?= htmlspecialchars($translations['tutorial']['speedrunnerTitle']) ?></h1>
                <p><?= htmlspecialchars($translations['tutorial']['speedrunnerDescription']) ?></p>
            </div>
        </section>
    </main>
    <?php include 'footer.php'; ?>
</body>
</html>
