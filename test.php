<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map Success Gauge</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-chart-gauge@3.0.0"></script>
</head>
<body>
    <h2>Map Success Gauge</h2>
    <canvas id="mapSuccessGauge" width="400" height="400"></canvas>

    <script>
        const map_quality = 5;
        const map_completions = 500;

        const poids1 = 0.6;
        const poids2 = 0.4;

        const max_completions = 1000;
        const normalized_completions = (map_completions / max_completions) * 6;

        const composite_score = (map_quality * poids1) + (normalized_completions * poids2);

        const ctx = document.getElementById('mapSuccessGauge').getContext('2d');
        new Chart(ctx, {
            type: 'gauge',
            data: {
                datasets: [{
                    value: composite_score,
                    minValue: 0,
                    data: [2, 4, 6, 8, 10], // Gauge scale steps
                    backgroundColor: ['#FF0000', '#FFA500', '#FFFF00', '#ADFF2F', '#00FF00']
                }]
            },
            options: {
                responsive: true,
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                },
                needle: {
                    radiusPercentage: 2,
                    widthPercentage: 3.2,
                    lengthPercentage: 80,
                    color: 'black'
                },
                valueLabel: {
                    display: true,
                    formatter: (value) => `Success: ${value.toFixed(2)}`
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    </script>
</body>
</html>
