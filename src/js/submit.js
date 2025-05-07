let translations = {};
let addingSecondaryCreator = false;

// --------- CONFIG & UTIL --------
const sectionIds = ['submitRecord', 'playtest', 'submitMap'];

const CATEGORY_OPTIONS = [
    { text: () => t("filters_toolbar.classic"), value: "Classic", raw: "Classic" },
    { text: () => t("filters_toolbar.increasing_difficulty"), value: "Increasing Difficulty", raw: "Increasing Difficulty" },
    { text: () => t("filters_toolbar.tournament"), value: "Tournament", raw: "Tournament" }
];

const DIFFICULTY_OPTIONS = [
    { text: () => t("filters_toolbar.beginner"), value: "Beginner", raw:"Beginner" },
    { text: () => t("filters_toolbar.easy"), value: "Easy", raw:"Easy" },
    { text: () => t("filters_toolbar.medium"), value: "Medium", raw:"Medium" },
    { text: () => t("filters_toolbar.hard"), value: "Hard", raw:"Hard" },
    { text: () => t("filters_toolbar.very_hard"), value: "Very Hard", raw:"Very Hard" },
    { text: () => t("filters_toolbar.extreme"), value: "Extreme", raw:"Extreme" },
    { text: () => t("filters_toolbar.hell"), value: "Hell", raw:"Hell" }
];

