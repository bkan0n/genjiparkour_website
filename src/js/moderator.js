// Section boutons
const editUserBtn = document.getElementById("edit-user-btn");
const editUserContent = document.getElementById("edit-user-content");
const editMapBtn = document.getElementById("edit-map-btn");
const editMapContent = document.getElementById("edit-map-content");
const mapSearchButton = document.getElementById("map-search-button");
const submitMapButton = document.getElementById("submit-map-button");
const userEditButton = document.getElementById("user-search-button");
const userEditOthersButton = document.getElementById("user-options-button");
const userEditMultipleButton = document.getElementById("edit-multiple-btn");
const mapSubmitContainer = document.querySelector(".map-submit-container");
const mapResultsContainer = document.querySelector(".map-results-container");
const userEditContainer = document.querySelector(".user-edit-container");
const userEditMultipleContainer = document.querySelector(".user-edit-multiple-container");

function toggleTab(tab) {
    editUserBtn.classList.remove("active");
    editMapBtn.classList.remove("active");
    userEditMultipleButton.classList.remove("active");
    editMapContent.style.display = "none";
    editUserContent.style.display = "none";

    mapResultsContainer.style.display = "none";
    mapSubmitContainer.style.display = "none";
    userEditContainer.style.display = "none";
    userEditMultipleContainer.style.display = "none";

    const suggestionsContainers = document.querySelectorAll(
        ".map-name-suggestions-container, #mapCodeSuggestionsContainer, .creator-suggestions-container, .map-difficulty-suggestions-container, .dropdown-menu-edit, .mechanics-suggestions-container, .restrictions-suggestions-container, .map-types-suggestions-container"
    );
    suggestionsContainers.forEach((container) => {
        container.style.display = "none";
    });

    if (tab === "map") {
        editMapBtn.classList.add("active");
        editMapContent.style.display = "flex";
    } else if (tab === "user") {
        editUserBtn.classList.add("active");
        editUserContent.style.display = "flex";
    } else if (tab === "edit-multiple") {
        userEditMultipleButton.classList.add("active");
        userEditMultipleContainer.style.display = "flex";
    }
}

editUserBtn.addEventListener("click", () => toggleTab("user"));
editMapBtn.addEventListener("click", () => toggleTab("map"));
userEditMultipleButton.addEventListener("click", () => toggleTab("edit-multiple"));

mapSearchButton.addEventListener("click", () => {
    if (mapSubmitContainer) {
        mapSubmitContainer.style.display = "none";
    }

    if (userEditContainer) {
        userEditContainer.style.display = "none";
    }

    if (userEditMultipleContainer) {
        userEditMultipleContainer.style.display = "none";
    }

    if (mapResultsContainer) {
        mapResultsContainer.style.display = "flex";
    }
});

submitMapButton.addEventListener("click", () => {
    if (mapResultsContainer) {
        mapResultsContainer.style.display = "none";
    }

    if (userEditContainer) {
        userEditContainer.style.display = "none";
    }

    if (userEditMultipleContainer) {
        userEditMultipleContainer.style.display = "none";
    }

    if (mapSubmitContainer) {
        mapSubmitContainer.style.display = "flex";
    }
});

userEditButton.addEventListener("click", () => {
    if (mapResultsContainer) {
        mapResultsContainer.style.display = "none";
    }

    if (mapSubmitContainer) {
        mapSubmitContainer.style.display = "none";
    }

    if (userEditMultipleContainer) {
        userEditMultipleContainer.style.display = "none";
    }

    if (userEditContainer) {
        userEditContainer.style.display = "flex";
    }
});

userEditOthersButton.addEventListener("click", () => {
    if (mapResultsContainer) {
        mapResultsContainer.style.display = "none";
    }

    if (mapSubmitContainer) {
        mapSubmitContainer.style.display = "none";
    }

    if (userEditMultipleContainer) {
        userEditMultipleContainer.style.display = "none";
    }

    if (userEditContainer) {
        userEditContainer.style.display = "flex";
    }
});

userEditMultipleButton.addEventListener("click", () => {
    if (mapResultsContainer) {
        mapResultsContainer.style.display = "none";
    }

    if (mapSubmitContainer) {
        mapSubmitContainer.style.display = "none";
    }

    if (userEditContainer) {
        userEditContainer.style.display = "none";
    }

    if (userEditMultipleContainer) {
        userEditMultipleContainer.style.display = "flex";
    }
});

document.getElementById("map-search-button").addEventListener("click", () => {
    const mapCodeInput = document.getElementById("map-code-input").value.trim();
    const suggestionsContainer = document.getElementById("mapCodeSuggestionsContainer");

    if (!mapCodeInput) {
        showErrorMessage("Please enter a map code to search");
        return;
    }

    suggestionsContainer.style.display = "none";
    fetchMapResults({ map_code: mapCodeInput });
});

document.getElementById("map-code-input").addEventListener("input", showMapCodeSuggestions);

document.getElementById("user-search-button").addEventListener("click", () => {
    const userNameInput = document.getElementById("user-name-input").value.trim();
    if (!userNameInput) {
        showErrorMessage("Please enter a user name to search");
        return;
    }
    console.log("Searching for user:", userNameInput);
});
document.getElementById("user-name-input").addEventListener("input", showUsersSuggestions);

