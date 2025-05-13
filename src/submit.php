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
    <title>Genji Parkour - Submit & Playtest</title>
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/submit.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/submit.js" defer></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>
<div class="container">
    <div class="tab-buttons" id="mainTabs">
        <button onclick="selectSection('submitRecord')" id="submitRecordBtn"><?= htmlspecialchars($translations['submit']['submit_record']) ?></button>
        <button onclick="selectSection('playtest')" id="playtestBtn"><?= htmlspecialchars($translations['submit']['playtest']) ?></button>
        <button onclick="selectSection('submitMap')" id="submitMapBtn"><?= htmlspecialchars($translations['submit']['submit_map']) ?></button>
    </div>
    <div class="tab-content">
        <div id="submitRecordSection" class="section" style="display:none;">
            <div class="record-form-layout">
                <form id="submitRecordForm" enctype="multipart/form-data" class="form-blocks">
                <div class="col-left">
                    <div class="meta-row2">
                        <span class="meta-label"><?= htmlspecialchars($translations['thead']['mapCode']) ?></span>
                        <div class="autocomplete-box" style="position:relative;">
                            <input type="text" class="meta-value" name="map_code" id="mapCodeInput" autocomplete="off">
                            <div id="mapCodeAutoList" class="suggestions-dropdown" style="display:none;"></div>
                        </div>
                    </div>
                    <div class="meta-row2">
                        <span class="meta-label"><?= htmlspecialchars($translations['thead']['mapTime']) ?></span>
                        <input type="text" id="inputTime" class="meta-value" placeholder="e.g. 123.56">
                    </div>
                    <div class="meta-row2">
                        <span class="meta-label"><?= htmlspecialchars($translations['thead']['mapQuality']) ?></span>
                        <div class="custom-multiselect" id="qualityDropdown">
                            <button type="button" id="qualityDropdownBtn" class="custom-multiselect-btn"><?= htmlspecialchars($translations['submit']['select_quality']) ?></button>
                            <div class="custom-multiselect-list">
                                <label><input type="radio" name="quality" value="1"> 1 </label>
                                <label><input type="radio" name="quality" value="2"> 2 </label>
                                <label><input type="radio" name="quality" value="3"> 3 </label>
                                <label><input type="radio" name="quality" value="4"> 4 </label>
                                <label><input type="radio" name="quality" value="5"> 5 </label>
                                <label><input type="radio" name="quality" value="6"> 6 </label>
                            </div>
                        </div>
                    </div>
                    <div class="optional-block2">
                        <h3><?= htmlspecialchars($translations['submit']['optional']) ?></h3>
                        <div class="meta-row2">
                            <span class="meta-label"><?= htmlspecialchars($translations['submit']['video']) ?></span>
                            <input type="url" class="meta-value" name="video_url" id="videoUrlInput" placeholder="https://...">
                        </div>
                    </div>
                </div>
                <div class="col-right">
                    <span class="block-label2"><?= htmlspecialchars($translations['submit']['screenshot']) ?></span>
                    <div id="screenshotDrop" class="screenshot-dropzone">
                        <input type="file" id="screenshotInput" name="screenshot" accept="image/*" style="display:none;">
                        <div id="screenshotPlaceholder" class="screenshot-placeholder">
                        <span><?= $translations['submit']['drag_and_drop'] ?></span>
                        </div>
                    </div>
                    <div class="form-actions-out">
                        <button form="submitRecordForm" type="submit"><?= htmlspecialchars($translations['submit']['submit_record']) ?></button>
                        <button form="submitRecordForm" type="button" class="cancel-btn"><?= htmlspecialchars($translations['submit']['cancel']) ?></button>
                    </div>
                </div>
                </form>
            </div>
        </div>
        <div id="playtestSection" class="section" style="display:none;">
            <div class="toolbar-container">
                <div class="toolbar"></div>
            </div>
            <form id="playtestForm">
                <div id="playtestCardContainer"></div>
            </form>
        </div>
        <div id="playtestModal" class="playtest-modal" style="display:none;">
            <div class="playtest-modal-backdrop"></div>
            <div class="playtest-modal-content">
                <button class="playtest-modal-close" aria-label="Close">&times;</button>
                <div id="playtestModalInner"></div>
            </div>
        </div>
        <div id="submitMapSection" class="section" style="display:none;">
        <div class="map-form-layout">
            <form id="submitMapForm" enctype="multipart/form-data" class="form-blocks">
                <div class="meta-block">
                    <div class="meta-row" id="metaCreators">
                        <span class="meta-label"><?= htmlspecialchars($translations['thead']['mapCreator']) ?></span>
                        <div class="meta-creators-col" id="metaCreatorsCol">
                            <span class="main-creator-row">
                            <span id="metaCreatorMain" class="meta-value creator-main"></span>
                            <button type="button" id="addCreatorBtn" class="block-edit-btn">+</button>
                            </span>
                        </div>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label"><?= htmlspecialchars($translations['thead']['mapCode']) ?></span>
                        <span class="meta-value" id="metaCode">N/A</span>
                        <button type="button" class="block-edit-btn" onclick="editInline('metaCode')"><?= htmlspecialchars($translations['submit']['edit']) ?></button>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label"><?= htmlspecialchars($translations['submit']['map']) ?></span>
                        <span class="meta-value" id="metaMap">N/A</span>
                        <button type="button" class="block-edit-btn" onclick="editInline('metaMap')"><?= htmlspecialchars($translations['submit']['edit']) ?></button>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label"><?= htmlspecialchars($translations['thead']['mapCheckpoints']) ?></span>
                        <span class="meta-value" id="metaCheckpoints">N/A</span>
                        <button type="button" class="block-edit-btn" onclick="editInline('metaCheckpoints')"><?= htmlspecialchars($translations['submit']['edit']) ?></button>
                    </div>
                </div>
                <div class="required-block">
                    <h3><?= htmlspecialchars($translations['submit']['required']) ?></h3>
                    <div class="custom-multiselect-label">
                        <label for="difficultyDropdownBtn"><?= htmlspecialchars($translations['submit']['select_difficulty']) ?></label>
                        <div class="custom-multiselect" id="difficultyDropdown">
                            <button type="button" id="difficultyDropdownBtn" class="custom-multiselect-btn"><?= htmlspecialchars($translations['submit']['select_difficulty']) ?></button>
                            <div class="custom-multiselect-list"></div>
                        </div>
                    </div>
                    <div class="custom-multiselect-label">
                        <label for="categoryDropdownBtn"><?= htmlspecialchars($translations['submit']['select_category']) ?></label>
                        <div class="custom-multiselect" id="categoryDropdown">
                            <button type="button" id="categoryDropdownBtn" class="custom-multiselect-btn"><?= htmlspecialchars($translations['submit']['select_category']) ?></button>
                            <div class="custom-multiselect-list"></div>
                        </div>
                    </div>
                    <div class="custom-multiselect-label">
                        <label for="mechanicsDropdownBtn"><?= htmlspecialchars($translations['submit']['select_mechanics']) ?></label>
                        <div class="custom-multiselect" id="mechanicsDropdown">
                            <button type="button" id="mechanicsDropdownBtn" class="custom-multiselect-btn"><?= htmlspecialchars($translations['submit']['select_mechanics']) ?></button>
                            <div class="custom-multiselect-list"></div>
                        </div>
                    </div>
                    <div class="custom-multiselect-label">
                        <label for="restrictionsDropdownBtn"><?= htmlspecialchars($translations['submit']['select_restrictions']) ?></label>
                        <div class="custom-multiselect" id="restrictionsDropdown">
                            <button type="button" id="restrictionsDropdownBtn" class="custom-multiselect-btn"><?= htmlspecialchars($translations['submit']['select_restrictions']) ?></button>
                            <div class="custom-multiselect-list"></div>
                        </div>
                    </div>
                </div>
                <div class="optional-block">
                    <h3><?= htmlspecialchars($translations['submit']['optional']) ?></h3>
                    <div class="block-row">
                        <span class="block-label"><?= htmlspecialchars($translations['thead']['mapDescription']) ?></span>
                        <span class="block-value" id="optDescription">N/A</span>
                        <button type="button" class="block-edit-btn" onclick="editInline('optDescription')"><?= htmlspecialchars($translations['submit']['edit']) ?></button>
                    </div>
                    <div class="block-row">
                        <span class="block-label"><?= htmlspecialchars($translations['submit']['guide']) ?></span>
                        <span class="block-value" id="optGuide">N/A</span>
                        <button type="button" class="block-edit-btn" onclick="editInline('optGuide')"><?= htmlspecialchars($translations['submit']['edit']) ?></button>
                    </div>
                </div>
            </form>
            <div class="form-actions-out">
                <button form="submitMapForm" type="submit"><?= htmlspecialchars($translations['submit']['submit_map']) ?></button>
                <button form="submitMapForm" type="button" class="cancel-btn"><?= htmlspecialchars($translations['submit']['cancel']) ?></button>
            </div>
        </div>
      </div>
    </div>
</div>
<div class="loading-bar" id="loadingContainer">
    <div class="line"></div>
</div>
<div class="pagination-container" id="paginationContainer"></div>
<?php include 'footer.php'; ?>
</body>
</html>