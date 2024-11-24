let currentPage = 1;
let totalPages = 1;
let isSorting = false;
const skillRankOrder = [
    "God",
    "Grandmaster",
    "Master",
    "Pro",
    "Skilled",
    "Jumper",
    "Ninja"
];
let activeFilters = {
    sort_column: 'xp_amount',
    sort_direction: 'desc',
    rank: '',
    search: ''
};

const navbar = document.querySelector('nav');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('shrink');
    } else {
        navbar.classList.remove('shrink');
    }
});

function reapplySortEvents() {
    document.querySelectorAll('.sort-btn').forEach(button => {
        button.removeEventListener('click', handleSortClick);
        button.addEventListener('click', handleSortClick);
    });
}

function handleSortClick(event) {
    const button = event.currentTarget;
    const column = button.getAttribute('data-column');
    sortTableAjax(event, column, button);
}


document.addEventListener("DOMContentLoaded", function () {
    const leaderboardContainer = document.getElementById('leaderboard');
    const paginationContainer = document.querySelector('.pagination-container');

    if (!leaderboardContainer) {
        console.error("L'élément avec l'ID 'leaderboard' est introuvable.");
        return;
    }

    if (!paginationContainer) {
        console.error("Le conteneur de pagination est introuvable.");
        return;
    }

    leaderboardContainer.innerHTML = `
        <thead>
            <div class="thead-container">
                <tr class="thead-wrapper">
                    <th class="col-nickname">
                        Nickname
                        <span class="vertical-bar"></span>
                        <button id="sort-nickname" class="sort-btn" data-column="nickname" data-order="asc" onclick="animation(this)">
                            <div class="stroke stroke1"></div>
                            <div class="stroke stroke2"></div>
                            <div class="stroke stroke3"></div>
                            <div class="tap-circle"></div>
                        </button>
                    </th>
                    <th class="col-xp">
                        XP
                        <span class="vertical-bar"></span>
                        <button id="sort-xp" class="sort-btn" data-column="xp_amount" data-order="desc" onclick="animation(this)">
                            <div class="stroke stroke1"></div>
                            <div class="stroke stroke2"></div>
                            <div class="stroke stroke3"></div>
                            <div class="tap-circle"></div>
                        </button>
                    </th>
                    <th class="col-tier">
                        Tier
                        <span class="vertical-bar"></span>
                        <button id="sort-tier" class="sort-btn" data-column="xp_amount" data-order="asc" onclick="animation(this)">
                            <div class="stroke stroke1"></div>
                            <div class="stroke stroke2"></div>
                            <div class="stroke stroke3"></div>
                            <div class="tap-circle"></div>
                        </button>
                    </th>
                    <th class="col-skill-rank">
                        Skill Rank
                        <span class="vertical-bar"></span>
                        <button id="sort-skill-rank" class="sort-btn" data-column="skill_rank" data-order="asc" onclick="animation(this)">
                            <div class="stroke stroke1"></div>
                            <div class="stroke stroke2"></div>
                            <div class="stroke stroke3"></div>
                            <div class="tap-circle"></div>
                        </button>
                    </th>
                    <th class="col-wr">
                        World Records
                        <span class="vertical-bar"></span>
                        <button id="sort-wr" class="sort-btn" data-column="wr_count" data-order="asc" onclick="animation(this)">
                            <div class="stroke stroke1"></div>
                            <div class="stroke stroke2"></div>
                            <div class="stroke stroke3"></div>
                            <div class="tap-circle"></div>
                        </button>
                    </th>
                    <th class="col-maps">
                        Maps Made
                        <span class="vertical-bar"></span>
                        <button id="sort-maps" class="sort-btn" data-column="map_count" data-order="asc" onclick="animation(this)">
                            <div class="stroke stroke1"></div>
                            <div class="stroke stroke2"></div>
                            <div class="stroke stroke3"></div>
                            <div class="tap-circle"></div>
                        </button>
                    </th>
                    <th class="col-playtest">
                        Playtest Votes
                        <span class="vertical-bar"></span>
                        <button id="sort-playtest" class="sort-btn" data-column="playtest_count" data-order="asc" onclick="animation(this)">
                            <div class="stroke stroke1"></div>
                            <div class="stroke stroke2"></div>
                            <div class="stroke stroke3"></div>
                            <div class="tap-circle"></div>
                        </button>
                    </th>
                    <th class="col-discord-tag">
                        Discord Tag
                        <span class="vertical-bar"></span>
                        <button id="sort-discord-tag" class="sort-btn" data-column="discord_tag" data-order="asc" onclick="animation(this)">
                            <div class="stroke stroke1"></div>
                            <div class="stroke stroke2"></div>
                            <div class="stroke stroke3"></div>
                            <div class="tap-circle"></div>
                        </button>
                    </th>
                </tr>
            </div>
        </thead>
        <tbody></tbody>
    `;

    updateLeaderboard();
});

