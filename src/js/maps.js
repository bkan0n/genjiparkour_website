const apiUrls = {
    mapSearch: 'api/search/getMapSearch.php',
    completions: 'api/search/getCompletions.php',
    guide: 'api/search/getGuides.php',
    personalRecords: 'api/search/getPersonalRecords.php'
};

const sectionLoadingOperations = {
    mapSearch: async () => {
        const response = await fetch('api/search/getMapSearch.php');
        const data = await response.json();
        console.log(data);
    },
    completions: async () => {
        const response = await fetch('api/search/getCompletions.php');
        const data = await response.json();
        console.log(data);
    },
    guide: async () => {
        const response = await fetch('api/search/getGuides.php');
        const data = await response.json();
        console.log(data);
    },
    personalRecords: async () => {
        const response = await fetch(`api/search/getPersonalRecords.php?user_id=${encodeURIComponent(user_id)}`);
        const data = await response.json();
        console.log(data);
    }
};

const filterOptions = {};
const filters = {};
const selectedFilters = [];
let mechanicsOptions = [];
let restrictionsOptions = [];
let currentSection = "";
let currentPage = 1;
const pageSize = 25;
let totalPages = 1;
let hideTimeout;
const applyFiltersButton = document.getElementById("applyFiltersBtn");

const difficultyColors = {
    "Beginner": "#00ff1a",
    "Easy": "#cdff3a",
    "Medium": "#fbdf00",
    "Hard": "#ff9700",
    "Very Hard": "#ff4500",
    "Extreme": "#ff0000",
    "Hell": "#9a0000",
};

const difficultyOptions = ["Beginner", "Easy", "Medium", "Hard", "Very Hard", "Extreme", "Hell"];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("filtersContainer").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
    const currentLang = document.documentElement.lang || "en";
    const filterOptionsDropdown = document.querySelector(".filter-options");

    if (filterOptionsDropdown && currentLang === "fr") {
        filterOptionsDropdown.style.width = "150px";
    }

    fetch('translations/translations.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des traductions.');
            }
            return response.json();
        })
        .then((translations) => {
            const filters = translations[currentLang]?.filters || {};

            Object.assign(filterOptions, {
                mapSearch: [
                    { id: "map_name", label: filters.map_name },
                    { id: "map_code", label: filters.map_code },
                    { id: "difficulty", label: filters.difficulty },
                    { id: "creator", label: filters.creator },
                    { id: "mechanics", label: filters.mechanics },
                    { id: "restrictions", label: filters.restrictions },
                    { id: "only_playtest", label: filters.only_playtest },
                    { id: "only_maps_with_medals", label: filters.only_maps_with_medals },
                    { id: "ignore_completions", label: filters.ignore_completions }
                ],
                completions: [
                    { id: "user", label: filters.player_name },
                    { id: "map_code", label: filters.map_code }
                ],
                guide: [
                    { id: "map_code", label: filters.map_code }
                ],
                personalRecords: [
                    { id: "map_code", label: filters.map_code }
                ]
            });

            console.log("Filter options loaded: ", filterOptions);
        })
        .catch((error) => {
            console.error("Erreur lors du chargement des traductions : ", error);
        });
});