//--------- TRAD -------
async function loadTranslations() {
    try {
        const response = await fetch("translations/translations.json");
        const data = await response.json();
        const currentLangData = data[currentLang] || {};
        const { thead = {}, pagination = {}, popup = {}, filters_toolbar = {}, chart = {}, mechanics = {}, restrictions = {}, map_name = {}, map_type = {} } = currentLangData;
        translations = { thead, pagination, popup, filters_toolbar, chart, mechanics, restrictions, map_name, map_type };
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

function t(path, params = {}) {
    const parts = path.split('.');
    let result = translations;
    for (const part of parts) {
        result = result?.[part];
        if (!result) break;
    }
    if (!result) return path;
    for (const key in params) {
        result = result.replace(`{${key}}`, params[key]);
        if (!result) {
            console.error(`Clé de traduction introuvable: ${path}`);
            return path;
        }
    }
    return result;
}

// --------- TAB SYSTEM -------
function setupTabs() {
    selectSection('submitRecord');
}

function selectSection(section) {
    sectionIds.forEach(sec => {
        document.getElementById(sec + 'Section').style.display = sec === section ? '' : 'none';
        document.getElementById(sec + 'Btn').classList.toggle('active', sec === section);
    });
}

// ============= SUBMIT MAP =============
// --------- REMPLISSAGE DROPDOWNS ---------
function populateRadioDropdown(dropdownId, options, groupName, placeholder) {
    const list = document.querySelector(`#${dropdownId} .custom-multiselect-list`);
    if (list) {
        list.innerHTML = '';
        options.forEach(opt => {
            const displayText = typeof opt.text === 'function' ? opt.text() : opt.text;
            const label = document.createElement('label');
            label.innerHTML = `<input type="radio" name="${groupName}" value="${opt.value}" required> ${displayText}`;
            list.appendChild(label);
        });
    }
}

function populateStaticDropdowns() {
    populateRadioDropdown('difficultyDropdown', DIFFICULTY_OPTIONS, 'difficulty', t('filters_toolbar.difficulty'));
    populateRadioDropdown('categoryDropdown', CATEGORY_OPTIONS, 'category', t('filters_toolbar.map_type'));
}

// ------------ DYNAMIQUE (Mechanics/Restrictions) --------------
async function fillMechanicsAndRestrictions() {
    try {
        const [restrictionsResponse, mechanicsResponse] = await Promise.all([
            fetch('./api/autocomplete/getMapRestrictionsAutoComplete.php'),
            fetch('./api/autocomplete/getMapMechanicsAutoComplete.php')
        ]);
        const restrictionsData = await restrictionsResponse.json();
        const mechanicsData = await mechanicsResponse.json();

        let mechanicsOptions = Array.isArray(mechanicsData) ? mechanicsData.map(opt=>opt.name) : [];
        let restrictionsOptions = Array.isArray(restrictionsData) ? restrictionsData.map(opt=>opt.name) : [];

        if(currentLang === "cn") {
            mechanicsOptions = mechanicsOptions.map(option => ({
                translated: t(`mechanics.${option.toLowerCase().replace(/ /g, '_')}`) || option,
                raw: option
            }));
            restrictionsOptions = restrictionsOptions.map(option => ({
                translated: t(`restrictions.${option.toLowerCase().replace(/ /g, '_')}`) || option,
                raw: option
            }));
        } else {
            mechanicsOptions = mechanicsOptions.map(option => ({
                translated: option,
                raw: option
            }));
            restrictionsOptions = restrictionsOptions.map(option => ({
                translated: option,
                raw: option
            }));
        }

        const mechanicsList = document.querySelector('#mechanicsDropdown .custom-multiselect-list');
        if(mechanicsList){
            mechanicsList.innerHTML = '';
            mechanicsOptions.forEach(opt => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="checkbox" value="${opt.raw}" name="mechanics[]"> ${opt.translated}`;
                mechanicsList.appendChild(label);
            });
        }
        const restrictionsList = document.querySelector('#restrictionsDropdown .custom-multiselect-list');
        if(restrictionsList){
            restrictionsList.innerHTML = '';
            restrictionsOptions.forEach(opt => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="checkbox" value="${opt.raw}" name="restrictions[]"> ${opt.translated}`;
                restrictionsList.appendChild(label);
            });
        }
    } catch (err) {
    }
}
async function loadDynamicOptions() {
    await fillMechanicsAndRestrictions();
}

// ---------- DROPDOWNS CUSTOM  --------------
function setupAllCustomDropdowns() {
    setupCustomMultiselect('difficultyDropdown', t('filters_toolbar.difficulty'));
    setupCustomMultiselect('categoryDropdown', t('filters_toolbar.map_type'));
    setupCustomMultiselect('mechanicsDropdown', t('filters_toolbar.mechanics') || "Select...");
    setupCustomMultiselect('restrictionsDropdown', t('filters_toolbar.restrictions') || "Select...");
}
function setupCustomMultiselect(id, placeholderText = "Select...") {
    const container = document.getElementById(id);
    if (!container) return;
    const btn = container.querySelector('.custom-multiselect-btn');
    const list = container.querySelector('.custom-multiselect-list');
    const radios = list.querySelectorAll('input[type="radio"]');
    const checkboxes = list.querySelectorAll('input[type="checkbox"]');
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.custom-multiselect').forEach(drop=>{
            if(drop!==container) drop.classList.remove('open');
        });
        container.classList.toggle('open');
    });
    function updateButton() {
        if (radios.length) {
            let selected = Array.from(radios).find(r=>r.checked);
            btn.textContent = selected ? selected.parentNode.textContent.trim() : placeholderText;
        } else if (checkboxes.length) {
            const checked = Array.from(checkboxes).filter(c=>c.checked);
            if (checked.length === 0) {
                btn.textContent = placeholderText;
            } else if (checked.length <= 2) {
                btn.textContent = checked.map(c=>c.parentNode.textContent.trim()).join(', ');
            } else {
                btn.textContent = checked.length + " selected";
            }
        }
    }
    radios.forEach(radio=>{
        radio.addEventListener('change', function() {
            updateButton();
            setTimeout(()=>{container.classList.remove('open');}, 100);
        });
    });
    checkboxes.forEach(box=>{
        box.addEventListener('change', updateButton);
    });
    document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
            container.classList.remove('open');
        }
    });
    updateButton();
}

// ----------- FORM HANDLERS -----------
function setupForms() {
    document.getElementById('submitRecordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        setTimeout(() => { form.reset(); }, 800);
    });
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const form = btn.closest('form');
            if (form) { form.reset(); }
        });
    });
    document.getElementById('playtestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        setTimeout(() => { form.reset(); }, 800);
    });
    document.getElementById('submitMapForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        setTimeout(() => { form.reset(); }, 1200);
    });
}