async function fetchLeaderboard(params = {}) {
    const url = new URL('./api/getFullLeaderboard.php', window.location.href);

    Object.keys(params).forEach(key => {
        if (params[key]) url.searchParams.append(key, params[key]);
    });

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return [];
    }
}

async function updateLeaderboard(params = {}) {
    const defaults = {
        sort_column: 'xp_amount',
        sort_direction: 'desc',
        page_size: 25,
        page_number: currentPage
    };

    const combinedParams = { ...defaults, ...params };

    console.log("Params combinés :", combinedParams);

    const data = await fetchLeaderboard(combinedParams);

    if (!Array.isArray(data) || data.length === 0) {
        document.querySelector("#leaderboard tbody").innerHTML = `
            <tr><td colspan="8">No data available</td></tr>`;
        return;
    }

    if (combinedParams.sort_column === 'skill_rank') {
        console.log("Tri Skill Rank déclenché !");
        renderLeaderboard(sortBySkillRank(data, combinedParams.sort_direction));
    } else {
        console.log("Render normal");
        renderLeaderboard(data);
    }

    renderPagination(data[0]?.total_results || 0, combinedParams.page_number, combinedParams.page_size);

    reapplySortEvents();
    reapplyColumnVisibility();
}

function renderLeaderboard(data) {
    const leaderboardBody = document.querySelector('#leaderboard tbody');
    leaderboardBody.innerHTML = '';

    data.forEach(player => {
        const tr = document.createElement('tr');
        const skillRankClass = getSkillRankClass(player.skill_rank);
        const discordTag = player.discord_tag === "Unknown Username" ? 'N/A' : (player.discord_tag || 'N/A');
        tr.innerHTML = `
            <td class="col-nickname">${player.nickname || 'N/A'}</td>
            <td class="col-xp">${player.xp_amount || 0}</td>
            <td class="col-tier">${player.tier_name || 'N/A'}</td>
            <td class="col-skill-rank ${skillRankClass}">${player.skill_rank || 'N/A'}</td>
            <td class="col-wr">${player.wr_count || 0}</td>
            <td class="col-maps">${player.map_count || 0}</td>
            <td class="col-playtest">${player.playtest_count || 0}</td>
            <td class="col-discord-tag">${discordTag}</td>
        `;
        leaderboardBody.appendChild(tr);
    });
}

function getSkillRankClass(skillRank) {
    switch (skillRank?.toLowerCase()) {
        case 'ninja': return 'rank-ninja';
        case 'jumper': return 'rank-jumper';
        case 'skilled': return 'rank-skilled';
        case 'pro': return 'rank-pro';
        case 'master': return 'rank-master';
        case 'grandmaster': return 'rank-grandmaster';
        case 'god': return 'rank-god';
        default: return '';
    }
}

function renderPagination(totalResults, currentPage, resultsPerPage) {
    const paginationContainer = document.querySelector(".pagination-container");
    paginationContainer.innerHTML = "";

    totalPages = Math.ceil(totalResults / resultsPerPage);

    if (totalPages <= 1) {
        return;
    }

    const firstButton = document.createElement("button");
    firstButton.textContent = "« First";
    firstButton.disabled = currentPage === 1;
    firstButton.addEventListener("click", () => changePage(1));
    paginationContainer.appendChild(firstButton);

    const prevButton = document.createElement("button");
    prevButton.textContent = "‹ Prev";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => changePage(currentPage - 1));
    paginationContainer.appendChild(prevButton);

    const pageIndicator = document.createElement("span");
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    pageIndicator.classList.add("page-indicator");
    paginationContainer.appendChild(pageIndicator);

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next ›";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => changePage(currentPage + 1));
    paginationContainer.appendChild(nextButton);

    const lastButton = document.createElement("button");
    lastButton.textContent = "Last »";
    lastButton.disabled = currentPage === totalPages;
    lastButton.addEventListener("click", () => changePage(totalPages));
    paginationContainer.appendChild(lastButton);
}

