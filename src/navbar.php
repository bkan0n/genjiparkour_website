<script defer src="https://analytics.bkan0n.com/script.js" data-website-id="43f4faaa-b793-4f68-9bc9-2deccff8fc15"></script>
<script src="js/sentry.js"></script>
<script>
class CustomTransport {
  constructor(options) {
    this.options = options;
  }

  send(envelope) {
    const [header, items] = envelope;

    const envelopeStr = [
      JSON.stringify(header),
      ...items.map(([itemHeader, payload]) =>
        JSON.stringify(itemHeader) + '\n' + JSON.stringify(payload)
      )
    ].join('\n');

    return fetch('api/sentryProxy.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-sentry-envelope'
      },
      body: envelopeStr
    })
    .then(async (res) => {
      const contentType = res.headers.get("Content-Type");
      const rawText = await res.text();

      try {
        const json = contentType && contentType.includes("application/json")
          ? JSON.parse(rawText)
          : { raw: rawText };

        //console.log("Réponse du proxy Sentry :", json);
      } catch (err) {
        console.error("Erreur de parsing JSON :", err, "\nRéponse brute :", rawText);
      }
    })
    .catch(err => {
      console.error("Erreur d'envoi Sentry :", err);
    });
  }

  flush() {
    return Promise.resolve(true);
  }

  close() {
    return Promise.resolve(true);
  }
}

Sentry.init({
  dsn: 'https://public@fake/0',
  transport: (options) => new CustomTransport(options),
  release: 'genji-pk@1.0.0',
  environment: 'production'
});
</script>

<nav class="navbar">
    <div class="navbar-left">
        <img src="assets/img/favicon.png" alt="Logo" class="logo-icon" id="logoIcon">
        <span class="logo-text">GENJI PARKOUR</span>
    </div>
    <ul class="navbar-menu">
        <li><a href="index.php"><?= htmlspecialchars($translations['navbar']['home']) ?></a></li>
        <li><a href="leaderboard.php"><?= htmlspecialchars($translations['navbar']['leaderboard']) ?></a></li>
        <li class="dropdown-nav">
            <button class="dropdown-toggle-nav">
            <?= htmlspecialchars($translations['navbar']['search']) ?> <span class="arrow"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a href="search.php?section=mapSearch"><?= htmlspecialchars($translations['navbar']['maps']) ?></a></li>
                <li><a href="search.php?section=guide"><?= htmlspecialchars($translations['navbar']['guides']) ?></a></li>
                <li><a href="search.php?section=completions"><?= htmlspecialchars($translations['navbar']['completions']) ?></a></li>
            </ul>
        </li>
        <li class="dropdown-nav">
            <button class="dropdown-toggle-nav">
            <?= htmlspecialchars($translations['navbar']['community']) ?> <span class="arrow"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a href="newsfeed.php"><?= htmlspecialchars($translations['navbar']['newsfeed']) ?></a></li>
                <li><a href="newsfeed.php?type=announcement"><?= htmlspecialchars($translations['navbar']['announcements']) ?></a></li>
                <li><a href="tutorial.php"><?= htmlspecialchars($translations['navbar']['tutorial']) ?></a></li>
                <li><a href="graphs.php"><?= htmlspecialchars($translations['navbar']['statistics']) ?></a></li>
            </ul>
        </li>
        <li class="dropdown-nav">
            <div class="button-cta-container">
                <button class="button-cta button-cta-pulse" aria-haspopup="true" aria-expanded="false" onclick="handleCtaSubmit()"><?= htmlspecialchars($translations['navbar']['submit']) ?></button>
            </div>
        </li>
    </ul>
    <div class="navbar-right">
        <?php if (isset($_SESSION['is_moderator']) && $_SESSION['is_moderator'] === true): ?>
            <a href="moderator.php" class="moderator-btn">
                <img src="assets/img/moderator-dashboard.png" alt="Moderator Dashboard" class="moderator-icon">
            </a>
        <?php endif; ?>
        <a href="convertor.php" class="navbar-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-svg">
                <path d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M12 11V17M12 17L10 15M12 17L14 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
        <ul class="lang-menu">
            <li class="lang-dropdown-nav">
                <button class="dropdown-toggle-nav">
                    <i class="flag <?= htmlspecialchars($selectedLangData['flag']) ?>"></i>
                    <span class="lang-name"><?= htmlspecialchars($selectedLangData['name']) ?></span>
                    <span class="arrow"></span>
                </button>
                <ul class="dropdown-menu">
                    <?php foreach ($languages as $langCode => $langData): ?>
                        <li>
                            <a href="?lang=<?= htmlspecialchars($langCode) ?>" 
                            class="<?= isset($langData['translated']) && $langData['translated'] ? '' : 'unavailable' ?>"
                            data-message="<?= htmlspecialchars($langData['modalMessage']) ?>"
                            data-close-text="<?= htmlspecialchars($langData['closeButtonText']) ?>">
                                <i class="flag <?= htmlspecialchars($langData['flag']) ?>"></i>
                                <?= htmlspecialchars($langData['name']) ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </li>
        </ul>
        <a href="https://dsc.gg/genjiparkour" target="_blank" class="discord-logo">
            <i class="fab fa-discord"></i>
        </a>
        <?php if (isset($_SESSION['user_avatar'])): ?>
            <div class="user-avatar-dropdown">
                <img src="https://cdn.discordapp.com/avatars/<?php echo htmlspecialchars($_SESSION['user_id']); ?>/<?php echo htmlspecialchars($_SESSION['user_avatar']); ?>.png" alt="User Avatar" class="user-avatar" id="avatar-icon" />
                <ul class="dropdown-menu avatar-menu">
                    <li><a href="lootbox.php"><?= htmlspecialchars($translations['navbar']['lootbox']) ?></a></li>
                    <li><a id="user-profile"><?= htmlspecialchars($translations['navbar']['profile']) ?></a></li>
                    <li><a href="rank_card.php"><?= htmlspecialchars($translations['navbar']['dashboard']) ?></a></li>
                    <li><a id="user-settings"><?= htmlspecialchars($translations['navbar']['settings']) ?></a></li>
                </ul>
            </div>
        <?php else: ?>
            <a href="discord/login.php" class="login-btn"><?= htmlspecialchars($translations['navbar']['login']) ?></a>
        <?php endif; ?>
    </div>
</nav>
<div id="translationModal" style="display: none;">
    <div class="modal-content-translation">
        <p id="modalMessage"></p>
        <button id="closeModal">Close</button>
    </div>
</div>
<div class="modal-profile" id="profileModal">
    <div id="profileModalContent" class="modal-content">
        <?php include BASE_PATH . 'modal/profile.php'; ?>
    </div>
</div>
<div id="settingsModal" class="modal-overlay" style="display: none;"></div>
<div id="rankCardModal" class="modal-overlay" style="display: none;"></div>
<div id="creditsModal" class="modal-overlay" style="display: none;"></div>
<div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.7); z-index: 9999;">
    <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;"></div>
</div>
<script>
let user_id = <?= isset($_SESSION['user_id']) ? json_encode($_SESSION['user_id']) : 'null'; ?>;
</script>