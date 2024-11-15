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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Graphs</title>
    <link rel="icon" type="image/png" href="assets/img-2/favicon.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles/layout.css">
    <link rel="stylesheet" href="styles/style-graphs.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/DrawSVGPlugin.min.js"></script>
    <script src="js/layout.js" defer></script>
</head>
<body>
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
        <div id="profileModalContent" class="modal-content">
            <?php include BASE_PATH . 'modal/profile.php'; ?>
        </div>
    </div>
    <div id="sessionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; align-items: center; justify-content: center;">
        <div id="sessionModalContent" class="modal-content" style="background: #fff; padding: 20px; text-align: center; border-radius: 8px; max-width: 400px;">
        </div>
    </div>
    <main class="container">
        <?php
        $host = getenv('DB_HOST');
        $port = getenv('DB_PORT');
        $dbname = getenv('DB_NAME');
        $user = getenv('DB_USER');
        $password = getenv('DB_PWD');

        $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
        if (!$conn) {
            die("Connection failed: " . pg_last_error());
        }

        // Données pour le graphique circulaire
        $sql = "SELECT u.user_id, coalesce(xp.amount, 0) AS xp_amount 
                FROM users u 
                LEFT JOIN xptable xp ON u.user_id = xp.user_id";
        $result = pg_query($conn, $sql);

        $rank_data = [];
        $order = ["Ninja", "Jumper", "Skilled", "Pro", "Master", "Grandmaster", "God"];

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

        $rank_counts = array_fill_keys($order, 0);
        if ($result && pg_num_rows($result) > 0) {
            while ($row = pg_fetch_assoc($result)) {
                $rank_name = getRankName($row['xp_amount']);
                $rank_counts[$rank_name]++;
            }
        }

        $rank_data = [];
        foreach ($rank_counts as $rank_name => $count) {
            $rank_data[] = ['rank_name' => $rank_name, 'rank_count' => $count];
        }

        usort($rank_data, function($a, $b) use ($order) {
            return array_search($a['rank_name'], $order) - array_search($b['rank_name'], $order);
        });

        // Données pour le graphique à barres
        $order_maps = ["Easy", "Medium", "Hard", "Very Hard", "Extreme", "Hell"];
        $difficulty_data = array_fill_keys($order_maps, 0);
        
        $difficulty_sql = "
            WITH ranges (\"range\", \"name\") AS (
                 VALUES  ('[0.0,2.35)'::numrange, 'Easy'),
                         ('[2.35,4.12)'::numrange, 'Medium'),
                         ('[4.12,5.88)'::numrange, 'Hard'),
                         ('[5.88,7.65)'::numrange, 'Very Hard'),
                         ('[7.65,9.41)'::numrange, 'Extreme'),
                         ('[9.41,10.0]'::numrange, 'Hell')
            ),
            map_data AS (
                SELECT avg(mr.difficulty) AS difficulty
                FROM maps m
                LEFT JOIN map_ratings mr ON mr.map_code = m.map_code
                WHERE m.official IS TRUE AND m.archived IS FALSE
                GROUP BY m.map_code
            )
            SELECT
                name AS difficulty,
                count(name) AS amount
            FROM ranges r
            INNER JOIN map_data md ON r.range @> md.difficulty
            GROUP BY name;
        ";

        $difficulty_result = pg_query($conn, $difficulty_sql);
        if ($difficulty_result && pg_num_rows($difficulty_result) > 0) {
            while ($row = pg_fetch_assoc($difficulty_result)) {
                if (isset($difficulty_data[$row['difficulty']])) {
                    $difficulty_data[$row['difficulty']] = $row['amount'];
                }
            }
        }
        
        // Données pour le graphique de points de la table "maps"
        $quality_sql = "
            WITH map_creator_data AS (
                SELECT m.map_code, mc.user_id, round(avg(mr.quality), 2) AS quality
                FROM maps m
                LEFT JOIN map_creators mc ON m.map_code = mc.map_code
                LEFT JOIN map_ratings mr ON m.map_code = mr.map_code
                WHERE mr.quality IS NOT NULL
                GROUP BY mc.user_id, m.map_code
            ), quality_data AS (
                SELECT
                    count(mcd.map_code) AS map_count,
                    coalesce(ugn.global_name, u.nickname) AS name,
                    avg(mcd.quality) AS average_quality
                FROM map_creator_data mcd
                LEFT JOIN users u ON mcd.user_id = u.user_id
                LEFT JOIN user_global_names ugn ON u.user_id = ugn.user_id
                GROUP BY mcd.user_id, ugn.global_name, u.nickname
                ORDER BY average_quality DESC
            )
            SELECT * FROM quality_data WHERE map_count >= 3;
        ";
        $result = pg_query($conn, $quality_sql);

        $creators = [];
        $qualityAverages = [];

        if ($result && pg_num_rows($result) > 0) {
            while ($row = pg_fetch_assoc($result)) {
                $creators[] = $row['name'];
                $qualityAverages[] = number_format($row['average_quality'], 2);
            }
        }


        // Données pour le graphique des cartes populaires
        $difficulty = isset($_GET['difficulty']) ? $_GET['difficulty'] : 'Easy';
        $difficulty = pg_escape_string($conn, $difficulty);
        
        $sql = "
        WITH ranges (\"range\", \"name\") AS (
             VALUES  ('[0.0,2.35)'::numrange, 'Easy'),
                     ('[2.35,4.12)'::numrange, 'Medium'),
                     ('[4.12,5.88)'::numrange, 'Hard'),
                     ('[5.88,7.65)'::numrange, 'Very Hard'),
                     ('[7.65,9.41)'::numrange, 'Extreme'),
                     ('[9.41,10.0]'::numrange, 'Hell')
        ),
        completion_data AS (
            SELECT
                r.map_code,
                COUNT(*) AS completions
            FROM records r
            GROUP BY r.map_code
        ),
        rating_data AS (
            SELECT
                m.map_code,
                AVG(mr.difficulty) AS difficulty,
                AVG(mr.quality) AS quality
            FROM maps m
            LEFT JOIN map_ratings mr ON m.map_code = mr.map_code
            GROUP BY m.map_code
        ),
        map_data AS (
            SELECT
                cd.map_code,
                cd.completions,
                rd.difficulty,
                rd.quality
            FROM completion_data cd
            LEFT JOIN rating_data rd ON cd.map_code = rd.map_code
        ),
        ranked_maps AS (
            SELECT
                md.map_code,
                md.completions,
                round(md.quality, 2),
                r.name AS difficulty,
                RANK() OVER (PARTITION BY r.name ORDER BY md.completions DESC, md.quality DESC) AS ranking
            FROM ranges r
            INNER JOIN map_data md ON r.range @> md.difficulty
        )
        SELECT *
        FROM ranked_maps
        WHERE ranking <= 5 AND difficulty = $1  -- Filtre par difficulté
        ORDER BY
            CASE difficulty
                WHEN 'Easy' THEN 1
                WHEN 'Medium' THEN 2
                WHEN 'Hard' THEN 3
                WHEN 'Very Hard' THEN 4
                WHEN 'Extreme' THEN 5
                WHEN 'Hell' THEN 6
            END,
            ranking;
        ";
        
        $result = pg_query_params($conn, $sql, array($difficulty));
        $data = [];
        
        if ($result && pg_num_rows($result) > 0) {
            while ($row = pg_fetch_assoc($result)) {
                $data[] = $row;
            }
        }
        
        pg_close($conn);

        // Tri des données de rang en fonction de l'ordre
        usort($rank_data, function($a, $b) use ($order) {
            return array_search($a['rank_name'], $order) - array_search($b['rank_name'], $order);
        });

        $mapCodes = json_encode(array_column($data, 'map_code'));
        $mapCompletions = json_encode(array_column($data, 'completions'));
        ?>
        <div class="pie-chart-container">
            <title></title>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 778 590">
                <circle class="background-circle" cx="389" cy="294" r="160" fill="none" stroke="#bdbdbd" stroke-width="40" transform="rotate(-90, 389, 294)" />
                <circle class="inner-circle" cx="389" cy="294" r="160" fill="none" stroke="#fff" stroke-width="20" transform="rotate(-90, 389, 294)" />
                <text x="389" y="294" text-anchor="middle" alignment-baseline="middle" font-family="Roboto, sans-serif" font-size="24" fill="#333" font-weight="bold" class="pie-title-text">
                Ranks distribution
                </text>
                <g class="mt-rings" fill="none" stroke-miterlimit="10" stroke-width="30">
                <?php
                $start_angle = -90;
                $cx = 389;
                $cy = 294;
                $radius_inner = 150;
                $radius_outer = 170;

                foreach ($rank_data as $index => $rank) {
                    $percentage = ($rank['rank_count'] / array_sum(array_column($rank_data, 'rank_count')));
                    if ($percentage == 0) {
                        continue;
                    }
                    $angle = $percentage * 360;
                    $end_angle = $start_angle + $angle;
                    $large_arc_flag = $angle > 180 ? 1 : 0;
                    $x1 = $cx + $radius_inner * cos(deg2rad($start_angle));
                    $y1 = $cy + $radius_inner * sin(deg2rad($start_angle));
                    $x2 = $cx + $radius_inner * cos(deg2rad($end_angle));
                    $y2 = $cy + $radius_inner * sin(deg2rad($end_angle));
                    $x3 = $cx + $radius_outer * cos(deg2rad($end_angle));
                    $y3 = $cy + $radius_outer * sin(deg2rad($end_angle));
                    $x4 = $cx + $radius_outer * cos(deg2rad($start_angle));
                    $y4 = $cy + $radius_outer * sin(deg2rad($start_angle));

                    echo "<path d='M$x1,$y1 A$radius_inner,$radius_inner 0 $large_arc_flag,1 $x2,$y2 L$x3,$y3 A$radius_outer,$radius_outer 0 $large_arc_flag,0 $x4,$y4 Z' class='color-" . (($index % 7) + 1) . " segment'>";
                    echo "<title>{$rank['rank_count']} Players with rank " . strtoupper($rank['rank_name']) . "</title>";
                    echo "</path>";
                    $start_angle = $end_angle;
                }
                ?>
                </g>
                <g class="mt-perc-lines">
                <?php
                $start_angle = -90;
                foreach ($rank_data as $index => $rank) {
                    $percentage = ($rank['rank_count'] / array_sum(array_column($rank_data, 'rank_count')));
                    if ($percentage == 0) {
                        continue;
                    }
                    $angle = $percentage * 360;
                    $mid_angle = $start_angle + ($angle / 2);
                    $x = $cx + ($radius_outer + 30) * cos(deg2rad($mid_angle));
                    $y = $cy + ($radius_outer + 30) * sin(deg2rad($mid_angle));
                    echo "<line x1='" . ($cx + $radius_outer * cos(deg2rad($mid_angle))) . "' y1='" . ($cy + $radius_outer * sin(deg2rad($mid_angle))) . "' x2='$x' y2='$y' stroke='#333' stroke-width='1' />";
                    $start_angle += $angle;
                }
                ?>
                </g>
                <g class="mt-figures">
                <?php
                $start_angle = -90;
                foreach ($rank_data as $index => $rank) {
                    $percentage = ($rank['rank_count'] / array_sum(array_column($rank_data, 'rank_count')));
                    if ($percentage == 0) {
                        continue;
                    }
                    $angle = $percentage * 360;
                    $mid_angle = $start_angle + ($angle / 2);

                    $extra_offset = ($rank['rank_name'] === "Grandmaster") ? 20 : 0;

                    $x = $cx + ($radius_outer + 60 + $extra_offset) * cos(deg2rad($mid_angle));
                    $y = $cy + ($radius_outer + 60 + $extra_offset) * sin(deg2rad($mid_angle));

                    echo "<text x='$x' y='" . ($y - 10) . "' font-size='16' fill='#333' text-anchor='middle' alignment-baseline='middle' class='sans-light'>" . strtoupper($rank['rank_name']) . "</text>";
                    echo "<text x='$x' y='" . ($y + 10) . "' font-size='14' fill='#333' text-anchor='middle' alignment-baseline='middle' class='sans-semi'>" . round($percentage * 100, 2) . "%</text>";

                    $start_angle += $angle;
                }
                ?>
                </g>
            </svg>
        </div>
        <div class="chart-container">
            <canvas id="difficultyBarChart" width="400" height="200"></canvas>
        </div>
        <div class="quality-container">
            <canvas id="qualityDotChart" width="400" height="200"></canvas>
        </div>
        <div class="populars-maps-container">
            <canvas id="mostPlayedMapsChart" width="400" height="200"></canvas>
            <div class="difficulty-selection">
                <label for="difficultySelect"></label>
                <select id="difficultySelect">
                    <option value="Easy" <?php if ($difficulty === 'Easy') echo 'selected'; ?>>Easy</option>
                    <option value="Medium" <?php if ($difficulty === 'Medium') echo 'selected'; ?>>Medium</option>
                    <option value="Hard" <?php if ($difficulty === 'Hard') echo 'selected'; ?>>Hard</option>
                    <option value="Very Hard" <?php if ($difficulty === 'Very Hard') echo 'selected'; ?>>Very hard</option>
                    <option value="Extreme" <?php if ($difficulty === 'Extreme') echo 'selected'; ?>>Extreme</option>
                    <option value="Hell" <?php if ($difficulty === 'Hell') echo 'selected'; ?>>Hell</option>
                </select>
            </div>
        </div>
        <div class="XP-container">
            <canvas id="xpRankChart"></canvas>
        </div>
    </main>

    <footer>
        <div class="footer-left">Genji Parkour © 2024</div>
        <div class="footer-right">Joe is cool</div>
    </footer>
    
    <script>
    //Circular chat
    window.addEventListener("DOMContentLoaded", () => {
        const paths = document.querySelectorAll("svg path");
        const backgroundCircle = document.querySelector(".background-circle");
        const innerCircle = document.querySelector(".inner-circle");
        const lines = document.querySelectorAll(".mt-perc-lines line");
        const labels = document.querySelectorAll(".mt-figures text");

        gsap.fromTo(backgroundCircle, {
            strokeDasharray: `0 1008`,
            strokeOpacity: 0.5
        }, {
            strokeDasharray: `1008 1008`,
            duration: 2,
            ease: "power2.inOut"
        });

        gsap.fromTo(innerCircle, {
            strokeDasharray: `0 1008`,
            strokeOpacity: 0.3
        }, {
            strokeDasharray: `1008 1008`,
            duration: 2,
            ease: "power2.inOut"
        });

        paths.forEach((path, index) => {
            gsap.fromTo(path, { opacity: 0 }, {
                opacity: 1,
                duration: 1.2,
                delay: 1.9 + index * 0.15, 
            });
        });

        lines.forEach((line, index) => {
            gsap.fromTo(line, { opacity: 0 }, {
                opacity: 1,
                duration: 0.8,
                delay: 2.3 + index * 0.02,
            });
        });

        labels.forEach((label, index) => {
            gsap.fromTo(label, { opacity: 0, y: 10 }, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 2.4 + index * 0.02,
            });
        });
    });
    gsap.fromTo(".pie-title-text", 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 2.5, ease: "power2.out", delay: 1 }
    );
    

    //Bar chart
    document.addEventListener("DOMContentLoaded", () => {
        const difficultyData = <?php echo json_encode($difficulty_data); ?>;

        const labels = Object.keys(difficultyData).map(label => label.toUpperCase());
        const data = Object.values(difficultyData);
        const colors = [
            "#0AD100", // Easy
            "#FFE500", // Medium
            "#FFA400", // Hard
            "#FF5900", // Very hard
            "#FF0000", // Extreme
            "#D20000"  // Hell
        ];

        new Chart(document.getElementById('difficultyBarChart'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Map Difficulty Distribution',
                    data: data,
                    backgroundColor: colors,
                    borderRadius: {
                        topLeft: 10,
                        topRight: 10
                    },
                    borderSkipped: false,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 4000 
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount of maps',
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 16,
                                lineHeight: 1.5
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 12
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: true
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Difficulty level',
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 16,
                                lineHeight: 1.5
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 12
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: true
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw} maps`;
                            }
                        }
                    },
                    font: {
                        family: 'open-sans',
                        weight: 'bold',
                        style: 'normal',
                        size: 16
                    }
                }
            },
            plugins: [{
                id: 'verticalLinesBetweenBars',
                beforeDraw: (chart) => {
                    const { ctx, chartArea: { left, right, bottom, top }, scales: { x } } = chart;
                    ctx.save();
                    ctx.strokeStyle = '#333';
                    ctx.lineWidth = 0.2;

                    for (let i = 0; i < x.ticks.length - 1; i++) {
                        const midPoint = (x.getPixelForTick(i) + x.getPixelForTick(i + 1)) / 2;
                        ctx.beginPath();
                        ctx.moveTo(midPoint, bottom - 3);
                        ctx.lineTo(midPoint, top + 10);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
            }]
        });
    });

    //Quality chart 
    document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("qualityDotChart").getContext("2d");
    let qualityChart;

    function updateChart(data) {
        const sortedData = data.sort((a, b) => b.map_count - a.map_count).slice(0, 18);

        const creators = sortedData.map(item => item.name);
        const mapCounts = sortedData.map(item => item.map_count);
        const averageQualities = sortedData.map(item => parseFloat(item.average_quality));

        const chartData = creators.map((creator, index) => ({
            x: mapCounts[index],
            y: averageQualities[index]
        }));

        const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#C9CBFF', '#FFA500', '#FF4500', '#00FA9A', '#9370DB',
            '#FFD700', '#DC143C', '#1E90FF', '#B22222', '#00CED1'
        ];

        if (qualityChart) {
            qualityChart.destroy();
        }

        qualityChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Map creators by average quality',
                    data: chartData,
                    backgroundColor: colors.slice(0, chartData.length),
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Amount of maps (Log Scale)',
                            color: '#333',
                            font: {
                                size: 16,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Average quality',
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 16,
                                lineHeight: 1.5
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 12
                            }
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const roundedQuality = averageQualities[context.dataIndex].toFixed(2);
                                return `${creators[context.dataIndex]} - Maps: ${context.raw.x}, Quality: ${roundedQuality}`;
                            }
                        }
                    }
                }
            }
        });
    }

        fetch('api/popularCreators.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    updateChart(data);
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(error => console.error('Error fetching top map creators:', error));
    });




    //Popular chart
    document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("mostPlayedMapsChart").getContext("2d");
    let mostPlayedMapsChart;

    function updateChart(difficulty, data) {
        const mapCodes = data.map(item => item.map_code);
        const mapCompletions = data.map(item => item.completions);
        const mapQuality = data.map(item => parseFloat(item.quality));

        const bubbleData = mapCodes.map((mapCode, index) => ({
            x: mapCode,
            y: mapCompletions[index],
            r: mapQuality[index] * 2
        }));

        const difficultyColors = {
            "Easy": "rgba(10, 209, 0, 0.6)",
            "Medium": "rgba(255, 229, 0, 0.6)",
            "Hard": "rgba(255, 164, 0, 0.6)",
            "Very Hard": "rgba(255, 89, 0, 0.6)",
            "Extreme": "rgba(255, 0, 0, 0.6)",
            "Hell": "rgba(210, 0, 0, 0.6)"
        };

        const bubbleColor = difficultyColors[difficulty] || "rgba(54, 162, 235, 0.6)";

        if (mostPlayedMapsChart) {
            mostPlayedMapsChart.destroy();
        }

        mostPlayedMapsChart = new Chart(ctx, {
            type: "bubble",
            data: {
                datasets: [{
                    label: `Top maps for ${difficulty}`,
                    data: bubbleData,
                    backgroundColor: bubbleColor,
                    borderColor: "rgba(128, 128, 128, 0.6)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        labels: mapCodes,
                        title: {
                            display: true,
                            text: 'Map codes',
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 16,
                                lineHeight: 1.5
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 12
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Completions',
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 16,
                                lineHeight: 1.5
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 12
                            }
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw.x}: ${context.raw.y} completions, Quality: ${mapQuality[context.dataIndex]}`;
                            }
                        }
                    }
                }
            }
        });
    }

    document.getElementById("difficultySelect").addEventListener("change", updateChartData);

        function updateChartData() {
            const difficulty = document.getElementById("difficultySelect").value;

            fetch("api/popularMaps.php")
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const filteredData = data.filter(item => item.difficulty === difficulty);
                        updateChart(difficulty, filteredData);
                    } else if (data.error) {
                        console.error('API Error:', data.error);
                    } else {
                        console.error('Unexpected response format:', data);
                    }
                })
                .catch(error => console.error('Error fetching chart data:', error));
        }

        updateChartData();
    });

    function animateSelect() {
        const select = document.getElementById("difficultySelect");
        select.classList.add("expanded");

        setTimeout(() => {
            select.classList.remove("expanded");
        }, 300);
    }

    //XP Chart
    document.addEventListener("DOMContentLoaded", () => {
        const ranks = ["Rank 1", "Rank 2", "Rank 3", "Rank 4", "Rank 5", "Rank 6", "Rank 7"];
        const xpRequired = ranks.map((_, i) => Math.log(i + 2) * 1000);

        const ctx = document.getElementById("xpRankChart").getContext("2d");

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ranks,
                datasets: [{
                    label: 'XP Required for Each Rank',
                    data: xpRequired,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                animation: {
                    duration: 4000
                },
                scales: {
                    y: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'XP Required (Log Scale)',
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                size: 16,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Rank',
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                size: 16,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    });
    </script>
</body>
</html>