// Affichage Edit map
async function fetchMapResults(filters = {}) {
    const resultsContainer = document.getElementById("map-results");
    resultsContainer.innerHTML = "Loading...";

    try {
        const response = await fetch("api/search/getMapSearch.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filters),
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.error) {
            resultsContainer.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        const mapDetails = data[0];
        if (!mapDetails) {
            resultsContainer.innerHTML = `<p>No results found.</p>`;
            return;
        }

        resultsContainer.innerHTML = "";

        const mapCard = document.createElement("div");
        mapCard.className = "map-card";

        const creators = Array.isArray(mapDetails.creators) ? mapDetails.creators : ["Unknown"];

        mapCard.innerHTML = `
            <div class="global-edit-container">
                <button class="global-edit-button">Actions</button>
                <div class="dropdown-menu-edit" style="display: none;">
                    <ul>
                        <li data-value="Delete">Delete</li>
                        <li data-value="Legacy completions">Legacy completions</li>
                        <li data-value="Convert legacy">Convert legacy</li>
                        <li data-value="Archive">Archive</li>
                        <li data-value="Unarchive">Unarchive</li>
                    </ul>
                </div>
                <button class="confirm-button">Confirm changes</button>
            </div>
            <h3>Map details</h3>
            <div class="grid-container">
                <div class="column">
                    ${generateFieldHTML("Name", "map_name", mapDetails.map_name)}
                    ${generateFieldHTML("Type", "map_type", mapDetails.map_type)}
                    ${generateFieldHTML("Code", "map_code", mapDetails.map_code)}
                    ${generateCreatorsHTML(creators)}
                    ${generateFieldHTML("Difficulty", "difficulty", mapDetails.difficulty || "Unknown")}
                    ${generateFieldHTML("Checkpoints", "checkpoints", mapDetails.checkpoints || "Unknown")}
                    ${generateFieldHTML("Quality", "quality", mapDetails.quality !== undefined ? parseFloat(mapDetails.quality).toFixed(2) : "Unknown")}
                </div>
                <div class="column">
                    ${generateFieldHTML("Gold Time", "gold", mapDetails.gold || "N/A")}
                    ${generateFieldHTML("Silver Time", "silver", mapDetails.silver || "N/A")}
                    ${generateFieldHTML("Bronze Time", "bronze", mapDetails.bronze || "N/A")}
                    ${generateFieldHTML("Mechanics", "mechanics", mapDetails.mechanics.join(", "))}
                    ${generateFieldHTML("Restrictions", "restrictions", mapDetails.restrictions.join(", "))}
                    ${generateFieldHTML("Description", "description", mapDetails.description || "No description available")}
                    ${generateGuidesHTML(mapDetails.guide)}
                </div>
            </div>
        `;

        shortenLinks(mapCard);
        resultsContainer.appendChild(mapCard);
        activateIcons(mapCard);
    } catch (error) {
        console.error("Error fetching maps:", error);
        resultsContainer.innerHTML = `<p>Failed to load maps. Please try again later.</p>`;
    }
}

function generateGuidesHTML(guides = []) {
    if (!guides || !Array.isArray(guides) || guides.length === 0 || guides.every(g => g === null)) {
        return `
            <p class="field-row">
                <strong>Guides:</strong>
                <span class="text-add" style="margin-left: 15px;">No guides available</span>
            </p>
        `;
    }

    return `
        <p class="field-row">
            <strong>Guides:</strong>
            <span class="text-add">
            ${guides
                .map(
                    (guide) => `
                        <span class="editable" 
                              contenteditable="false" 
                              data-field="guide" 
                              data-original="${guide}">
                            <a href="${guide}" target="_blank">${guide}</a>
                        </span>`
                )
            .join("<br>")}
            </span>
            <span class="icons">
                ${generateIconsHTML(true)}
            </span>
        </p>
    `;
}

function generateCreatorsHTML(creators = []) {
    if (!creators || !Array.isArray(creators) || creators.length === 0 || creators.every(g => g === null)) {
        return `
            <p class="field-row">
                <strong>Creators:</strong>
                <span class="text-add" style="margin-left: 15px;">No creators</span>
            </p>
        `;
    }

    return `
        <p class="field-row">
            <strong>Creators:</strong>
            <span class="text-add">
                ${creators
                    .map(
                        (creator) => `<span class="editable" contenteditable="false" data-field="creator" data-original="${creator}">${creator}</span>`
                    )
                    .join("<br>")}
            </span>
            <span class="icons">
                ${generateIconsHTML(true)}
            </span>
        </p>
    `;
}

function generateFieldHTML(label, field, value) {
    return `
        <p class="field-row">
            <strong>${label}: </strong>
            <span class="editable" data-field="${field}" contenteditable="false" data-original="${value}">${value}</span>
            <span class="icons">${generateIconsHTML()}</span>
        </p>
    `;
}

function generateIconsHTML(isAddIcon = false) {
    return `
        <i class="fa-regular fa-pen-to-square" title="Edit mode"></i>
        <i class="fa-solid fa-check" style="display: none;" title="Submit"></i>
        <i class="fa-solid fa-xmark" style="display: none;" title="Cancel"></i>
        ${isAddIcon ? '<i class="fa-solid fa-plus" style="display: none;" title="Add"></i>' : ""}
    `;
}

//Bouton interaction edit map
function activateIcons(container) {
    setupEditIconListeners(container);
    setupCreatorInputListeners(container);
    setupSaveIconListeners(container);
    setupCancelIconListeners(container);
    setupAddIconListeners(container);
    setupGlobalEditButton(container);
}

function setupEditIconListeners(container) {
    container.querySelectorAll(".fa-pen-to-square").forEach((icon) => {
        icon.addEventListener("click", () => enterEditMode(icon, container));
    });
}

function enterEditMode(icon, container) {
    const parent = icon.closest("p.field-row") || icon.closest("p");
    
    const editableSpans = parent.querySelectorAll(".editable");
    const saveIcon = parent.querySelector(".fa-check");
    const cancelIcon = parent.querySelector(".fa-xmark");
    const addIcon = parent.querySelector(".fa-plus");

    if (editableSpans.length > 0) {
        editableSpans.forEach((span) => {
            span.setAttribute("data-original", span.textContent.trim());
            span.setAttribute("contenteditable", "true");
            span.classList.add("editing");
        });

        editableSpans[0].focus();

        icon.style.display = "none";
        if (saveIcon) saveIcon.style.display = "inline";
        if (cancelIcon) cancelIcon.style.display = "inline";
        if (addIcon) addIcon.style.display = "inline";

        console.log("Mode édition activé pour tous les champs de la section.");
    } else {
        console.warn("Aucun élément .editable trouvé dans le parent :", parent);
    }
}


function setupSaveIconListeners(container) {
    container.querySelectorAll(".fa-check").forEach((icon) => {
        icon.addEventListener("click", () => saveEdits(icon, container));
    });
}

function saveEdits(icon, container) {
    const parent = icon.closest("p");
    const editableSpan = parent.querySelector(".editable");
    const fieldType = editableSpan.getAttribute("data-field");
    const newValue = editableSpan.textContent.trim();

    if (!editableSpan) {
        console.error("No editable span found!");
        return;
    }

    if (!validateField(fieldType, newValue, container, parent)) {
        return;
    }

    editableSpan.setAttribute("data-original", newValue);
    editableSpan.setAttribute("contenteditable", "false");

    parent.querySelectorAll(".editable").forEach((newField) => {
        newField.setAttribute("contenteditable", "false");
    });

    if (newValue === "") {
        console.log("Champ vide supprimé :", editableSpan);
        editableSpan.remove();
    } else {
        editableSpan.setAttribute("data-original", newValue);
    }

    parent.querySelectorAll(".editable").forEach((newField) => {
        const value = newField.textContent.trim();
        if (value === "") {
            console.log("Champ vide supprimé :", newField);
            newField.remove();
        } else {
            newField.setAttribute("contenteditable", "false");
        }
    });

    const creators = Array.from(parent.querySelectorAll(".editable[data-field='creator']")).map(
        (field) => field.textContent.trim()
    );
    console.log("Créateurs confirmés :", creators);

    resetEditIcons(parent, container);
    console.log("Modification confirmée :", newValue);
}

function setupCancelIconListeners(container) {
    container.querySelectorAll(".fa-xmark").forEach((icon) => {
        icon.addEventListener("click", () => cancelEdits(icon, container));
    });
}

function cancelEdits(icon, container) {
    const parent = icon.closest("p");
    const editableSpans = parent.querySelectorAll(".editable");
    const editIcon = parent.querySelector(".fa-pen-to-square");
    const saveIcon = parent.querySelector(".fa-check");
    const cancelIcon = parent.querySelector(".fa-xmark");
    const addIcon = parent.querySelector(".fa-plus");

    editableSpans.forEach((editableSpan) => {
        const originalValue = editableSpan.getAttribute("data-original");
        const placeholder = editableSpan.getAttribute("placeholder");

        if (!originalValue || editableSpan.classList.contains("placeholder") || editableSpan.textContent.trim() === placeholder) {
            console.log(`Nouvelle ou incorrecte entrée supprimée (${editableSpan.getAttribute("data-field")}):`, editableSpan.textContent);
            editableSpan.remove();
        } else {
            editableSpan.textContent = originalValue;
            editableSpan.setAttribute("contenteditable", "false");
            editableSpan.classList.remove("placeholder");
        }
    });

    resetEditIcons(parent, container);
    shortenLinks(parent);

    console.log("Toutes les modifications ont été annulées ou les nouvelles entrées supprimées");
}

function resetEditIcons(parent, container) {
    const editIcon = parent.querySelector(".fa-pen-to-square");
    const saveIcon = parent.querySelector(".fa-check");
    const cancelIcon = parent.querySelector(".fa-xmark");
    const addIcon = parent.querySelector(".fa-plus");

    if (editIcon) editIcon.style.display = "inline";
    if (saveIcon) saveIcon.style.display = "none";
    if (cancelIcon) cancelIcon.style.display = "none";
    if (addIcon) addIcon.style.display = "none";

    hideAllSuggestions(container);
}

function setupCreatorInputListeners(container) {
    container.querySelectorAll(".editable[data-field='creator']").forEach((field) => {
        field.addEventListener("input", (event) => {
            showUsersSuggestions(event);
        });
    });
}

function setupAddIconListeners(container) {
    container.querySelectorAll(".fa-plus").forEach((icon) => {
        icon.addEventListener("click", () => addNewField(icon, container));
    });
}

function addNewField(icon, container) {
    const parent = icon.closest("p");
    if (!parent) {
        console.error("Parent <p> introuvable pour le bouton :", icon);
        return;
    }

    const textContainer = parent.querySelector(".text-add");
    if (!textContainer) {
        console.error("Conteneur '.text-add' introuvable dans :", parent);
        return;
    }

    const fieldType = textContainer.querySelector(".editable")?.getAttribute("data-field");
    if (!fieldType) {
        console.error("Champ 'data-field' introuvable pour '.editable' :", textContainer);
        return;
    }

    const lastEditableField = textContainer.querySelector(".editable:last-child");

    if (lastEditableField && (lastEditableField.textContent.trim() === "" || lastEditableField.classList.contains("placeholder"))) {
        showErrorMessage("Please fill in all the fields before adding another");
        return;
    }

    let newField;
    if (fieldType === "guide") {
        newField = createEditableField("guide", "New Guide");
    } else if (fieldType === "creator") {
        newField = createEditableField("creator", "Creator name");
    } else {
        console.error("Type de champ inconnu :", fieldType);
        return;
    }

    textContainer.appendChild(newField);
    applyPlaceholderBehavior(newField);
    console.log(`Nouvelle entrée ajoutée pour ${fieldType} :`, newField.textContent);
}

function createEditableField(field, placeholder) {
    const span = document.createElement("span");
    span.classList.add("editable");
    span.setAttribute("contenteditable", "true");
    span.setAttribute("data-field", field);
    span.setAttribute("placeholder", placeholder);
    span.style.marginLeft = "10px";
    span.style.padding = "2px 5px";
    span.style.borderRadius = "5px";
    span.style.cursor = "text";
    return span;
}

function validateField(fieldType, value, container, parent) {
    switch (fieldType) {
        case "map_code":
            return validateMapCode(value);
        case "map_name":
            return validateMapName(value, container);
        case "creator":
            return validateCreator(container);
        case "difficulty":
            return validateDifficulty(value);
        case "checkpoints":
            return validateCheckpoints(value);
        case "mechanics":
            return validateMechanics(value, container);
        case "restrictions":
            return validateRestrictions(value, container);
        case "guide":
            return validateGuide(container);
        case "map_type":
            return validateMapType(value, container);
        case "quality":
            return validateQuality(value);
        default:
            console.warn("No validation rule defined for field type:", fieldType);
            return true;
    }
}

function validateMapCode(value) {
    const trimmedValue = value.trim();
    if (trimmedValue.length < 5 || trimmedValue.length > 8) {
        const errorMessage =
            trimmedValue.length < 5
                ? "Map code must be at least 5 characters long"
                : "Map code must be at most 10 characters long";
        showErrorMessage(errorMessage);
        console.error("Map code validation failed:", trimmedValue);
        return false;
    }
    return true;
}

function validateMapName(value, container) {
    const mapNameSuggestionsContainer = container.querySelector(".map-name-suggestions-container");
    if (mapNameSuggestionsContainer) {
        const suggestions = Array.from(mapNameSuggestionsContainer.querySelectorAll(".suggestion-item"))
            .map((item) => item.textContent.trim());

        if (!suggestions.includes(value)) {
            showErrorMessage("Incorrect map name");
            console.error("Map name not found in suggestions:", value);
            return false;
        }
    }
    return true;
}

function validateCreator(container) {
    const allCreators = container.querySelectorAll(".editable[data-field='creator']");
    let validationFailed = false;

    allCreators.forEach((creator) => {
        const creatorValue = creator.textContent.trim();

        if (creatorValue === "" || creatorValue === "Creator name") {
            showErrorMessage("The 'Creator' field cannot be empty");
            console.error("Champ 'Creator' vide");
            validationFailed = true;
        }
    });

    return !validationFailed;
}

function validateDifficulty(value) {
    const validDifficulties = [
        "Easy -", "Easy", "Easy +",
        "Medium -", "Medium", "Medium +",
        "Hard -", "Hard", "Hard +",
        "Very Hard -", "Very Hard", "Very Hard +",
        "Extreme -", "Extreme", "Extreme +",
        "Hell"
    ];

    if (!validDifficulties.includes(value)) {
        showErrorMessage(`Difficulty "${value}" is not valid`);
        console.error("Invalid difficulty:", value);
        return false;
    }
    return true;
}

function validateCheckpoints(value) {
    const checkpointsValue = parseInt(value, 10);
    if (!/^\d+$/.test(value) || checkpointsValue <= 0 || checkpointsValue >= 500) {
        showErrorMessage("Checkpoints must be a numeric value between 0 and 500");
        console.error("Checkpoints validation failed:", value);
        return false;
    }
    return true;
}

function validateMechanics(value, container) {
    const mechanicsSuggestionsContainer = container.querySelector(".mechanics-suggestions-container");
    if (mechanicsSuggestionsContainer) {
        const validMechanics = Array.from(mechanicsSuggestionsContainer.querySelectorAll(".suggestion-item"))
            .map((item) => item.textContent.trim());

        const enteredMechanics = value.split(",").map((item) => item.trim());

        const invalidMechanics = enteredMechanics.filter(
            (mechanic) => !validMechanics.includes(mechanic)
        );

        if (invalidMechanics.length > 0) {
            showErrorMessage(
                `Invalid mechanics: ${invalidMechanics.join(", ")}. Please select valid options from the suggestions`
            );
            console.error("Invalid mechanics found:", invalidMechanics);
            return false;
        }
    }
    return true;
}

function validateRestrictions(value, container) {
    const restrictionsSuggestionsContainer = container.querySelector(".restrictions-suggestions-container");
    if (restrictionsSuggestionsContainer) {
        const validRestrictions = Array.from(restrictionsSuggestionsContainer.querySelectorAll(".suggestion-item"))
            .map((item) => item.textContent.trim());

        const enteredRestrictions = value.split(",").map((item) => item.trim());

        const invalidRestrictions = enteredRestrictions.filter(
            (restriction) => !validRestrictions.includes(restriction)
        );

        if (invalidRestrictions.length > 0) {
            showErrorMessage(
                `Invalid restrictions: ${invalidRestrictions.join(", ")}. Please select valid options from the suggestions`
            );
            console.error("Invalid restrictions found:", invalidRestrictions);
            return false;
        }
    }
    return true;
}

function validateGuide(container) {
    const allGuides = container.querySelectorAll(".editable[data-field='guide']");
    let validationFailed = false;

    allGuides.forEach((guide) => {
        const guideValue = guide.textContent.trim();
        if (!guideValue.startsWith("https://")) {
            showErrorMessage("The guide must start with 'https://'");
            console.error("Guide validation failed:", guideValue);
            validationFailed = true;
        }
    });

    return !validationFailed;
}

function validateMapType(value, container) {
    const mapTypeSuggestionsContainer = container.querySelector(".map-types-suggestions-container");
    if (mapTypeSuggestionsContainer) {
        const suggestions = Array.from(mapTypeSuggestionsContainer.querySelectorAll(".suggestion-item"))
            .map((item) => item.textContent.trim());

        if (!suggestions.includes(value)) {
            showErrorMessage("Incorrect map type");
            console.error("Map type not found in suggestions:", value);
            return false;
        }
    }
    return true;
}

function validateQuality(value) {
    const qualityValue = parseFloat(value);

    if (isNaN(qualityValue) || qualityValue < 0 || qualityValue > 6) {
        showErrorMessage("Quality must be a number between 0 and 6");
        console.error("Quality validation failed:", value);
        return false;
    }

    return true;
}

function setupAddIconListeners(container) {
    container.querySelectorAll(".fa-plus").forEach((icon) => {
        icon.addEventListener("click", () => addNewField(icon, container));
    });
}

function addNewField(icon, container) {
    const parent = icon.closest("p");
    if (!parent) {
        console.error("Parent <p> introuvable pour le bouton :", icon);
        return;
    }

    const textContainer = parent.querySelector(".text-add");
    if (!textContainer) {
        console.error("Conteneur '.text-add' introuvable dans :", parent);
        return;
    }

    const fieldType = textContainer.querySelector(".editable")?.getAttribute("data-field");
    if (!fieldType) {
        console.error("Champ 'data-field' introuvable pour '.editable' :", textContainer);
        return;
    }

    const lastEditableField = textContainer.querySelector(".editable:last-child");

    if (lastEditableField && (lastEditableField.textContent.trim() === "" || lastEditableField.classList.contains("placeholder"))) {
        showErrorMessage("Please fill in all the fields before adding another");
        return;
    }

    let newField;
    if (fieldType === "guide") {
        newField = createEditableField("guide", "New Guide");
    } else if (fieldType === "creator") {
        newField = createEditableField("creator", "Creator name");
    } else {
        console.error("Type de champ inconnu :", fieldType);
        return;
    }

    applyPlaceholderBehavior(newField);
    textContainer.appendChild(newField);
    console.log(`Nouvelle entrée ajoutée pour ${fieldType} :`, newField.textContent);
}

function createEditableField(field, placeholder) {
    const span = document.createElement("span");
    span.classList.add("editable");
    span.setAttribute("contenteditable", "true");
    span.setAttribute("data-field", field);
    span.setAttribute("placeholder", placeholder);
    span.style.marginLeft = "10px";
    span.style.padding = "2px 5px";
    span.style.borderRadius = "5px";
    span.style.cursor = "text";
    return span;
}

function setupGlobalEditButton(container) {
    const globalEditButton = container.querySelector(".global-edit-button");
    const dropdownMenu = container.querySelector(".dropdown-menu-edit");
    const confirmButton = container.querySelector(".confirm-button");

    globalEditButton.addEventListener("click", () => toggleDropdown(dropdownMenu));
    
    container.querySelectorAll(".dropdown-menu-edit ul li").forEach((menuItem) => {
        menuItem.addEventListener("click", () => handleDropdownSelection(menuItem, globalEditButton, dropdownMenu));
    });

    confirmButton.addEventListener("click", () => {
        const selectedOption = globalEditButton.textContent;
        showConfirmationMessage(`Option confirmed: ${selectedOption}`);
    });
}

function toggleDropdown(dropdownMenu) {
    if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
}

function handleDropdownSelection(menuItem, globalEditButton, dropdownMenu) {
    const selectedValue = menuItem.dataset.value;
    globalEditButton.textContent = selectedValue;

    dropdownMenu.style.display = "none";
}

function hideAllSuggestions(container) {
    const suggestionClasses = [
        ".map-name-suggestions-container",
        ".creator-suggestions-container",
        ".map-code-suggestions-container",
        ".mechanics-suggestions-container",
        ".restrictions-suggestions-container",
        ".map-types-suggestions-container",
        ".map-difficulty-suggestions-container"
    ];

    suggestionClasses.forEach(className => {
        const suggestions = container.querySelector(className);
        if (suggestions) suggestions.style.display = "none";
    });
}

function shortenLinks(container, maxLength = 15) {
    container.querySelectorAll(".editable[data-field='guide']").forEach((field) => {
        const fullText = field.getAttribute("data-original") || field.textContent.trim();
        if (!fullText) return;

        if (!field.hasAttribute("data-original")) {
            field.setAttribute("data-original", fullText);
        }

        if (fullText.length > maxLength) {
            field.textContent = `${fullText.substring(0, maxLength)}...`;
        } else {
            field.textContent = fullText;
        }

        field.addEventListener("focus", () => {
            field.textContent = fullText;
        });

        field.addEventListener("blur", () => {
            if (field.textContent.trim() === fullText || !field.textContent.trim()) {
                field.textContent = `${fullText.substring(0, maxLength)}...`;
            }
        });
    });
}

function applyPlaceholderBehavior(field) {
    const placeholder = field.getAttribute('placeholder');

    if (!placeholder) {
        console.warn('Aucun attribut "placeholder" trouvé pour l\'élément:', field);
        return;
    }

    function showPlaceholder() {
        if (field.textContent.trim() === '') {
            field.textContent = placeholder;
            field.classList.add('placeholder');
        }
    }

    function hidePlaceholder() {
        if (field.classList.contains('placeholder')) {
            field.textContent = '';
            field.classList.remove('placeholder');
        }
    }

    showPlaceholder();

    field.addEventListener('focus', hidePlaceholder);

    field.addEventListener('blur', showPlaceholder);

    field.addEventListener('input', () => {
        if (field.classList.contains('placeholder') && field.textContent.trim() !== '') {
            field.classList.remove('placeholder');
        }
    });

    field.addEventListener('keydown', (event) => {
        if (field.classList.contains('placeholder') && event.key === 'Enter') {
            event.preventDefault();
        }
    });
}

//Suggestions

function showMapCodeSuggestions(event) {
    const input = event.target;
    let parentCard;
    let suggestionsContainer;

    if (input.classList.contains("action-input-code")) {
        parentCard = input.closest(".user-card");
    } else if (input.id === "map-code-input") {
        suggestionsContainer = document.getElementById("mapCodeSuggestionsContainer");
    } else if (input.classList.contains("multiple-input-code")) {
        parentCard = input.closest(".multiple-card");
    } else if (input.getAttribute("data-field") === "map_code") {
        parentCard = input.closest(".map-card");
    } else {
        console.error("Input is not a valid field for map code suggestions.");
        return;
    }

    suggestionsContainer = suggestionsContainer || parentCard?.querySelector(".map-code-suggestions-container");

    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement("div");
        suggestionsContainer.className = "map-code-suggestions-container";
        parentCard?.appendChild(suggestionsContainer) || document.body.appendChild(suggestionsContainer);
    }

    suggestionsContainer.innerHTML = "";

    const filterValue = input?.value?.trim() || input?.textContent?.trim() || "";

    if (filterValue.length < 2) {
        suggestionsContainer.style.display = "none";
        return;
    }

    fetch(`api/autocomplete/getMapCodesAutoComplete.php?value=${encodeURIComponent(filterValue)}`)
        .then((response) => {
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data) || data.length === 0) {
                suggestionsContainer.style.display = "none";
                return;
            }

            suggestionsContainer.innerHTML = "";

            const validMapCodes = new Set(data.map(map => map.map_code));

            data.forEach((map) => {
                const suggestion = document.createElement("div");
                suggestion.textContent = map.map_code;
                suggestion.classList.add("suggestion-item");

                suggestion.addEventListener("click", () => {
                    setInputValue(input, map.map_code);
                    setInputValidationClass(input, true);
                    suggestionsContainer.style.display = "none";
                });

                suggestionsContainer.appendChild(suggestion);
            });

            positionSuggestionsContainer(input, suggestionsContainer, parentCard);

            input.addEventListener("input", () => {
                const currentValue = input?.value?.trim() || input?.textContent?.trim() || "";
                const isValid = validMapCodes.has(currentValue);
                setInputValidationClass(input, isValid);
            });

            suggestionsContainer.style.display = "block";
        })
        .catch((error) => {
            console.error("Error fetching map code suggestions:", error);
            setInputValidationClass(input, false);
        });
}

