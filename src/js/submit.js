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
        const { pagination = {}, popup = {}, mechanics = {}, restrictions = {}, map_name = {}, map_type = {}, submit = {}, thead = {}, filters_toolbar = {}} = currentLangData;
        translations = { pagination, popup, mechanics, restrictions, map_name, map_type, submit, thead, filters_toolbar };
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
            label.innerHTML = `<input type="radio" name="${groupName}" value="${opt.value}"> ${displayText}`;
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
            if(drop!==container) {
                drop.classList.remove('open');
                const list = drop.querySelector('.custom-multiselect-list');
                if(list) list.classList.remove('show');
            }
        });
        const wasOpen = container.classList.contains('open');
        container.classList.toggle('open');
        if (list) {
            if (!wasOpen) {
                list.classList.add('show');
            } else {
                list.classList.remove('show');
            }
        }
    });

    document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
            container.classList.remove('open');
            if (list) list.classList.remove('show');
        }
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
    // Submit record
    document.getElementById('submitRecordForm').addEventListener('submit', function(e) {
        if (!validateSubmitRecordForm(e)) {
            e.preventDefault();
        } else {
            e.preventDefault();
            showConfirmationMessage(t('submit.submit_record_confirm'));
            setTimeout(() => { resetForms(e.target); }, 1200);
        }
    });

    // Submit playtest
    document.getElementById('playtestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        resetForms(e.target);
    });

    // Submit map
    document.getElementById("submitMapForm").addEventListener("submit", function(e) {
        if (!validateSubmitMapForm(e)) {
            e.preventDefault();
        } else {
            e.preventDefault();
            showConfirmationMessage(t('submit.submit_map_confirm'));
            setTimeout(() => { resetForms(e.target); }, 1200);
        }
    });

    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            let formId = btn.getAttribute('form');
            if (!formId) return;
            let form = document.getElementById(formId);
            if (!form) return;
            resetForms(form);
    
            form.querySelectorAll('.custom-multiselect').forEach(dropdown => {
                dropdown.classList.remove('open');
                let list = dropdown.querySelector('.custom-multiselect-list');
                if (list) list.classList.remove('show');
            });
        });
    });
}

