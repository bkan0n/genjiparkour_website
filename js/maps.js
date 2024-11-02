const filterOptions = {
    mapSearch: [
        { id: 'map_name', label: 'Map Name' },
        { id: 'map_code', label: 'Map Code' },
        { id: 'difficulty', label: 'Map Difficulty' },
        { id: 'creator', label: 'Map Creator' },
        { id: 'only_playtest', label: 'Only Playtest' },
        { id: 'only_maps_with_medals', label: 'Only Medals' },
    ],
    completions: [{ id: 'map_code', label: 'Map Code' }],
    guide: [{ id: 'map_code', label: 'Map Code' }],
    personalRecords: [{ id: 'player_name', label: 'Player Name' }]
};

const filters = {};
const selectedFilters = [];
let currentSection = "";
let currentPage = 1;
const pageSize = 25;
let totalPages = 1;
let hideTimeout;

// Cacher le conteneur filtre par défaut
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("filtersContainer").style.display = "none";
});

function showFilterOptions() {
    clearTimeout(hideTimeout);
    const filterOptionsContainer = document.getElementById("filterOptions");
    filterOptionsContainer.innerHTML = "";

    filterOptions[currentSection].forEach(filter => {
        const filterButton = document.createElement("button");
        filterButton.textContent = filter.label;
        filterButton.onclick = () => addFilter(filter.id, filter.label);
        filterOptionsContainer.appendChild(filterButton);
    });

    filterOptionsContainer.style.display = "block";
}

document.getElementById("filterOptions").addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(hideFilterOptions, 100);
});
document.getElementById("filterOptions").addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
});
document.getElementById("addFilterBtn").addEventListener("mouseenter", showFilterOptions);
document.getElementById("addFilterBtn").addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(hideFilterOptions, 100);
});

function hideFilterOptions() {
    document.getElementById("filterOptions").style.display = "none";
}