async function changePage(pageNumber) {
    currentPage = pageNumber;
    await updateLeaderboard({ page_number: currentPage });
}

function applyColumnVisibility(column, isVisible) {
    const header = document.querySelector(`th.col-${column}`);
    if (header) {
        header.style.display = isVisible ? '' : 'none';
    }

    const rows = document.querySelectorAll('#leaderboard tbody tr');
    rows.forEach(row => {
        const cell = row.querySelector(`td.col-${column}`);
        if (cell) {
            cell.style.display = isVisible ? '' : 'none';
        }
    });

    applyRoundedCorners();
}

function reapplyColumnVisibility() {
    const checkboxes = document.querySelectorAll('.toggle-col');
    checkboxes.forEach(checkbox => {
        const column = checkbox.getAttribute('data-col');
        const isVisible = checkbox.checked;
        applyColumnVisibility(column, isVisible);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchByTrigger = document.getElementById('search-by-trigger');
    const searchByOptions = document.querySelectorAll('#search-by-options .custom-option');
    const selectedSearchBy = document.getElementById('selected-search-by');

    selectedSearchBy.value = 'player_both';

    searchByOptions.forEach(option => {
        option.addEventListener('click', function () {
            const selectedValue = this.getAttribute('data-value');
            selectedSearchBy.value = selectedValue;
            searchByTrigger.textContent = this.textContent;
            searchInput.placeholder = `Search by ${this.textContent}...`;
        });
    });

    function updateSearchResults() {
        const searchValue = searchInput.value.trim();
        const searchByValue = selectedSearchBy.value || 'player_both';

        const params = new URLSearchParams({
            search: searchValue,
            search_by: searchByValue
        });

        fetch(`api/getFullLeaderboard.php?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    renderLeaderboard(data);
                } else {
                    document.querySelector("#leaderboard tbody").innerHTML = `
                        <tr><td colspan="8">No results found</td></tr>`;
                }
            })
            .catch(error => console.error('Erreur lors de la recherche:', error));
    }

    searchInput.addEventListener('input', updateSearchResults);

    updateSearchResults();
});

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.toggle-col');
    const urlParams = new URLSearchParams(window.location.search);

    checkboxes.forEach(checkbox => {
        const column = checkbox.getAttribute('data-col');
        let showColumn = sessionStorage.getItem(`show_${column}`);

        if (showColumn === null) {
            showColumn = urlParams.get(`show_${column}`) || '1';
            sessionStorage.setItem(`show_${column}`, showColumn);
        }

        const isVisible = showColumn === '1';
        checkbox.checked = isVisible;
        applyColumnVisibility(column, isVisible);

        checkbox.addEventListener('change', function () {
            const isVisible = this.checked;
            applyColumnVisibility(column, isVisible);
            sessionStorage.setItem(`show_${column}`, isVisible ? '1' : '0');
        });
    });

    updateLeaderboard();
});

function applyFilters() {
    const sortValue = document.getElementById('selected-sort').value;
    const rankValue = document.getElementById('selected-rank').value;

    const params = {
        sort_column: sortValue,
        skill_rank: rankValue,
        page_number: 1
    };

    updateLeaderboard(params);
}

document.addEventListener("DOMContentLoaded", function () {
    const sortTrigger = document.getElementById('sort-trigger');
    const rankTrigger = document.getElementById('rank-trigger');
    const sortOptions = document.querySelectorAll('#sort-select .custom-option');
    const rankOptions = document.querySelectorAll('#rank-select .custom-option');

    sortOptions.forEach(option => {
        option.addEventListener('click', function () {
            const sortValue = this.getAttribute('data-value');
            sortTrigger.textContent = this.textContent;
            activeFilters.sort = sortValue;
            document.getElementById('selected-sort').value = this.getAttribute('data-value');
            applyFilters(activeFilters);
        });
    });

    rankOptions.forEach(option => {
        option.addEventListener('click', function () {
            const rankValue = this.getAttribute('data-value');
            rankTrigger.textContent = this.textContent;
            activeFilters.rank = rankValue;
            document.getElementById('selected-rank').value = this.getAttribute('data-value');
            applyFilters(activeFilters);
        });
    });

    updateLeaderboard(activeFilters);
});

function animation(button) {
    button.classList.add('disable-click');

    const stroke1 = button.querySelector('.stroke1');
    const stroke2 = button.querySelector('.stroke2');
    const stroke3 = button.querySelector('.stroke3');

    stroke1.classList.toggle("resize1");
    stroke2.classList.toggle("bounce");
    stroke3.classList.toggle("resize2");

    setTimeout(() => {
        button.classList.remove('disable-click');
    }, 1000);
}

document.querySelectorAll('.sort-btn').forEach(button => {
    button.addEventListener('click', function (event) {
        console.log(`Bouton cliqué : ${button.id}`);
        const column = button.getAttribute('data-column');
        sortTableAjax(event, column, button);
    });
});


function sortTableAjax(event, column, button) {
    event.preventDefault();

    if (isSorting) {
        console.warn("Un tri est déjà en cours.");
        return;
    }

    isSorting = true;
    button.disabled = true;

    let currentOrder = button.getAttribute('data-order');
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    button.setAttribute('data-order', newOrder);

    const params = {
        sort_column: column,
        sort_direction: newOrder,
        page_number: currentPage,
    };

    console.log(`Tri sur la colonne "${column}" avec ordre "${newOrder}"`);

    fetch(`api/getFullLeaderboard.php?${new URLSearchParams(params).toString()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Données récupérées :", data);
            updateLeaderboard(params);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        })
        .finally(() => {
            isSorting = false;
            button.disabled = false;
        });
}


function sortBySkillRank(data, order = 'asc') {
    console.log("Données initiales : ", data.map(item => item.skill_rank));

    const sortedData = data.sort((a, b) => {
        const rankA = skillRankOrder.indexOf(a.skill_rank.trim());
        const rankB = skillRankOrder.indexOf(b.skill_rank.trim());

        const adjustedRankA = rankA === -1 ? skillRankOrder.length : rankA;
        const adjustedRankB = rankB === -1 ? skillRankOrder.length : rankB;

        if (order === 'asc') {
            return adjustedRankA - adjustedRankB;
        } else {
            return adjustedRankB - adjustedRankA;
        }
    });

    return sortedData;
}

document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.querySelector('.reset-filters-btn');

    if (resetButton) {
        resetButton.addEventListener('click', function (event) {
            event.preventDefault();

            const searchInput = document.getElementById('search-input');
            const selectedSort = document.getElementById('selected-sort');
            const selectedRank = document.getElementById('selected-rank');

            if (searchInput) searchInput.value = '';
            if (selectedSort) selectedSort.value = 'xp_amount';
            if (selectedRank) selectedRank.value = '';

            const sortTrigger = document.getElementById('sort-trigger');
            const rankTrigger = document.getElementById('rank-trigger');

            if (sortTrigger) sortTrigger.textContent = 'Sort by';
            if (rankTrigger) rankTrigger.textContent = 'All Ranks';

            updateLeaderboard({
                sort_column: 'xp_amount',
                sort_direction: 'desc',
                page_number: 1
            });
        });
    }
});

function applyRoundedCorners() {
    const table = document.querySelector('table');
    if (!table) return;

    const theadWrapper = table.querySelector('.thead-wrapper');
    const tbody = table.querySelector('tbody');
    const lastRow = tbody.querySelector('tr:last-child');
    const visibleHeaders = Array.from(theadWrapper.querySelectorAll('th')).filter(th => th.offsetParent !== null);
    const visibleCells = lastRow ? Array.from(lastRow.querySelectorAll('td')).filter(td => td.offsetParent !== null) : [];

    // Réinitialiser les coins arrondis
    document.querySelectorAll('th, td').forEach(cell => {
        cell.style.borderRadius = '';
    });

    // Appliquer les coins arrondis au thead
    if (visibleHeaders.length > 0) {
        visibleHeaders[0].style.borderTopLeftRadius = '15px';
        visibleHeaders[visibleHeaders.length - 1].style.borderTopRightRadius = '15px';
    }

    // Appliquer les coins arrondis au tbody
    if (visibleCells.length > 0) {
        visibleCells[0].style.borderBottomLeftRadius = '15px';
        visibleCells[visibleCells.length - 1].style.borderBottomRightRadius = '15px';
    }
}

// Ajouter des écouteurs d'événements
document.addEventListener('DOMContentLoaded', applyRoundedCorners);
document.addEventListener('updateSearchResults', applyRoundedCorners);


