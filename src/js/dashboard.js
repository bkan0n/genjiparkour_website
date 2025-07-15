document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.getElementById("rankChart"), {
    type: 'doughnut',
    data: {
      labels: Object.keys(window.rankDistribution),
      datasets: [{
        data: Object.values(window.rankDistribution),
        backgroundColor: ['#fbbf24', '#f59e0b', '#ef4444', '#e11d48', '#7c3aed', '#6366f1']
      }]
    },
    options: { plugins: { legend: { position: 'bottom' } } }
  });

  new Chart(document.getElementById("difficultyChart"), {
    type: 'bar',
    data: {
      labels: Object.keys(window.difficultyCounts),
      datasets: [{
        data: Object.values(window.difficultyCounts),
        backgroundColor: ['#10b981', '#3b82f6', '#6366f1', '#e11d48', '#fbbf24', '#ef4444']
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });

  new Chart(document.getElementById("timeChart"), {
    type: 'line',
    data: {
      labels: Object.keys(window.timePlayed),
      datasets: [{
        label: 'Time Played (hrs)',
        data: Object.values(window.timePlayed),
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,0.2)',
        tension: 0.4,
        fill: true
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  new Chart(document.getElementById("popularMapsChart"), {
    type: 'bar',
    data: {
      labels: Object.keys(window.popularMaps),
      datasets: [{
        label: 'Completions',
        data: Object.values(window.popularMaps),
        backgroundColor: '#4ade80'
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });

    new Chart(document.getElementById("popularMapsChart"), {
    type: 'bar',
    data: {
      labels: window.popularMapsData.map(o => o.name),
      datasets: [{
        label: 'Completions',
        data: window.popularMapsData.map(o => o.completions),
        backgroundColor: '#4ade80'
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });

  // favorite maps (bar)
  new Chart(document.getElementById("favoriteMapsChart"), {
    type: 'bar',
    data: {
      labels: window.favoriteMapsData.map(o => o.name),
      datasets: [{
        label: 'Vos complétions',
        data: window.favoriteMapsData.map(o => o.completions),
        backgroundColor: '#6366f1'
      }]
    },
    options: { plugins:{ legend:{ display:false }}, scales: { y:{ beginAtZero: true } } }
  });

    new Chart(document.getElementById("popularMapsChart"), {
    type: 'bar',
    data: {
      labels: window.popularMapsData.map(o => o.name),
      datasets: [{
        label: 'Completions',
        data: window.popularMapsData.map(o => o.completions),
        backgroundColor: '#4ade80'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
});