async function loadTranslations() {
    try {
        const response = await fetch("translations/translations.json");
        const data = await response.json();
        const currentLang = document.documentElement.lang || "en";
        translations = data[currentLang]?.thead || {};
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

function t(key) {
    return translations[key] || key;
}

async function loadDynamicOptions() {
    try {
        const mechanicsResponse = await fetch('./api/autocomplete/getMapMechanicsAutoComplete.php');
        if (!mechanicsResponse.ok) throw new Error('Failed to fetch mechanics');
        const mechanicsData = await mechanicsResponse.json();
        mechanicsOptions = mechanicsData.map(item => item.name);

        const restrictionsResponse = await fetch('./api/autocomplete/getMapRestrictionsAutoComplete.php');
        if (!restrictionsResponse.ok) throw new Error('Failed to fetch restrictions');
        const restrictionsData = await restrictionsResponse.json();
        restrictionsOptions = restrictionsData.map(item => item.name);

        //console.log('Mechanics Options:', mechanicsOptions);
        //console.log('Restrictions Options:', restrictionsOptions);
    } catch (error) {
        console.error('Error loading dynamic options:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadDynamicOptions();
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

function createDifficultyDropdown(filterId, buttonText, options, changeHandler) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const button = document.createElement("button");
    button.textContent = buttonText;
    button.classList.add("dropdown-toggle");
    button.style.cursor = "pointer";
    button.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    };

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("dropdown-content");

    options.forEach(option => {
        const optionItem = document.createElement("div");
        optionItem.textContent = option;
        optionItem.dataset.value = option;
        optionItem.classList.add("dropdown-item");
        optionItem.style.cursor = "pointer";

        optionItem.onclick = () => {
            button.textContent = option;
            dropdown.classList.remove("show");
            filters[filterId] = option; 
            //console.log(`Filtre "${filterId}" mis à jour avec: ${option}`);
            if (changeHandler) changeHandler(filterId, option);
        };

        optionsContainer.appendChild(optionItem);
    });

    dropdown.appendChild(button);
    dropdown.appendChild(optionsContainer);

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });
    
    return dropdown;
}

function createDropdownWithCheckboxes(filterId, buttonText, options, changeHandler) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const button = document.createElement("button");
    button.textContent = buttonText;
    button.classList.add("dropdown-toggle");
    button.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    };

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("dropdown-content");

    options.forEach(option => {
        const optionItem = document.createElement("div");
        optionItem.classList.add("dropdown-item2");

        const label = document.createElement("label");
        label.style.cursor = "pointer";
        label.style.width = "100%";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = option;
        checkbox.name = filterId;

        const textNode = document.createElement("span");
        textNode.textContent = ` ${option}`;

        label.appendChild(checkbox);
        label.appendChild(textNode);

        optionItem.appendChild(label);
        optionsContainer.appendChild(optionItem);

        checkbox.addEventListener("change", changeHandler);
    });

    dropdown.appendChild(button);
    dropdown.appendChild(optionsContainer);

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });

    return dropdown;
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

        if (filterId === "only_playtest" || filterId === "only_maps_with_medals" || filterId == "ignore_completions") {
            filterInput = document.createElement("select");
            filterInput.innerHTML = `
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
            `;
            filterElement.appendChild(filterInput);
        } else if (filterId === "mechanics") {
            const dropdown = createDropdownWithCheckboxes(
                "mechanics",
                "Select Mechanics",
                mechanicsOptions,
                updateMechanicsFilter
            );
            filterElement.appendChild(dropdown);
        } else if (filterId === "restrictions") {
            const dropdown = createDropdownWithCheckboxes(
                "restrictions",
                "Select Restrictions",
                restrictionsOptions,
                updateRestrictionsFilter
            );
            filterElement.appendChild(dropdown);
        } else if (filterId === "difficulty") {
            const dropdown = createDifficultyDropdown(
                "difficulty",
                "Select Difficulty",
                difficultyOptions,
                (filterId, selectedValue) => {
                    filters[filterId] = selectedValue;
                }
            );
            filterElement.appendChild(dropdown);
        } else if (filterId === "map_name") {
            filterInput = document.createElement("input");
            filterInput.type = "text";
            filterInput.placeholder = filterLabel;
            filterInput.addEventListener("input", showMapNameSuggestions);
            filterElement.appendChild(filterInput);

            const suggestionsContainer = document.createElement("div");
            suggestionsContainer.classList.add("suggestions", "hidden-suggestions");
            suggestionsContainer.id = "mapNameSuggestionsContainer";
            filterElement.appendChild(suggestionsContainer);

        } else if (filterId === "map_code") {
            filterInput = document.createElement("input");
            filterInput.type = "text";
            filterInput.placeholder = filterLabel;
            filterInput.addEventListener("input", showMapCodeSuggestions);
            filterInput.addEventListener("input", () => {
                filterInput.value = filterInput.value.toUpperCase();
            });
            filterInput.addEventListener("input", () => {
                filterInput.value = filterInput.value.trimStart().trimEnd();
            });

            const suggestionsContainer = document.createElement("div");
            suggestionsContainer.classList.add("suggestions", "hidden-suggestions");
            suggestionsContainer.id = "mapCodeSuggestionsContainer";
            filterElement.appendChild(suggestionsContainer);
            filterElement.appendChild(filterInput);
        } else if (filterId === "creator") {
            filterInput = document.createElement("input");
            filterInput.type = "text";
            filterInput.placeholder = filterLabel;
            filterInput.addEventListener("input", showUsersSuggestions);
            filterElement.appendChild(filterInput);
        
            const suggestionsContainer = document.createElement("div");
            suggestionsContainer.classList.add("suggestions", "hidden-suggestions");
            suggestionsContainer.id = "nicknameSuggestionsContainer";
            filterElement.appendChild(suggestionsContainer);
        } else if (filterId === "user") {
            filterInput = document.createElement("input");
            filterInput.type = "text";
            filterInput.placeholder = filterLabel;
            filterInput.addEventListener("input", showUsersSuggestions);
            filterElement.appendChild(filterInput);

            const suggestionsContainer = document.createElement("div");
            suggestionsContainer.classList.add("suggestions", "hidden-suggestions");
            suggestionsContainer.id = "nicknameSuggestionsContainer";
            filterElement.appendChild(suggestionsContainer);
        } else {
            filterInput = document.createElement("input");
            filterInput.type = "text";
            filterInput.placeholder = filterLabel;
            filterInput.addEventListener("input", () => {
                filterInput.value = filterInput.value.trimStart().trimEnd();
            });
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

        filterContainer.style.display = "flex";
        hideFilterOptions();
    }
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

