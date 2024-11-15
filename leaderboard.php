<?php
if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__ . '/');
}

require BASE_PATH . "discord/session_init.php";
include BASE_PATH . "discord/header.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Genji Parkour - Leaderboard</title>
    <link rel="icon" type="image/png" href="assets/img-2/favicon.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/style-leaderboard.css">
    <script src="js/layout.js" defer></script>
    <script src="js/leaderboard.js" defer></script>
</head>
<body>
    <div id="wrapper">
    <nav>
        <div class="logo">
            <img src="assets/img-2/favicon.png" alt="Logo" class="custom-icon">
            <a href="index.php">GENJI PARKOUR</a>
        </div>
        <div class="nav-links">
            <a href="index.php">Home</a>
            <a href="leaderboard.php">Leaderboard</a>
            <a href="https://dsc.gg/genjiparkour" target="_blank">Discord</a>
            <a href="tutorial.php">Tutorial</a>
        </div>
        <div class="menu--right" role="navigation">
            <div class="auth-links">
                <?php if (isset($_SESSION['user_avatar'])): ?>
                    <div class="user-avatar-dropdown">
                        <img src="https://cdn.discordapp.com/avatars/<?php echo htmlspecialchars($_SESSION['user_id']); ?>/<?php echo htmlspecialchars($_SESSION['user_avatar']); ?>.png" alt="User Avatar" class="user-avatar" id="avatar-icon" />
                    </div>
                <?php else: ?>
                    <a href="discord/login.php" class="btn-discord">
                    <i class="fa-solid fa-circle-user"></i>
                    </a>
                <?php endif; ?>
            </div>
            <div class="menuToggle" id="burgerMenu">
                <input type="checkbox" id="burgerMenuScroll" />
                <span></span>
                <span></span>
                <span></span>
                <ul class="menuItem hidden" id="menuItems">
                    <li><a href="search.php">Maps search</a></li>
                    <li><a href="news.php">News & Events</a></li>
                    <li><a href="graphs.php">Graphs</a></li>
                    <li><a href="#">Submit completion</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="modal-profile" id="profileModal">
        <div class="modal-content">
            <?php include 'modal/profile.php'; ?>
        </div>
    </div>
    <div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center;">
        <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;">
        </div>
    </div>
        <div class="container">
            <h1> </h1>
            <form method="GET" action="leaderboard.php" class="form-container">
                <div class="custom-select" id="search-by-select">
                    <div class="select-trigger" id="search-by-trigger"></div>
                    <i class="fas fa-sliders-h filter-icon"></i>
                    <div class="custom-options select-hide" id="search-by-options">
                        <div class="custom-option" data-value="player_name">Name</div>
                        <div class="custom-option" data-value="player_tag">Tag</div>
                        <div class="custom-option" data-value="player_both">Name/Tag</div>
                    </div>
                </div>

                <input type="text" name="search" id="search-input" placeholder="Search by name & tag..." value="<?php echo isset($_GET['search']) ? htmlspecialchars($_GET['search'], ENT_QUOTES, 'UTF-8') : ''; ?>">

                <div class="custom-select-large" id="sort-select">
                    <div class="select-trigger" id="sort-trigger">Sort by</div>
                    <div class="custom-options select-hide" id="sort-options">
                        <div class="custom-option" data-value="player_xp">XP</div>
                        <div class="custom-option" data-value="player_wr">World records</div>
                    </div>
                </div>

                <div class="custom-select-large" id="rank-select">
                    <div class="select-trigger" id="rank-trigger">Search rank</div>
                    <div class="custom-options select-hide" id="rank-options">
                        <div class="custom-option" data-value="">All ranks</div>
                        <div class="custom-option" data-value="Ninja">Ninja</div>
                        <div class="custom-option" data-value="Jumper">Jumper</div>
                        <div class="custom-option" data-value="Skilled">Skilled</div>
                        <div class="custom-option" data-value="Pro">Pro</div>
                        <div class="custom-option" data-value="Master">Master</div>
                        <div class="custom-option" data-value="Grandmaster">Grandmaster</div>
                        <div class="custom-option" data-value="God">God</div>
                    </div>
                </div>

                <!-- Champs cachés pour stocker les valeurs des filtres -->
                <input type="hidden" name="sort" id="selected-sort" value="<?php echo isset($_GET['sort']) ? htmlspecialchars($_GET['sort'], ENT_QUOTES, 'UTF-8') : 'rank_name'; ?>">
                <input type="hidden" name="rank_name" id="selected-rank" value="<?php echo isset($_GET['rank_name']) ? htmlspecialchars($_GET['rank_name'], ENT_QUOTES, 'UTF-8') : ''; ?>">
                <input type="hidden" name="search_by" id="selected-search-by" value="<?php echo isset($_GET['search_by']) ? htmlspecialchars($_GET['search_by'], ENT_QUOTES, 'UTF-8') : 'player_both'; ?>">

                <!-- Bouton pour appliquer les filtres -->
                <button type="submit" class="apply-filters-btn">Apply filters</button>

                <!-- Champs cachés pour stocker l'état des colonnes -->
                <?php
                $show_columns = ['rank', 'xp', 'wr', 'map', 'playtest'];
                foreach ($show_columns as $col) {
                    $show_col_value = isset($_GET["show_$col"]) ? htmlspecialchars($_GET["show_$col"], ENT_QUOTES, 'UTF-8') : '1';
                    echo "<input type='hidden' name='show_$col' id='show_{$col}_input' value='$show_col_value'>";
                }
                ?>
            </form>

            <!-- Contrôles pour afficher/cacher les colonnes -->
            <div class="toggle-columns">
                <?php
                foreach ($show_columns as $col) {
                    $col_checked = (isset($_GET["show_$col"]) && $_GET["show_$col"] == '0') ? '' : 'checked';
                    echo "
                    <input type='checkbox' id='toggle_$col' class='toggle-col' data-col='$col' $col_checked>
                    <label for='toggle_$col'><span></span> " . ucfirst($col) . " <ins><i></i></ins></label>
                    <span class='vertical-bar2'></span>
                    ";
                }
                ?>
            </div>
            <?php
            $host = getenv('DB_HOST');
            $port = getenv('DB_PORT');
            $dbname = getenv('DB_NAME');
            $user = getenv('DB_USER');
            $password = getenv('DB_PWD');

            $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
            $tablename = "website_xp_leaderboard";

            // Erreur connexion
            if (!$conn) {
                error_log("Connection failed: " . pg_last_error($conn));
                die("An error occurred. Please try again later.");
            }

            // Pagination
            $results_per_page = 25;
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            if ($page < 1) {
                $page = 1;
            }
            $start_from = ($page - 1) * $results_per_page;

            // Liste blanche des colonnes pour le tri
            $valid_sort_columns = ['player_name', 'player_xp', 'player_wr', 'player_map_count', 'player_playtest_count', 'player_tag'];
            $sort_by = isset($_GET['sort']) && in_array($_GET['sort'], $valid_sort_columns) ? $_GET['sort'] : 'player_xp';

            // Liste blanche pour l'ordre de tri
            $order = isset($_GET['order']) && in_array($_GET['order'], ['asc', 'desc']) ? $_GET['order'] : 'asc';

            if (isset($_GET['order']) && in_array($_GET['order'], ['asc', 'desc'])) {
                $order = $_GET['order'];
            } else {
                if ($sort_by === 'player_xp' || $sort_by === 'player_wr' || $sort_by === 'player_map_count' || $sort_by === 'player_playtest_count') {
                    $order = 'desc';
                } else {
                    $order = 'asc';
                }
            }

            // Liste blanche pour le critère de recherche
            $valid_search_by = ['player_name', 'player_tag', 'player_both'];
            $search_by = isset($_GET['search_by']) && in_array($_GET['search_by'], $valid_search_by) ? $_GET['search_by'] : 'player_both';

            // Liste blanche pour les rangs
            $valid_ranks = ['', 'Ninja', 'Jumper', 'Skilled', 'Pro', 'Master', 'Grandmaster', 'God'];
            $rank_filter = isset($_GET['rank_name']) && in_array($_GET['rank_name'], $valid_ranks) ? $_GET['rank_name'] : '';

            $search = isset($_GET['search']) ? str_replace('--', '', $_GET['search']) : '';
            $search_escaped = pg_escape_string($conn, $search);

            $show_columns = ['rank', 'xp', 'wr', 'map', 'playtest'];
            foreach ($show_columns as $col) {
                ${"show_$col"} = isset($_GET["show_$col"]) ? $_GET["show_$col"] : '1';
            }

            // Requête SQL
            $sql = "WITH ranks AS (
                SELECT
                    r.user_id,
                    r.map_code,
                    rank() OVER (PARTITION BY r.map_code ORDER BY record) AS rank_num
                FROM records r
                JOIN users u ON r.user_id = u.user_id
                WHERE u.user_id > 1000 AND r.record < 99999999 AND r.verified = TRUE
            ),
            world_records AS (
                SELECT
                    r.user_id,
                    count(r.user_id) AS amount
                FROM ranks r
                WHERE rank_num = 1
                GROUP BY r.user_id
            ),
            map_counts AS (
                SELECT user_id, count(*) AS amount FROM map_creators GROUP BY user_id
            ),
            website_xp_leaderboard AS (
                SELECT
                    u.nickname AS player_name,
                    coalesce(xp.amount, 0) AS player_xp,
                    coalesce(wr.amount, 0) AS player_wr,
                    coalesce(mc.amount, 0) AS player_map_count,
                    coalesce(ptc.amount, 0) AS player_playtest_count,
                    coalesce(ugn.global_name, 'Unknown Username') AS player_tag
                FROM users u
                LEFT JOIN xptable xp ON u.user_id = xp.user_id
                LEFT JOIN user_global_names ugn ON u.user_id = ugn.user_id
                LEFT JOIN playtest_count ptc ON u.user_id = ptc.user_id
                LEFT JOIN map_counts mc ON u.user_id = mc.user_id
                LEFT JOIN world_records wr ON u.user_id = wr.user_id
                WHERE u.user_id > 1000
            )
            SELECT * FROM website_xp_leaderboard";

            // Appliquer les filtres de recherche
            $where_clause = '';
            if (!empty($search)) {
                if ($search_by === 'player_name') {
                    $where_clause = "player_name ILIKE '%$search_escaped%'";
                } elseif ($search_by === 'player_tag') {
                    $where_clause = "player_tag ILIKE '%$search_escaped%'";
                } else {
                    $where_clause = "(player_name ILIKE '%$search_escaped%' OR player_tag ILIKE '%$search_escaped%')";
                }
            }

            if (!empty($where_clause)) {
                $sql .= " WHERE " . $where_clause;
            }

            // Appliquer tri
            $sql .= " ORDER BY $sort_by $order LIMIT $results_per_page OFFSET $start_from";

            // Exécuter requête
            $result = pg_query($conn, $sql);

            if ($result === false) {
                error_log("SQL Error: " . pg_last_error($conn));
                die("An error occurred while retrieving data.");
            }

            // Fonction rang dynamique
            function getRankName($xp) {
                if ($xp >= 10000) {
                    return 'God';
                } elseif ($xp >= 7500) {
                    return 'Grandmaster';
                } elseif ($xp >= 5000) {
                    return 'Master';
                } elseif ($xp >= 3000) {
                    return 'Pro';
                } elseif ($xp >= 1500) {
                    return 'Skilled';
                } elseif ($xp >= 500) {
                    return 'Jumper';
                } else {
                    return 'Ninja';
                }
            }

            // Appliquer le filtre de rang après résultats
            $filtered_results = [];
            if (!empty($rank_filter)) {
                while ($row = pg_fetch_assoc($result)) {
                    if (getRankName($row['player_xp']) === $rank_filter) {
                        $filtered_results[] = $row;
                    }
                }
            } else {
                while ($row = pg_fetch_assoc($result)) {
                    $filtered_results[] = $row;
                }
            }

            // Affichage des données
            if (!empty($filtered_results)) {
                echo "<div class='table-container'>";
                echo "<table id='leaderboard'>";
                echo "<thead>";
                echo "<tr>
                        <th class='col-name'>Name
                            <span class='vertical-bar'></span>
                            <button id='sort-name' class='sort-btn' data-column='player_name' onclick='animation(this)'>
                                <div class='stroke stroke1'></div>
                                <div class='stroke stroke2'></div>
                                <div class='stroke stroke3'></div>
                                <div class='tap-circle'></div>
                            </button>
                        </th>";

                $rank_style = ($show_rank != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-rank' $rank_style>Rank
                        <span class='vertical-bar'></span>
                        <button id='sort-rank' class='sort-btn' data-column='rank_name' onclick='animation(this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                $xp_style = ($show_xp != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-xp' $xp_style>XP
                        <span class='vertical-bar'></span>
                        <button id='sort-xp' class='sort-btn' data-column='player_xp' onclick='animation(this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                $wr_style = ($show_wr != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-wr' $wr_style>World Records
                        <span class='vertical-bar'></span>
                        <button id='sort-wr' class='sort-btn' data-column='player_wr' onclick='animation(this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                $maps_style = ($show_map != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-map' $maps_style>Map Made
                        <span class='vertical-bar'></span>
                        <button id='sort-map' class='sort-btn' data-column='player_map_count' onclick='animation(this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                $playtests_style = ($show_playtest != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-playtest' $playtests_style>Playtest Vote
                        <span class='vertical-bar'></span>
                        <button id='sort-playtest' class='sort-btn' data-column='player_playtest_count' onclick='animation(this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                echo "<th class='col-tag'>Discord Tag
                        <span class='vertical-bar'></span>
                        <button id='sort-tag' class='sort-btn' data-column='player_tag' onclick='animation(this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";
                echo "</tr>";
                echo "</thead>";

                echo "<tbody>";
                foreach ($filtered_results as $row) {
                    $rank_name = getRankName($row['player_xp']); // Rang dynamique
                    $rank_class = strtolower($rank_name);
                    echo "<tr class='row-content'>
                            <td class='col-name'>" . htmlspecialchars($row['player_name'], ENT_QUOTES, 'UTF-8') . "</td>";

                    $rank_style = ($show_rank != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-rank rank-$rank_class' $rank_style>" . htmlspecialchars($rank_name, ENT_QUOTES, 'UTF-8') . "</td>";

                    $xp_style = ($show_xp != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-xp' $xp_style>" . htmlspecialchars($row['player_xp'], ENT_QUOTES, 'UTF-8') . " XP</td>";

                    $wr_style = ($show_wr != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-wr' $wr_style>" . htmlspecialchars($row['player_wr'], ENT_QUOTES, 'UTF-8') . " WR</td>";

                    $maps_style = ($show_map != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-map' $maps_style>" . htmlspecialchars($row['player_map_count'], ENT_QUOTES, 'UTF-8') . " " . (($row['player_map_count'] > 1) ? 'Maps' : 'Map') . "</td>";

                    $playtests_style = ($show_playtest != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-playtest' $playtests_style>" . htmlspecialchars($row['player_playtest_count'], ENT_QUOTES, 'UTF-8') . " " . (($row['player_playtest_count'] > 1) ? 'Votes' : 'Vote') . "</td>";

                    echo "<td class='col-tag'>" . htmlspecialchars($row['player_tag'], ENT_QUOTES, 'UTF-8') . "</td>
                        </tr>";
                }
                echo "</tbody>";
                echo "</table>";
                echo "</div>";
            } else {
                echo "<div class='no-results-message'>No players found</div>";
            }

            // Pagination
            $sql_total_entries = preg_replace('/ORDER BY.*$/i', '', $sql);
            $sql_total_entries = "SELECT COUNT(*) AS total FROM ($sql_total_entries) AS all_entries";

            // Nombre total d'entrées
            $result_count = pg_query($conn, $sql_total_entries);
            if ($result_count && $row_count = pg_fetch_assoc($result_count)) {
                $total_entries = (int)$row_count['total'];
            } else {
                $total_entries = 0;
            }

            // Nombre total de pages
            $total_pages = ($total_entries > 0) ? ceil($total_entries / $results_per_page) : 1;

            if ($total_pages > 1) {
                echo "<div class='pagination'>";

                // Calcul dynamique du nombre de pages à afficher
                $pages_to_show = min(5, $total_pages);

                // Calcul de la première et dernière page à afficher
                $start_page = max(1, $page - floor($pages_to_show / 2));
                $end_page = min($total_pages, $start_page + $pages_to_show - 1);

                // Ajuster la première page si $end_page dépasse $total_pages
                if ($end_page - $start_page < $pages_to_show - 1) {
                    $start_page = max(1, $end_page - $pages_to_show + 1);
                }

                // Paramètres URL
                $base_url = 'leaderboard.php?';
                $query_params = [
                    'search' => $search,
                    'sort' => $sort_by,
                    'order' => $order,
                    'rank_name' => $rank_filter,
                    'search_by' => $search_by,
                ];

                // Ajouter les états des cases à cocher
                foreach ($show_columns as $col) {
                    $query_params["show_$col"] = ${"show_$col"};
                }

                // Affichage des boutons Précédent et Suivant
                if ($page > 1) {
                    $prev_page = $page - 1;
                    $query_params['page'] = $prev_page;
                    $url = $base_url . http_build_query($query_params);
                    echo "<a href='$url'>&laquo;</a>";
                }

                // Afficher les pages
                for ($i = $start_page; $i <= $end_page; $i++) {
                    $query_params['page'] = $i;
                    $url = $base_url . http_build_query($query_params);
                    echo "<a " . ($i == $page ? "class='active'" : "") . " href='$url'>$i</a> ";
                }

                if ($page < $total_pages) {
                    $next_page = $page + 1;
                    $query_params['page'] = $next_page;
                    $url = $base_url . http_build_query($query_params);
                    echo "<a href='$url'>&raquo;</a>";
                }

                echo "</div>";
            }

            pg_close($conn);
            ?>
            </div>
        </div>
    </div>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</div>
</body>
</html>
