<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Genji Parkour - Leaderboard</title>
    <link rel="icon" type="image/png" href="assets/favicon.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="layout.css">
    <link rel="stylesheet" href="style-leaderboard.css">
    <script src="js/script.js" defer></script>
</head>
<body>
    <div id="wrapper">
        <nav>
            <div class="logo">
            <img src="assets/favicon.png" alt="Logo" class="custom-icon">
                <a href="index.html">GENJI PARKOUR</a>
            </div>
            <div class="nav-links">
                <a href="index.html">
                    <i class="fas fa-home"></i>Home
                </a>
                <a href="leaderboard.php">
                    <i class="fas fa-trophy"></i>Leaderboard
                </a>
                <a href="https://dsc.gg/genjiparkour" target="_blank">
                    <i class="fab fa-discord"></i>Discord
                </a>
                <a href="tutorial.html">
                    <i class="fas fa-book-open"></i>Tutorial
                </a>
                </div>
            <!-- Hamburger Menu Icon -->
            <div class="menu--right" role="navigation">
                <div class="menuToggle" id="burgerMenu">
                <input type="checkbox" id="burgerMenuScroll"/>
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul class="menuItem">
                    <li><a href="#">New maps</a></li>
                    <li><a href="#">Maps search</a></li>
                    <li><a href="#">Guides</a></li>
                    <li><a href="news.html">News & Events</a></li>
                    <li><a href="#">Show me more</a></li>
                    </ul>
                </div>
            </div>
        </div>
        </nav>
        <div class="container">
            <h1>Players leaderboard</h1>
            <!-- Formulaire pour la recherche et les filtres -->
            <form method="GET" action="leaderboard.php" class="form-container">
                <!-- Dropdown pour le critère de recherche -->
                <div class="custom-select" id="search-by-select">
                    <div class="select-trigger" id="search-by-trigger"></div>
                    <i class="fas fa-sliders-h filter-icon"></i>
                    <div class="custom-options select-hide" id="search-by-options">
                        <div class="custom-option" data-value="player_name">Name</div>
                        <div class="custom-option" data-value="player_tag">Tag</div>
                        <div class="custom-option" data-value="player_both">Name/Tag</div>
                    </div>
                </div>
                <!-- Barre de recherche -->
                <input type="text" name="search" id="search-input" placeholder="Search by name & tag..." value="<?php echo isset($_GET['search']) ? htmlspecialchars($_GET['search'], ENT_QUOTES, 'UTF-8') : ''; ?>">

                <!-- Dropdown customisé pour le tri -->
                <div class="custom-select-large" id="sort-select">
                    <div class="select-trigger" id="sort-trigger">Sort by</div>
                    <div class="custom-options select-hide" id="sort-options">
                        <div class="custom-option" data-value="player_xp">XP</div>
                        <div class="custom-option" data-value="player_wr">World records</div>
                    </div>
                </div>

                <!-- Dropdown customisé pour les rangs -->
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
            // Connexion à la base de données
            $conn = new mysqli('localhost', 'root', '', 'genjiparkour');

            // Vérifie si la connexion est correcte
            if ($conn->connect_error) {
                error_log("Connection failed: " . $conn->connect_error);
                die("An error occurred. Please try again later.");
            }

            // Pagination: nombre d'entrées par page
            $results_per_page = 25;
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            if ($page < 1) {
                $page = 1;
            }
            $start_from = ($page - 1) * $results_per_page;

            // Récupérer les filtres

            // Liste blanche des colonnes pour le tri
            $valid_sort_columns = ['player_name', 'player_xp', 'player_wr', 'rank_name', 'player_map_count', 'player_playtest_count', 'player_tag'];
            $sort_by = isset($_GET['sort']) && in_array($_GET['sort'], $valid_sort_columns) ? $_GET['sort'] : 'rank_name';

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

            // Échapper la recherche
            $search = isset($_GET['search']) ? $_GET['search'] : '';
            $search_escaped = $conn->real_escape_string($search);

            // Récupérer l'état des cases à cocher
            foreach ($show_columns as $col) {
                ${"show_$col"} = isset($_GET["show_$col"]) ? $_GET["show_$col"] : '1';
            }

            // Construire la requête SQL
            $table_name = "leaderboard";
            $sql = "SELECT * FROM $table_name WHERE 1=1";

            if (!empty($search)) {
                if ($search_by === 'player_name') {
                    $sql .= " AND player_name LIKE '%$search_escaped%'";
                } elseif ($search_by === 'player_tag') {
                    $sql .= " AND player_tag LIKE '%$search_escaped%'";
                } else {
                    $sql .= " AND (player_name LIKE '%$search_escaped%' OR player_tag LIKE '%$search_escaped%')";
                }
            }

            if (!empty($rank_filter)) {
                $rank_escaped = $conn->real_escape_string($rank_filter);
                $sql .= " AND rank_name = '$rank_escaped'";
            }

            if ($sort_by === 'rank_name') {
                $order_by = "FIELD(rank_name, 'God', 'Grandmaster', 'Master', 'Pro', 'Skilled', 'Jumper', 'Ninja') $order";
            } else {
                $order_by = "$sort_by $order";
            }

            $sql .= " ORDER BY $order_by LIMIT $start_from, $results_per_page";

            $result = $conn->query($sql);

            if ($result === false) {
                error_log("SQL Error: " . $conn->error);
                die("An error occurred while retrieving data.");
            }

            // Affichage des données
            if ($result->num_rows > 0) {
                echo "<table id='leaderboard'>";
                echo "<thead>";
                echo "<tr>
                        <th class='col-name'>Name
                            <span class='vertical-bar'></span>
                            <button id='sort-name' class='sort-btn' data-column='player_name' onclick='animation(this); sortTableAjax(event, \"player_name\", this)'
>
                                <div class='stroke stroke1'></div>
                                <div class='stroke stroke2'></div>
                                <div class='stroke stroke3'></div>
                                <div class='tap-circle'></div>
                            </button>
                        </th>";

                // Toujours générer les colonnes, avec style conditionnel
                $rank_style = ($show_rank != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-rank' $rank_style>Rank
                        <span class='vertical-bar'></span>
                        <button id='sort-rank' class='sort-btn' data-column='rank_name' onclick='animation(this); sortTableAjax(\"rank_name\", this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                $xp_style = ($show_xp != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-xp' $xp_style>XP
                        <span class='vertical-bar'></span>
                        <button id='sort-xp' class='sort-btn' data-column='player_xp' onclick='animation(this); sortTableAjax(\"player_xp\", this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                $wr_style = ($show_wr != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-wr' $wr_style>World Records
                        <span class='vertical-bar'></span>
                        <button id='sort-wr' class='sort-btn' data-column='player_wr' onclick='animation(this); sortTableAjax(\"player_wr\", this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                $maps_style = ($show_map != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-map' $maps_style>Map Count
                        <span class='vertical-bar'></span>
                        <button id='sort-map' class='sort-btn' data-column='player_map_count' onclick='animation(this); sortTableAjax(\"player_map_count\", this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                $playtests_style = ($show_playtest != '0') ? '' : 'style="display:none;"';
                echo "<th class='col-playtest' $playtests_style>Playtest Count
                        <span class='vertical-bar'></span>
                        <button id='sort-playtest' class='sort-btn' data-column='player_playtest_count' onclick='animation(this); sortTableAjax(\"player_playtest_count\", this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";

                echo "<th class='col-tag'>Discord Tag
                        <span class='vertical-bar'></span>
                        <button id='sort-tag' class='sort-btn' data-column='player_tag' onclick='animation(this); sortTableAjax(\"player_tag\", this)'>
                            <div class='stroke stroke1'></div>
                            <div class='stroke stroke2'></div>
                            <div class='stroke stroke3'></div>
                            <div class='tap-circle'></div>
                        </button>
                    </th>";
                echo "</tr>";
                echo "</thead>";

                echo "<tbody>";
                while ($row = $result->fetch_assoc()) {
                    $rank_class = strtolower($row['rank_name']);
                    echo "<tr class='row-content'>
                            <td class='col-name'>" . htmlspecialchars($row['player_name'], ENT_QUOTES, 'UTF-8') . "</td>";

                    // Toujours générer les colonnes, avec style conditionnel
                    $rank_style = ($show_rank != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-rank rank-$rank_class' $rank_style>" . htmlspecialchars($row['rank_name'], ENT_QUOTES, 'UTF-8') . "</td>";

                    $xp_style = ($show_xp != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-xp' $xp_style>" . htmlspecialchars($row['player_xp'], ENT_QUOTES, 'UTF-8') . " XP</td>";

                    $wr_style = ($show_wr != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-wr' $wr_style>" . htmlspecialchars($row['player_wr'], ENT_QUOTES, 'UTF-8') . " WR</td>";

                    $maps_style = ($show_map != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-map' $maps_style>" . htmlspecialchars($row['player_map_count'], ENT_QUOTES, 'UTF-8') . " Map</td>";

                    $playtests_style = ($show_playtest != '0') ? '' : 'style="display:none;"';
                    echo "<td class='col-playtest' $playtests_style>" . htmlspecialchars($row['player_playtest_count'], ENT_QUOTES, 'UTF-8') . " Playtest</td>";

                    echo "<td class='col-tag'>" . htmlspecialchars($row['player_tag'], ENT_QUOTES, 'UTF-8') . "</td>
                        </tr>";
                }
                echo "</tbody>";
                echo "</table>";
            } else {
                echo "<div class='no-results-message'>No players found</div>";
            }

            // Pagination
            $sql_count = "SELECT COUNT(id) AS total FROM leaderboard WHERE 1=1";
            if (!empty($search)) {
                if ($search_by === 'player_name') {
                    $sql_count .= " AND player_name LIKE '%$search_escaped%'";
                } elseif ($search_by === 'player_tag') {
                    $sql_count .= " AND player_tag LIKE '%$search_escaped%'";
                } else {
                    $sql_count .= " AND (player_name LIKE '%$search_escaped%' OR player_tag LIKE '%$search_escaped%')";
                }
            }
            if (!empty($rank_filter)) {
                $sql_count .= " AND rank_name = '$rank_escaped'";
            }

            // Exécuter la requête pour obtenir le nombre d'entrées correspondant aux critères de recherche
            $result_count = $conn->query($sql_count);
            if ($result_count && $row_count = $result_count->fetch_assoc()) {
                $total_entries = (int)$row_count['total'];
            } else {
                $total_entries = 0;
            }

            $total_pages = ($total_entries > 0) ? ceil($total_entries / $results_per_page) : 1;

            // N'afficher la pagination que s'il y a plus d'une page
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

                // Préparer les paramètres pour l'URL
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

            // Fermeture de la connexion
            $conn->close();
            ?>
        </div>
    </div>
    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
</div>
</body>
</html>