function hideSuggestionsOnClickOutside(containers) {
    document.addEventListener("click", (event) => {
        containers.forEach((containerId) => {
            const container = document.getElementById(containerId);

            if (container && !container.contains(event.target)) {
                container.style.display = "none";
            }
        });
    });
}

hideSuggestionsOnClickOutside([
    "mapNameSuggestionsContainer",
    "mapCodeSuggestionsContainer",
    "creatorSuggestionsContainer"
]);

function showMapNameSuggestions(event) {
    const input = event.target;
    const filterValue = input.value;

    const suggestionsContainer = document.getElementById("mapNameSuggestionsContainer");
    suggestionsContainer.innerHTML = "";

    if (filterValue.length < 2) {
        suggestionsContainer.style.display = "none";
        return;
    }

    fetch(`api/autocomplete/getMapNamesAutoComplete.php?value=${encodeURIComponent(filterValue)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                suggestionsContainer.style.display = "none";
                return;
            }

            data.forEach(map => {
                const suggestion = document.createElement("div");
                suggestion.textContent = map.name;
                suggestion.classList.add("suggestion-item");
                suggestion.onclick = () => {
                    input.value = map.name;
                    suggestionsContainer.style.display = "none";
                };
                suggestionsContainer.appendChild(suggestion);
            });

            suggestionsContainer.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching map name suggestions:", error);
        });
}

function showMapCodeSuggestions(event) {
    const input = event.target;
    const filterValue = input.value;

    const suggestionsContainer = document.getElementById("mapCodeSuggestionsContainer");
    suggestionsContainer.innerHTML = "";

    if (filterValue.length < 2) {
        suggestionsContainer.style.display = "none";
        return;
    }

    fetch(`api/autocomplete/getMapCodesAutoComplete.php?value=${encodeURIComponent(filterValue)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                suggestionsContainer.style.display = "none";
                return;
            }

            data.forEach(map => {
                const suggestion = document.createElement("div");
                suggestion.textContent = map.map_code;
                suggestion.classList.add("suggestion-item");
                suggestion.onclick = () => {
                    input.value = map.map_code;
                    suggestionsContainer.style.display = "none";
                };
                suggestionsContainer.appendChild(suggestion);
            });

            suggestionsContainer.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching map code suggestions:", error);
        });
}



