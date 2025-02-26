<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}

require BASE_PATH . "discord/session_init.php";
require BASE_PATH . "translations/load_translations.php";
?>
<div class="settings-modal">
    <div class="settings-container">
        <h2>Settings</h2>
        <button class="close-modal" aria-label="Close Modal">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="settings-grid">
            <div class="settings-column">
                <div class="settings-item">
                    <span>Message on verification</span>
                    <input type="checkbox" id="setting-dm-on-verification" />
                    <label for="setting-dm-on-verification" class="settings-toggle-label">Toggle</label>
                </div>
                <div class="settings-item">
                    <span>Message on skill role update</span>
                    <input type="checkbox" id="setting-dm-on-skill-role-update" />
                    <label for="setting-dm-on-skill-role-update" class="settings-toggle-label">Toggle</label>
                </div>
                <div class="settings-item">
                    <span>Message on lootbox gain</span>
                    <input type="checkbox" id="setting-dm-on-lootbox-gain" />
                    <label for="setting-dm-on-lootbox-gain" class="settings-toggle-label">Toggle</label>
                </div>
            </div>
            <div class="settings-column">
                <div class="settings-item">
                    <span>Ping on xp gain</span>
                    <input type="checkbox" id="setting-ping-on-xp-gain" />
                    <label for="setting-ping-on-xp-gain" class="settings-toggle-label">Toggle</label>
                </div>
                <div class="settings-item">
                    <span>Ping on mastery</span>
                    <input type="checkbox" id="setting-ping-on-mastery" />
                    <label for="setting-ping-on-mastery" class="settings-toggle-label">Toggle</label>
                </div>
                <div class="settings-item">
                    <span>Ping on community rank update</span>
                    <input type="checkbox" id="setting-ping-on-community-rank-update" />
                    <label for="setting-ping-on-community-rank-update" class="settings-toggle-label">Toggle</label>
                </div>
            </div>
        </div>
    </div>
</div>