function setInputValue(input, value) {
    if (input.tagName === "INPUT") {
        input.value = value;
    } else {
        input.textContent = value;
    }
}

function positionSuggestionsContainer(input, suggestionsContainer, parentCard) {
    const rect = input.getBoundingClientRect();
    const parentRect = parentCard?.getBoundingClientRect() || { top: 0, left: 0 };

    suggestionsContainer.style.position = "absolute";
    suggestionsContainer.style.top = `${rect.bottom - parentRect.top}px`;
    suggestionsContainer.style.left = `${rect.left - parentRect.left}px`;
    suggestionsContainer.style.width = `${rect.width}px`;
}

function showMapNameSuggestions(event) {
    const input = event.target;
    const filterValue = input.textContent.trim();
    const parentCard = input.closest(".map-card");

    let suggestionsContainer = parentCard.querySelector(".map-name-suggestions-container");

    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement("div");
        suggestionsContainer.className = "map-name-suggestions-container";
        parentCard.appendChild(suggestionsContainer);
    }

    suggestionsContainer.innerHTML = "";

    if (filterValue.length < 2) {
        suggestionsContainer.style.display = "none";
        return;
    }

    fetch(`api/autocomplete/getMapNamesAutoComplete.php?value=${encodeURIComponent(filterValue)}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data) || data.length === 0) {
                suggestionsContainer.style.display = "none";
                return;
            }


            data.forEach((map) => {
                const suggestion = document.createElement("div");
                suggestion.textContent = map.map_name;
                suggestion.classList.add("suggestion-item");
                suggestion.onclick = () => {
                    input.textContent = map.map_name;
                    suggestionsContainer.style.display = "none";
                };

                suggestionsContainer.appendChild(suggestion);
            });

            const rect = input.getBoundingClientRect();
            const parentRect = parentCard.getBoundingClientRect();
            suggestionsContainer.style.top = `${rect.bottom - parentRect.top}px`;
            suggestionsContainer.style.left = `${rect.left - parentRect.left  - 2}px`; 
            suggestionsContainer.style.width = `200px`;
            suggestionsContainer.style.display = "block";
        })
        .catch((error) => {
            console.error("Error fetching map name suggestions:", error);
        });
}

function showUsersSuggestions(event) {
    const input = event.target;
    let parentCard;
    let suggestionsContainer;

    if (input.id === "user-name-input") {
        parentCard = null;
        suggestionsContainer = document.getElementById("userSuggestionsContainer");

        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement("div");
            suggestionsContainer.id = "userSuggestionsContainer";
            suggestionsContainer.className = "creator-suggestions-container";
            document.body.appendChild(suggestionsContainer);
        }
    } else if (input.classList.contains("user-suggestion-input")) {
        parentCard = input.closest(".user-card");
        if (!parentCard) {
            console.error("Parent card not found for user-suggestion-input:", input);
            return;
        }
        suggestionsContainer = parentCard.querySelector(".creator-suggestions-container");
        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement("div");
            suggestionsContainer.className = "creator-suggestions-container";
            parentCard.appendChild(suggestionsContainer);
        }
    } else {
        parentCard = input.closest(".map-card");
        if (!parentCard) {
            console.error("Parent card not found for input:", input);
            return;
        }
        suggestionsContainer = parentCard.querySelector(".creator-suggestions-container");
        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement("div");
            suggestionsContainer.className = "creator-suggestions-container";
            parentCard.appendChild(suggestionsContainer);
        }
    }

    suggestionsContainer.innerHTML = "";

    const filterValue = input.value?.trim() || input.textContent?.trim();

    if (filterValue.length < 2) {
        suggestionsContainer.style.display = "none";
        return;
    }

    fetch(`api/autocomplete/getUsersAutoComplete.php?value=${encodeURIComponent(filterValue)}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data) || data.length === 0) {
                suggestionsContainer.style.display = "none";
                return;
            }

            const validUserNames = new Set(data.map((user) => user.name));

            data.forEach((creator) => {
                const suggestion = document.createElement("div");
                suggestion.textContent = creator.name;
                suggestion.classList.add("suggestion-item");

                suggestion.onclick = () => {
                    if (input.id === "user-name-input" || input.classList.contains("user-suggestion-input")) {
                        input.value = creator.name;
                        setInputValue(input, creator.name);
                        setInputValidationClass(input, true);
                    } else {
                        input.textContent = creator.name;
                        setInputValue(input, creator.name);
                        setInputValidationClass(input, true);
                    }

                    const creatorIdField = parentCard? parentCard.querySelector('[data-field="creator_id"]'): document.querySelector('[data-field="creator_id"]');

                    if (creatorIdField) {
                        creatorIdField.textContent = creator.user_id;
                    }

                    suggestionsContainer.style.display = "none";
                };

                suggestionsContainer.appendChild(suggestion);

                input.addEventListener("input", () => {
                    const currentValue = input?.value?.trim() || input?.textContent?.trim() || "";
                    const isValid = validUserNames.has(currentValue);
                    setInputValidationClass(input, isValid);
                });
            });


            const rect = input.getBoundingClientRect();
            if (parentCard) {
                const parentRect = parentCard.getBoundingClientRect();
                const isUserCard = parentCard.classList.contains("user-card");
            
                if (isUserCard) {
                    suggestionsContainer.style.position = "absolute";
                    suggestionsContainer.style.top = `${rect.bottom - parentRect.top}px`;
                    suggestionsContainer.style.left = `${rect.left - parentRect.left - 2}px`;
                    suggestionsContainer.style.width = `${input.offsetWidth}px`;
                } else {
                    suggestionsContainer.style.position = "absolute";
                    suggestionsContainer.style.top = `${rect.bottom - parentRect.top}px`;
                    suggestionsContainer.style.left = `${rect.left - parentRect.left - 2}px`;
                    suggestionsContainer.style.width = `200px`;
                }
            
                suggestionsContainer.style.display = "block";
            } else {
                suggestionsContainer.style.position = "absolute";
                suggestionsContainer.style.top = `${rect.bottom + window.scrollY}px`;
                suggestionsContainer.style.left = `${rect.left + window.scrollX}px`;
                suggestionsContainer.style.width = `${input.offsetWidth}px`;
                suggestionsContainer.style.display = "block";
            }
            
        })
        .catch((error) => {
            console.error("Error fetching user suggestions:", error);
        });
}

