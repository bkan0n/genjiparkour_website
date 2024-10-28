<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genji Parkour - Graphs</title>
    <link rel="icon" type="image/png" href="assets/favicon.png">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="layout.css">
    <link rel="stylesheet" href="style-graphs.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/DrawSVGPlugin.min.js"></script>
</head>
<body>
    <nav>
        <div class="logo">
            <img src="assets/favicon.png" alt="Logo" class="custom-icon">
            <a href="index.html">GENJI PARKOUR</a>
        </div>
        <div class="nav-links">
            <a href="index.html"><i class="fas fa-home"></i>Home</a>
            <a href="leaderboard.php"><i class="fas fa-trophy"></i>Leaderboard</a>
            <a href="https://dsc.gg/genjiparkour" target="_blank"><i class="fab fa-discord"></i>Discord</a>
            <a href="tutorial.html"><i class="fas fa-book-open"></i>Tutorial</a>
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
                    <li><a href="graphs.php">Graphs</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <main class="container">
        <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "genjiparkour";
        $ranklist = "rank_name";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Data for circular chart from "leaderboard" table
        $tablename_leaderboard = "leaderboard";
        $ranklist = "rank_name";
        $sql = "SELECT $ranklist, COUNT(*) as rank_count FROM $tablename_leaderboard GROUP BY $ranklist";
        $result = $conn->query($sql);
        $rank_data = [];
        $order = ["Ninja", "Jumper", "Skilled", "Pro", "Master", "Grandmaster", "God"];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $rank_data[] = $row;
            }
        }

       // Data for bar chart from "maps" table
        $order_maps = ["Easy", "Medium", "Hard", "Very hard", "Extreme", "Hell"];
        $difficulty_data = array_fill_keys($order_maps, 0);

        $difficulty_sql = "SELECT map_difficulty, COUNT(*) as difficulty_count FROM maps GROUP BY map_difficulty";
        $difficulty_sql = "
            SELECT 
                CASE 
                    WHEN map_difficulty IN ('Easy -', 'Easy', 'Easy +') THEN 'Easy'
                    WHEN map_difficulty IN ('Medium -', 'Medium', 'Medium +') THEN 'Medium'
                    WHEN map_difficulty IN ('Hard -', 'Hard', 'Hard +') THEN 'Hard'
                    WHEN map_difficulty IN ('Very hard -', 'Very hard', 'Very hard +') THEN 'Very hard'
                    WHEN map_difficulty IN ('Extreme -', 'Extreme', 'Extreme +') THEN 'Extreme'
                    ELSE map_difficulty
                END AS map_difficulty_group, 
                COUNT(*) as difficulty_count 
            FROM maps 
            GROUP BY map_difficulty_group
        ";
        $difficulty_result = $conn->query($difficulty_sql);
        if ($difficulty_result->num_rows > 0) {
            while ($row = $difficulty_result->fetch_assoc()) {
                if (isset($difficulty_data[$row['map_difficulty_group']])) {
                    $difficulty_data[$row['map_difficulty_group']] = $row['difficulty_count'];
                }
            }
        }

        //Data for point chart from "maps" table
        $quality_sql = "
        SELECT map_creator, map_quality
        FROM maps
        WHERE map_completions >= 3
        ORDER BY map_quality DESC
        LIMIT 5
        ";
        $result = $conn->query($quality_sql);
        
        $creators = [];
        $qualityAverages = [];
        
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $creators[] = $row['map_creator'];
                $qualityAverages[] = $row['map_quality'];
            }
        }

        //Data for popular maps chart
        $difficulty = isset($_GET['difficulty']) ? $_GET['difficulty'] : 'Easy';
        $difficulty = $conn->real_escape_string($difficulty);

        $sql = "SELECT map_code, map_completions 
                FROM maps 
                WHERE map_difficulty = '$difficulty' 
                ORDER BY map_completions DESC 
                LIMIT 5";

        $result = $conn->query($sql);
        $data = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        $conn->close();

        usort($rank_data, function($a, $b) use ($order) {
            return array_search($a['rank_name'], $order) - array_search($b['rank_name'], $order);
        });

        $mapCodes = json_encode(array_column($data, 'map_code'));
        $mapCompletions = json_encode(array_column($data, 'map_completions'));
        ?>
        <div class="pie-chart-container">
            <title></title>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 778 590">
                <!-- Cercle blanc de fond -->
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
            <select id="difficultySelect" onchange="updateURL()">
                <option value="Easy" <?php if ($difficulty === 'Easy') echo 'selected'; ?>>Easy</option>
                <option value="Medium" <?php if ($difficulty === 'Medium') echo 'selected'; ?>>Medium</option>
                <option value="Hard" <?php if ($difficulty === 'Hard') echo 'selected'; ?>>Hard</option>
                <option value="Very hard" <?php if ($difficulty === 'Very hard') echo 'selected'; ?>>Very hard</option>
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
        const creators = <?php echo json_encode($creators); ?>;
        const qualityAverages = <?php echo json_encode($qualityAverages); ?>;
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

        const canvas = document.getElementById('qualityDotChart');
        const ctx = canvas.getContext('2d');

        const ratio = window.devicePixelRatio || 1;

        canvas.style.width = "300%";
        canvas.style.height = "400px";
        canvas.width = canvas.clientWidth * ratio;
        canvas.height = canvas.clientHeight * ratio; 
        ctx.scale(ratio, ratio);

        new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: creators,
                datasets: [{
                    label: 'Average quality per creator',
                    data: qualityAverages.map((value, index) => ({ x: index + 1, y: value })),
                    backgroundColor: colors.slice(0, qualityAverages.length),
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                animation: {
                        duration: 4000 
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Maps makers',
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 18,
                                lineHeight: 1.5
                            }
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)',
                            borderColor: '#CCCCCC', 
                            borderWidth: 1.5,
                            lineWidth: 1,
                            drawOnChartArea: true,
                            drawTicks: false, 
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) {
                                return creators[value - 1];
                            },
                            stepSize: 1,
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 6,
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
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)',
                            lineWidth: 1,
                            borderDash: [5, 5],
                            drawTicks: false,
                            zeroLineColor: '#666',
                            zeroLineWidth: 1.5,
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 12
                            }
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
                                return `Average quality: ${context.raw.y}`;
                            }
                        }
                    }
                }
            }
        });
    });

    //Popular chart
    document.addEventListener("DOMContentLoaded", () => {
        const mapCodes = <?php echo $mapCodes; ?>;
        const mapCompletions = <?php echo $mapCompletions; ?>;
        const mapQuality = <?php echo json_encode($qualityAverages); ?>;
        const difficulty = "<?php echo $difficulty; ?>";

        const ctx = document.getElementById("mostPlayedMapsChart").getContext("2d");

        const difficultyColors = {
            "Easy": "rgba(10, 209, 0, 0.6)",
            "Medium": "rgba(255, 229, 0, 0.6)",
            "Hard": "rgba(255, 164, 0, 0.6)",
            "Very hard": "rgba(255, 89, 0, 0.6)",
            "Extreme": "rgba(255, 0, 0, 0.6)",
            "Hell": "rgba(210, 0, 0, 0.6)"
        };

        const bubbleColor = difficultyColors[difficulty] || "rgba(54, 162, 235, 0.6)";

        const bubbleData = mapCodes.map((mapCode, index) => {
            return {
                x: mapCode,
                y: mapCompletions[index],
                r: mapQuality[index] * 3
            };
        });

        // Creating the bubble chart
        new Chart(ctx, {
            type: "bubble",
            data: {
                datasets: [{
                    label: `Top maps for ${difficulty}`,
                    data: bubbleData,
                    backgroundColor:bubbleColor,
                    borderColor: "rgba(128, 128, 128, 0.6)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 4000
                },
                scales: {
                    x: {
                        type: 'category',
                        labels: mapCodes,
                        title: {
                            display: true,
                            text: 'Maps codes',
                            color: '#333',
                            font: {
                                family: 'Roboto',
                                weight: 'bold',
                                size: 16,
                                lineHeight: 1.5
                            }
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)',
                            borderColor: '#CCCCCC',
                            borderWidth: 1.5,
                            lineWidth: 1,
                            drawOnChartArea: true,
                            drawTicks: false,
                            drawBorder: false
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
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)',
                            lineWidth: 1,
                            borderDash: [5, 5],
                            drawTicks: false,
                            zeroLineColor: '#666',
                            zeroLineWidth: 1.5,
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
                    legend: {
                        display: true
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const mapCode = mapCodes[context.dataIndex];
                                const completions = context.raw.y;
                                const quality = mapQuality[context.dataIndex];
                                return `${mapCode}: ${completions} completions, Quality: ${quality}`;
                            }
                        }
                    }
                }
            }
        });
    });


    function updateURL() {
        const difficulty = document.getElementById("difficultySelect").value;
        const url = new URL(window.location.href);
        url.searchParams.set("difficulty", difficulty);
        window.location.href = url; 
    }

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
    const xpRequired = ranks.map((_, i) => Math.log(i + 2) * 1000); // Calcul logarithmique pour XP requise

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