// ----------- AUTOCOMPLETE (MetaCreator/Map) -----------
function renderSuggestionDisplay(item, config) {
    if (config.type === "creator") {
        return {
            display: item.name,
            raw: item.user_id
        };
    } else if (config.type === "map") {
        return {
            display: item.translated_map_name || item.map_name,
            raw: item.map_name
        };
    }
    return {display: "", raw: ""};
}

function setupAutocompleteInline(input, suggestionsDropdown, config) {
    let debounceTimeout;

    input.addEventListener("input", function() {
        const filterValue = input.value.trim();
        clearTimeout(debounceTimeout);
        if (filterValue.length < 2) {
            suggestionsDropdown.style.display = "none";
            return;
        }
        debounceTimeout = setTimeout(() => {
            const locale = currentLang === 'cn' ? 'cn' : currentLang === 'jp' ? 'en' : 'en';
            fetch(`${config.url}?value=${encodeURIComponent(filterValue)}&locale=${locale}&page_size=10`)
                .then(resp => resp.ok ? resp.json() : [])
                .then(data => {
                    suggestionsDropdown.innerHTML = "";
                    if (!Array.isArray(data) || data.length === 0) {
                        suggestionsDropdown.style.display = "none";
                        return;
                    }
                    data.forEach(item => {
                        const {display, raw} = renderSuggestionDisplay(item, config);
                        if (display) {
                            const suggestion = document.createElement("div");
                            suggestion.textContent = display;
                            suggestion.classList.add("suggestion-item");
                            suggestion.setAttribute("data-raw-value", raw);
                            suggestion.addEventListener("mousedown", (e) => {
                                e.preventDefault();
                                input.value = display;
                                input.setAttribute("data-raw-value", raw);
                                suggestionsDropdown.style.display = "none";
                            });
                            suggestionsDropdown.appendChild(suggestion);
                        }
                    });
                    suggestionsDropdown.style.display = suggestionsDropdown.children.length > 0 ? "block" : "none";
                })
                .catch(() => {
                    suggestionsDropdown.style.display = "none";
                });
        }, 200);
    });

    input.addEventListener("blur", function() {
        setTimeout(() => {
            suggestionsDropdown.style.display = "none";
        }, 150);
    });
}

