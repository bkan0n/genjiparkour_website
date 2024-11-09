const filterOptions = {
    mapSearch: [
        { id: 'map_name', label: 'Map Name' },
        { id: 'map_code', label: 'Map Code' },
        { id: 'difficulty', label: 'Map Difficulty' },
        { id: 'creator', label: 'Map Creator' },
        { id: 'mechanics', label: 'Mechanics' },
        { id: 'restrictions', label: 'Restrictions' },
        { id: 'only_playtest', label: 'Only Playtest' },
        { id: 'only_maps_with_medals', label: 'Only Medals' },
    ],
    completions: [{ id: 'map_code', label: 'Map Code' }],
    guide: [{ id: 'map_code', label: 'Map Code' }],
    personalRecords: [
        { id: 'user', label: 'Player Name' },
        { id: 'map_code', label: 'Map Code' }
    ]
};

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

const apiUrls = {
    mapSearch: 'api/map_search_api.php',
    completions: 'api/completions_api.php',
    guide: 'api/guides_api.php',
    personalRecords: 'api/personal_records_api.php'
};

const mechanicsOptions = [
    "Edge Climb", "Bhop", "Crouch Edge", "Save Climb",
    "Bhop First", "High Edge", "Distance Edge",
    "Quick Climb", "Slide", "Stall", "Dash", "Ultimate",
    "Emote Save Bhop", "Death Bhop", "Triple Jump",
    "Multi Climb", "Vertical Multi Climb", "Create Bhop", 
    "Standing Create Bhop"
];

const restrictionsOptions = [
    "Dash Start", "Triple Jump", "Emote Save Bhop ", 
    "Death Bhop", "Multi Climb", "Standing Create Bhop", 
    "Create Bhop", "Wall Climb"
];

const filters = {};
const selectedFilters = [];
let currentSection = "";
let currentPage = 1;
const pageSize = 25;
let totalPages = 1;
let hideTimeout;
const applyFiltersButton = document.getElementById("applyFiltersBtn");

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
    
    const selectedModeText = document.getElementById("selectedMode");
    const intuitiveModeText = document.getElementById("intuitiveMode");
    const addFilterMessage = document.getElementById("addFilterMessage");

    if (addFilterMessage) {
        addFilterMessage.style.display = "none";
    }

    if (intuitiveModeText) {
        intuitiveModeText.style.display = currentSection ? "block" : "none";
    }
    
    if (sectionId === 'guide') {
        if (selectedModeText) {
            selectedModeText.style.display = "none";
            intuitiveModeText.style.display = "none";
            
        }
        
        document.getElementById("filtersContainer").style.display = "flex";
        addFilter("map_code", "Map Code");
    } else {
        if (selectedModeText) {
            selectedModeText.style.display = "none";
        }
        document.getElementById("filtersContainer").style.display = "none";
    }

    document.querySelectorAll('.tab-buttons button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`${sectionId}Btn`).classList.add('active');
}

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

        const intuitiveModeText = document.getElementById("intuitiveMode");
        if (intuitiveModeText) {
            intuitiveModeText.style.display = "none";
        }

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
        } else if (filterId === "mechanics") {
            filterElement.appendChild(createDropdown("mechanics", "Select Mechanics", mechanicsOptions, updateMechanicsFilter));
        } else if (filterId === "restrictions") {
            filterElement.appendChild(createDropdown("restrictions", "Select Restrictions", restrictionsOptions, updateRestrictionsFilter));
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

function createDropdown(filterId, buttonText, options, changeHandler) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const button = document.createElement("button");
    button.textContent = buttonText;
    button.classList.add("dropdown-toggle");
    button.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    };

    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("dropdown-content");

    options.forEach(option => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = option;
        checkbox.name = filterId;

        label.appendChild(checkbox);
        label.append(` ${option}`);
        checkboxContainer.appendChild(label);

        checkbox.addEventListener("change", changeHandler);
    });

    dropdown.appendChild(button);
    dropdown.appendChild(checkboxContainer);
    return dropdown;
}

function updateMechanicsFilter() {
    const selectedMechanics = [];
    document.querySelectorAll("input[name='mechanics']:checked").forEach(checkbox => {
        selectedMechanics.push(checkbox.value);
    });
    filters["mechanics"] = selectedMechanics;
}

function updateRestrictionsFilter() {
    const selectedRestrictions = [];
    document.querySelectorAll("input[name='restrictions']:checked").forEach(checkbox => {
        selectedRestrictions.push(checkbox.value);
    });
    filters["restrictions"] = selectedRestrictions;
}

document.addEventListener("click", function (event) {
    if (!event.target.matches(".dropdown-toggle")) {
        document.querySelectorAll(".styled-dropdown-content").forEach(content => {
            content.classList.remove("show");
        });
    }
});

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

    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = ""; 
}

const resultsContainer = document.getElementById("resultsContainer");