function showMapDifficultySuggestions(event) {
    const input = event.target;
    const parentCard = input.closest(".map-card");

    const difficulties = ["Easy -", "Easy", "Easy +", "Medium -", "Medium", "Medium +", "Hard -", "Hard", "Hard +", "Very Hard -", "Very Hard", "Very Hard +", "Extreme -", "Extreme", "Extreme +", "Hell"];

    let suggestionsContainer = parentCard.querySelector(".map-difficulty-suggestions-container");

    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement("div");
        suggestionsContainer.className = "map-difficulty-suggestions-container";
        parentCard.appendChild(suggestionsContainer);
    }

    suggestionsContainer.innerHTML = "";

    difficulties.forEach((difficulty) => {
        const suggestion = document.createElement("div");
        suggestion.textContent = difficulty;
        suggestion.classList.add("suggestion-item");
        suggestion.onclick = () => {
            input.textContent = difficulty;
            suggestionsContainer.style.display = "none";
        };
        suggestionsContainer.appendChild(suggestion);
    });

    const variantContainer = document.createElement("div");
    variantContainer.className = "variant-options";

    suggestionsContainer.appendChild(variantContainer);

    const rect = input.getBoundingClientRect();
    const parentRect = parentCard.getBoundingClientRect();

    suggestionsContainer.style.position = "absolute";
    suggestionsContainer.style.top = `${rect.bottom - parentRect.top}px`;
    suggestionsContainer.style.left = `${rect.left - parentRect.left}px`;
    suggestionsContainer.style.width = `200px`;
    suggestionsContainer.style.display = "block";
}

