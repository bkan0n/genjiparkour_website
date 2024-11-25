<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/');
}

require BASE_PATH . "discord/session_init.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="icon" type="image/png" href="assets/img-2/favicon.png">
    <title>Genji Parkour - Lootbox</title>
    <link href="styles/style-crates2.css" rel="stylesheet">
    <link href="styles/layout.css" rel="stylesheet">
    <link href="styles/style-crates.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" defer></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" defer></script>
    <script>
    <?php if (isset($_SESSION['user_id'])): ?>
        const userId = "<?php echo htmlspecialchars($_SESSION['user_id']); ?>";
    <?php else: ?>
        const userId = null;
    <?php endif; ?>
    </script>
  </head>
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
  <body class="overwatch">
    <div class="main container">
      <main role="main">
        <div class="card-container">
          <div class="card-section">
            <div id= "box" class="loot-card-stack">
              <div class="loot-card card1"></div>
              <div class="loot-card card2"></div>
              <div class="loot-card card3"></div>
            </div>
            <ul id="crate"></ul>
          </div>
        </div>
        <div class="centered-container">
        <button id="giveKeyButton" style="background-color: #2b2b2b; color: white; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">
            Give Key
        </button>
          <div id="key-count" class="key-display"></div>
          <div class="button-container">
            <button class="generate btn shadow yellow" 
                  onclick="/*ga('send', 'event', 'Generate box', 'Click', 'Open loot box');*/">
                  Open pack
          </button>
            <button class="info-button">?
              <div class="info-tooltip">
                <div><span class="rarity-common">Common</span>: 80%</div>
                <div><span class="rarity-rare">Rare</span>: 16%</div>
                <div><span class="rarity-epic">Epic</span>: 3%</div>
                <div><span class="rarity-legendary">Legendary</span>: 1%</div>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js" defer></script>
    <script src="js/lootbox.js" defer></script>
    <script src="js/layout.js" defer></script>
  </body>
</html>