function applyFilters() {
    const filters = {};
    document.querySelectorAll(".filter").forEach(filter => {
        const filterId = filter.dataset.filterId;
        const input = filter.querySelector("input, select");

        if (filterId === "mechanics") {
            const selectedMechanics = Array.from(document.querySelectorAll("input[name='mechanics']:checked"))
                                           .map(checkbox => checkbox.value)
                                           .sort();
            if (selectedMechanics.length > 0) {
                filters[filterId] = selectedMechanics;
            }
        } else if (filterId === "restrictions") {
            const selectedRestrictions = Array.from(document.querySelectorAll("input[name='restrictions']:checked"))
                                            .map(checkbox => checkbox.value)
                                            .sort();
            if (selectedRestrictions.length > 0) {
                filters[filterId] = selectedRestrictions;
            }
        } else if (input && input.value) {
            filters[filterId] = filterId === "map_name" ? encodeURIComponent(input.value) : input.value;
        }
    });

    if (currentSection === 'guide' && !filters.map_code) {
        document.getElementById("resultsContainer").innerHTML = `
            <p style="color: white; font-weight: bold; font-size: 18px;">
                ⚠️ Enter a map code!
            </p>`;
        return;
    }

    filters.page_size = pageSize;
    filters.page_number = currentPage;

    const apiUrl = apiUrls[currentSection];

    const intuitiveModeText = document.getElementById("intuitiveMode");
    if (intuitiveModeText) {
        intuitiveModeText.style.display = "none";
    }

    // Appel unique
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const totalResults = data.pagination?.total_results ?? "N/A";
        console.log("Total Results:", totalResults);

        totalPages = data.pagination?.total_pages || 1;

        if (currentSection === 'mapSearch') {
            displayMapSearchResults(data);
        } else if (currentSection === 'completions') {
            displayCompletionsResults(data);
        } else if (currentSection === 'guide') {
            displayGuideResults(data);
        } else if (currentSection === 'personalRecords') {
            displayPersonalRecordsResults(data);
        }
        renderPaginationButtons();
    })
    .catch(error => console.error("Fetch error:", error));
}