function resetForms(form) {
    form.reset();

    form.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(el => {
        el.checked = false;
    });

    form.querySelectorAll('.custom-multiselect').forEach(dropdown => {
        const btn = dropdown.querySelector('.custom-multiselect-btn');
        if (!btn) return;
        let placeholder = btn.getAttribute('data-placeholder') || btn.getAttribute('placeholder') || "Select...";
        btn.textContent = placeholder;
    });

    const dropzone = document.getElementById('screenshotDrop');
    if (dropzone) {
        dropzone.innerHTML = `
            <input type="file" id="screenshotInput" name="screenshot" accept="image/*" style="display:none;">
            <div id="screenshotPlaceholder" class="screenshot-placeholder">
                <span>${t("submit.drag_and_drop")}</span>
            </div>
        `;
        dragAndDrop();
    }
    window.screenshotFile = null;
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

    input.__autocompleteSuggestions = [];

    input.addEventListener("input", function() {
        const filterValue = input.value.trim();
        clearTimeout(debounceTimeout);
        if (filterValue.length < 2) {
            suggestionsDropdown.style.display = "none";
            input.__autocompleteSuggestions = [];
            return;
        }
        debounceTimeout = setTimeout(() => {
            const locale = currentLang === 'cn' ? 'cn' : currentLang === 'jp' ? 'en' : 'en';
            fetch(`${config.url}?value=${encodeURIComponent(filterValue)}&locale=${locale}&page_size=10`)
                .then(resp => resp.ok ? resp.json() : [])
                .then(data => {
                    suggestionsDropdown.innerHTML = "";
                    if (Array.isArray(data) && data.length > 0) {
                        input.__autocompleteSuggestions = data.map(item => {
                            const {display, raw} = renderSuggestionDisplay(item, config);
                            return { display, raw };
                        });
                    } else {
                        input.__autocompleteSuggestions = [];
                    }
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
                    input.__autocompleteSuggestions = [];
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
    
        if (field === 'metaMap') {
            const sugg = input.__autocompleteSuggestions || [];
            const match = sugg.some(item =>
                item.display?.toLowerCase().trim() === newValue.toLowerCase().trim() ||
                item.raw?.toLowerCase().trim() === newValue.toLowerCase().trim()
            );
            if (!match) {
                showErrorMessage(t("popup.no_results"));
                input.focus();
                return;
            }
        }
        if (field === 'optGuide' && newValue === '') newValue = "N/A";
        if (field === 'optDescription' && newValue === '') newValue = t('submit.no_description');
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

function validateSubmitMapForm(event) {
    const form = document.getElementById("submitMapForm");
    let valid = true;

    const mainCreator = document.getElementById("metaCreatorMain");
    if (!mainCreator || !mainCreator.getAttribute("data-raw-id")) {
        showErrorMessage(t('submit.creator'));
        valid = false;
        return false;
    }

    const mapLabel = document.getElementById("metaMap");
    if (!mapLabel || !mapLabel.textContent.trim() || mapLabel.textContent.trim() === "N/A") {
        showErrorMessage(t('submit.map_name'));
        valid = false;
        return false;
    }

    const checkpointsLabel = document.getElementById("metaCheckpoints");
    if (!checkpointsLabel || !checkpointsLabel.textContent.trim() || isNaN(checkpointsLabel.textContent.trim()) || Number(checkpointsLabel.textContent.trim()) <= 0) {
        showErrorMessage(t('submit.checkpoints'));
        valid = false;
        return false;
    }

    const diffRadios = document.querySelectorAll('#difficultyDropdown input[type="radio"]');
    const hasDiff = Array.from(diffRadios).some(r => r.checked);
    if (!hasDiff) {
        showErrorMessage(t('submit.difficulty'));
        valid = false;
        return false;
    }

    const typeRadios = document.querySelectorAll('#categoryDropdown input[type="radio"]');
    const hasType = Array.from(typeRadios).some(r => r.checked);
    if (!hasType) {
        showErrorMessage(t('submit.map_type'));
        valid = false;
        return false;
    }

    const mechanicsBoxes = document.querySelectorAll('#mechanicsDropdown input[type="checkbox"]');
    const hasMechanics = Array.from(mechanicsBoxes).some(c => c.checked);
    if (!hasMechanics) {
        showErrorMessage(t('submit.mechanics'));
        valid = false;
        return false;
    }

    const restrictionsBoxes = document.querySelectorAll('#restrictionsDropdown input[type="checkbox"]');
    const hasRestrictions = Array.from(restrictionsBoxes).some(c => c.checked);
    if (!hasRestrictions) {
        showErrorMessage(t('submit.restrictions'));
        valid = false;
        return false;
    }
    return true;
}

// ============= SUBMIT RECORD =============
// --- DRAG & DROP SCREENSHOT ---
window.screenshotFile = null;

function dragAndDrop() {
    const dropzone = document.getElementById("screenshotDrop");
    const input = document.getElementById("screenshotInput");
    if (!dropzone || !input) return;

    dropzone.replaceWith(dropzone.cloneNode(true));
    const newDropzone = document.getElementById("screenshotDrop");
    const newInput = newDropzone.querySelector("#screenshotInput");

    newDropzone.onclick = function(e) {
        if (e.target === newInput) return;
        newInput.click();
    };

    newDropzone.addEventListener("dragover", (e) => {
        e.preventDefault(); newDropzone.classList.add("dragover");
    });
    newDropzone.addEventListener("dragleave", (e) => {
        e.preventDefault(); newDropzone.classList.remove("dragover");
    });
    newDropzone.addEventListener("drop", (e) => {
        e.preventDefault(); newDropzone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            window.screenshotFile = e.dataTransfer.files[0];
            showScreenshotPreview(window.screenshotFile);
        }
    });

    newInput.addEventListener("change", () => {
        if (newInput.files && newInput.files[0]) {
            window.screenshotFile = newInput.files[0];
            showScreenshotPreview(window.screenshotFile);
        }
    });

    function showScreenshotPreview(file) {
        if (!file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            newDropzone.innerHTML = `<img src="${e.target.result}" alt="Screenshot preview">`;
        };
        reader.readAsDataURL(file);
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

// --- FORCE DECIMAL ---
function forceDotDecimalInput(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    el.addEventListener('input', function() {
        if (this.value.includes(',')) {
            this.value = this.value.replace(/,/g, '.');
        }
    });
    el.addEventListener('keydown', function(e) {
        if (e.key === ',') {
            e.preventDefault();
            document.execCommand('insertText', false, '.');
        }
    });
}
document.addEventListener("DOMContentLoaded", function() {
    forceDotDecimalInput('#inputTime');
});

function validateSubmitRecordForm(event) {
    let valid = true;

    const mapCodeInput = document.getElementById("mapCodeInput");
    if (!mapCodeInput || !mapCodeInput.value.trim()) {
        showErrorMessage(t('submit.map_code'));
        valid = false;
        return false;
    }

    const inputTime = document.getElementById("inputTime");
    const timeValue = inputTime ? inputTime.value.trim() : "";
    if (!timeValue || isNaN(timeValue) || Number(timeValue) <= 0) {
        showErrorMessage(t('submit.time'));
        valid = false;
        return false;
    }

    const qualityChecks = document.querySelectorAll('#qualityDropdown input[type="radio"], #qualityDropdown input[type="checkbox"]');
    let hasQuality = false;
    if (qualityChecks.length) {
        hasQuality = Array.from(qualityChecks).some(c => c.checked);    
    } else {
        const qualityBtn = document.getElementById('qualityDropdownBtn');
        hasQuality = qualityBtn && qualityBtn.textContent && qualityBtn.textContent.trim() !== "Select...";
    }
    if (!hasQuality) {
        showErrorMessage(t('submit.quality'));
        valid = false;
        return false;
    }

    if (!(window.screenshotFile)) {
        showErrorMessage(t('submit.screenshot_confirm'));
        return false;
    }

    return true;
}

// ============= SUBMIT PLAYTEST =============
const DEFAULT_AVATAR = "assets/img/genjibot.jpg";
const playtestDataArray = [
    {
        "username": "Joe",
        "user_id": "141372217677053952",
        "map_thumbnail": "assets/banners/rialto.png",
        "title": "Calling all Playtesters!",
        "code": "9XHMX",
        "map": "Rialto",
        "type": "Classic",
        "checkpoints": 15,
        "difficulty": "Very Hard +",
        "mechanics": [
            "Edge Climb", "Bhop", "Crouch Edge", "Save Climb", "Bhop First",
            "High Edge", "Distance Edge", "Quick Climb", "Slide", "Dash", "Ultimate"
        ],
        "restrictions": [
            "Dash Start", "Emote Save Bhop", "Death Bhop",
            "Multi Climb", "Standing Create Bhop", "Create Bhop"
        ]
    },
    {
        "username": "Cannon",
        "user_id": "172525704183939076",
        "map_thumbnail": "assets/banners/hanamura.png",
        "title": "Calling all Playtesters!",
        "code": "BLV54",
        "map": "Hanamura",
        "type": "Increasing Difficulty",
        "checkpoints": 21,
        "difficulty": "Extreme",
        "mechanics": [
            "Bhop", "Edge Climb", "Quick Climb", "Slide"
        ],
        "restrictions": [
            "Ultimate", "Standing Create Bhop", "Death Bhop"
        ]
    },
    {
        "username": "FishoFire",
        "user_id": "273775694008549376",
        "map_thumbnail": "assets/banners/route66.png",
        "title": "Calling all Playtesters!",
        "code": "UYZKD",
        "map": "Route 66",
        "type": "Classic",
        "checkpoints": 9,
        "difficulty": "Medium",
        "mechanics": [
            "Bhop", "Distance Edge", "Quick Climb"
        ],
        "restrictions": [
            "Emote Save Bhop"
        ]
    },
    {
        "username": "JackHerer",
        "user_id": "142676949041414145",
        "map_thumbnail": "assets/banners/lijiangtower.png",
        "title": "Calling all Playtesters!",
        "code": "M12GE",
        "map": "Lijiang Tower",
        "type": "Tournament",
        "checkpoints": 17,
        "difficulty": "Hell",
        "mechanics": [
            "Edge Climb", "Bhop", "Save Climb", "Multi Climb", "Dash"
        ],
        "restrictions": [
            "Dash Start", "Death Bhop"
        ]
    },
    {
        "username": "kami",
        "user_id": "397755164200665088",
        "map_thumbnail": "assets/banners/volskayaindustries.png",
        "title": "Calling all Playtesters!",
        "code": "WXVJQ",
        "map": "Volskaya",
        "type": "Classic",
        "checkpoints": 13,
        "difficulty": "Hard",
        "mechanics": [
            "Crouch Edge", "Dash", "Save Climb"
        ],
        "restrictions": [
            "Standing Create Bhop", "Create Bhop"
        ]
    },
    {
        "username": "LulledLion",
        "user_id": "313459248942153729",
        "map_thumbnail": "assets/banners/junkertown.png",
        "title": "Calling all Playtesters!",
        "code": "TYRTZ",
        "map": "Junkertown",
        "type": "Tournament",
        "checkpoints": 18,
        "difficulty": "Very Hard",
        "mechanics": [
            "High Edge", "Edge Climb", "Multi Climb", "Slide", "Ultimate"
        ],
        "restrictions": [
            "Dash Start", "Standing Create Bhop"
        ]
    },
    {
        "username": "Genjibot",
        "user_id": "969632729643753482",
        "map_thumbnail": "assets/banners/ilios.png",
        "title": "Calling all Playtesters!",
        "code": "S1C4T",
        "map": "Ilios",
        "type": "Increasing Difficulty",
        "checkpoints": 10,
        "difficulty": "Hard",
        "mechanics": [
            "Dash", "Bhop", "Edge Climb", "Quick Climb"
        ],
        "restrictions": [
            "Multi Climb"
        ]
    },
    {
        "username": "weds",
        "user_id": "1139078481834160170",
        "map_thumbnail": "assets/banners/oasis.png",
        "title": "Calling all Playtesters!",
        "code": "PQRTZ",
        "map": "Oasis",
        "type": "Classic",
        "checkpoints": 8,
        "difficulty": "Easy",
        "mechanics": [
            "Edge Climb", "Slide", "Bhop"
        ],
        "restrictions": [
            "Ultimate"
        ]
    },
    {
        "username": "vertigo",
        "user_id": "887010867265294397",
        "map_thumbnail": "assets/banners/dorado.png",
        "title": "Calling all Playtesters!",
        "code": "LMB8S",
        "map": "Dorado",
        "type": "Tournament",
        "checkpoints": 20,
        "difficulty": "Extreme",
        "mechanics": [
            "Save Climb", "Bhop", "Slide", "Dash"
        ],
        "restrictions": [
            "Create Bhop", "Standing Create Bhop", "Emote Save Bhop"
        ]
    },
    {
        "username": "killerkiwi",
        "user_id": "464331467498192907",
        "map_thumbnail": "assets/banners/kingsrow.png",
        "title": "Calling all Playtesters!",
        "code": "QWSTD",
        "map": "King's Row",
        "type": "Classic",
        "checkpoints": 13,
        "difficulty": "Medium",
        "mechanics": [
            "Quick Climb", "Crouch Edge", "Edge Climb", "Dash"
        ],
        "restrictions": [
            "Death Bhop", "Multi Climb"
        ]
    }
];

playtestDataArray.forEach(d => d.avatar = DEFAULT_AVATAR);

// -------  RENDU CARDS -------
function renderPlaytestCard(data, index) {
    const mechanicsStr = data.mechanics.join(', ');
    const restrictionsStr = data.restrictions.join(', ');
  
    return `
      <div class="playtest-embed" data-ptidx="${index}">
        <div class="playtest-header">
            <img src="${data.avatar}" alt="User avatar" class="playtest-avatar" data-ptidx="${index}">
            <div class="playtest-user-info">
                <span class="playtest-username">${data.username}</span>
            </div>
            <img src="${data.map_thumbnail}" alt="Map thumbnail" class="playtest-map-thumb">
        </div>
        <div class="playtest-content-scroll">
          <div class="playtest-fields">
                <div><span class="field-label">${t("thead.mapCode")}</span> <span class="field-value">${data.code}</span></div>
                <div><span class="field-label">${t("thead.mapName")}</span> <span class="field-value">${data.map}</span></div>
                <div><span class="field-label">${t("thead.mapType")}</span> <span class="field-value">${data.type}</span></div>
                <div><span class="field-label">${t("thead.mapCheckpoints")}</span> <span class="field-value">${data.checkpoints}</span></div>
                <div><span class="field-label">${t("thead.mapDifficulty")}</span> <span class="field-value">${data.difficulty}</span></div>
          </div>
        </div>
      </div>
    `;
}

function renderPlaytestModal(data) {
    return `
    <div class="ptmodal-row" style="display:flex;">
        <img src="${data.avatar}" alt="User avatar" class="ptmodal-avatar">
        <div>
            <div class="ptmodal-username">${data.username}</div>
            <div class="ptmodal-title"><span>${t("submit.playtest_title")}</span></div>
        </div>
        <img src="${data.map_thumbnail}" alt="Map thumbnail" class="ptmodal-mapthumb">
    </div>
    <div class="ptmodal-rowinfo">
        <div><b>${t("thead.mapCode")}</b> <span class="ptmodal-code">${data.code}</span></div>
        <div><b>${t("thead.mapName")}</b> <span class="ptmodal-map">${data.map}</span></div>
        <div><b>${t("thead.mapType")}</b> <span>${data.type}</span></div>
        <div><b>${t("thead.mapCheckpoints")}</b> <span>${data.checkpoints}</span></div>
        <div><b>${t("thead.mapDifficulty")}</b> <span class="ptmodal-difficulty">${data.difficulty}</span></div>
    </div>
  
    <div class="ptmodal-section">
        <div class="ptmodal-rowinfo2">
            <b>${t("thead.mapMechanics")}</b><br>
            <span>
            ${data.mechanics.map(m =>
                `<span class="ptmodal-badge ptmodal-badge-mech">${m}</span>`
            ).join(' ')}
            </span>
        </div>
    </div>
    <div class="ptmodal-section">
        <div class="ptmodal-rowinfo2">
            <b>${t("thead.mapRestrictions")}</b><br>
            <span>
            ${data.restrictions.length
                ? data.restrictions.map(m =>
                    `<span class="ptmodal-badge ptmodal-badge-restrict">${m}</span>`
                ).join(' ')
                : '<i>None</i>'
                }
            </span>
        </div>
    </div>
    <div class="ptmodal-ratingblock">
        <div class="ptmodal-ratingheader">
            <div>
                <div class="ptmodal-ratingtitle">${t("submit.difficulty_rating")}</div>
                <div class="ptmodal-ratingsub">${t("submit.rating_sub")}</div>
            </div>
            <img src="assets/img/card-banner.png" alt="Genji Logo" class="ptmodal-genjilogo">
        </div>
        <div class="ptmodal-chartbox">
            <canvas id="difficultyChart" width="440" height="140"></canvas>
        </div>
        <div class="ptmodal-ratequestion">
            <span class="ptmodal-qtext">${t("submit.question_difficulty")}</span>
            <span class="ptmodal-qicon">
            <svg width="20" height="20" viewBox="0 0 22 22"><path fill="#bbb" d="M7.41 8.59 11 12.17l3.59-3.58L16 10l-5 5-5-5z"></path></svg>
            </span>
            <div class="ptmodal-ratedropdown" style="display:none;"></div>
        </div>
    </div>
    `;
  }

const ALL_DIFFICULTIES = [
    "Easy -", "Easy", "Easy +",
    "Medium -", "Medium", "Medium +",
    "Hard -", "Hard", "Hard +",
    "Very Hard -", "Very Hard", "Very Hard +",
    "Extreme -", "Extreme", "Extreme +",
    "Hell -", "Hell", "Hell +"
];

let uniqueDropdown = null;

// -------  DROPDOWN DIFF -------
function closeGlobalDifficultyDropdown() {
    if (uniqueDropdown && uniqueDropdown.parentNode) {
        uniqueDropdown.parentNode.removeChild(uniqueDropdown);
        uniqueDropdown = null;
    }
}

function setupRatingDropdown() {
    const difficulties = [
        "Easy -", "Easy", "Easy +",
        "Medium -", "Medium", "Medium +",
        "Hard -", "Hard", "Hard +",
        "Very Hard -", "Very Hard", "Very Hard +",
        "Extreme -", "Extreme", "Extreme +",
        "Hell"
    ];

    const rateQuestion = document.querySelector('.ptmodal-ratequestion');
    const dropdown = rateQuestion.querySelector('.ptmodal-ratedropdown');

    dropdown.innerHTML = difficulties.map(d =>
        `<div class="ptmodal-ratedropitem" tabindex="0" data-value="${d}">${d}</div>`
    ).join('');
    
    rateQuestion.addEventListener('click', function(e) {
        if(e.target.closest('.ptmodal-qicon') || e.target.closest('.ptmodal-qtext') || e.target === rateQuestion) {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    });

    dropdown.addEventListener('click', function(e) {
        const item = e.target.closest('.ptmodal-ratedropitem');
        if (item) {
            const selected = item.getAttribute('data-value');
            dropdown.style.display = 'none';
            showConfirmationMessage(`You voted: ${selected}`);
        }
    });

    document.addEventListener('mousedown', function(e) {
        if (!rateQuestion.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

// -------  AVATARS -------
async function fetchDiscordAvatar(user_id) {
    try {
      const response = await fetch(`api/settings/getUserAvatar.php?user_id=${user_id}`);
      if (!response.ok) return null;
      const json = await response.json();
      return json.avatar_url || null;
    } catch (e) {
      return null;
    }
}
  
function patchAvatarsAsync() {
    playtestDataArray.forEach(async (pt, idx) => {
      const url = await fetchDiscordAvatar(pt.user_id);
      if (url) {
        pt.avatar = url;
        const avatarImg = document.querySelector(`.playtest-avatar[data-ptidx="${idx}"]`);
        if (avatarImg) avatarImg.src = url;
        const modalAvatar = document.querySelector('.ptmodal-avatar');
        if (modalAvatar && modalAvatar.src.indexOf(pt.user_id) === -1) {
          modalAvatar.src = url;
        }
      }
    });
}

// -------  INIT CARDS -------
async function initializePlaytestCards() {
    const container = document.getElementById('playtestCardContainer');
    container.innerHTML = playtestDataArray.map((data, idx) => renderPlaytestCard(data, idx)).join('');
    patchAvatarsAsync();

    document.getElementById("playtestSection").style.display = "none";

    const modal = document.getElementById("playtestModal");
    const modalInner = document.getElementById("playtestModalInner");
    const closeBtn = modal.querySelector(".playtest-modal-close");
    const backdrop = modal.querySelector(".playtest-modal-backdrop");

    container.querySelectorAll(".playtest-embed").forEach((card, idx) => {
        card.addEventListener("click", (e) => {
            e.stopPropagation();
            modalInner.innerHTML = renderPlaytestModal(playtestDataArray[idx]);
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
            setTimeout(() => {
                initDifficultyChart(playtestDataArray[idx]);
                setupRatingDropdown();
            }, 0);
        });
    });

    [closeBtn, backdrop].forEach(el => el.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
        modalInner.innerHTML = "";
    }));

    document.addEventListener("keydown", (e) => {
        if (modal.style.display !== "none" && e.key === "Escape") {
            modal.style.display = "none";
            document.body.style.overflow = "";
            modalInner.innerHTML = "";
        }
    });
}

// -------  GRAPH MODAL -------
function initDifficultyChart(data) {
    const ctx = document.getElementById('difficultyChart');
    if (!ctx) return;

    const baseDivisions = ["Easy", "Medium", "Hard", "Very Hard", "Extreme"];
    const subDivs = ["-", "", "+"];
    const difficultyLabels = baseDivisions.flatMap(div => subDivs.map(sub => div + sub)).concat(["Hell"]);

    const baseColors = [
        [102, 255, 102],   // Easy
        [255, 230, 77],    // Medium
        [255, 162, 24],    // Hard
        [255, 100, 16],    // Very Hard
        [255, 36, 36],     // Extreme
    ];
    const hellColor = [120, 0, 33]; 

    function shades([r,g,b]) {
        return [
            `rgba(${r},${g},${b},0.45)`,
            `rgba(${r},${g},${b},0.72)`,
            `rgba(${r},${g},${b},1.0)`,
        ];
    }
    const difficultyColors = [
        ...baseColors.flatMap(shades),
        `rgba(${hellColor[0]},${hellColor[1]},${hellColor[2]},1.0)`
    ];

    let votes = data.difficulty_votes;
    if (!votes || votes.length !== 16) {
        votes = Array(16).fill(0);
    }
    const plottedVotes = votes.map(v => v > 0 ? v : 7);

    const totalVotes = votes.reduce((a, b) => a + b, 0);
    let meanDifficulty = 0;
    if (totalVotes) {
        meanDifficulty = votes.reduce((sum, v, i) => sum + v * (i + 1), 0) / totalVotes;
    }

    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: difficultyLabels,
            datasets: [
                {
                    label: "Votes",
                    data: plottedVotes,
                    backgroundColor: difficultyColors,
                    borderSkipped: false,
                    barPercentage: 1,
                    categoryPercentage: 1,
                }
            ]
        },
        options: {
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { size: 10, weight: "bold" },
                        color: "#222",
                        autoSkip: false,
                        callback: function(value, index) {
                            const mainLabels = ["Easy", "Medium", "Hard", "Very Hard", "Extreme", "Hell"];
                            if ([0,3,6,9,12,15].includes(index)) {
                                if (index === 15) return "Hell";
                                return mainLabels[Math.floor(index/3)];
                            }
                            return "";
                        }
                    }
                },
                y: {
                    grid: { display: false },
                    display: false,
                    min: 0,
                    suggestedMax: 9
                }
            },
            layout: { padding: 3 },
            animation: false,
            responsive: false,
            maintainAspectRatio: false,
            events: []
        },
        plugins: [{
            id: 'drawMeanDot',
            afterDatasetsDraw(chart, args, pluginOptions) {
                if (!totalVotes) return;
                const { ctx, chartArea, scales } = chart;
                const xScale = scales.x;

                const minX = xScale.getPixelForValue(0);
                const maxX = xScale.getPixelForValue(difficultyLabels.length - 1);
                const x = minX + (maxX - minX) * ((meanDifficulty - 1) / (difficultyLabels.length - 1));
                const yTop = chartArea.top + 4;
                const yBottom = chartArea.bottom - 3;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yTop);
                ctx.lineTo(x, yBottom);
                ctx.lineWidth = 6;
                ctx.strokeStyle = "#111";
                ctx.shadowColor = "#000";
                ctx.shadowBlur = 7;
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.arc(x, yTop - 10, 10, 0, 2 * Math.PI);
                ctx.fillStyle = "#161616";
                ctx.shadowColor = "#000";
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, yTop - 10, 5.7, 0, 2 * Math.PI);
                ctx.fillStyle = "#222";
                ctx.fill();
                ctx.restore();
            }
        }]
    });
}

// --------- INITIALISATION GLOBALE ---------
async function initializeSubmitMap() {
    loadMainCreatorFromUserId(user_id);
    setupTabs();
    populateStaticDropdowns();
    await loadDynamicOptions();
    setupAllCustomDropdowns();
    setupForms();
}

function initializeSubmitRecord() {
    dragAndDrop();
    qualityDropdown();
    mapCodeAutoComplete();
}

async function initializeApp() {
    showLoadingBar();
    await loadTranslations();
    await initializePlaytestCards();
    await initializeSubmitMap();
    initializeSubmitRecord();
    hideLoadingBar();
}

document.addEventListener("DOMContentLoaded", initializeApp);