// ---------- INLINE EDIT (AVEC AUTOCOMPLETE) ----------------
function editInline(field) {
    const label = document.getElementById(field);
    if (!label) return;
    if (label.classList.contains('editing')) return;

    const text = label.textContent;
    label.classList.add('editing');
    let input, suggestionsDropdown, inputWrapper;
    if (field === 'optDescription' || field === 'optGuide') {
        input = document.createElement('textarea');
        input.rows = 2;
        input.style.resize = 'vertical';
    } else if (field === 'metaCheckpoints') {
        input = document.createElement('input');
        input.type = 'number';
    } else if (field === 'metaCreator' || field === 'metaMap') {
        input = document.createElement('input');
        input.type = 'text';
        input.value = text === "N/A" ? "" : text;
        input.id = (field === 'metaCreator') ? "creatorInputInline" : "mapInputInline";
        input.autocomplete = "off";
        const wrp = document.createElement('span');
        wrp.style.position = "relative";
        wrp.style.display = "inline-block";
        wrp.appendChild(input);

        suggestionsDropdown = document.createElement('div');
        suggestionsDropdown.className = "suggestions-dropdown";
        suggestionsDropdown.id = (field === 'metaCreator') ? "creatorSuggestionsInline" : "mapSuggestionsInline";
        suggestionsDropdown.style.display = "none";
        suggestionsDropdown.style.position = "absolute";
        suggestionsDropdown.style.top = "100%";
        suggestionsDropdown.style.left = 0;
        suggestionsDropdown.style.right = 0;
        suggestionsDropdown.style.zIndex = 100;

        wrp.appendChild(suggestionsDropdown);
        inputWrapper = wrp;
    } else {
        input = document.createElement('input');
        input.type = 'text';
        input.value = text === "N/A" ? "" : text;
        inputWrapper = input;
    }
    if (field !== 'metaCreator') input.value = text === "N/A" ? "" : text;
    input.style.marginRight = "0";

    const saveBtn = document.createElement('button');
    saveBtn.type = "button";
    saveBtn.textContent = "Save";
    saveBtn.className = label.classList.contains('block-value') ? "edit-btn accept-btn" : "edit-btn accept-btn";
    saveBtn.onclick = () => validateEdit();
    const cancelBtn = document.createElement('button');
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = label.classList.contains('block-value') ? "edit-btn cancel-btn" : "edit-btn cancel-btn";
    cancelBtn.onclick = () => cancelEdit();

    const parent = label.parentNode;
    label.style.display = "none";
    let buttonEdit = parent.querySelector('button.edit-btn,button.block-edit-btn');
    if (buttonEdit) buttonEdit.style.display = "none";
    const buttonsBox = document.createElement('span');
    buttonsBox.className = "inline-edit-buttons";
    buttonsBox.appendChild(saveBtn);
    buttonsBox.appendChild(cancelBtn)
    const container = document.createElement('span');
    container.className = "inline-edit-container";
    container.style.position = "relative";
    container.appendChild(inputWrapper || input);
    if (suggestionsDropdown && !inputWrapper) container.appendChild(suggestionsDropdown);
    container.appendChild(buttonsBox);

    parent.insertBefore(container, label.nextSibling);

    input.focus();

    function validateEdit() {
        let newValue = input.value.trim();
        if (field === 'optGuide' && newValue === '') newValue = "N/A";
        if (field === 'optDescription' && newValue === '') newValue = "No description yet.";
        if (field === 'metaCheckpoints') {
            if (newValue === "" || isNaN(newValue) || newValue < 0) return input.focus();
        }
        label.textContent = newValue;
        closeEdit();
    }
    function cancelEdit() { closeEdit(); }
    function closeEdit() {
        label.style.display = "";
        if (buttonEdit) buttonEdit.style.display = "";
        label.classList.remove('editing');
        if (container.parentNode) container.parentNode.removeChild(container);
    }
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && input.tagName!=="TEXTAREA") { e.preventDefault(); validateEdit(); }
        if (e.key === 'Escape') cancelEdit();
    });

    if (field === 'metaCreator') {
        setupAutocompleteInline(input, suggestionsDropdown, {type: "creator", url: "api/autocomplete/getUsersAutoComplete.php"});
    } else if (field === 'metaMap') {
        setupAutocompleteInline(input, suggestionsDropdown, {type: "map", url: "api/autocomplete/getMapNamesAutoComplete.php"});
    }
}

// ---------- CREATORS ----------------
async function loadMainCreatorFromUserId(user_id) {
    const main = document.getElementById("metaCreatorMain");
    if (!main) return;
    if (!user_id) {
        main.textContent = "N/A";
        main.removeAttribute('data-raw-id');
        return;
    }
    try {
        const resp = await fetch(`api/settings/getOverwatchUsernames.php?user_id=${encodeURIComponent(user_id)}`);
        const data = await resp.json();
        if (data && Array.isArray(data.usernames) && data.usernames.length > 0) {
            let unameObj = data.usernames.find(u => u.is_primary) || data.usernames[0];
            if(unameObj && unameObj.username) {
                main.textContent = unameObj.username;
                main.setAttribute('data-raw-id', user_id);
                return;
            }
        }
    } catch(e){}
    main.textContent = "N/A";
    main.removeAttribute('data-raw-id');
}

let secondaryCreators = [];

function renderSecondaryCreators() {
    const metaCol = document.getElementById('metaCreatorsCol');
    const mainRow = metaCol?.querySelector('.main-creator-row');
    const addBtn = document.getElementById('addCreatorBtn');

    if (!metaCol || !mainRow) return;

    const prevInputRow = metaCol.querySelector('.creator-secondary input');
    if (addingSecondaryCreator && prevInputRow) {
        prevInputRow.closest('span').remove();
        addingSecondaryCreator = false;
    }

    while (mainRow.nextSibling) {
        metaCol.removeChild(mainRow.nextSibling);
    }

    secondaryCreators.forEach((creator, idx) => {
        let row = document.createElement('span');
        row.className = "meta-value creator-secondary";
    
        let nameSpan = document.createElement('span');
        nameSpan.textContent = creator.name;
        nameSpan.setAttribute('data-raw-id', creator.user_id);
    
        let actions = document.createElement('span');
        actions.className = "creator-secondary-actions";
    
        let editBtn = document.createElement('button');
        editBtn.type = "button";
        editBtn.className = "block-edit-btn";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editSecondaryCreator(idx);
    
        let removeBtn = document.createElement('button');
        removeBtn.type = "button";
        removeBtn.className = "delete-btn";
        removeBtn.textContent = "×";
        removeBtn.title = "Delete";
        removeBtn.onclick = () => {
            secondaryCreators.splice(idx, 1);
            renderSecondaryCreators();
        };
    
        actions.appendChild(editBtn);
        actions.appendChild(removeBtn);
    
        row.appendChild(nameSpan);
        row.appendChild(actions);
    
        metaCol.appendChild(row);
    });

    addBtn.disabled = (secondaryCreators.length >= 2);
}

