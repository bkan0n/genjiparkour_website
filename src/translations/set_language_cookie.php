<?php
if (isset($_GET['lang'])) {
    $selectedLang = $_GET['lang'];
    setcookie('lang', $selectedLang, time() + (365 * 24 * 60 * 60), '/');
} else {
    $selectedLang = $_COOKIE['lang'] ?? 'en';
}
?>