function selectSection(sectionId) {
    currentSection = sectionId;
    clearFilters();
    currentPage = 1;
    document.getElementById("filterActions").style.display = "flex";

    document.getElementById("selectedMode").style.display = "none";

    document.querySelectorAll('.tab-buttons button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`${sectionId}Btn`).classList.add('active');

    document.getElementById("filterActions").style.display = "flex";
}

const mechanicsOptions = [
    "Wallclimb", "Multi Climb", "Bhop", "Create Bhop", "Triple Jump", 
    "Stall", "Slide", "Dash", "Ultimate", "Save Climb", "Edge Climb", 
    "High Edge", "Distance Climb", "Crouch Climb", "Emotesave Bhop", 
    "Deathsave Bhop", "Bhop First", "Dash Start", "Double Jump"
];

function addFilter(filterId, filterLabel) {
    if (!selectedFilters.includes(filterId)) {
        selectedFilters.push(filterId);

        const filterContainer = document.getElementById("filtersContainer");
        const filterElement = document.createElement("div");
        filterElement.classList.add("filter");
        filterElement.dataset.filterId = filterId;
        filterElement.style.display = "flex";
        filterElement.style.alignItems = "center";
        filterElement.style.position = "relative";

        let filterInput;

        if (filterId === "only_playtest" || filterId === "only_maps_with_medals") {
            filterInput = document.createElement("select");
            filterInput.innerHTML = `
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
            `;
            filterElement.appendChild(filterInput);
        } else if (filterId === "mechanics") {
            const dropdown = document.createElement("div");
            dropdown.classList.add("dropdown");

            const button = document.createElement("button");
            button.textContent = "Select Mechanics";
            button.classList.add("dropdown-toggle");
            button.onclick = (e) => {
                e.stopPropagation();
                dropdown.classList.toggle("show");
            };

            const checkboxContainer = document.createElement("div");
            checkboxContainer.classList.add("dropdown-content");

            mechanicsOptions.forEach(mechanic => {
                const label = document.createElement("label");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = mechanic;
                checkbox.name = "mechanics";

                label.appendChild(checkbox);
                label.append(` ${mechanic}`);
                checkboxContainer.appendChild(label);

                checkbox.addEventListener("change", updateMechanicsFilter);
            });

            dropdown.appendChild(button);
            dropdown.appendChild(checkboxContainer);
            filterElement.appendChild(dropdown);

        } else if (filterId === "difficulty") {
            filterInput = document.createElement("select");
            filterInput.innerHTML = `
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Very Hard">Very Hard</option>
                <option value="Extreme">Extreme</option>
                <option value="Hell">Hell</option>
            `;
            filterElement.appendChild(filterInput);
        } else if (filterId === "map_name") {
            filterInput = document.createElement("input");
            filterInput.type = "text";
            filterInput.placeholder = filterLabel;
            filterInput.addEventListener('input', showSuggestions);
            filterElement.appendChild(filterInput);

            // Conteneur pour les suggestions
            const suggestionsContainer = document.createElement("div");
            suggestionsContainer.classList.add("suggestions", "hidden");
            suggestionsContainer.id = "suggestionsContainer";
            filterElement.appendChild(suggestionsContainer);
        } else {
            filterInput = document.createElement("input");
            filterInput.type = "text";
            filterInput.placeholder = filterLabel;
            filterElement.appendChild(filterInput);
        }

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-filter-btn");
        removeButton.textContent = "X";
        removeButton.style.marginLeft = "8px";
        removeButton.style.cursor = "pointer";
        removeButton.onclick = (e) => {
            e.stopPropagation();
            removeFilter(filterId, filterElement);
        };

        filterElement.appendChild(removeButton);
        filterContainer.appendChild(filterElement);
        
        // Afficher le conteneur de filtres
        filterContainer.style.display = "flex";
        hideFilterOptions();
    }
}

function updateMechanicsFilter() {
    const selectedMechanics = [];
    document.querySelectorAll("input[name='mechanics']:checked").forEach(checkbox => {
        selectedMechanics.push(checkbox.value);
    });
    filters["map_mechanics"] = selectedMechanics;
}

document.addEventListener("click", function (event) {
    if (!event.target.matches(".dropdown-toggle")) {
        document.querySelectorAll(".styled-dropdown-content").forEach(content => {
            content.classList.remove("show");
        });
    }
});

const mapNames = [
    "Ayutthaya", "Black Forest", "Blizzard World", "Busan", "Castillo", "Chateau Guillard",
    "Circuit Royal", "Colosseo", "Dorado", "Ecopoint: Antarctica", "Eichenwalde", "Esperanca",
    "Hanamura", "Havana", "Hollywood", "Horizon Lunar Colony", "Ilios", "Junkertown",
    "Kanezaka", "King's Row", "Lijiang Tower", "Malevento", "Midtown", "Necropolis",
    "Nepal", "New Queen Street", "Numbani", "Oasis", "Paraiso", "Paris", "Petra",
    "Practice Range", "Rialto", "Route 66", "Temple of Anubis", "Volskaya Industries",
    "Watchpoint: Gibraltar", "Workshop Chamber", "Workshop Expanse", "Workshop Green Screen",
    "Workshop Island", "Framework", "Tools", "Shambali", "Chateau Guillard (Halloween)",
    "Eichenwalde (Halloween)", "Hollywood (Halloween)", "Black Forest (Winter)",
    "Blizzard World (Winter)", "Ecopoint: Antarctica (Winter)", "Hanamura (Winter)",
    "King's Row (Winter)", "Busan (Lunar New Year)", "Lijiang Tower (Lunar New Year)",
    "Antarctic Peninsula", "Suravasa", "New Junk City", "Samoa", "Hanaoka",
    "Runasapi", "Throne of Anubis"
];

function showSuggestions(event) {
    const input = event.target;
    const filterValue = input.value.toLowerCase();
    const suggestionsContainer = document.getElementById("suggestionsContainer"); // ID conteneur pour suggestion

    suggestionsContainer.innerHTML = "";

    if (filterValue.length < 3) {
        suggestionsContainer.style.display = "none"; // Masquer suggestions
        return;
    }

    const filteredMapNames = mapNames.filter(name => name.toLowerCase().includes(filterValue));

    filteredMapNames.forEach(name => {
        const suggestion = document.createElement("div");
        suggestion.textContent = name;
        suggestion.classList.add("suggestion-item");
        suggestion.onclick = (e) => {
            e.stopPropagation();
            input.value = name; // MAJ input
            suggestionsContainer.style.display = "none"; // Masquer suggestions après selec
        };
        suggestionsContainer.appendChild(suggestion);
    });

    suggestionsContainer.style.display = filteredMapNames.length ? "block" : "none"; // Montrer ou masquer en fct résultats
}

function removeFilter(filterId, filterElement) {
    const index = selectedFilters.indexOf(filterId);
    if (index !== -1) {
        selectedFilters.splice(index, 1);
        filterElement.remove();
    }
}

let searchPerformed = false;

function clearFilters() {
    selectedFilters.length = 0;
    document.getElementById("filtersContainer").innerHTML = "";
    const resultsContainer = document.querySelector(".results-container");
    if (resultsContainer) {
        resultsContainer.innerHTML = searchPerformed ? "" : ""; //Effacer le conteneur
    }
    Object.keys(filters).forEach(key => delete filters[key]);

    // Hide pagination
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = ""; 
}

const resultsContainer = document.getElementById("resultsContainer");

function applyFilters() {
    const filters = {};
    document.querySelectorAll(".filter").forEach(filter => {
        const filterId = filter.dataset.filterId;
        const input = filter.querySelector("input, select");

        if (input && input.value) {
            filters[filterId] = input.value;
        }
    });

    filters.page_size = pageSize;
    filters.page_number = currentPage;

    fetch('api/map_search_api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...filters, count_only: true })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Total Results:", data.total_results);
        totalResults = data.total_results;
        totalPages = Math.ceil(totalResults / pageSize);

        return fetch('api/map_search_api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filters)
        });
    })
    .then(response => response.json())
    .then(data => {
        // Conversion de l'objet en tableau
        const results = Object.values(data).filter(item => typeof item === "object" && !item.pagination);
        console.log("Results Data:", results); // Vérif données
        displayResults(results);
        renderPaginationButtons();
    })
    .catch(error => console.error("Error:", error));
}

