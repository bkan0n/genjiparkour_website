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
    <script src="js/submit.js" defer></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
<?php include 'navbar.php'; ?>
<div class="container">
    <div class="tab-buttons" id="mainTabs">
        <button onclick="selectSection('submitRecord')" id="submitRecordBtn">Submit Record</button>
        <button onclick="selectSection('playtest')" id="playtestBtn">Playtest</button>
        <button onclick="selectSection('submitMap')" id="submitMapBtn">Submit Map</button>
    </div>
    <div class="tab-content">
        <div id="submitRecordSection" class="section" style="display:none;">
            <div class="record-form-layout">
                <form id="submitRecordForm" enctype="multipart/form-data" class="form-blocks">
                <div class="col-left">
                    <div class="meta-row2">
                        <span class="meta-label">Map Code</span>
                        <div class="autocomplete-box" style="position:relative;">
                            <input type="text" class="meta-value" name="map_code" id="mapCodeInput" required autocomplete="off">
                            <div id="mapCodeAutoList" class="suggestions-dropdown" style="display:none;"></div>
                        </div>
                    </div>
                    <div class="meta-row2">
                        <span class="meta-label">Time</span>
                        <input type="number" class="meta-value" name="time" step="0.01" placeholder="e.g. 123.56" required>
                    </div>
                    <div class="meta-row2">
                        <span class="meta-label">Quality</span>
                        <div class="custom-multiselect" id="qualityDropdown">
                            <button type="button" id="qualityDropdownBtn" class="custom-multiselect-btn">Select quality</button>
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
                </div>
                <div class="col-right">
                    <span class="block-label2">Screenshot</span>
                    <div id="screenshotDrop" class="screenshot-dropzone">
                    <input type="file" id="screenshotInput" name="screenshot" accept="image/*" style="display:none;" required>
                    <div id="screenshotPlaceholder" class="screenshot-placeholder">
                        <span>Drag & drop screenshot here<br>or<br><b>Click to browse</b></span>
                    </div>
                    </div>
                    <div class="form-actions-out">
                        <button form="submitRecordForm" type="submit">Submit Record</button>
                        <button type="button" class="cancel-btn">Cancel</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
        <div id="playtestSection" class="section" style="display:none;">
            <h2>Request Playtest</h2>
            <form id="playtestForm">
            </form>
        </div>
        <div id="submitMapSection" class="section" style="display:none;">
        <div class="map-form-layout">
            <form id="submitMapForm" enctype="multipart/form-data" class="form-blocks">
                <div class="meta-block">
                    <div class="meta-row" id="metaCreators">
                        <span class="meta-label">Creator</span>
                        <div class="meta-creators-col" id="metaCreatorsCol">
                            <span class="main-creator-row">
                            <span id="metaCreatorMain" class="meta-value creator-main">Arrow</span>
                            <button type="button" id="addCreatorBtn" class="block-edit-btn">+</button>
                            </span>
                        </div>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Map</span>
                        <span class="meta-value" id="metaMap">N/A</span>
                        <button type="button" class="block-edit-btn" onclick="editInline('metaMap')">Edit</button>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Checkpoints</span>
                        <span class="meta-value" id="metaCheckpoints">N/A</span>
                        <button type="button" class="block-edit-btn" onclick="editInline('metaCheckpoints')">Edit</button>
                    </div>
                </div>
                <div class="required-block">
                    <h3>Required</h3>
                    <div class="custom-multiselect-label">
                        <label for="difficultyDropdownBtn">Select Difficulty</label>
                        <div class="custom-multiselect" id="difficultyDropdown">
                            <button type="button" id="difficultyDropdownBtn" class="custom-multiselect-btn">Select Difficulty</button>
                            <div class="custom-multiselect-list"></div>
                        </div>
                    </div>
                    <div class="custom-multiselect-label">
                        <label for="categoryDropdownBtn">Select Category</label>
                        <div class="custom-multiselect" id="categoryDropdown">
                            <button type="button" id="categoryDropdownBtn" class="custom-multiselect-btn">Select Category</button>
                            <div class="custom-multiselect-list"></div>
                        </div>
                    </div>
                    <div class="custom-multiselect-label">
                        <label for="mechanicsDropdownBtn">Select Mechanics</label>
                        <div class="custom-multiselect" id="mechanicsDropdown">
                            <button type="button" id="mechanicsDropdownBtn" class="custom-multiselect-btn">Select...</button>
                            <div class="custom-multiselect-list"></div>
                        </div>
                    </div>
                    <div class="custom-multiselect-label">
                        <label for="restrictionsDropdownBtn">Select Restrictions</label>
                        <div class="custom-multiselect" id="restrictionsDropdown">
                            <button type="button" id="restrictionsDropdownBtn" class="custom-multiselect-btn">Select...</button>
                            <div class="custom-multiselect-list"></div>
                        </div>
                    </div>
                </div>
                <div class="optional-block">
                    <h3>Optional</h3>
                    <div class="block-row">
                        <span class="block-label">Description</span>
                        <span class="block-value" id="optDescription">N/A</span>
                        <button type="button" class="block-edit-btn" onclick="editInline('optDescription')">Edit</button>
                    </div>
                    <div class="block-row">
                        <span class="block-label">Guide</span>
                        <span class="block-value" id="optGuide">N/A</span>
                        <button type="button" class="block-edit-btn" onclick="editInline('optGuide')">Edit</button>
                    </div>
                </div>
            </form>
            <div class="form-actions-out">
                <button form="submitMapForm" type="submit">Submit Map</button>
                <button type="button" class="cancel-btn">Cancel</button>
            </div>
        </div>
      </div>
    </div>
</div>
<script>
let user_id = <?= isset($_SESSION['user_id']) ? json_encode($_SESSION['user_id']) : 'null'; ?>;
</script>
<?php include 'footer.php'; ?>
</body>
</html>