function showUsersSuggestions(event) {
    const input = event.target;
    const filterValue = input.value;

    const suggestionsContainer = document.getElementById("nicknameSuggestionsContainer");
    suggestionsContainer.innerHTML = "";

    if (filterValue.length < 2) {
        suggestionsContainer.style.display = "none";
        return;
    }

    fetch(`api/autocomplete/getUsersAutoComplete.php?value=${encodeURIComponent(filterValue)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                suggestionsContainer.style.display = "none";
                return;
            }

            data.forEach(creator => {
                const suggestion = document.createElement("div");
                suggestion.textContent = creator.name;
                suggestion.classList.add("suggestion-item");
                suggestion.onclick = () => {
                    input.value = creator.name;
                    suggestionsContainer.style.display = "none";
                };
                suggestionsContainer.appendChild(suggestion);
            });

            suggestionsContainer.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching creator suggestions:", error);
        });
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
        resultsContainer.innerHTML = searchPerformed ? "" : "";
    }
    Object.keys(filters).forEach(key => delete filters[key]);

    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = ""; 
}

const resultsContainer = document.getElementById("resultsContainer");

function applyFilters() {
    showLoadingBar(currentSection);

    if (currentSection === 'personalRecords' && !user_id) {
        document.getElementById("resultsContainer").innerHTML = `
            <p style="color: red; font-weight: bold; font-size: 18px;">
                ⚠️ Login required to view personal records
            </p>`;
        hideLoadingBar();
        return;
    }

    const activeFilters = {};

    document.querySelectorAll(".filter").forEach(filter => {
        const filterId = filter.dataset.filterId;
        const input = filter.querySelector("input, select");

        if (filterId === "mechanics") {
            const selectedMechanics = Array.from(document.querySelectorAll("input[name='mechanics']:checked"))
                                           .map(checkbox => checkbox.value)
                                           .sort();
            if (selectedMechanics.length > 0) {
                activeFilters[filterId] = selectedMechanics;
            }
        } else if (filterId === "restrictions") {
            const selectedRestrictions = Array.from(document.querySelectorAll("input[name='restrictions']:checked"))
                                            .map(checkbox => checkbox.value)
                                            .sort();
            if (selectedRestrictions.length > 0) {
                activeFilters[filterId] = selectedRestrictions;
            }
        } else if (filterId === "difficulty") {
            const selectedDifficulty = filters[filterId];
            if (selectedDifficulty) {
                activeFilters[filterId] = selectedDifficulty;
                activeFilters.difficulty = encodeURIComponent(activeFilters.difficulty);
            }
        } else if (filterId === "map_name") {
            const rawValue = input.value.trim();
            if (rawValue) {
                activeFilters[filterId] = encodeURIComponent(rawValue);
            }
        } else if (input && input.value) {
            activeFilters[filterId] = input.value.trim();
        }
    });

    if (user_id) {
        activeFilters.user_id = user_id;
    }

    if (currentSection === 'guide' && !activeFilters.map_code) {
        document.getElementById("resultsContainer").innerHTML = `
            <p style="color: red; font-weight: bold; font-size: 18px;">
                ⚠️ Enter a map code!
            </p>`;
        hideLoadingBar();
        return;
    }

    activeFilters.page_size = pageSize;
    activeFilters.page_number = currentPage;

    if (currentSection === 'personalRecords') {
        activeFilters.user_id = user_id;
    }

    console.log("Filtres actifs:", JSON.stringify(activeFilters));
    const apiUrl = apiUrls[currentSection];
    const intuitiveModeText = document.getElementById("intuitiveMode");
    if (intuitiveModeText) {
        intuitiveModeText.style.display = "none";
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeFilters)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        //console.log("Donnée réponse API:", data);
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
        hideLoadingBar();
    })
    .catch(error => {
        console.error("Fetch error:", error);
        hideLoadingBar();
    });
}

function normalizeDifficulty(difficulty) {
    if (!difficulty) return '';
    return difficulty.replace(/\s*[+-]$/, '').trim();
}

async function showLoadingBar(section) {
    const loadingContainer = document.getElementById("loadingContainer");

    const loadingOperation = sectionLoadingOperations[section];
    if (!loadingOperation) {
        console.warn(`Aucune opération de chargement définie pour la section : ${section}`);
        return;
    }

    loadingContainer.style.display = "block";

    const startTime = performance.now();

    try {
        await loadingOperation();
    } catch (error) {
        console.error(`Erreur lors du chargement de la section "${section}":`, error);
    }

    const endTime = performance.now();

    const durationInSeconds = Math.max((endTime - startTime) / 1000, 0.3);

    document.documentElement.style.setProperty("--loading-duration", `${durationInSeconds}s`);

    setTimeout(() => {
        loadingContainer.style.display = "none";
    }, durationInSeconds * 1000);
}

function hideLoadingBar() {
    const loadingBar = document.getElementById("loadingContainer");
    loadingBar.style.display = "none";
}

async function displayMapSearchResults(data) {
    await loadTranslations();
    const resultsContainer = document.getElementById("resultsContainer");

    const results = Object.values(data).filter(item => typeof item === "object" && !item.pagination);
    const filteredResults = results.filter(result => result.map_name && result.map_name !== "N/A");
    //console.log("Affichage des résultats", filteredResults);

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
            <colgroup>
                <col style="width: 10%;">
                <col style="width: 17%;">
                <col style="width: 8%;">
                <col style="width: 15%;">
                <col style="width: 10%;">
                <col style="width: 10%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 11%;">
            </colgroup>
            <thead>
                <tr>
                    <th class="mapCode">${t("mapCode")}</th>
                    <th class="mapName">${t("mapName")}</th>
                    <th class="mapType">${t("mapType")}</th>
                    <th class="mapCreator">${t("mapCreator")}</th>
                    <th class="mapDifficulty">${t("mapDifficulty")}</th>
                    <th class="mapQuality">${t("mapQuality")}</th>
                    <th class="mapGold">${t("mapGold")}</th>
                    <th class="mapSilver">${t("mapSilver")}</th>
                    <th class="mapBronze">${t("mapBronze")}</th>
                    <th class="mapDetails">${t("mapDetails")}</th>
                </tr>
            </thead>
            <tbody>
                ${filteredResults.map((result, index) => {
                    let medalType = "";

                    if (user_id) {
                        if (result.medal_type === "Gold") {
                            medalType = "gold-halo";
                        } else if (result.medal_type === "Silver") {
                            medalType = "silver-halo";
                        } else if (result.medal_type === "Bronze") {
                            medalType = "bronze-halo";
                        } else {
                            medalType = "";
                        }
                    } else {
                        medalType = "";
                    }

                    return `
                        <tr>
                            <td colspan="10" class="row-wrapper">
                                <table class="inner-table ${medalType}">
                                    <colgroup>
                                        <col style="width: 10%;">
                                        <col style="width: 17%;">
                                        <col style="width: 8%;">
                                        <col style="width: 15%;">
                                        <col style="width: 10%;">
                                        <col style="width: 10%;">
                                        <col style="width: 6%;">
                                        <col style="width: 6%;">
                                        <col style="width: 6%;">
                                        <col style="width: 8%;">
                                    </colgroup>
                                    <tr>
                                        <td class="mapCode">
                                            ${result.map_code || "N/A"} 
                                            ${(result.time && user_id) ? '<span style="color: green; margin-left: 5px;">✔</span>' : ''}
                                        </td>
                                        <td class="mapName">${result.map_name || "N/A"}</td>
                                        <td class="mapType">${Array.isArray(result.map_type) ? result.map_type.join(", ") : "N/A"}</td>
                                        <td class="creators">${result.creators ? result.creators.join(", ") : "N/A"}</td>
                                        <td class="difficulty" style="color: ${difficultyColors[normalizeDifficulty(result.difficulty)] || '#fff'}">${result.difficulty || "N/A"}</td>
                                        <td class="quality">${getStars(result.quality) || "N/A"}</td>
                                        <td class="gold">${result.gold || "N/A"}</td>
                                        <td class="silver">${result.silver || "N/A"}</td>
                                        <td class="bronze">${result.bronze || "N/A"}</td>
                                        <td class="details"><button class="details-btn" onclick="showDetailsModal(${index})">View</button></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    `;
                }).join("")}
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

    window.showDetailsModal = async function(index) {
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
                    <div class="map-details">
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
                <div class="map-graph">
                    <div id="chartContainer">
                    </div>
                </div>
            </div>
        `;
    
        document.getElementById("modalDetailsContainer").innerHTML = detailsContent;
        document.getElementById("detailsModalOverlay").style.display = "flex";

        const [stats, progressionData] = await Promise.all([
            fetchMapCompletionStatistics(result.map_code),
            fetchProgression(result.map_code),
        ]);

        if (stats && Array.isArray(progressionData) && progressionData.length > 0) {
            renderProgressionChart(progressionData, stats);
        } else {
            console.log("No valid data to render chart");
        }
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

async function displayPersonalRecordsResults(results) {
    await loadTranslations();
    const resultsContainer = document.getElementById("resultsContainer");
    const dataResults = Array.isArray(results.results) ? results.results : [];

    if (dataResults.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    const filteredResults = dataResults.filter(result => result.map_code && result.map_code !== "N/A");

    resultsContainer.innerHTML = `
        <table class="results-table3">
            <colgroup>
                <col style="width: 15%;">
                <col style="width: 20%;">
                <col style="width: 20%;">
                <col style="width: 20%;">
                <col style="width: 10%;">
                <col style="width: 15%;">
            </colgroup>
            <thead>
                <tr>
                    <th class="mapCode">${t("mapCode")}</th>
                    <th class="nickname">${t("mapNickname")}</th>
                    <th class="discordTag">${t("mapDiscordTag")}</th>
                    <th class="difficulty">${t("mapDifficulty")}</th>
                    <th class="time">${t("mapTime")}</th>
                    <th class="medal">${t("mapMedal")}</th>
                </tr>
            </thead>
            <tbody>
                ${filteredResults.map(result => `
                    <tr>
                        <td colspan="10" class="row-wrapper3">
                            <table class="inner-table3">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                    <col style="width: 10%;">
                                    <col style="width: 15%;">
                                </colgroup>
                                <tr>
                                    <td class ="mapCode">${result.map_code || "N/A"}</td>
                                    <td class ="nickname">${result.nickname || "N/A"}</td>
                                    <td class ="discord_tag">${result.discord_tag || "N/A"}</td>
                                    <td class="difficulty" style="color: ${difficultyColors[normalizeDifficulty(result.difficulty)] || '#fff'}">${result.difficulty || "N/A"}</td>
                                    <td class ="time">${result.time > 16000 ? "Completion" : result.time}</td>
                                    <td class ="medal">${result.medal || "N/A"}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>`;
}

async function displayCompletionsResults(results) {
    await loadTranslations();
    const resultsContainer = document.getElementById("resultsContainer");
    const dataResults = Array.isArray(results.results) ? results.results : [];

    if (dataResults.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    resultsContainer.innerHTML = `
        <table class="results-table2">
            <colgroup>
                <col style="width: 15%;">
                <col style="width: 20%;">
                <col style="width: 20%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
            </colgroup>
            <thead>
                <tr>
                    <th class="mapCode">${t("mapCode")}</th>
                    <th class="nickname">${t("mapNickname")}</th>
                    <th class="discordTag">${t("mapDiscordTag")}</th>
                    <th class="time">${t("mapTime")}</th>
                    <th class="medal">${t("mapMedal")}</th>
                    <th class="video">${t("mapVideo")}</th>
                </tr>
            </thead>
            <tbody>
                ${dataResults.map(result => `
                    <tr>
                        <td colspan="10" class="row-wrapper2">
                            <table class="inner-table2">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: 20%;">
                                    <col style="width: 20%;">
                                    <col style="width: 15%;">
                                    <col style="width: 15%;">
                                    <col style="width: 15%;">
                                </colgroup>
                               <tr>
                                    <td class="mapCode">${result.map_code || "N/A"}</td>
                                    <td class="nickname">${result.nickname || "N/A"}</td>
                                    <td class="discord_tag">${result.discord_tag || "N/A"}</td>
                                    <td class="time">${result.time > 16000 ? "Completion" : result.time}</td>
                                    <td class="medal">${result.medal || "N/A"}</td>
                                    <td class="video">${result.video ? `<a href="${result.video}" target="_blank" class="white-link">Watch</a>` : "N/A"}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>`;
}

async function displayGuideResults(results) {
    await loadTranslations();
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
                    <th class="mapCode">${t("mapCode")}</th>
                    <th class="guideVideo">${t("mapVideo")}</th>
                </tr>
            </thead>
            <tbody>
                ${dataResults
                    .map(result => {
                        const embedUrl = getEmbedUrl(result.url);

                        return `
                            <tr>
                                <td>${result.map_code || "N/A"}</td>
                                <td>
                                    ${
                                        embedUrl
                                            ? `<iframe 
                                                    class="rounded-iframe" 
                                                    src="${embedUrl}" 
                                                    frameborder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowfullscreen
                                                    style="width: 90%; height: 315px;">
                                               </iframe>`
                                            : "N/A"
                                    }
                                </td>
                            </tr>
                        `;
                    })
                    .join("")}
            </tbody>
        </table>`;
}

function getEmbedUrl(url) {
    if (!url) return null;

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoIdMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
    }

    if (url.includes("bilibili.com")) {
        const videoIdMatch = url.match(/\/video\/([a-zA-Z0-9]+)/);
        return videoIdMatch ? `https://player.bilibili.com/player.html?bvid=${videoIdMatch[1]}` : null;
    }

    return null;
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

async function fetchMapCompletionStatistics(mapCode) {
    try {
        const url = `api/search/getMapCompletionStatistics.php?map_code=${encodeURIComponent(mapCode)}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            console.error("No valid data returned from the API");
            return null;
        }

        const stats = {
            min: data[0]?.min || null,
            max: data[0]?.max || null,
            avg: data[0]?.avg || null,
        };

        console.log("Fetched Stats:", stats);

        return stats;
    } catch (error) {
        console.error("Error fetching map completion statistics:", error);
        return null;
    }
}


async function fetchProgression(mapCode) {
    try {
        const response = await fetch(`api/search/getUserProgression.php?map_code=${encodeURIComponent(mapCode)}`);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();

        const chartContainer = document.getElementById("chartContainer");

        if (data.error && data.login_required) {
            chartContainer.innerHTML = `
                <p style="text-align: center; font-weight: bold; color: red;">
                    ⚠️ Please login to see your progression
                </p>
            `;
            return [];
        }

        if (data.error) {
            chartContainer.innerHTML = `
                <p style="text-align: center; font-weight: bold; color: red;">
                    ${data.message || "An error occurred. Please try again"}
                </p>
            `;
            return [];
        }

        if (!Array.isArray(data) || data.length === 0) {
            chartContainer.innerHTML = `
                <p style="text-align: center; font-weight: bold; color: white;">
                    No valid progression data available to display
                </p>
            `;
            return [];
        }

        const sortedData = data
            .map(item => ({
                time: parseFloat(item.time),
                timestamp: new Date(item.inserted_at).toLocaleString(),
                inserted_at: new Date(item.inserted_at),
            }))
            .sort((a, b) => a.inserted_at - b.inserted_at)
            .slice(0, 5);

        renderProgressionChart(sortedData);
        return sortedData;

    } catch (error) {
        console.error("Error fetching progression data:", error);
        document.getElementById("chartContainer").innerHTML = `
            <p style="text-align: center; font-weight: bold; color: red;">
                An error occurred. Please try again later.
            </p>
        `;
        return [];
    }
}

function renderProgressionChart(data, stats = { min: null, max: null, avg: null }) {
    const chartContainer = document.getElementById("chartContainer");
    chartContainer.innerHTML = `<canvas id="progressionChart"></canvas>`;

    if (!Array.isArray(data) || data.length === 0) {
        chartContainer.innerHTML = `
            <p style="text-align: center; font-weight: bold; color: white;">
                No valid progression data available to display
            </p>
        `;
        return;
    }

    const recentData = data.slice(-5);

    const maxX = recentData.length === 1 ? 1 : recentData.length - 1;
    const labels = Array.from({ length: maxX + 1 }, (_, i) => `${i}`);

    let times = recentData.map(item => item.time);
    if (recentData.length === 1) {
        times = [times[0], times[0]];
    }

    const { min, max, avg } = stats;
    const avgData = avg !== null ? new Array(labels.length).fill(avg) : [];
    const minData = min !== null ? new Array(labels.length).fill(min) : [];
    const maxData = max !== null ? new Array(labels.length).fill(max) : [];

    const ctx = document.getElementById("progressionChart").getContext("2d");

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Time Progression",
                    data: times,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                },
                {
                    label: "Average Time",
                    data: avgData,
                    borderColor: "rgba(255, 205, 86, 1)",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: "Min Time",
                    data: minData,
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: "Max Time",
                    data: maxData,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                },
            ].filter(dataset => dataset.data.length > 0),
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'nearest',
                axis: 'y',
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'center',
                    labels: {
                        color: "#FFFFFF",
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 12,
                        },
                        padding: 20,
                    },
                },
                title: {
                    display: true,
                    text: 'Record Progression Over Time',
                    color: '#FFFFFF',
                    font: {
                        family: 'Roboto',
                        weight: 'bold',
                        size: 18,
                    },
                    padding: {
                        top: 10,
                        bottom: 20,
                    },
                },
                tooltip: {
                    callbacks: {
                        title: () => null,
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: false,
                        text: 'Time (s)',
                        color: '#FFFFFF',
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 16,
                            lineHeight: 1.5,
                        },
                    },
                    ticks: {
                        color: '#FFFFFF',
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 12,
                        },
                    },
                    grid: {
                        display: false,
                    },
                    border: {
                        display: true,
                        color: '#FFFFFF',
                    },
                },
                x: {
                    title: {
                        display: false,
                        text: 'Completions',
                        color: '#FFFFFF',
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 16,
                            lineHeight: 1.5,
                        },
                        padding: { top: -10 },
                    },
                    ticks: {
                        color: '#FFFFFF',
                        font: {
                            family: 'Roboto',
                            weight: 'bold',
                            size: 12,
                        },
                        padding: 0,
                    },
                    grid: {
                        display: false,
                    },
                    border: {
                        display: true,
                        color: '#FFFFFF',
                    },
                    titlePadding: {
                        right: 20,
                    },
                    min: 0,
                },
            },
        },
    });
}