function showAddSecondaryCreatorInput() {
    const metaCol = document.getElementById('metaCreatorsCol');
    const row = document.createElement('span');
    row.className = "meta-value creator-secondary";
    row.style.display = "flex";
    row.style.gap = "7px";

    const input = document.createElement('input');
    input.type = "text";
    input.autocomplete = "off";
    input.style.width = "150px";

    const sug = document.createElement("div");
    sug.className = "suggestions-dropdown";
    sug.style.display = "none";
    sug.style.position = "absolute";
    sug.style.zIndex = 100;
    sug.style.minWidth = "140px";

    const wrapper = document.createElement("span");
    wrapper.style.position = "relative";
    wrapper.appendChild(input);
    wrapper.appendChild(sug);

    row.appendChild(wrapper);

    const save = document.createElement('button');
    save.type = "button";
    save.textContent = "Save";
    save.className = "edit-btn accept-btn";
    save.onclick = () => {
        let val = input.value.trim();
        if (!val) {
            input.focus();
            return;
        }
        let user_id = input.getAttribute("data-raw-value") || "";
        if (!user_id) user_id = val;
        secondaryCreators.push({name: val, user_id});
        addingSecondaryCreator = false;
        renderSecondaryCreators();
    };
    const cancel = document.createElement('button');
    cancel.type = "button";
    cancel.textContent = "Cancel";
    cancel.className = "edit-btn cancel-btn";
    cancel.onclick = () => {
        row.remove();
        addingSecondaryCreator = false;
    };

    const buttonsBox = document.createElement('span');
    buttonsBox.className = "inline-edit-buttons";
    buttonsBox.appendChild(save);
    buttonsBox.appendChild(cancel);

    row.appendChild(buttonsBox);

    const allSecondaries = metaCol.querySelectorAll('.meta-value.creator-secondary');
    if (allSecondaries.length > 0) {
        allSecondaries[allSecondaries.length - 1].after(row);
    } else {
        const mainRow = metaCol.querySelector('.main-creator-row');
        if (mainRow && mainRow.nextSibling) {
            metaCol.insertBefore(row, mainRow.nextSibling);
        } else {
            metaCol.appendChild(row);
        }
    }

    setupAutocompleteInline(input, sug, {type:"creator", url: "api/autocomplete/getUsersAutoComplete.php"});

    input.focus();

    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") save.click();
        if (e.key === "Escape") cancel.click();
    });
}

