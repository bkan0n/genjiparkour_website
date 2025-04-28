<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
?>
<div class="settings-modal">
    <div class="settings-container">
        <h2><?= htmlspecialchars($translations['navbar']['settings']) ?></h2>
        <button class="close-modal" aria-label="Close Modal">
            <i class="fa-solid fa-xmark"></i>
        </button>
        
        <div class="settings-overwatch">
            <input type="text" id="overwatch-username" placeholder="Loading..." />
            <button id="confirm-overwatch-username"><?= htmlspecialchars($translations['popup']['confirm_button'] ?? 'Confirm') ?></button>
        </div>

        <div class="settings-grid">
            <div class="settings-column">
                <div class="settings-item">
                    <span><?= htmlspecialchars($translations['settings']['message_on_verification']) ?></span>
                    <input type="checkbox" id="setting-dm-on-verification" />
                    <label for="setting-dm-on-verification" class="settings-toggle-label">Toggle</label>
                </div>
                <div class="settings-item">
                    <span><?= htmlspecialchars($translations['settings']['message_on_skill_update']) ?></span>
                    <input type="checkbox" id="setting-dm-on-skill-role-update" />
                    <label for="setting-dm-on-skill-role-update" class="settings-toggle-label">Toggle</label>
                </div>
                <div class="settings-item">
                    <span><?= htmlspecialchars($translations['settings']['message_on_lootbox']) ?></span>
                    <input type="checkbox" id="setting-dm-on-lootbox-gain" />
                    <label for="setting-dm-on-lootbox-gain" class="settings-toggle-label">Toggle</label>
                </div>
            </div>
            <div class="settings-column">
                <div class="settings-item">
                    <span><?= htmlspecialchars($translations['settings']['ping_on_xp']) ?></span>
                    <input type="checkbox" id="setting-ping-on-xp-gain" />
                    <label for="setting-ping-on-xp-gain" class="settings-toggle-label">Toggle</label>
                </div>
                <div class="settings-item">
                    <span><?= htmlspecialchars($translations['settings']['ping_on_mastery']) ?></span>
                    <input type="checkbox" id="setting-ping-on-mastery" />
                    <label for="setting-ping-on-mastery" class="settings-toggle-label">Toggle</label>
                </div>
                <div class="settings-item">
                    <span><?= htmlspecialchars($translations['settings']['ping_on_community_rank']) ?></span>
                    <input type="checkbox" id="setting-ping-on-community-rank-update" />
                    <label for="setting-ping-on-community-rank-update" class="settings-toggle-label">Toggle</label>
                </div>
            </div>
        </div>
    </div>
</div>