function showMechanicsSuggestions(event) {
    const input = event.target;
    const parentCard = input.closest(".map-card");

    let suggestionsContainer = parentCard.querySelector(".mechanics-suggestions-container");

    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement("div");
        suggestionsContainer.className = "mechanics-suggestions-container";
        parentCard.appendChild(suggestionsContainer);
    }

    suggestionsContainer.innerHTML = "";

    const currentMechanics = input.textContent
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

    fetch(`api/autocomplete/getMapMechanicsAutoComplete.php`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data) || data.length === 0) {
                suggestionsContainer.style.display = "none";
                return;
            }

            data.forEach((mechanic) => {
                const itemContainer = document.createElement("div");
                itemContainer.classList.add("suggestion-item");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = mechanic.name;
                checkbox.checked = currentMechanics.includes(mechanic.name);
                checkbox.style.marginRight = "10px";

                const label = document.createElement("label");
                label.textContent = mechanic.name;

                itemContainer.addEventListener("click", () => {
                    checkbox.checked = !checkbox.checked;

                    const mechanicValue = mechanic.name;

                    if (checkbox.checked) {
                        if (!currentMechanics.includes(mechanicValue)) {
                            currentMechanics.push(mechanicValue);
                        }
                    } else {
                        const index = currentMechanics.indexOf(mechanicValue);
                        if (index > -1) {
                            currentMechanics.splice(index, 1);
                        }
                    }

                    input.textContent = currentMechanics.join(", ");
                });

                itemContainer.appendChild(checkbox);
                itemContainer.appendChild(label);

                suggestionsContainer.appendChild(itemContainer);
            });

            const rect = input.getBoundingClientRect();
            const parentRect = parentCard.getBoundingClientRect();
            suggestionsContainer.style.position = "absolute";
            suggestionsContainer.style.top = `${rect.bottom - parentRect.top + 10}px`;
            suggestionsContainer.style.left = `${rect.left - parentRect.left}px`;
            suggestionsContainer.style.width = `200px`;
            suggestionsContainer.style.display = "block";
        })
        .catch((error) => {
            console.error("Error fetching mechanics suggestions:", error);
        });
}

function showRestrictionsSuggestions(event) {
    const input = event.target;
    const parentCard = input.closest(".map-card");

    let suggestionsContainer = parentCard.querySelector(".restrictions-suggestions-container");

    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement("div");
        suggestionsContainer.className = "restrictions-suggestions-container";
        parentCard.appendChild(suggestionsContainer);
    }

    suggestionsContainer.innerHTML = "";

    const currentRestrictions = input.textContent
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

    fetch(`api/autocomplete/getMapRestrictionsAutoComplete.php`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data) || data.length === 0) {
                suggestionsContainer.style.display = "none";
                return;
            }

            data.forEach((restriction) => {
                const itemContainer = document.createElement("div");
                itemContainer.classList.add("suggestion-item");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = restriction.name;
                checkbox.checked = currentRestrictions.includes(restriction.name);
                checkbox.style.marginRight = "10px";

                const label = document.createElement("label");
                label.textContent = restriction.name;

                itemContainer.addEventListener("click", () => {
                    checkbox.checked = !checkbox.checked;

                    const restrictionValue = restriction.name;

                    if (checkbox.checked) {
                        if (!currentRestrictions.includes(restrictionValue)) {
                            currentRestrictions.push(restrictionValue);
                        }
                    } else {
                        const index = currentRestrictions.indexOf(restrictionValue);
                        if (index > -1) {
                            currentRestrictions.splice(index, 1);
                        }
                    }

                    input.textContent = currentRestrictions.join(", ");
                });

                itemContainer.appendChild(checkbox);
                itemContainer.appendChild(label);

                suggestionsContainer.appendChild(itemContainer);
            });

            const rect = input.getBoundingClientRect();
            const parentRect = parentCard.getBoundingClientRect();
            suggestionsContainer.style.position = "absolute";
            suggestionsContainer.style.top = `${rect.bottom - parentRect.top + 10}px`;
            suggestionsContainer.style.left = `${rect.left - parentRect.left}px`;
            suggestionsContainer.style.width = `200px`;
            suggestionsContainer.style.display = "block";
        })
        .catch((error) => {
            console.error("Error fetching restrictions suggestions:", error);
        });
}

