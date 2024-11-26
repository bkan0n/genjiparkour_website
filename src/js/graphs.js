const currentLang = document.documentElement.lang || "en";
console.log(`Langue actuelle : ${currentLang}`);

async function loadTranslations() {
    try {
        const response = await fetch("translations/translations.json");
        const data = await response.json();
        const currentLang = document.documentElement.lang || "en";
        translations = data[currentLang]?.chart || {};
        console.log("Traductions chargées :", translations);
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

function t(key, params = {}) {
    const keys = key.split('.'); // Découpe la clé en parties
    let translation = translations;

    for (let i = 0; i < keys.length; i++) {
        if (!translation[keys[i]]) {
            console.warn(`Clé de traduction manquante : ${key}`);
            return key; // Retourne la clé brute si elle est manquante
        }
        translation = translation[keys[i]];
    }

    if (typeof translation === "string") {
        Object.keys(params).forEach(param => {
            const regex = new RegExp(`{${param}}`, "g");
            translation = translation.replace(regex, params[param]);
        });
    }

    return translation;
}

//Circular chat
async function fetchRankData(endpoint) {
    try {
        const response = await fetch(`api/graphs/${endpoint}`);
        if (!response.ok) throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        return [];
    }
}

async function generateSVG(endpoint) {
    const rankData = await fetchRankData(endpoint);
    if (rankData.length === 0) {
        console.error('Aucune donnée disponible pour générer le graphique.');
        return;
    }

    const filteredRankData = endpoint === 'getPlayersPerSkill.php'
    ? rankData.filter(rank => rank.tier !== "Ninja")
    : rankData;

    const totalPlayers = filteredRankData.reduce((sum, rank) => sum + rank.amount, 0);
    
    if (totalPlayers === 0) {
        console.error('Aucune donnée valide disponible après filtrage.');
        return;
    }

    const ringsContainer = document.getElementById('rings-container');
    const figuresContainer = document.getElementById('figures-container');
    const linesContainer = document.getElementById('lines-container');
    const hoverText = document.getElementById('hover-text');

    ringsContainer.innerHTML = '';
    figuresContainer.innerHTML = '';
    linesContainer.innerHTML = '';

    let startAngle = -90;
    const cx = 389, cy = 294, radiusInner = 150, radiusOuter = 170;

    const skillTierColors = [
        //'#00ff1a"', // Ninja
        '#cdff3a', // Jumper
        '#fbdf00', // Skilled
        '#ff9700', // Pro
        '#ff4500', // Master
        'rgb(233, 15, 15)', // Grandmaster
        'rgb(129, 8, 8)' // God
    ];

    const tierColors = [
        'rgb(144, 238, 144)', // Light Green (Newcomer)
        'rgb(173, 255, 47)',  // Green-Yellow
        'rgb(202, 255, 112)', // Lime Green
        'rgb(255, 255, 102)', // Yellow
        'rgb(255, 213, 79)',  // Golden Yellow
        'rgb(255, 165, 0)',   // Orange
        'rgb(255, 140, 0)',   // Dark Orange
        'rgb(255, 69, 0)',    // Red-Orange
        'rgb(255, 0, 0)',     // Red
        'rgb(230, 0, 0)',     // Deep Red
        'rgb(200, 0, 0)',     // Darker Red
        'rgb(170, 0, 0)',     // Burgundy
        'rgb(139, 0, 0)',     // Dark Red (Master-Level)
        'rgb(115, 0, 0)',     // Deep Crimson
        'rgb(100, 0, 0)',     // Wine Red
        'rgb(85, 0, 0)',      // Very Dark Red
        'rgb(70, 0, 0)',      // Deep Blood Red
        'rgb(55, 0, 0)',      // Almost Black Red
        'rgb(40, 0, 0)',      // Fading Red
        'rgb(30, 0, 0)',      // Deep Shadow Red
        'rgb(20, 0, 0)'       // Darkest Red (Mythic)
    ];
    

    const colors = endpoint === 'getPlayersPerSkill.php' ? skillTierColors : tierColors;

    hoverText.setAttribute('x', cx);
    hoverText.setAttribute('y', cy + 40);
    hoverText.setAttribute('font-size', '18');
    hoverText.setAttribute('fill', '#333');
    hoverText.setAttribute('font-family', 'Roboto');
    hoverText.setAttribute('text-anchor', 'middle');
    hoverText.style.opacity = 0;

    filteredRankData.forEach((rank, index) => {
        const percentage = totalPlayers ? rank.amount / totalPlayers : 0;
        if (percentage === 0) return;

        const angle = percentage * 360;
        const endAngle = startAngle + angle;
        const largeArcFlag = angle > 180 ? 1 : 0;

        const x1 = cx + radiusInner * Math.cos((Math.PI / 180) * startAngle);
        const y1 = cy + radiusInner * Math.sin((Math.PI / 180) * startAngle);
        const x2 = cx + radiusInner * Math.cos((Math.PI / 180) * endAngle);
        const y2 = cy + radiusInner * Math.sin((Math.PI / 180) * endAngle);
        const x3 = cx + radiusOuter * Math.cos((Math.PI / 180) * endAngle);
        const y3 = cy + radiusOuter * Math.sin((Math.PI / 180) * endAngle);
        const x4 = cx + radiusOuter * Math.cos((Math.PI / 180) * startAngle);
        const y4 = cy + radiusOuter * Math.sin((Math.PI / 180) * startAngle);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute(
            'd',
            `M${x1},${y1} A${radiusInner},${radiusInner} 0 ${largeArcFlag},1 ${x2},${y2} L${x3},${y3} A${radiusOuter},${radiusOuter} 0 ${largeArcFlag},0 ${x4},${y4} Z`
        );
        path.setAttribute('class', `segment`);
        path.setAttribute('fill', colors[index % colors.length]);
        path.style.opacity = 0;
        ringsContainer.appendChild(path);

        path.addEventListener('mouseover', () => {
            hoverText.textContent = t("playersInTier", { amount: rank.amount, tier: rank.tier });
            hoverText.style.opacity = 1;
        });

        path.addEventListener('mouseout', () => {
            hoverText.style.opacity = 0;
        });

        const midAngle = startAngle + angle / 2;
        const lineStartX = cx + radiusOuter * Math.cos((Math.PI / 180) * midAngle);
        const lineStartY = cy + radiusOuter * Math.sin((Math.PI / 180) * midAngle);
        const lineEndX = cx + (radiusOuter + 20) * Math.cos((Math.PI / 180) * midAngle);
        const lineEndY = cy + (radiusOuter + 20) * Math.sin((Math.PI / 180) * midAngle);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', lineStartX);
        line.setAttribute('y1', lineStartY);
        line.setAttribute('x2', lineEndX);
        line.setAttribute('y2', lineEndY);
        line.setAttribute('stroke', '#333');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('class', 'label-line');
        line.style.opacity = 0;
        linesContainer.appendChild(line);

        const textX = cx + (radiusOuter + 50) * Math.cos((Math.PI / 180) * midAngle);
        const textY = cy + (radiusOuter + 50) * Math.sin((Math.PI / 180) * midAngle);

        const textTier = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textTier.setAttribute('x', textX);
        textTier.setAttribute('y', textY - 10);
        textTier.setAttribute('font-size', '16');
        textTier.setAttribute('fill', '#333');
        textTier.setAttribute('font-family', 'Roboto');
        textTier.setAttribute('font-weight', 'bold');
        textTier.setAttribute('text-anchor', 'middle');
        textTier.setAttribute('class', 'label-text');
        textTier.style.opacity = 0;
        textTier.textContent = rank.tier.toUpperCase();
        figuresContainer.appendChild(textTier);

        const textPercentage = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textPercentage.setAttribute('x', textX);
        textPercentage.setAttribute('y', textY + 10);
        textPercentage.setAttribute('font-size', '16');
        textPercentage.setAttribute('fill', '#333');
        textPercentage.setAttribute('font-family', 'Roboto');
        textPercentage.setAttribute('font-weight', 'bold');
        textPercentage.setAttribute('text-anchor', 'middle');
        textPercentage.setAttribute('class', 'label-percentage');
        textPercentage.style.opacity = 0;
        textPercentage.textContent = `${(percentage * 100).toFixed(2)}%`;
        figuresContainer.appendChild(textPercentage);

        startAngle = endAngle;
    });
    function animateSegments() {
        const paths = document.querySelectorAll(".segment");
        paths.forEach((path, index) => {
            gsap.fromTo(
                path,
                { opacity: 0 },
                { opacity: 1, duration: 2, ease: "power2.inOut", delay: index * 0.2 }
            );
        });
    }

    function animateLabelsAndLines() {
        const lines = document.querySelectorAll(".label-line");
        const labels = document.querySelectorAll(".label-text, .label-percentage");

        lines.forEach((line, index) => {
            gsap.fromTo(
                line,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power2.out", delay: index * 0.1 }
            );
        });

        labels.forEach((label, index) => {
            gsap.fromTo(
                label,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: lines.length * 0.1 + index * 0.1 }
            );
        });
    }

    setTimeout(() => {
        animateSegments();
        animateLabelsAndLines();
    }, 1400);
}

document.getElementById('rankSelect').addEventListener('change', async (event) => {
    const selectedValue = event.target.value;
    let endpoint;

    if (selectedValue === 'communityRanks') {
        endpoint = 'getPlayersPerTier.php';
    } else if (selectedValue === 'normalRanks') {
        endpoint = 'getPlayersPerSkill.php';
    } else {
        console.error('Valeur non valide dans le sélecteur');
        return;
    }

    await generateSVG(endpoint);
});
generateSVG('getPlayersPerSkill.php');

window.addEventListener("DOMContentLoaded", () => {
    const paths = document.querySelectorAll("svg path");
    const backgroundCircle = document.querySelector(".background-circle");
    const innerCircle = document.querySelector(".inner-circle");

    gsap.set(backgroundCircle, {
        transformOrigin: "center center",
        rotation: -90,
    });
    gsap.set(innerCircle, {
        transformOrigin: "center center",
        rotation: -90,
    });

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
});

//Bar chart
document.addEventListener("DOMContentLoaded", async () => {
    await loadTranslations();
    const response = await fetch('api/graphs/getMapsPerDifficulty.php');
    const mapData = await response.json();

    const difficulties = mapData.map(item => t(`${item.difficulty.toLowerCase()}`));
    const amounts = mapData.map(item => item.amount);

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
            labels: difficulties,
            datasets: [{
                label: t("mapDifficultyDistribution"),
                data: amounts,
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
                        text: t("amountOfMaps"),
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
                        text: t("difficultyLevel"),
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
                            return t("mapsTooltip", { count: context.raw });
                        }
                    }
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
                    label: t("popularCreators"),
                    data: chartData,
                    backgroundColor: colors.slice(0, chartData.length),
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 3000,
                    easing: 'easeOutQuart'
                },
                scales: {
                    x: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: t("mapAmountLogScale"),
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
                            text: t("averageQuality"),
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
                                const creator = creators[context.dataIndex];
                                const mapCount = context.raw.x;
                                return t("tooltipLabel", {
                                    creator: creator,
                                    mapCount: mapCount,
                                    quality: roundedQuality
                                });
                            }
                        }
                    }
                }        
            }
        });
    }

    fetch('api/graphs/popularCreators.php')
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

    const difficultyColors = {
        "Easy": "rgba(10, 209, 0, 0.6)",
        "Medium": "rgba(255, 229, 0, 0.6)",
        "Hard": "rgba(255, 164, 0, 0.6)",
        "Very Hard": "rgba(255, 89, 0, 0.6)",
        "Extreme": "rgba(255, 0, 0, 0.6)",
        "Hell": "rgba(210, 0, 0, 0.6)"
    };

    function populateDifficultyOptions(difficulties) {
        const difficultySelect = document.getElementById("difficultySelect");
        difficultySelect.innerHTML = "";

        difficulties.forEach(difficulty => {
            const option = document.createElement("option");
            option.value = difficulty;
            option.textContent = t(`${difficulty.toLowerCase()}`) || difficulty;
            difficultySelect.appendChild(option);
        });
    }

    function updateChart(difficulty, data) {
        const mapCodes = data.map(item => item.map_code);
        const mapCompletions = data.map(item => item.completions);
        const mapQuality = data.map(item => parseFloat(item.quality));

        const bubbleData = mapCodes.map((mapCode, index) => ({
            x: mapCode,
            y: mapCompletions[index],
            r: mapQuality[index] * 2
        }));

        const bubbleColor = difficultyColors[difficulty] || "rgba(54, 162, 235, 0.6)";

        if (mostPlayedMapsChart) {
            mostPlayedMapsChart.destroy();
        }

        mostPlayedMapsChart = new Chart(ctx, {
            type: "bubble",
            data: {
                datasets: [{
                    label: t("topMapsFor", { difficulty: t(`${difficulty.toLowerCase()}`) }),
                    data: bubbleData,
                    backgroundColor: bubbleColor,
                    borderColor: "rgba(128, 128, 128, 0.6)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 2000,
                    easing: 'easeInQuad'
                },
                scales: {
                    x: {
                        type: 'category',
                        labels: mapCodes,
                        title: {
                            display: true,
                            text: t("mapCodes"),
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
                            text: t("completions"),
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
                                return t("completionsTooltip", {
                                    map: context.raw.x,
                                    completions: context.raw.y,
                                    quality: mapQuality[context.dataIndex].toFixed(2)
                                });
                            }
                        }
                    }
                }
            }
        });
    }

    function fetchDifficulties() {
        fetch("api/graphs/popularMaps.php")
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const difficulties = [...new Set(data.map(item => item.difficulty))];
                    populateDifficultyOptions(difficulties);
                    updateChartData();
                } else if (data.error) {
                    console.error('API Error:', data.error);
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(error => console.error('Error fetching difficulties:', error));
    }

    function updateChartData() {
        const difficulty = document.getElementById("difficultySelect").value;

        fetch("api/graphs/popularMaps.php")
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

    document.getElementById("difficultySelect").addEventListener("change", updateChartData);

    fetchDifficulties();
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