function displayResults(data) {
    const resultsContainer = document.getElementById("resultsContainer");

    if (data.error) {
        resultsContainer.innerHTML = `<p>${data.error}</p>`;
    } else if (Array.isArray(data) && data.length > 0) {
        // Filtres undefined
        const filteredData = data.filter(result => result.map_name !== undefined);

        // Fonction quality
        const getStars = (quality) => {
            let stars = '';
            const starCount = Math.floor(quality);
            for (let i = 0; i < starCount; i++) {
                stars += '⭐';
            }
            return stars || 'N/A';
        };

        resultsContainer.innerHTML = `
            <table class="results-table">
                <thead>
                    <tr>
                        <th class="mapCode">Code</th>
                        <th class="mapName">Name</th>
                        <th class="mapType">Type</th>
                        <th class="mapCreator">Creator</th>
                        <th class="mapDifficulty">Difficulty</th>
                        <th class="mapQuality">Quality</th>
                        <th class="mapGold">Gold</th>
                        <th class="mapSilver">Silver</th>
                        <th class="mapBronze">Bronze</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredData.map(result => `
                        <tr>
                            <td>${result.map_code}</td>
                            <td>${result.map_name}</td>
                            <td>${Array.isArray(result.map_type) ? result.map_type.flat().join(", ") : "N/A"}</td>
                            <td>${result.creators ? result.creators.join(", ") : "N/A"}</td>
                            <td>${result.difficulty || "N/A"}</td>
                            <td>${getStars(result.quality) || "N/A"}</td>
                            <td>${result.gold || "N/A"}</td>
                            <td>${result.silver || "N/A"}</td>
                            <td>${result.bronze || "N/A"}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>`;
    } else {
        resultsContainer.innerHTML = "<p>No results found.</p>";
    }
}


function renderPaginationButtons() {
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = "";

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

function changePage(pageNumber) {
    currentPage = pageNumber;
    applyFilters();
}

document.getElementById("applyFiltersBtn").addEventListener("click", applyFilters);