function showMapTypesSuggestions(event) {
    const input = event.target;
    let parentCard;
    let suggestionsContainer;

    if (input.id === "map-type-input") {
        parentCard = null;
        suggestionsContainer = document.getElementById("mapTypesSuggestionsContainer");

        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement("div");
            suggestionsContainer.id = "mapTypesSuggestionsContainer";
            suggestionsContainer.className = "map-types-suggestions-container";
            document.body.appendChild(suggestionsContainer);
        }
    } else {
        parentCard = input.closest(".map-card");
        if (!parentCard) {
            console.error("Parent card not found for input:", input);
            return;
        }
        suggestionsContainer = parentCard.querySelector(".map-types-suggestions-container");
        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement("div");
            suggestionsContainer.className = "map-types-suggestions-container";
            parentCard.appendChild(suggestionsContainer);
        }
    }

    suggestionsContainer.innerHTML = "";

    const filterValue = input.value?.trim() || input.textContent?.trim() || "default";

    fetch(`api/autocomplete/getMapTypesAutoComplete.php?value=${encodeURIComponent(filterValue || "")}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Réponse API:", data);

            if (!Array.isArray(data) || data.length === 0) {
                console.log("Pas de réponse de l'API, pas de suggestions");
                suggestionsContainer.style.display = "none";
                return;
            }

            data.forEach((mapType) => {
                const suggestion = document.createElement("div");
                suggestion.textContent = mapType.name;
                suggestion.classList.add("suggestion-item");
                suggestion.onclick = () => {
                    if (input.id === "map-type-input") {
                        input.value = mapType.name;
                    } else {
                        input.textContent = mapType.name;
                    }
                    suggestionsContainer.style.display = "none";
                };
                suggestionsContainer.appendChild(suggestion);
            });

            const rect = input.getBoundingClientRect();
            if (parentCard) {
                const parentRect = parentCard.getBoundingClientRect();
                suggestionsContainer.style.position = "absolute";
                suggestionsContainer.style.top = `${rect.bottom - parentRect.top}px`;
                suggestionsContainer.style.left = `${rect.left - parentRect.left - 2}px`;
                suggestionsContainer.style.width = `200px`;
                suggestionsContainer.style.display = "block";
            } else {
                suggestionsContainer.style.position = "absolute";
                suggestionsContainer.style.top = `${rect.bottom + window.scrollY}px`;
                suggestionsContainer.style.left = `${rect.left + window.scrollX}px`;
                suggestionsContainer.style.width = `${input.offsetWidth}px`;
                suggestionsContainer.style.display = "block";
            }

            console.log("Suggestions affichées");
        })
        .catch((error) => {
            console.error("Error fetching map type suggestions:", error);
        });
}

function setInputValidationClass(input, isValid) {
    if (input.closest('.map-card')) {
        return;
    }

    if (isValid) {
        input.classList.remove("invalid");
        input.classList.add("valid");
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
    }
}

//Affichage suggestions
document.addEventListener("click", (event) => {
    const suggestionsContainers = document.querySelectorAll(
        ".map-name-suggestions-container, .map-code-suggestions-container, .creator-suggestions-container, .map-difficulty-suggestions-container, .dropdown-menu-edit, .mechanics-suggestions-container, .restrictions-suggestions-container, .map-types-suggestions-container"
    );

    suggestionsContainers.forEach((container) => {
        if (!container.contains(event.target) && !container.previousElementSibling?.contains(event.target)) {
            container.style.display = "none";
        }
    });
});

document.addEventListener("click", (event) => {
    if (
        event.target.classList.contains("editable") &&
        event.target.getAttribute("data-field") === "difficulty" &&
        event.target.getAttribute("contenteditable") === "true"
    ) {
        showMapDifficultySuggestions(event);
    }
    if (
        event.target.classList.contains("editable") &&
        event.target.getAttribute("data-field") === "mechanics" &&
        event.target.getAttribute("contenteditable") === "true"
    ) {
        showMechanicsSuggestions(event);
    }

    if (
        event.target.classList.contains("editable") &&
        event.target.getAttribute("data-field") === "restrictions" &&
        event.target.getAttribute("contenteditable") === "true"
    ) {
        showRestrictionsSuggestions(event);
    }

    if (
        event.target.classList.contains("editable") &&
        event.target.getAttribute("data-field") === "map_type" &&
        event.target.getAttribute("contenteditable") === "true"
    ) {
        showMapTypesSuggestions(event);
    }
});

document.addEventListener("input", (event) => {
    if (event.target.classList.contains("editable") && event.target.getAttribute("data-field") === "map_code") {
        showMapCodeSuggestions(event);
    }

    if (event.target.classList.contains("editable") && event.target.getAttribute("data-field") === "map_name") {
        showMapNameSuggestions(event);
    }

    if (event.target.classList.contains("editable") && event.target.getAttribute("data-field") === "creator") {
        showUsersSuggestions(event);
    }

    if (event.target.classList.contains("editable") && event.target.getAttribute("data-field") === "difficulty") {
        showMapDifficultySuggestions(event);
    }

    if (event.target.classList.contains("editable") && event.target.getAttribute("data-field") === "mechanics") {
        showMechanicsSuggestions(event);
    }

    if (event.target.classList.contains("editable") && event.target.getAttribute("data-field") === "restrictions") {
        showRestrictionsSuggestions(event);
    }

    if (event.target.classList.contains("editable") && event.target.getAttribute("data-field") === "map_type") {
        showMapTypesSuggestions(event);
    }

    if (event.target.classList.contains("action-input-code")) {
        showMapCodeSuggestions(event);
    }
});

//Submit map 
document.getElementById("submit-map-button").addEventListener("click", () => {
    submitMap();
});

function submitMap() {
    const container = document.getElementById("map-submit-container");

    if (mapResultsContainer) {
        mapResultsContainer.innerHTML = "";
    }
    container.innerHTML = "";

    const mapCard = document.createElement("div");
    mapCard.className = "map-card";
    mapCard.innerHTML = `
        <h3>Submit Map</h3>
        <div class="grid-container">
            <div class="column">
                <p><span class="text"><strong>Name:</strong><span class="editable" data-field="map_name" contenteditable="true" placeholder="Enter map name"></span></span></p>
                <p><span class="text"><strong>Type:</strong><span class="editable" data-field="map_type" contenteditable="true" placeholder="Enter map type"></span></span></p>
                <p><span class="text"><strong>Code:</strong><span class="editable" data-field="map_code" contenteditable="true" placeholder="Enter map code"></span></span></p>
                <p><span class="text"><strong>Creators:</strong><span class="editable" data-field="creator" contenteditable="true" placeholder="Enter creators"></span></span></p>
                <p style="display: none;"><span class="text"><strong>Creators ID:</strong><span class="editable" data-field="creator_id" contenteditable="true"></span></span></p>
                <p><span class="text"><strong>Difficulty:</strong><span class="editable" data-field="difficulty" contenteditable="true" placeholder="Enter difficulty"></span></span></p>
                <p><span class="text"><strong>Checkpoints:</strong><span class="editable" data-field="checkpoints" contenteditable="true" placeholder="Enter checkpoints"></span></span></p>
                <p><span class="text"><strong>Quality:</strong><span class="editable" data-field="quality" contenteditable="true" placeholder="Enter quality"></span></span></p>
            </div>
            <div class="column">
                <p><span class="text"><strong>Gold Time:</strong><span class="editable" data-field="gold" contenteditable="true" placeholder="Enter gold time"></span></span></p>
                <p><span class="text"><strong>Silver Time:</strong><span class="editable" data-field="silver" contenteditable="true" placeholder="Enter silver time"></span></span></p>
                <p><span class="text"><strong>Bronze Time:</strong><span class="editable" data-field="bronze" contenteditable="true" placeholder="Enter bronze time"></span></span></p>
                <p><span class="text"><strong>Mechanics:</strong><span class="editable" data-field="mechanics" contenteditable="true" placeholder="Enter mechanics"></span></span></p>
                <p><span class="text"><strong>Restrictions:</strong><span class="editable" data-field="restrictions" contenteditable="true" placeholder="Enter restrictions"></span></span></p>
                <p><span class="text"><strong>Description:</strong><span class="editable" data-field="description" contenteditable="true" placeholder="Enter description"></span></span></p>
            </div>
        </div>
        <button id="submit-map-button-confirm">Submit</button>
    `;

    container.appendChild(mapCard);
}

document.addEventListener("focusin", (event) => {
    const editableElement = event.target.closest(".editable");
    if (
        editableElement &&
        editableElement.getAttribute("contenteditable") === "true"
    ) {
        const fieldType = editableElement.getAttribute("data-field");

        if (fieldType === "difficulty") {
            showMapDifficultySuggestions({ target: editableElement });
        } else if (fieldType === "mechanics") {
            showMechanicsSuggestions({ target: editableElement });
        } else if (fieldType === "restrictions") {
            showRestrictionsSuggestions({ target: editableElement });
        } else if (fieldType === "map_type") {
            showMapTypesSuggestions({ target: editableElement });
        }
    }
});

document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "submit-map-button-confirm") {
        const mapCard = document.querySelector(".map-card");
        const fields = mapCard.querySelectorAll(".editable");
        let hasError = false;

        fields.forEach((field) => {
            const fieldType = field.getAttribute("data-field");
            const fieldValue = field.textContent.trim();

            if (
                ["map_name", "map_code", "map_type", "creator", "difficulty", "checkpoints", "mechanics", "restrictions"].includes(fieldType) &&
                fieldValue === ""
            ) {
                showErrorMessage(`${fieldType.replace(/_/g, " ")} cannot be empty`);
                console.error(`${fieldType} cannot be empty`);
                hasError = true;
                return;
            }

            if (fieldType === "map_code") {
                if (fieldValue.length < 5 || fieldValue.length > 10) {
                    const errorMessage =
                        fieldValue.length < 5
                            ? "Map code must be at least 5 characters long"
                            : "Map code must be at most 10 characters long";
                    showErrorMessage(errorMessage);
                    console.error("Map code validation failed:", fieldValue);
                    hasError = true;
                }
            } else if (fieldType === "map_name") {
                const mapNameSuggestionsContainer = document.querySelector(".map-name-suggestions-container");
                if (mapNameSuggestionsContainer) {
                    const suggestions = Array.from(mapNameSuggestionsContainer.querySelectorAll(".suggestion-item"))
                        .map((item) => item.textContent.trim());

                    if (!suggestions.includes(fieldValue)) {
                        showErrorMessage(`Map name "${fieldValue}" is not in the suggestions`);
                        console.error("Map name not found in suggestions:", fieldValue);
                        hasError = true;
                    }
                }
            } else if (fieldType === "creator") {
                const nicknameSuggestionsContainer = document.querySelector(".creator-suggestions-container");
                if (nicknameSuggestionsContainer) {
                    const suggestions = Array.from(nicknameSuggestionsContainer.querySelectorAll(".suggestion-item"))
                        .map((item) => item.textContent.trim());

                    if (!suggestions.includes(fieldValue)) {
                        showErrorMessage(`Creator "${fieldValue}" is not in the suggestions`);
                        console.error("Creator not found in suggestions:", fieldValue);
                        hasError = true;
                    }
                }
            } else if (fieldType === "difficulty") {
                const validDifficulties = [
                    "Easy -", "Easy", "Easy +",
                    "Medium -", "Medium", "Medium +",
                    "Hard -", "Hard", "Hard +",
                    "Very Hard -", "Very Hard", "Very Hard +",
                    "Extreme -", "Extreme", "Extreme +",
                    "Hell"
                ];

                if (!validDifficulties.includes(fieldValue)) {
                    showErrorMessage(`Difficulty "${fieldValue}" is not valid`);
                    console.error("Invalid difficulty:", fieldValue);
                    hasError = true;
                }
            } else if (fieldType === "checkpoints") {
                const checkpointsValue = parseInt(fieldValue, 10);
                if (!/^\d+$/.test(fieldValue) || checkpointsValue <= 0 || checkpointsValue >= 500) {
                    showErrorMessage("Checkpoints must be a numeric value greater than 0");
                    console.error("Checkpoints validation failed:", fieldValue);
                    hasError = true;
                }
            } else if (fieldType === "mechanics") {
                const mechanicsSuggestionsContainer = document.querySelector(".mechanics-suggestions-container");
                if (mechanicsSuggestionsContainer) {
                    const validMechanics = Array.from(mechanicsSuggestionsContainer.querySelectorAll(".suggestion-item"))
                        .map((item) => item.textContent.trim());

                    const enteredMechanics = fieldValue.split(",").map((item) => item.trim());
                    const invalidMechanics = enteredMechanics.filter((mechanic) => !validMechanics.includes(mechanic));

                    if (invalidMechanics.length > 0) {
                        showErrorMessage(`Invalid mechanics: ${invalidMechanics.join(", ")}`);
                        console.error("Invalid mechanics found:", invalidMechanics);
                        hasError = true;
                    }
                }
            } else if (fieldType === "restrictions") {
                const restrictionsSuggestionsContainer = document.querySelector(".restrictions-suggestions-container");
                if (restrictionsSuggestionsContainer) {
                    const validRestrictions = Array.from(restrictionsSuggestionsContainer.querySelectorAll(".suggestion-item"))
                        .map((item) => item.textContent.trim());

                    const enteredRestrictions = fieldValue.split(",").map((item) => item.trim());
                    const invalidRestrictions = enteredRestrictions.filter((restriction) => !validRestrictions.includes(restriction));

                    if (invalidRestrictions.length > 0) {
                        showErrorMessage(`Invalid restrictions: ${invalidRestrictions.join(", ")}`);
                        console.error("Invalid restrictions found:", invalidRestrictions);
                        hasError = true;
                    }
                }
            } else if (fieldType === "guide") {
                const allGuides = mapCard.querySelectorAll(".editable[data-field='guide']");
                allGuides.forEach((guide) => {
                    const guideValue = guide.textContent.trim();
                    if (!guideValue.startsWith("https://")) {
                        showErrorMessage("The guide must start with 'https://'");
                        console.error("Guide validation failed:", guideValue);
                        hasError = true;
                    }
                });
            } else if (fieldType === "map_type") {
                const mapTypeSuggestionsContainer = document.querySelector(".map-types-suggestions-container");
                if (mapTypeSuggestionsContainer) {
                    const suggestions = Array.from(mapTypeSuggestionsContainer.querySelectorAll(".suggestion-item"))
                        .map((item) => item.textContent.trim());

                    if (!suggestions.includes(fieldValue)) {
                        showErrorMessage("Incorrect map type");
                        console.error("Map type not found in suggestions:", fieldValue);
                        hasError = true;
                    }
                }
            } else if (fieldType === "quality") {
                const qualityValue = parseFloat(fieldValue);
                if (isNaN(qualityValue) || qualityValue < 0 || qualityValue > 6) {
                    showErrorMessage("Quality must be a number between 0 and 6");
                    console.error("Quality validation failed:", fieldValue);
                    hasError = true;
                }
            }
        });

        if (!hasError) {
            mapSubmitContainer.style.display = "none";
            console.log("Le formulaire est valide, submit accepté");
        } else {
            console.error("Form validation failed.");
        }
    }
});

// User edit
document.getElementById("user-search-button").addEventListener("click", validateAndSearch);

function validateAndSearch() {
    const userNameInput = document.getElementById("user-name-input").value.trim();
    const suggestionsContainer = document.getElementById("userSuggestionsContainer");

    if (!userNameInput) {
        showErrorMessage("Please enter a user name to search");
        return;
    }

    if (!suggestionsContainer || suggestionsContainer.children.length === 0) {
        showErrorMessage("No suggestions available. Please select a valid user from the suggestions");
        return;
    }

    const suggestions = Array.from(suggestionsContainer.querySelectorAll(".suggestion-item")).map(
        (item) => item.textContent.trim()
    );

    if (!suggestions.includes(userNameInput)) {
        showErrorMessage(`"${userNameInput}" is not a valid user. Please select a user from the suggestions`);
        return;
    }

    userEdit();
}


function userEdit() {
    const userNameInput = document.getElementById("user-name-input").value.trim();
    
    if (!userNameInput) {
        return;
    }

    const container = document.querySelector(".user-edit-container");
    container.innerHTML = "";

    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.innerHTML = `
        <h3>${userNameInput}</h3>
        <div class="button-options">
            <button id="remove-user-record" class="option-button">Remove User Record</button>
            <button id="change-user-name" class="option-button">Change User Name</button>
        </div>
        <div class="user-action-container"></div>
    `;

    container.appendChild(userCard);

    const optionButtons = document.querySelectorAll(".option-button");

    function deselectButtons() {
        optionButtons.forEach((button) => {
            button.classList.remove("selected");
        });
    }

    document.getElementById("remove-user-record").addEventListener("click", () => {
        deselectButtons();
        document.getElementById("remove-user-record").classList.add("selected");
        displayUserActionField(userCard, "Enter map code", "remove-user-confirm");
    });

    document.getElementById("change-user-name").addEventListener("click", () => {
        deselectButtons();
        document.getElementById("change-user-name").classList.add("selected");
        displayUserActionField(userCard, "New user name", "change-user-confirm");
    });
}

function displayUserActionField(userCard, placeholder, confirmId) {
    const actionContainer = userCard.querySelector(".user-action-container");

    actionContainer.innerHTML = "";

    const actionField = document.createElement("div");
    actionField.className = "action-field";
    actionField.style.display = "flex";
    actionField.style.alignItems = "center";
    actionField.style.justifyContent = "space-between";
    actionField.style.marginTop = "10px";
    actionField.style.gap = "10px";

    const inputClass = confirmId === "remove-user-confirm" ? "action-input-code" : "action-input-name";

    actionField.innerHTML = `
        <input type="text" class="action-input ${inputClass}" placeholder="${placeholder}">
        <button id="${confirmId}" class="confirm-button-user">Confirm</button>
    `;

    actionContainer.appendChild(actionField);

    document.getElementById(confirmId).addEventListener("click", () => {
        const inputField = actionField.querySelector(`.${inputClass}`);
        const inputValue = inputField?.value.trim();

        if (!inputValue) {
            showErrorMessage("Please fill in the required field");
            return;
        }

        if (confirmId === "remove-user-confirm") {
            const suggestionsContainer = userCard.querySelector(".map-code-suggestions-container");

            const suggestions = Array.from(suggestionsContainer.querySelectorAll(".suggestion-item"))
                .map((item) => item.textContent.trim())
                .filter((text) => text.length > 0);

            if (!suggestions.includes(inputValue)) {
                showErrorMessage("The entered map code is not valid. Please select from the suggestions");
                return;
            }

            showConfirmationMessage(`Removing user record for map code: ${inputValue}`);
        } else if (confirmId === "change-user-confirm") {
            showConfirmationMessage(`Changing user name to: ${inputValue}`);
        }

        actionField.innerHTML = "";
    });
}

// User edit others
document.getElementById("user-options-button").addEventListener("click", setupOthersOptions);

function setupOthersOptions() {
    const container = document.querySelector(".user-edit-container");

    container.innerHTML = "";

    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.style.display = "flex";

    userCard.innerHTML = `
        <div class="button-options">
            <button id="create-fake-member" class="option-button">Create Fake Member</button>
            <button id="remove-fake-member" class="option-button">Remove Fake Member</button>
            <button id="link-member" class="option-button">Link Member</button>
        </div>
        <div class="user-action-container"></div>
    `;

    container.appendChild(userCard);

    const optionButtons = document.querySelectorAll(".option-button");

    function deselectButtons() {
        optionButtons.forEach((button) => {
            button.classList.remove("selected");
        });
    }

    document.getElementById("create-fake-member").addEventListener("click", () => {
        deselectButtons();
        document.getElementById("create-fake-member").classList.add("selected");
        displayActionField(
            "Enter fake member name",
            "create-fake-member-confirm",
            ["Fake member name"]
        );
    });

    document.getElementById("remove-fake-member").addEventListener("click", () => {
        deselectButtons();
        document.getElementById("remove-fake-member").classList.add("selected");
        displayActionField(
            "Enter fake member name to remove",
            "remove-fake-member-confirm",
            ["Fake member name"],
            true
        );
    });

    document.getElementById("link-member").addEventListener("click", () => {
        deselectButtons();
        document.getElementById("link-member").classList.add("selected");
        displayActionField(
            "Link fake member to user",
            "link-member-confirm",
            ["Fake member name", "Member name/discord id"],
            true
        );
    });
}

function displayActionField(placeholder, confirmId, inputPlaceholders, showSuggestions = false) {
    const userActionContainer = document.querySelector(".user-action-container");

    userActionContainer.innerHTML = "";

    const actionFields = inputPlaceholders
        .map((ph, index) => {
            const isUserSuggestionInput = showSuggestions && (index === 0 || index === 1);
            return `
            <div class="action-field">
                <input type="text" 
                       class="action-input ${isUserSuggestionInput ? "user-suggestion-input" : ""}" 
                       placeholder="${ph}">
                ${index === inputPlaceholders.length - 1 ? `
                    <button id="${confirmId}" class="confirm-button-others" 
                            style="padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Confirm
                    </button>` : ""}
            </div>
            `;
        })
        .join("");

    userActionContainer.innerHTML = actionFields;

    const suggestionInputs = userActionContainer.querySelectorAll(".user-suggestion-input");
    suggestionInputs.forEach((input) => {
        input.addEventListener("input", (event) => {
            console.log("Triggering suggestions for user-suggestion-input");
            showUsersSuggestions(event);
        });
    });

    document.querySelectorAll(`#${confirmId}`).forEach((button) => {
        button.addEventListener("click", () => {
            const parentContainer = button.closest(".user-action-container");
            const inputs = Array.from(parentContainer.querySelectorAll(".action-input"));
            const values = inputs.map((input) => input.value.trim());
    
            let invalidInputs = [];
    
            if (confirmId !== "link-member-confirm") {
                inputs.forEach((input) => {
                    if (input.classList.contains("user-suggestion-input")) {
                        const suggestionsContainer = document.querySelector(".creator-suggestions-container");
                        if (suggestionsContainer) {
                            const suggestions = Array.from(
                                suggestionsContainer.querySelectorAll(".suggestion-item")
                            ).map((item) => item.textContent.trim());
    
                            if (!suggestions.includes(input.value.trim())) {
                                invalidInputs.push(input.value.trim());
                            }
                        }
                    }
                });
    
                if (invalidInputs.length > 0) {
                    showErrorMessage(
                        `Invalid input(s): ${invalidInputs.join(", ")}. Please select valid suggestions`
                    );
                    return;
                }
            } else {
                const allValid = inputs.every(input => input.classList.contains("valid"));
    
                if (!allValid) {
                    showErrorMessage("Please ensure all inputs are valid");
                    return;
                }
            }
    
            if (confirmId === "create-fake-member-confirm") {
                showConfirmationMessage(`Fake member "${values[0]}" created`);
            } else if (confirmId === "remove-fake-member-confirm") {
                showConfirmationMessage(`Fake member "${values[0]}" removed`);
            } else if (confirmId === "link-member-confirm") {
                showConfirmationMessage(`Fake member "${values[0]}" linked to "${values[1]}"`);
            }
    
            parentContainer.innerHTML = "";
        });
    });    
}