function editSecondaryCreator(idx) {
    const metaCol = document.getElementById('metaCreatorsCol');
    const rows = Array.from(metaCol.querySelectorAll('.meta-value.creator-secondary'))
        .filter(row => !row.querySelector('input[type="text"]'));
    const row = rows[idx];
    if (!row) return;

    const origName = row.querySelector('span[data-raw-id]');
    const removeBtn = row.querySelector('button.delete-btn');

    const input = document.createElement("input");
    input.type = "text";
    input.value = secondaryCreators[idx].name;
    input.autocomplete = "off";
    input.style.width = "150px";

    const sug = document.createElement("div");
    sug.className = "suggestions-dropdown";
    sug.style.display = "none";
    sug.style.position = "absolute";
    sug.style.minWidth = "140px";
    sug.style.zIndex = "100";

    const wrapper = document.createElement("span");
    wrapper.style.position = "relative";
    wrapper.appendChild(input);
    wrapper.appendChild(sug);

    const save = document.createElement('button');
    save.type = "button";
    save.textContent = "Save";
    save.className = "edit-btn accept-btn";
    save.onclick = () => {
        let val = input.value.trim();
        if (!val) return input.focus();
        let user_id = input.getAttribute("data-raw-value") || val;
        secondaryCreators[idx] = {name: val, user_id};
        renderSecondaryCreators();
    };

    const cancel = document.createElement('button');
    cancel.type = "button";
    cancel.textContent = "Cancel";
    cancel.className = "edit-btn cancel-btn";
    cancel.onclick = renderSecondaryCreators;

    const buttonsBox = document.createElement('span');
    buttonsBox.className = "inline-edit-buttons";
    buttonsBox.appendChild(save);
    buttonsBox.appendChild(cancel);

    const editRow = document.createElement("span");
    editRow.className = "meta-value creator-secondary";
    editRow.style.display = "flex";
    editRow.style.alignItems = "flex-end";
    editRow.style.gap = "7px";
    editRow.appendChild(wrapper);
    editRow.appendChild(buttonsBox);

    row.replaceWith(editRow);

    setupAutocompleteInline(input, sug, {type:"creator", url: "api/autocomplete/getUsersAutoComplete.php"});

    input.focus();
    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") save.click();
        if (e.key === "Escape") cancel.click();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addCreatorBtn").onclick = function() {
        if (secondaryCreators.length >= 2 || addingSecondaryCreator) return;
        addingSecondaryCreator = true;
        showAddSecondaryCreatorInput();
    };
    renderSecondaryCreators();
});

// -------- FERMETURE DROPDOWN GLOBAL -----------
function hideOnClickOutside() {
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.custom-multiselect.open').forEach(dropdown => {
            if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
        });
    });
}

// ============= SUBMIT RECORD =============
// --- DRAG & DROP SCREENSHOT ---
function dragAndDrop() {
    const dropzone = document.getElementById("screenshotDrop");
    const input = document.getElementById("screenshotInput");
    if (dropzone && input) {
        dropzone.addEventListener("click", () => input.click());
        dropzone.addEventListener("dragover", (e) => {
            e.preventDefault(); dropzone.classList.add("dragover");
        });
        dropzone.addEventListener("dragleave", (e) => {
            e.preventDefault(); dropzone.classList.remove("dragover");
        });
        dropzone.addEventListener("drop", (e) => {
            e.preventDefault(); dropzone.classList.remove("dragover");
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                input.files = e.dataTransfer.files;
                showScreenshotPreview(input.files[0]);
            }
        });
        input.addEventListener("change", () => {
            if (input.files && input.files[0]) showScreenshotPreview(input.files[0]);
        });

        function showScreenshotPreview(file) {
            if (!file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                dropzone.innerHTML = `<img src="${e.target.result}" alt="Screenshot preview">`;
            };
            reader.readAsDataURL(file);
        }
    }
}

// --- QUALITY DROPDOWN ---
function qualityDropdown() {
    const qBtn = document.getElementById('qualityDropdownBtn');
    const qMenu = document.querySelector('#qualityDropdown .custom-multiselect-list');
    const radios = qMenu ? qMenu.querySelectorAll('input[type=radio][name=quality]') : [];
    if(qBtn && qMenu){
        qBtn.addEventListener('click', function(e) {
            e.preventDefault();
            qMenu.classList.toggle('show');
        });
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                if(this.checked) {
                    qBtn.textContent = this.value;
                }
                qMenu.classList.remove('show');
            });
        });
        document.addEventListener('mousedown', function(e) {
            if (!qMenu.contains(e.target) && !qBtn.contains(e.target)) {
                qMenu.classList.remove('show');
            }
        });
    }
}

