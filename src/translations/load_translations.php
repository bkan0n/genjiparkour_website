<?php
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

if (isset($_GET['lang'])) {
    $selectedLang = $_GET['lang'];
    setcookie('lang', $selectedLang, time() + (365 * 24 * 60 * 60), '/');
} else {
    $selectedLang = $_COOKIE['lang'] ?? 'en';
}

$translations = loadTranslations($selectedLang);
$languages = getLanguages();
$selectedLangData = $languages[$selectedLang] ?? $languages['en'];
?>