//Edit multiple
document.getElementById("edit-multiple-btn").addEventListener("click", setupMultipleCardOptions);

function setupMultipleCardOptions() {
    let container = document.getElementById("user-edit-multiple-container");

    if (!container) {
        console.error("Conteneur '#user-edit-multiple-container' introuvable.");
        return;
    }

    container.innerHTML = "";

    const multipleOptionsCard = document.createElement("div");
    multipleOptionsCard.className = "multiple-card";
    multipleOptionsCard.style.display = "flex";

    multipleOptionsCard.innerHTML = `
        <div class="option-buttons-group">
            <button id="archive-multiple" class="map-option-btn">Archive</button>
            <button id="unarchive-multiple" class="map-option-btn">Unarchive</button>
            <button id="convert-legacy-multiple" class="map-option-btn">Convert Legacy</button>
        </div>
        <div class="map-code-container"></div>
        <div class="map-actions-container hidden">
            <button id="add-map-code" class="add-map-btn">+</button>
            <button id="confirm-map-codes" class="confirm-map-btn">Confirm</button>
        </div>
    `;

    container.appendChild(multipleOptionsCard);

    const optionButtons = document.querySelectorAll(".map-option-btn");
    const actionButtonsContainer = document.querySelector(".map-actions-container");

    function deselectButtons() {
        optionButtons.forEach((button) => button.classList.remove("selected"));
    }

    function showActionButtons() {
        actionButtonsContainer.classList.remove("hidden");
    }

    document.getElementById("archive-multiple").addEventListener("click", () => {
        deselectButtons();
        document.getElementById("archive-multiple").classList.add("selected");
        displayMapCodeFields();
        showActionButtons();
    });

    document.getElementById("unarchive-multiple").addEventListener("click", () => {
        deselectButtons();
        document.getElementById("unarchive-multiple").classList.add("selected");
        displayMapCodeFields();
        showActionButtons();
    });

    document.getElementById("convert-legacy-multiple").addEventListener("click", () => {
        deselectButtons();
        document.getElementById("convert-legacy-multiple").classList.add("selected");
        displayMapCodeFields();
        showActionButtons();
    });

    document.getElementById("add-map-code").addEventListener("click", addMapCodeField);
    document.getElementById("confirm-map-codes").addEventListener("click", confirmMapCodes);
}