function displayMapSearchResults(data) {
    const resultsContainer = document.getElementById("resultsContainer");

    const results = Object.values(data).filter(item => typeof item === "object" && !item.pagination);
    const filteredResults = results.filter(result => result.map_name && result.map_name !== "N/A");

    if (filteredResults.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

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
                    <th class="mapDetails">Details</th>
                </tr>
            </thead>
            <tbody>
                ${filteredResults.map((result, index) => `
                    <tr>
                        <td>${result.map_code || "N/A"}</td>
                        <td>${result.map_name || "N/A"}</td>
                        <td>${Array.isArray(result.map_type) ? result.map_type.join(", ") : "N/A"}</td>
                        <td>${result.creators ? result.creators.join(", ") : "N/A"}</td>
                        <td>${result.difficulty || "N/A"}</td>
                        <td>${getStars(result.quality) || "N/A"}</td>
                        <td>${result.gold || "N/A"}</td>
                        <td>${result.silver || "N/A"}</td>
                        <td>${result.bronze || "N/A"}</td>
                        <td><button class="details-btn" onclick="showDetailsModal(${index})">View</button></td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    document.body.insertAdjacentHTML('beforeend', `
        <div id="detailsModalOverlay" class="modal-overlay-custom" style="display:none;">
            <div id="detailsModalBox" class="modal-box-custom">
                <span id="detailsModalClose" class="modal-close-button" onclick="closeDetailsModal()">&times;</span>
                <div id="modalDetailsContainer"></div>
            </div>
        </div>
    `);

    window.showDetailsModal = function(index) {
        const result = filteredResults[index];
        const mechanics = result.mechanics ? result.mechanics.join(", ") : "N/A";
        const restrictions = result.restrictions ? result.restrictions.join(", ") : "N/A";
        const description = result.desc || "No description available";
    
        const mapName = result.map_name ? result.map_name.toLowerCase().replace(/[()\s]/g, "") : "default";
        const bannerPath = `assets/banners/${mapName}.png`;
    
        const medals = [];
        if (result.gold && result.gold !== "N/A") {
            medals.push(`
                <div class="medal-wrapper">
                    <img src="assets/verifications/gold_wr.gif" alt="Gold Medal" class="medal-image" />
                    <span class="medal-time">${result.gold}</span>
                </div>
            `);
        }
        if (result.silver && result.silver !== "N/A") {
            medals.push(`
                <div class="medal-wrapper">
                    <img src="assets/verifications/silver_wr.gif" alt="Silver Medal" class="medal-image" />
                    <span class="medal-time">${result.silver}</span>
                </div>
            `);
        }
        if (result.bronze && result.bronze !== "N/A") {
            medals.push(`
                <div class="medal-wrapper">
                    <img src="assets/verifications/bronze_wr.gif" alt="Bronze Medal" class="medal-image" />
                    <span class="medal-time">${result.bronze}</span>
                </div>
            `);
        }
    
        const detailsContent = `
            <div id="modalContentFrame" class="modal-content-frame">
                <div id="modalLayout" class="modal-layout">
                    <div id="modalTextSection" class="modal-text-section">
                        <h2>Map Details</h2>
                        <p><strong>Code:</strong> ${result.map_code || "N/A"}</p>
                        <p><strong>Name:</strong> ${result.map_name || "N/A"}</p>
                        <p><strong>Type:</strong> ${Array.isArray(result.map_type) ? result.map_type.join(", ") : "N/A"}</p>
                        <p><strong>Creator:</strong> ${result.creators ? result.creators.join(", ") : "N/A"}</p>
                        <p><strong>Difficulty:</strong> ${result.difficulty || "N/A"}</p>
                        <p><strong>Quality:</strong> ${getStars(result.quality) || "N/A"}</p>
                        <p><strong>Mechanics:</strong> ${mechanics}</p>
                        <p><strong>Restrictions:</strong> ${restrictions}</p>
                        <p><strong>Description:</strong> ${description}</p>
                    </div>
                    <div id="modalBannerSection" class="modal-banner-section">
                        <img src="${bannerPath}" alt="${mapName} Banner" class="modal-banner-image" onerror="this.style.display='none'" />
                        <div class="medals-container">
                            ${medals.join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        document.getElementById("modalDetailsContainer").innerHTML = detailsContent;
        document.getElementById("detailsModalOverlay").style.display = "flex";
    };
    

    window.closeDetailsModal = function() {
        document.getElementById("detailsModalOverlay").style.display = "none";
    };
    document.getElementById("detailsModalOverlay").addEventListener("click", function(event) {
        if (event.target === this) {
            closeDetailsModal();
        }
    });
}


function displayPersonalRecordsResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    const dataResults = results.results || [];

    if (dataResults.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    const filteredResults = dataResults.filter(result => result.map_code && result.map_code !== "N/A");

    resultsContainer.innerHTML = `
        <table class="results-table">
            <thead>
                <tr>
                    <th class="mapCode">Code</th>
                    <th class="nickname">Nickname</th>
                    <th class="discordTag">Discord Tag</th>
                    <th class="difficulty">Difficulty</th>
                    <th class="time">Time</th>
                    <th class="medal">Medal</th>
                </tr>
            </thead>
            <tbody>
                ${filteredResults.map(result => `
                    <tr>
                        <td>${result.map_code || "N/A"}</td>
                        <td>${result.nickname || "N/A"}</td>
                        <td>${result.discord_tag || "N/A"}</td>
                        <td>${result.difficulty || "N/A"}</td>
                         <td>${result.time > 16000 ? "Completion" : result.time}</td>
                        <td>${result.medal || "N/A"}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>`;
}

function displayCompletionsResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    const dataResults = results.results || [];

    if (dataResults.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    resultsContainer.innerHTML = `
        <table class="results-table">
            <thead>
                <tr>
                    <th class="mapCode">Map Code</th>
                    <th class="nickname">Player Name</th>
                    <th class="discordTag">Discord Tag</th>
                    <th class="time">Time</th>
                    <th class="medal">Medal</th>
                    <th class="video">Video</th>
                </tr>
            </thead>
            <tbody>
                ${dataResults.map(result => `
                    <tr>
                        <td>${result.map_code || "N/A"}</td>
                        <td>${result.nickname || "N/A"}</td>
                        <td>${result.discord_tag || "N/A"}</td>
                        <td>${result.time > 16000 ? "Completion" : result.time}</td>
                        <td>${result.medal || "N/A"}</td>
                        <td>${result.video ? `<a href="${result.video}" target="_blank" class="white-link">Watch</a>` : "N/A"}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>`;
}



function displayGuideResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    const dataResults = Array.isArray(results.results) ? results.results : [];

    if (dataResults.length === 0) {
        resultsContainer.innerHTML = "<p>No guides found.</p>";
        return;
    }

    resultsContainer.innerHTML = `
        <table class="results-table">
            <thead>
                <tr>
                    <th class="mapCode">Map Code</th>
                    <th class="guideVideo">Guide Video</th>
                </tr>
            </thead>
            <tbody>
                ${dataResults.map(result => {
                    let linkText = "Watch Guide";
                    if (result.url.includes("youtube.com") || result.url.includes("youtu.be")) {
                        linkText = "Watch on YouTube";
                    } else if (result.url.includes("bilibili.com")) {
                        linkText = "Watch on Bilibili";
                    }

                    return `
                        <tr>
                            <td>${result.map_code || "N/A"}</td>
                            <td>
                                ${result.url ? `<a href="${result.url}" target="_blank" class="white-link">${linkText}</a>` : "N/A"}
                            </td>
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>`;
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

applyFiltersButton.removeEventListener("click", applyFilters);