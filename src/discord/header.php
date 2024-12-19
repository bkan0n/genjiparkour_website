<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}
require BASE_PATH . 'discord/config.php';

$isLoggedIn = isset($_SESSION['user_id']);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
header("Pragma: no-cache");
?>

<script>
    const isLoggedIn = <?php echo $isLoggedIn ? 'true' : 'false'; ?>;
    const REDIRECT_URL = '<?php echo rtrim(REDIRECT_URL, '/') . '/'; ?>';
</script>

<?php if ($isLoggedIn): ?>
    <script src="js/check_session.js" defer></script>
<?php endif; ?>