function displayMapCodeFields() {
    const mapCodeContainer = document.querySelector(".map-code-container");
    mapCodeContainer.innerHTML = ""; 
    addMapCodeField(); 
}

function addMapCodeField() {
    const mapCodeContainer = document.querySelector(".map-code-container");
    const existingInputs = mapCodeContainer.querySelectorAll(".multiple-input-code");

    if (existingInputs.length >= 10) {
        showErrorMessage("Maximum 10 map codes allowed");
        return;
    }

    const mapCodeField = document.createElement("div");
    mapCodeField.className = "map-code-field";

    mapCodeField.innerHTML = `
        <input type="text" class="multiple-input-code" placeholder="Enter map code">
        <div class="map-code-suggestions-container" style="display: none;"></div>
    `;

    mapCodeContainer.appendChild(mapCodeField);

    //console.log("Field added:", mapCodeContainer.innerHTML);

    const input = mapCodeField.querySelector(".multiple-input-code");
    const suggestionsContainer = mapCodeField.querySelector(".map-code-suggestions-container");

    input.addEventListener("input", (event) => {
        showMapCodeSuggestions(event, suggestionsContainer);
    });
}


function confirmMapCodes() {
    const inputs = Array.from(document.querySelectorAll(".multiple-input-code"));
    const mapCodeContainer = document.querySelector(".map-code-container");

    if (inputs.length === 0) {
        showErrorMessage("Please enter at least one map code.");
        return;
    }

    let hasErrors = false;
    let confirmedCodes = new Set();
    let duplicates = new Set();

    inputs.forEach((input) => {
        const code = input.value.trim();

        if (input.classList.contains("invalid") || code === "") {
            //console.error(`Invalid or empty map code: ${code}`);
            input.classList.add("invalid");
            hasErrors = true;
        } else if (input.classList.contains("valid")) {
            if (confirmedCodes.has(code)) {
                console.error(`Duplicate map code detected: ${code}`);
                input.classList.add("invalid");
                duplicates.add(code);
                hasErrors = true;
            } else {
                confirmedCodes.add(code);
                input.classList.remove("invalid");
            }
        } else {
            console.error(`Map code validation missing for: ${code}`);
            input.classList.add("invalid");
            hasErrors = true;
        }
    });

    if (duplicates.size > 0) {
        showErrorMessage(`Duplicate map codes found: ${Array.from(duplicates).join(", ")}`);
        return;
    }

    if (hasErrors) {
        showErrorMessage("Please correct invalid or empty map codes");
        return;
    }

    showConfirmationMessage(`Action confirmed for map codes: ${Array.from(confirmedCodes).join(", ")}`);
}

//Submit map ep
document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "submit-map-button-confirm") {
        handleSubmitMap();
    }
});

function handleSubmitMap() {
    const editableFields = document.querySelectorAll(".editable");

    const mapData = {};
    editableFields.forEach((field) => {
        let fieldName = field.getAttribute("data-field");
        let fieldValue = field.textContent.trim();

        if (fieldName === "creator") {
            fieldName = "nickname";
        }

        if (["checkpoints", "gold", "silver", "bronze"].includes(fieldName)) {
            fieldValue = fieldValue.trim() === "" ? null : parseFloat(fieldValue);
        }

        if (["mechanics", "restrictions"].includes(fieldName)) {
            fieldValue = fieldValue ? fieldValue.split(",").map((item) => item.trim()) : [];
        }

        mapData[fieldName] = fieldValue || null;
    });

    fetch("api/moderator/setSubmitMap.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mapData),
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    console.error("Erreur API :", error);
                    throw new Error("Erreur lors de l'envoi de la carte");
                });
            }
            return response.json();
        })
        .then((data) => {
            showConfirmationMessage("Map has been submitted");
        })
        .catch((error) => {
            console.error("Erreur lors de la soumission de la carte :", error);
        });
}

//Archive ep
document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "confirm-map-codes") {
        const archiveButton = document.getElementById("archive-multiple");
        const unarchiveButton = document.getElementById("unarchive-multiple");

        if (archiveButton && archiveButton.classList.contains("selected")) {
            handleArchive();
        } else if (unarchiveButton && unarchiveButton.classList.contains("selected")) {
            handleUnarchive();
        }
    }
});

function handleArchive() {
    const mapCodeInputs = document.querySelectorAll(".multiple-input-code");

    if (mapCodeInputs.length === 0) {
        showErrorMessage("No map codes available to archive");
        return;
    }

    const mapCodes = [];

    mapCodeInputs.forEach((input, index) => {
        const mapCode = input.value.trim();

        if (mapCode) {
            mapCodes.push({ map_code: mapCode });
            input.classList.remove("invalid");
        } else {
            input.classList.add("invalid");
        }
    });

    if (mapCodes.length === 0) {
        return;
    }

    fetch("api/moderator/setArchive.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mapCodes),
    })
        .then((response) => {
            if (response.status === 201) {
                return { success: true, data: {} };
            } else if (response.ok) {
                return response.json().then((data) => ({ success: data.success || true, data }));
            } else {
                return response.json().then((error) => {
                    console.error("API Error:", error);
                    throw new Error(error.message || "Failed to archive maps.");
                });
            }
        })
        .then(({ success, data }) => {
            //console.log("API Response Success:", success, "Data:", data);

            if (success) {
                mapCodeInputs.forEach((input) => {
                    input.value = "";
                    input.classList.remove("invalid");
                });
            } else {
                showErrorMessage(data.message || "An error occurred while archiving maps.");
            }
        })
        .catch((error) => {
            showErrorMessage("Failed to archive maps. Please try again");
        });
}

//Unarchive ep 
function handleUnarchive() {
    const mapCodeInputs = document.querySelectorAll(".multiple-input-code");

    if (mapCodeInputs.length === 0) {
        return;
    }

    const mapCodes = [];

    mapCodeInputs.forEach((input, index) => {
        const mapCode = input.value.trim();

        if (mapCode) {
            mapCodes.push({ map_code: mapCode });
            input.classList.remove("invalid");
        } else {
            input.classList.add("invalid");
        }
    });

    if (mapCodes.length === 0) {
        return;
    }

    fetch("api/moderator/setUnarchive.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mapCodes),
    })
        .then((response) => {
            if (response.status === 201) {
                return { success: true, data: {} };
            } else if (response.ok) {
                return response.json().then((data) => ({ success: data.success || true, data }));
            } else {
                return response.json().then((error) => {
                    console.error("API Error:", error);
                    throw new Error(error.message || "Failed to archive maps.");
                });
            }
        })
        .then(({ success, data }) => {

            if (success) {
                mapCodeInputs.forEach((input) => {
                    input.value = "";
                    input.classList.remove("invalid");
                });
            } else {
                showErrorMessage(data.message || "An error occurred while archiving maps.");
            }
        })
        .catch((error) => {
            showErrorMessage("Failed to archive maps. Please try again.");
        });
}