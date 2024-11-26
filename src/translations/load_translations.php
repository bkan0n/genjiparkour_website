<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}
require BASE_PATH . 'translations/set_language_cookie.php';

function loadTranslations($lang = 'en') {
    $jsonPath = __DIR__ . '/translations.json';

    if (file_exists($jsonPath)) {
        $translations = json_decode(file_get_contents($jsonPath), true);
        return $translations[$lang] ?? $translations['en'];
    }
    return [];
}

function getLanguages() {
    $jsonPath = __DIR__ . '/translations.json';

    if (file_exists($jsonPath)) {
        $translations = json_decode(file_get_contents($jsonPath), true);

        return $translations['languages'] ?? [];
    }
    return [];
}

$translations = loadTranslations($selectedLang);
$languages = getLanguages();
$selectedLangData = $languages[$selectedLang] ?? $languages['en'];
?>