// --- MAP CODE AUTOCOMPLETE ---
function mapCodeAutoComplete() {
    const mcInput = document.getElementById('mapCodeInput');
    const mcDropdown = document.getElementById('mapCodeAutoList');
    if (mcInput && mcDropdown) {
        let debounceTimeout, suggestions = [], selectedIdx = -1;

        function closeDropdown() {
            mcDropdown.style.display = "none";
            mcDropdown.innerHTML = "";
            suggestions = [];
            selectedIdx = -1;
        }

        mcInput.addEventListener("input", function() {
            clearTimeout(debounceTimeout);
            const value = mcInput.value.trim();
            if (value.length < 2) {
                closeDropdown();
                return;
            }
            debounceTimeout = setTimeout(() => {
                fetch('./api/autocomplete/getMapCodesAutoComplete.php?value=' + encodeURIComponent(value) + '&page_size=10')
                    .then(r => r.ok ? r.json() : [])
                    .then(data => {
                        suggestions = Array.isArray(data) ? data : [];
                        selectedIdx = -1;
                        mcDropdown.innerHTML = '';
                        if (!suggestions.length) {
                            const d = document.createElement('div');
                            d.className = 'no-result';
                            d.textContent = 'No result';
                            mcDropdown.appendChild(d);
                            mcDropdown.style.display = "block";
                            return;
                        }
                        suggestions.forEach((item, i) => {
                            const div = document.createElement('div');
                            div.className = 'suggestion-item';
                            let code = item.map_code || '';
                            let ix = code.toLowerCase().indexOf(value.toLowerCase());
                            if (ix !== -1 && value)
                                div.innerHTML =
                                    code.slice(0, ix) +
                                    '<strong>' + code.slice(ix, ix + value.length) + '</strong>' +
                                    code.slice(ix + value.length);
                            else
                                div.textContent = code;
                            div.setAttribute('data-raw-value', code);
                            div.addEventListener('mousedown', function(e) {
                                e.preventDefault();
                                selectSuggestion(i);
                            });
                            mcDropdown.appendChild(div);
                        });
                        mcDropdown.style.display = "block";
                    })
                    .catch(closeDropdown);
            }, 170);
        });

        mcInput.addEventListener("keydown", function(e) {
            const items = mcDropdown.querySelectorAll('.suggestion-item');
            if (!items.length || mcDropdown.style.display !== "block") return;
            if (e.key === "ArrowDown") {
                selectedIdx = (selectedIdx + 1) % items.length;
                updateHighlight();
                e.preventDefault();
            } else if (e.key === "ArrowUp") {
                selectedIdx = (selectedIdx - 1 + items.length) % items.length;
                updateHighlight();
                e.preventDefault();
            } else if (e.key === "Enter") {
                if (selectedIdx > -1) {
                    selectSuggestion(selectedIdx);
                    e.preventDefault();
                }
            } else if (e.key === "Escape") {
                closeDropdown();
            }
        });

        function selectSuggestion(idx) {
            if (!suggestions[idx]) return;
            mcInput.value = suggestions[idx].map_code;
            mcInput.setAttribute("data-raw-value", suggestions[idx].map_code);
            closeDropdown();
        }

        function updateHighlight() {
            const items = mcDropdown.querySelectorAll('.suggestion-item');
            items.forEach((el, i) => el.classList.toggle('selected', i === selectedIdx));
            if (selectedIdx > -1 && items[selectedIdx]) {
                items[selectedIdx].scrollIntoView({block: "nearest"});
            }
        }

        function fixDropdownWidth() {
            const rect = mcInput.getBoundingClientRect();
            mcDropdown.style.width = rect.width + "px";
        }
        mcInput.addEventListener('focus', fixDropdownWidth);
        window.addEventListener('resize', fixDropdownWidth);

        document.addEventListener('mousedown', function(e) {
            if (!mcDropdown.contains(e.target) && mcInput !== e.target) {
                closeDropdown();
            }
        });
        mcInput.addEventListener('blur', function() {
            setTimeout(closeDropdown, 120);
        });
    }
}

// --------- INITIALISATION GLOBALE ---------
async function initializeSubmitMap() {
    await loadTranslations();
    loadMainCreatorFromUserId(user_id);
    setupTabs();
    populateStaticDropdowns();
    await loadDynamicOptions();
    setupAllCustomDropdowns();
    setupForms();
    hideOnClickOutside();
}

function initializeSubmitRecord() {
    dragAndDrop();
    qualityDropdown();
    mapCodeAutoComplete();
}

async function initializeApp() {
    await initializeSubmitMap();
    initializeSubmitRecord();
}

document.addEventListener("DOMContentLoaded", initializeApp);