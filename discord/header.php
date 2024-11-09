<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/../');
}
require BASE_PATH . 'discord/config.php';

$isLoggedIn = isset($_SESSION['user_id']);
?>

<script>
    const isLoggedIn = <?php echo $isLoggedIn ? 'true' : 'false'; ?>;
    const REDIRECT_URL = '<?php echo rtrim(REDIRECT_URL, '/') . '/'; ?>';
</script>

<?php if ($isLoggedIn): ?>
    <script src="js/check_session.js" defer></script>
<?php endif; ?>
