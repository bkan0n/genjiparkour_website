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

let translations = {};
let addingSecondaryCreator = false;
const DEFAULT_AVATAR = "assets/profile/genjibot.jpg";
const playtestDataArray = [];
let currentPage = 1;
let totalPages = 1;
let totalResults = 0;
const itemsPerPage = 10;
let uniqueDropdown = null;
let currentOptionsContainer = null;
let currentInput = null;
let icons = [];
let currentSection = "playtest";
let toolbarDebounce;
let secondaryCreators = [];
const activeFilters = {};
const filterKeyMap = {
    map_code: 'code',
    map_name: 'name',
    creator: 'creator_id',
    map_type: 'category',
};

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
    document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${section}Btn`).classList.add('active');

    document.getElementById('playtestSection').style.display = (section === 'playtest') ? 'block' : 'none';
    document.getElementById('submitMapSection').style.display = (section === 'submitMap') ? 'block' : 'none';
    document.getElementById('submitRecordSection').style.display = (section === 'submitRecord') ? 'block' : 'none';
    paginationContainer.innerHTML = "";

    if (section === "playtest") {
        showPlaytestSectionWithToolbar();
    } else if (section === "submitMap") {
        initializeSubmitMap();
    } else if (section === "submitRecord") {
        initializeSubmitRecord();
    }
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
        const mechanicsData    = await mechanicsResponse.json();

        let mechanicsOptions = Array.isArray(mechanicsData) ? mechanicsData.map(opt => opt.name) : [];
        let restrictionsOptions = Array.isArray(restrictionsData) ? restrictionsData.map(opt => opt.name) : [];

        if (currentLang === "cn") {
            mechanicsOptions    = mechanicsOptions.map(option => ({
                translated: t(`mechanics.${option.toLowerCase().replace(/ /g, '_')}`) || option,
                raw:        option
            }));
            restrictionsOptions = restrictionsOptions.map(option => ({
                translated: t(`restrictions.${option.toLowerCase().replace(/ /g, '_')}`) || option,
                raw:        option
            }));
        } else {
            mechanicsOptions    = mechanicsOptions.map(option => ({ translated: option, raw: option }));
            restrictionsOptions = restrictionsOptions.map(option => ({ translated: option, raw: option }));
        }

        return { mechanicsOptions, restrictionsOptions };
    } catch (err) {
        console.error("Erreur fetch mécaniques/restrictions :", err);
        return { mechanicsOptions: [], restrictionsOptions: [] };
    }
}

async function loadDynamicOptions() {
    await fillMechanicsAndRestrictions();
}

// ---------- DROPDOWNS CUSTOM  --------------
function populateCheckboxDropdown(dropdownId, options, inputName) {
  const list = document.querySelector(`#${dropdownId} .custom-multiselect-list`);
  if (!list) return;
  list.innerHTML = '';
  options.forEach(opt => {
    const label = document.createElement('label');
    const displayText = opt.translated || opt.text || opt.value || '';
    label.innerHTML = `
      <input type="checkbox" name="${inputName}" value="${opt.raw || opt.value || ''}">
      ${displayText}
    `;
    list.appendChild(label);
  });
}

async function setupAllCustomDropdowns() {
  setupCustomMultiselect('difficultyDropdown', t('filters_toolbar.difficulty'));
  setupCustomMultiselect('categoryDropdown',   t('filters_toolbar.map_type'));

  const { mechanicsOptions, restrictionsOptions } = await fillMechanicsAndRestrictions();

  populateCheckboxDropdown('mechanicsDropdown',    mechanicsOptions,    'mechanics[]');
  populateCheckboxDropdown('restrictionsDropdown', restrictionsOptions, 'restrictions[]');

  setupCustomMultiselect('mechanicsDropdown',    t('filters_toolbar.mechanics')    || "Select...");
  setupCustomMultiselect('restrictionsDropdown', t('filters_toolbar.restrictions') || "Select...");
}

function setupCustomMultiselect(id, placeholderText = "Select...") {
    const container = document.getElementById(id);
    if (!container) return;

    const btn        = container.querySelector('.custom-multiselect-btn');
    const list       = container.querySelector('.custom-multiselect-list');
    const radios     = list.querySelectorAll('input[type="radio"]');
    const checkboxes = list.querySelectorAll('input[type="checkbox"]');

    btn.addEventListener('click', e => {
        e.stopPropagation();
        document.querySelectorAll('.custom-multiselect').forEach(drop => {
            if (drop !== container) {
                drop.classList.remove('open');
                const l = drop.querySelector('.custom-multiselect-list');
                if (l) l.classList.remove('show');
            }
        });
        const wasOpen = container.classList.contains('open');
        container.classList.toggle('open');
        if (list) list.classList.toggle('show', !wasOpen);
    });

    document.addEventListener('click', e => {
        if (!container.contains(e.target)) {
            container.classList.remove('open');
            if (list) list.classList.remove('show');
        }
    });

    function updateButton() {
        if (radios.length) {
            const sel = Array.from(radios).find(r => r.checked);
            btn.textContent = sel ? sel.parentNode.textContent.trim() : placeholderText;
        }
        else if (checkboxes.length) {
            const checked = Array.from(checkboxes).filter(c => c.checked);
            if (checked.length === 0) {
                btn.textContent = placeholderText;
            }
            else if (checked.length <= 2) {
                btn.textContent = checked
                    .map(c => c.parentNode.textContent.trim())
                    .join(', ');
            }
            else {
                btn.textContent = `${checked.length} selected`;
            }
        }
    }

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateButton();
            setTimeout(() => container.classList.remove('open'), 100);
        });
    });
    checkboxes.forEach(box => box.addEventListener('change', updateButton));

    updateButton();
}

// ----------- FORM HANDLERS -----------
function setupForms() {
    // Submit record
    document.getElementById('submitRecordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateSubmitRecordForm(e)) {
            return;
        }
        showConfirmationMessage(t('submit.submit_record_confirm'));
        setTimeout(() => { resetForms(e.target); }, 1200);
    });

    // Submit playtest
    document.getElementById('playtestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        resetForms(e.target);
    });

    // Submit map
    document.getElementById('submitMapForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateSubmitMapForm(e)) {
            return;
        }

        try {
            const result = await sendMapToApi();
            if (result.error) {
                showErrorMessage(result.error);
                return;
            }

            showConfirmationMessage(t('submit.submit_map_confirm'));
            resetForms(e.target);
            ['metaCheckpoints','metaMap', 'metaCode','optDescription','optGuide']
              .forEach(id => document.getElementById(id).textContent = 'N/A');
        } catch (err) {
            console.error(err);
            showErrorMessage(t('errors.server_unreachable') || "Erreur réseau");
        }
    });

    // Cancel
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const formId = btn.getAttribute('form');
            if (!formId) return;
            const form = document.getElementById(formId);
            if (!form) return;

            resetForms(form);
            ['metaCheckpoints','metaMap','optDescription','optGuide']
              .forEach(id => document.getElementById(id).textContent = 'N/A');
            form.querySelectorAll('.custom-multiselect').forEach(dropdown => {
                dropdown.classList.remove('open');
                const list = dropdown.querySelector('.custom-multiselect-list');
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

// ----------- SEND MAP FORM -----------
async function sendMapToApi() {
    const mainCreatorId = document
        .getElementById("metaCreatorMain")
        .getAttribute("data-raw-id");

    const payload = {
        code: document.getElementById("metaCode").textContent.trim(),
        name: document.getElementById("metaMap").textContent.trim(),
        checkpoints: Number(document.getElementById("metaCheckpoints").textContent),
        creator_ids: [
        Number(mainCreatorId),
        ...secondaryCreators.map(c => Number(c.user_id))
        ],
        description: document.getElementById("optDescription").textContent.trim(),
        guide_urls: document
        .getElementById("optGuide")
        .textContent
        .split("\n")
        .filter(u => u),
        category: document.querySelector(
        '#categoryDropdown input[type="radio"]:checked'
        ).value,
        difficulty: document.querySelector(
        '#difficultyDropdown input[type="radio"]:checked'
        ).value,
        mechanics: Array.from(
        document.querySelectorAll(
            "#mechanicsDropdown input[type=\"checkbox\"]:checked"
        )
        ).map(c => c.value),
        restrictions: Array.from(
        document.querySelectorAll(
            "#restrictionsDropdown input[type=\"checkbox\"]:checked"
        )
        ).map(c => c.value)
    };

    const resp = await fetch("api/submit/createPlaytest.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    return resp.json();
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
                            suggestion.classList.add("suggestion-item2");
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

    const codeLabel = document.getElementById("metaCode");
    if (!codeLabel || !codeLabel.textContent.trim() || codeLabel.textContent.trim() === "N/A") {
        showErrorMessage(t('submit.map_code'));
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
                            div.className = 'suggestion-item2';
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
            const items = mcDropdown.querySelectorAll('.suggestion-item2');
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
            const items = mcDropdown.querySelectorAll('.suggestion-item2');
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
// -------  RENDU CARDS -------
function renderPlaytestCard(data, index) {
    return `
      <div class="playtest-embed" data-ptidx="${index}">
        <div class="playtest-header">
            <img src="${data.avatar}" alt="User avatar" class="playtest-avatar" data-ptidx="${index}">
            <div class="playtest-user-info">
                <span class="playtest-username">${data.creator_names}</span>
            </div>
            <img src="${data.map_banner_url}" alt="Map thumbnail" class="playtest-map-thumb">
        </div>
        <div class="playtest-content-scroll">
          <div class="playtest-fields">
                <div class="playtest-subfields"><span class="field-label">${t("thead.mapCode")}</span> <span class="field-value">${data.code}</span></div>
                <div class="playtest-subfields"><span class="field-label">${t("thead.mapName")}</span> <span class="field-value">${data.name}</span></div>
                <div class="playtest-subfields"><span class="field-label">${t("thead.mapType")}</span> <span class="field-value">${data.category}</span></div>
                <div class="playtest-subfields"><span class="field-label">${t("thead.mapCheckpoints")}</span> <span class="field-value">${data.checkpoints}</span></div>
                <div class="playtest-subfields"><span class="field-label">${t("thead.mapDifficulty")}</span> <span class="field-value">${data.difficulty}</span></div>
          </div>
        </div>
      </div>
    `;
}

function renderPlaytestModal(data) {
    const mechanics = Array.isArray(data.mechanics) ? data.mechanics : [];
    const restrictions = Array.isArray(data.restrictions) ? data.restrictions : [];
    const guides = Array.isArray(data.guide_urls) ? data.guide_urls : [];

    return `
    <div class="ptmodal-row" style="display:flex;">
        <img src="${data.avatar}" alt="User avatar" class="ptmodal-avatar">
        <div>
            <div class="ptmodal-username">${data.creator_names}</div>
            <div class="ptmodal-title"><span>${t("submit.playtest_title")}</span></div>
        </div>
        <img src="${data.map_banner_url}" alt="Map thumbnail" class="ptmodal-mapthumb">
    </div>

    <div class="ptmodal-rowinfo">
        <div><b>${t("thead.mapCode")}</b> <span class="ptmodal-code">${data.code}</span></div>
        <div><b>${t("thead.mapName")}</b> <span class="ptmodal-map">${data.name}</span></div>
        <div><b>${t("thead.mapType")}</b> <span>${data.category}</span></div>
        <div><b>${t("thead.mapCheckpoints")}</b> <span>${data.checkpoints}</span></div>
        <div><b>${t("thead.mapDifficulty")}</b> <span class="ptmodal-difficulty">${data.difficulty}</span></div>

        ${data.description ? `
        <div><b>${t("thead.mapDescription")}</b> 
            <span class="ptmodal-description">${data.description}</span>
        </div>` : ''}

        ${guides.length ? `
        <div><b>${t("submit.guide")}</b> 
            <span class="ptmodal-guides">
                ${guides.map(link => 
                  `<a href="${link}" target="_blank" class="ptmodal-guide-link">${link}</a>`
                ).join('<br>')}
            </span>
        </div>` : ''}
    </div>

    <div class="ptmodal-section">
        <div class="ptmodal-rowinfo2">
            <b>${t("thead.mapMechanics")}</b><br>
            <span>
            ${mechanics.length
                ? mechanics.map(m => `<span class="ptmodal-badge ptmodal-badge-mech">${m}</span>`).join(' ')
                : '<i>None</i>'}
            </span>
        </div>
    </div>

    <div class="ptmodal-section">
        <div class="ptmodal-rowinfo2">
            <b>${t("thead.mapRestrictions")}</b><br>
            <span>
            ${restrictions.length
                ? restrictions.map(r => `<span class="ptmodal-badge ptmodal-badge-restrict">${r}</span>`).join(' ')
                : '<i>None</i>'}
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
                <svg width="20" height="20" viewBox="0 0 22 22">
                    <path fill="#bbb" d="M7.41 8.59 11 12.17l3.59-3.58L16 10l-5 5-5-5z"></path>
                </svg>
            </span>
            <div class="ptmodal-ratedropdown" style="display:none;"></div>
        </div>
    </div>
    `;
}


// -------  DROPDOWN DIFF -------
function closeGlobalDropdown() {
    if (uniqueDropdown && uniqueDropdown.parentNode) {
        uniqueDropdown.parentNode.removeChild(uniqueDropdown);
        uniqueDropdown = null;
    }
}

function setupRatingDropdown() {
    const rateQuestion = document.querySelector('.ptmodal-ratequestion');
    if (!rateQuestion) {
        return;
    }
    const dropdown = rateQuestion.querySelector('.ptmodal-ratedropdown');
    if (!dropdown) {
        return;
    }

    const difficulties = [
        "Easy -", "Easy", "Easy +",
        "Medium -", "Medium", "Medium +",
        "Hard -", "Hard", "Hard +",
        "Very Hard -", "Very Hard", "Very Hard +",
        "Extreme -", "Extreme", "Extreme +",
        "Hell"
    ];
    dropdown.innerHTML = difficulties.map(d =>
        `<div class="ptmodal-ratedropitem" tabindex="0" data-value="${d}">${d}</div>`
    ).join('');

    rateQuestion.addEventListener('click', function(e) {
        if (e.target.closest('.ptmodal-ratedropdown')) return;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    dropdown.addEventListener('click', function(e) {
        const item = e.target.closest('.ptmodal-ratedropitem');
        if (!item) return;
        const selected = item.getAttribute('data-value');
        dropdown.style.display = 'none';
        showConfirmationMessage(`You voted: ${selected}`);
    });

    document.addEventListener('mousedown', function handler(e) {
        if (!rateQuestion.contains(e.target)) {
            dropdown.style.display = 'none';
            document.removeEventListener('mousedown', handler);
        }
    });
}

// -------  AVATARS -------
async function fetchDiscordAvatar(user_id) {
    try {
        const response = await fetch(`api/settings/getUserAvatar.php?user_id=${user_id}`);
        if (!response.ok) return "assets/profile/default-avatar.png"; 
        const json = await response.json();
        return json.avatar_url || "assets/profile/default-avatar.png";
    } catch (e) {
        return "assets/profile/default-avatar.png"; 
    }
}

// -------  INIT CARDS -------
async function initializePlaytestCards(userId) {
    const container = document.getElementById('playtestCardContainer');
    const modal = document.getElementById("playtestModal");
    const modalInner = document.getElementById("playtestModalInner");
    const closeBtn = modal.querySelector(".playtest-modal-close");
    const backdrop = modal.querySelector(".playtest-modal-backdrop");

    try {
        await applyFilters(1);

        const closeHandler = () => {
            hidePlaytestModal();
        };

        closeBtn.addEventListener("click", closeHandler);
        backdrop.addEventListener("click", closeHandler);

    } catch (error) {
        console.error(error);
        container.innerHTML = `<p>Erreur lors du chargement des playtests.</p>`;
    }
}

function hidePlaytestModal() {
    const modal = document.getElementById("playtestModal");
    const modalInner = document.getElementById("playtestModalInner");
    modal.style.display = "none";
    modalInner.innerHTML = "";
    closeGlobalDropdown();
}

async function loadPlaytestsPage(page) {
    const container = document.getElementById("playtestCardContainer");
    try {
        showLoadingBar();
        const response = await fetch(`api/submit/getPlaytests.php?user_id=${encodeURIComponent(user_id)}&page_number=${page}&page_size=${itemsPerPage}`);
        if (!response.ok) throw new Error("Erreur lors du chargement des playtests");
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            container.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        if (!Array.isArray(data) || data.length === 0) {
            container.innerHTML = `<p>Aucune donnée de playtest disponible.</p>`;
            return;
        }
        const firstItem = data[0];
        totalResults = firstItem?.total_results || 0;
        totalPages = Math.ceil(totalResults / itemsPerPage);
        currentPage = page;

        renderPaginationButtons();

        container.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            const pt = data[i];
            const creatorId = String(pt.creator_ids || "0");
            pt.avatar = await fetchDiscordAvatar(creatorId);
        }

        window.currentPlaytestData = data;
        container.innerHTML = data.map((pt, i) => renderPlaytestCard(pt, i)).join('');

        container.addEventListener("click", function (e) {
            const card = e.target.closest(".playtest-embed");
            if (!card) return;
            const index = card.getAttribute("data-ptidx");
            const selectedPlaytest = data[index];
            const modal = document.getElementById("playtestModal");
            const modalInner = document.getElementById("playtestModalInner");
            modalInner.innerHTML = renderPlaytestModal(selectedPlaytest);
            modal.style.display = "block";

            setupRatingDropdown();
            initDifficultyChart(selectedPlaytest.difficulty_value);
        });
        hideLoadingBar();
    } catch (err) {
        console.error(err);
        container.innerHTML = `<p>Erreur lors du chargement des playtests.</p>`;
    }
}

// -------  PAGINATION -------
function renderPaginationButtons() {
    const paginationContainer = document.getElementById("paginationContainer");
    if(!paginationContainer) return;
    paginationContainer.innerHTML = "";

    if (totalPages <= 1) {
        return;
    }

    const firstButton = document.createElement("button");
    firstButton.textContent = t("pagination.first");
    firstButton.disabled = currentPage === 1;
    firstButton.addEventListener("click", () => changePage(1));
    paginationContainer.appendChild(firstButton);

    const prevButton = document.createElement("button");
    prevButton.textContent = t('pagination.prev');
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => changePage(currentPage - 1));
    paginationContainer.appendChild(prevButton);

    const pageIndicator = document.createElement("span");
    pageIndicator.textContent = t('pagination.page_of', {current: currentPage, total: totalPages});
    paginationContainer.appendChild(pageIndicator);

    const nextButton = document.createElement("button");
    nextButton.textContent = t('pagination.next');
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => changePage(currentPage + 1));
    paginationContainer.appendChild(nextButton);

    const lastButton = document.createElement("button");
    lastButton.textContent = t('pagination.last');
    lastButton.disabled = currentPage === totalPages;
    lastButton.addEventListener("click", () => changePage(totalPages));
    paginationContainer.appendChild(lastButton);
}

function changePage(page) {
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

    applyFilters(page)
    document.querySelector('.tab-buttons').scrollIntoView({ behavior: 'smooth' });
}

// -------  GRAPH MODAL -------
function initDifficultyChart(difficulty_value) {
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

    const meanDifficulty = difficulty_value;

    console.log("difficulty_value:", difficulty_value);
    console.log("Mean difficulty value:", meanDifficulty);

    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: difficultyLabels,
            datasets: [
                {
                    label: "Votes",
                    data: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
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
                    suggestedMax: 15
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
                if (!meanDifficulty || isNaN(meanDifficulty)) return;
                const { ctx, chartArea, scales } = chart;
                const xScale = scales.x;

                const difficultyRanges = {
                    'Easy -': [0, 1.18], 'Easy': [1.18, 1.76], 'Easy +': [1.76, 2.35],
                    'Medium -': [2.35, 2.94], 'Medium': [2.94, 3.53], 'Medium +': [3.53, 4.12],
                    'Hard -': [4.12, 4.71], 'Hard': [4.71, 5.29], 'Hard +': [5.29, 5.88],
                    'Very Hard -': [5.88, 6.47], 'Very Hard': [6.47, 7.06], 'Very Hard +': [7.06, 7.65],
                    'Extreme -': [7.65, 8.24], 'Extreme': [8.24, 8.82], 'Extreme +': [8.82, 9.41],
                    'Hell': [9.41, 10.0]
                };

                const labels = Object.keys(difficultyRanges);
                let index = -1;
                let subRatio = 0;

                for (let i = 0; i < labels.length; i++) {
                    const [min, max] = difficultyRanges[labels[i]];
                    if (meanDifficulty >= min && meanDifficulty <= max) {
                        index = i;
                        subRatio = (meanDifficulty - min) / (max - min);
                        break;
                    }
                }

                if (index === -1) return;

                const barWidth = xScale.getPixelForValue(1) - xScale.getPixelForValue(0);
                const baseX = xScale.getPixelForValue(index);
                const x = baseX + barWidth * subRatio;

                const yTop = chartArea.top;
                const barHeight = 60;
                const yStart = yTop + 19;
                const yEnd = yStart + barHeight;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, yStart);
                ctx.lineTo(x, yEnd);
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#111";
                ctx.shadowColor = "#000";
                ctx.shadowBlur = 7;
                ctx.stroke();
                ctx.restore();

                const dotY = yStart + 30;

                ctx.save();
                ctx.beginPath();
                ctx.arc(x, dotY, 7, 0, 2 * Math.PI);
                ctx.fillStyle = "#161616";
                ctx.shadowColor = "#000";
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, dotY, 4, 0, 2 * Math.PI);
                ctx.fillStyle = "#222";
                ctx.fill();
                ctx.restore();
            }
        }]
    });
}

// --------- Toolbar ---------
function showPlaytestSectionWithToolbar() {
    document.getElementById('playtestSection').style.display = 'block';

    if (!icons.length) initializeIcons();
    initializePlaytestToolbar();
    setupToolbarDeselectOnClickOutside();
    initializePlaytestCards(user_id);
}

async function initializePlaytestToolbar() {
    const { mechanicsOptions, restrictionsOptions } = await fillMechanicsAndRestrictions();

    const playtestIcons = icons.filter(icon =>
        [
            "map_code", "creator", "map_name",
            "difficulty", "map_type",
            "mechanics", "restrictions",
            "participation_filter",
            "apply_filters", "clear_filters"
        ].includes(icon.id)
    );
    const toolbar = document.querySelector("#playtestSection .toolbar");
    toolbar.innerHTML = "";

    const filterType = {
        map_code: "input",
        creator: "input",
        map_name: "input",
        difficulty: "dropdown",
        map_type: "dropdown",
        mechanics: "dropdown",
        restrictions: "dropdown",
        participation_filter: "dropdown"
    };

    const dropdownOptions = {
        difficulty: [
            { text: t("filters_toolbar.beginner"), value: "Beginner", raw: "Beginner" },
            { text: t("filters_toolbar.easy"),     value: "Easy",     raw: "Easy"     },
            { text: t("filters_toolbar.medium"),   value: "Medium",   raw: "Medium"   },
            { text: t("filters_toolbar.hard"),     value: "Hard",     raw: "Hard"     },
            { text: t("filters_toolbar.very_hard"),value: "Very Hard",raw: "Very Hard"},
            { text: t("filters_toolbar.extreme"),  value: "Extreme",  raw: "Extreme"  },
            { text: t("filters_toolbar.hell"),     value: "Hell",     raw: "Hell"     }
        ],
        map_type: [
            { text: t("filters_toolbar.classic"),               value: "Classic",               raw: "Classic" },
            { text: t("filters_toolbar.increasing_difficulty"), value: "Increasing Difficulty", raw: "Increasing Difficulty" },
            { text: t("filters_toolbar.tournament"),            value: "Tournament",            raw: "Tournament" }
        ],
        mechanics:    mechanicsOptions,
        restrictions: restrictionsOptions,
        participation_filter: [
            { text: t("filters_toolbar.participated_yes"), raw: "participated" },
            { text: t("filters_toolbar.participated_no"),  raw: "not_participated"  }
        ]
    };

    playtestIcons.forEach(icon => {
        const button = createButton(icon);
        toolbar.appendChild(button);
        button.insertAdjacentHTML('beforeend', '<div class="selection-circle"></div>');

        button.addEventListener('click', (e) => {
            const selectionCircle = button.querySelector('.selection-circle');
            const buttonWidth = button.offsetWidth;
            e.stopPropagation();

            if (e.target.classList.contains('custom-toolbar-input')) {
                return;
            }

            document.querySelectorAll('#playtestSection .toolbar-button.selected').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            document.getElementById('icon-name').textContent = icon.name;

            if (selectionCircle) {
                selectionCircle.style.transition = "all 0.4s ease-in-out";
                selectionCircle.style.left     = `${(buttonWidth - selectionCircle.offsetWidth) / 2}px`;
                selectionCircle.style.top      = "0px";
            }

            if (currentInput) {
                currentInput.remove();
                currentInput = null;
            }
            if (currentOptionsContainer) {
                currentOptionsContainer.remove();
                currentOptionsContainer = null;
            }

            if (icon.id === 'apply_filters') {
                applyFilters();
                return;
            }
            if (icon.id === 'clear_filters') {
                clearFilters();
                return;
            }

            const type = filterType[icon.id];
            if (type === 'input') {
                if (button.querySelector('.custom-toolbar-input')) {
                    button.querySelector('.custom-toolbar-input').focus();
                    return;
                }

                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'custom-toolbar-input';
                input.placeholder = icon.name;

                button.appendChild(input);
                positionInputOrDropdown(input, null, button);
                input.focus();
                currentInput = input;

                if (icon.id === 'map_code') {
                    input.addEventListener('input', e =>
                        showSuggestions(e, 'getMapCodesAutoComplete.php', 'mapCodeSuggestions', 'map_code')
                    );
                } else if (icon.id === 'creator') {
                    input.addEventListener('input', e =>
                        showSuggestions(e, 'getUsersAutoComplete.php', 'creatorSuggestions', 'creator')
                    );
                } else if (icon.id === 'map_name') {
                    input.addEventListener('input', e =>
                        showSuggestions(e, 'getMapNamesAutoComplete.php', 'mapNameSuggestions', 'map_name')
                    );
                }

                setTimeout(() => {
                    document.addEventListener('mousedown', function handler(ev) {
                        if (!input.contains(ev.target) && ev.target !== button) {
                            input.remove();
                            currentInput = null;
                            document.removeEventListener('mousedown', handler);
                        }
                    });
                }, 0);

            } else if (type === 'dropdown') {
                const id = icon.id + 'Options';
                const useWrapper = ['mechanics','restrictions'].includes(icon.id);
                const opts = showOptionsContainer(id, dropdownOptions[icon.id], button, useWrapper);
                if (opts) positionInputOrDropdown(null, opts, button);
            }
        });
    });
}


function initializeIcons() {
    icons = [
        "map_code", "creator", "map_name", "difficulty", 
        "map_type", "mechanics", "restrictions", "participation_filter", "apply_filters", "clear_filters"
    ].map(id => ({
        id,
        name: t(`filters_toolbar.${id}`) || id.replace('_', ' ').toUpperCase(),
        svg: getIconSVG(id)
    }));
}

function getIconSVG(id) {
    const svgs = {
        "map_code": `<path d="M15 9H15.01M15 15C18.3137 15 21 12.3137 21 9C21 5.68629 18.3137 3 15 3C11.6863 3 9 5.68629 9 9C9 9.27368 9.01832 9.54308 9.05381 9.80704C9.11218 10.2412 9.14136 10.4583 9.12172 10.5956C9.10125 10.7387 9.0752 10.8157 9.00469 10.9419C8.937 11.063 8.81771 11.1823 8.57913 11.4209L3.46863 16.5314C3.29568 16.7043 3.2092 16.7908 3.14736 16.8917C3.09253 16.9812 3.05213 17.0787 3.02763 17.1808C3 17.2959 3 17.4182 3 17.6627V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H6.33726C6.58185 21 6.70414 21 6.81923 20.9724C6.92127 20.9479 7.01881 20.9075 7.10828 20.8526C7.2092 20.7908 7.29568 20.7043 7.46863 20.5314L12.5791 15.4209C12.8177 15.1823 12.937 15.063 13.0581 14.9953C13.1843 14.9248 13.2613 14.8987 13.4044 14.8783C13.5417 14.8586 13.7588 14.8878 14.193 14.9462C14.4569 14.9817 14.7263 15 15 15Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "nickname": `<path d="M16.5 14C16.2164 12.8589 14.981 12 13.5 12C12.019 12 10.7836 12.8589 10.5 14M13.5 8H13.51M18 21H10.2C7.67976 21 6.41965 21 5.45704 20.5095C4.61031 20.0781 3.9219 19.3897 3.49047 18.543C3 17.5804 3 16.3202 3 13.8V6M9.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V14.8C6 15.9201 6 16.4802 6.21799 16.908C6.40973 17.2843 6.71569 17.5903 7.09202 17.782C7.51984 18 8.0799 18 9.2 18ZM14.5 8C14.5 8.55228 14.0523 9 13.5 9C12.9477 9 12.5 8.55228 12.5 8C12.5 7.44772 12.9477 7 13.5 7C14.0523 7 14.5 7.44772 14.5 8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "creator": `<path d="M16.5 14C16.2164 12.8589 14.981 12 13.5 12C12.019 12 10.7836 12.8589 10.5 14M13.5 8H13.51M18 21H10.2C7.67976 21 6.41965 21 5.45704 20.5095C4.61031 20.0781 3.9219 19.3897 3.49047 18.543C3 17.5804 3 16.3202 3 13.8V6M9.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V14.8C6 15.9201 6 16.4802 6.21799 16.908C6.40973 17.2843 6.71569 17.5903 7.09202 17.782C7.51984 18 8.0799 18 9.2 18ZM14.5 8C14.5 8.55228 14.0523 9 13.5 9C12.9477 9 12.5 8.55228 12.5 8C12.5 7.44772 12.9477 7 13.5 7C14.0523 7 14.5 7.44772 14.5 8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "user": `<path d="M16.5 14C16.2164 12.8589 14.981 12 13.5 12C12.019 12 10.7836 12.8589 10.5 14M13.5 8H13.51M18 21H10.2C7.67976 21 6.41965 21 5.45704 20.5095C4.61031 20.0781 3.9219 19.3897 3.49047 18.543C3 17.5804 3 16.3202 3 13.8V6M9.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V14.8C6 15.9201 6 16.4802 6.21799 16.908C6.40973 17.2843 6.71569 17.5903 7.09202 17.782C7.51984 18 8.0799 18 9.2 18ZM14.5 8C14.5 8.55228 14.0523 9 13.5 9C12.9477 9 12.5 8.55228 12.5 8C12.5 7.44772 12.9477 7 13.5 7C14.0523 7 14.5 7.44772 14.5 8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "map_name": `<path d="M14.4996 8.5001H14.5096M16.2196 19.9601L10.5508 14.2705C9.7579 13.4747 9.36143 13.0768 8.90391 12.9277C8.50148 12.7966 8.06782 12.7965 7.66534 12.9275C7.20776 13.0764 6.81115 13.4742 6.01792 14.2697L4.30299 15.9897M12.2385 15.9644L12.6069 15.5951C13.4081 14.7996 13.8087 14.4018 14.2689 14.2554C14.6737 14.1267 15.109 14.1302 15.5117 14.2654C15.9696 14.4191 16.3638 14.8232 17.1522 15.6314L18.8889 17.3881M18.8889 17.3881L21.5377 12.8001C21.706 12.5087 21.7901 12.3629 21.823 12.208C21.8522 12.0709 21.8522 11.9293 21.823 11.7922C21.7901 11.6373 21.706 11.4915 21.5377 11.2001L17.4615 4.13984C17.2932 3.8484 17.2091 3.70268 17.0914 3.5967C16.9872 3.50293 16.8645 3.43209 16.7313 3.38879C16.5806 3.33984 16.4124 3.33984 16.0758 3.33984H7.92336C7.58683 3.33984 7.41856 3.33984 7.26793 3.38879C7.13465 3.43209 7.01196 3.50293 6.90782 3.5967C6.79011 3.70268 6.70598 3.8484 6.53772 4.13984L2.46148 11.2001C2.29321 11.4915 2.20908 11.6373 2.17615 11.7922C2.14701 11.9293 2.14701 12.0709 2.17615 12.208C2.20908 12.3629 2.29321 12.5087 2.46148 12.8001L4.30299 15.9897M18.8889 17.3881L17.4615 19.8604C17.2932 20.1518 17.2091 20.2975 17.0914 20.4035C16.9872 20.4973 16.8645 20.5681 16.7313 20.6114C16.5806 20.6604 16.4124 20.6604 16.0758 20.6604H7.92336C7.58683 20.6604 7.41856 20.6604 7.26793 20.6114C7.13465 20.5681 7.01196 20.4973 6.90782 20.4035C6.79011 20.2975 6.70598 20.1518 6.53772 19.8604L4.30299 15.9897M14.9996 8.5001C14.9996 8.77624 14.7757 9.0001 14.4996 9.0001C14.2235 9.0001 13.9996 8.77624 13.9996 8.5001C13.9996 8.22396 14.2235 8.0001 14.4996 8.0001C14.7757 8.0001 14.9996 8.22396 14.9996 8.5001Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "difficulty": `<path d="M4 8L6 20H18L20 8M4 8L5.71624 9.37299C6.83218 10.2657 7.39014 10.7121 7.95256 10.7814C8.4453 10.8421 8.94299 10.7173 9.34885 10.4314C9.81211 10.1051 10.0936 9.4483 10.6565 8.13476L12 5M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8ZM20 8L18.2838 9.373C17.1678 10.2657 16.6099 10.7121 16.0474 10.7814C15.5547 10.8421 15.057 10.7173 14.6511 10.4314C14.1879 10.1051 13.9064 9.4483 13.3435 8.13476L12 5M20 8C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6C19.4477 6 19 6.44772 19 7C19 7.55228 19.4477 8 20 8ZM12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5ZM12 4H12.01M20 7H20.01M4 7H4.01" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "map_type": `<path d="M11 8L16 8.00053M11 12L16 12.0005M11 16L16 16.0005M8 16H8.01M8 12H8.01M8 8H8.01M7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.8C20 17.9201 20 18.4802 19.782 18.908C19.5903 19.2843 19.2843 19.5903 18.908 19.782C18.4802 20 17.9201 20 16.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.0799 4 7.2 4Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "mechanics": `
            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `,
        "restrictions": `<path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "only_playtest": `<path d="M14.2639 15.9376L12.5958 14.2835C11.7909 13.4852 11.3884 13.0861 10.9266 12.9402C10.5204 12.8119 10.0838 12.8166 9.68048 12.9537C9.22188 13.1096 8.82814 13.5173 8.04068 14.3327L4.04409 18.2802M14.2639 15.9376L14.6053 15.5991C15.4112 14.7999 15.8141 14.4003 16.2765 14.2544C16.6831 14.1262 17.12 14.1312 17.5236 14.2688C17.9824 14.4252 18.3761 14.834 19.1634 15.6515L20 16.4936M14.2639 15.9376L18.275 19.9566M18.275 19.9566C17.9176 20.0001 17.4543 20.0001 16.8 20.0001H7.2C6.07989 20.0001 5.51984 20.0001 5.09202 19.7821C4.71569 19.5904 4.40973 19.2844 4.21799 18.9081C4.12796 18.7314 4.07512 18.5322 4.04409 18.2802M18.275 19.9566C18.5293 19.9257 18.7301 19.8728 18.908 19.7821C19.2843 19.5904 19.5903 19.2844 19.782 18.9081C20 18.4803 20 17.9202 20 16.8001V16.4936M12.5 4L7.2 4.00011C6.07989 4.00011 5.51984 4.00011 5.09202 4.21809C4.71569 4.40984 4.40973 4.7158 4.21799 5.09213C4 5.51995 4 6.08 4 7.20011V16.8001C4 17.4576 4 17.9222 4.04409 18.2802M20 11.5V16.4936M14 10.0002L16.0249 9.59516C16.2015 9.55984 16.2898 9.54219 16.3721 9.5099C16.4452 9.48124 16.5146 9.44407 16.579 9.39917C16.6515 9.34859 16.7152 9.28492 16.8425 9.1576L21 5.00015C21.5522 4.44787 21.5522 3.55244 21 3.00015C20.4477 2.44787 19.5522 2.44787 19 3.00015L14.8425 7.1576C14.7152 7.28492 14.6515 7.34859 14.6009 7.42112C14.556 7.4855 14.5189 7.55494 14.4902 7.62801C14.4579 7.71033 14.4403 7.79862 14.4049 7.97518L14 10.0002Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "ignore_completions": `<path d="M9 12L11 14L15 10M12 3L13.9101 4.87147L16.5 4.20577L17.2184 6.78155L19.7942 7.5L19.1285 10.0899L21 12L19.1285 13.9101L19.7942 16.5L17.2184 17.2184L16.5 19.7942L13.9101 19.1285L12 21L10.0899 19.1285L7.5 19.7942L6.78155 17.2184L4.20577 16.5L4.87147 13.9101L3 12L4.87147 10.0899L4.20577 7.5L6.78155 6.78155L7.5 4.20577L10.0899 4.87147L12 3Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "only_maps_with_medals": `<path d="M12 11L8 3H4L8.5058 12.4622M12 11L16 3H20L15.4942 12.4622M12 11C13.344 11 14.5848 11.5635 15.4942 12.4622M12 11C10.656 11 9.41518 11.5635 8.5058 12.4622M15.4942 12.4622C16.4182 13.3753 17 14.6344 17 16C17 18.7614 14.7614 21 12 21C9.23858 21 7 18.7614 7 16C7 14.6344 7.58179 13.3753 8.5058 12.4622" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`,
        "participation_filter": `
            <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `,
        "apply_filters": `<path d="M4 12.6111L8.92308 17.5L20 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
        "clear_filters": `<path d="M6 6L18 18M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,


    };
    return svgs[id] || "";
}

function createButton(icon) {
    const button = document.createElement("button");
    button.classList.add("toolbar-button");
    button.setAttribute("data-name", icon.name);
    button.setAttribute("id", `${icon.id}FilterButton`); 
    button.innerHTML = `
        <svg viewBox="${icon.viewBox || "0 0 24 24"}" xmlns="http://www.w3.org/2000/svg">
            ${icon.svg}
        </svg>
        <div class="icon-name">${icon.name}</div>
    `;
    return button;
}

function setupToolbarDeselectOnClickOutside() {
    document.addEventListener("mousedown", function(event) {
        const isToolbarButton = event.target.closest('.toolbar-button');
        const isToolbar = event.target.closest('.toolbar');
        if (!isToolbarButton && !isToolbar) {
            document.querySelectorAll('.toolbar-button.selected').forEach(btn =>
                btn.classList.remove('selected')
            );
        }
    });
}

function showOptionsContainer(id, options, button, useWrapper = false) {
    const existing = button.querySelector('.custom-options');
    if (existing) {
        const shown = existing.classList.toggle('show');
        if (!shown) currentOptionsContainer = null;
        return shown ? existing : null;
    }

    const rawProp = id.replace('Options','');
    const prop    = mapFilterKey(rawProp);
    if (!(prop in activeFilters)) activeFilters[prop] = useWrapper ? [] : null;

    const container = document.createElement('div');
    container.id = id;
    container.className = `custom-options ${useWrapper? 'with-wrapper' : 'without-wrapper'} show`;

    options.forEach(opt => {
        const display = opt.translated || opt.text || '';
        const raw = opt.raw || opt.value || display;

        if (useWrapper) {
            const wrapper = document.createElement('div');
            wrapper.className = 'custom-option-wrapper';
            const cb = document.createElement('input');
            cb.type = 'checkbox'; cb.className = 'custom-checkbox';
            cb.id = `${id}_${raw.replace(/\s+/g,'_')}`;
            cb.checked = activeFilters[prop].includes(raw);
            const label = document.createElement('label');
            label.htmlFor = cb.id; label.className = 'custom-option';
            label.textContent = display; label.setAttribute('data-raw-value', raw);

            wrapper.append(cb, label);
            container.append(wrapper);

            wrapper.addEventListener('click', e => {
                e.stopPropagation();
                cb.checked = !cb.checked;
                if (cb.checked) {
                    if (!activeFilters[prop].includes(raw)) activeFilters[prop].push(raw);
                } else {
                    activeFilters[prop] = activeFilters[prop].filter(v => v !== raw);
                }
                showConfirmationMessage(t('popup.filter_applied', { filterId: prop, value: display }));
                updateActiveFilters();
                updateToolbarButtonStates();
            });

        } else {
            const el = document.createElement('div');
            el.className = 'custom-option'; el.textContent = display;
            el.setAttribute('data-raw-value', raw);
            if (activeFilters[prop] === raw) el.classList.add('selected');
            container.append(el);

            el.addEventListener('click', e => {
                e.stopPropagation();
                container.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
                el.classList.add('selected');
                activeFilters[prop] = raw;
                showConfirmationMessage(t('popup.filter_applied', { filterId: prop, value: display }));
                updateActiveFilters();
                updateToolbarButtonStates();

                container.classList.remove('show');
                container.remove();
                currentOptionsContainer = null;
            });
        }
    });

    button.appendChild(container);
    currentOptionsContainer = container;
    document.addEventListener('mousedown', handleOutsideClick);
    return container;
}

// --------- FILTERS ---------
function updateActiveFilters() {
    console.log('[DEBUG] before cleanup →', activeFilters);

    Object.keys(activeFilters).forEach(k => {
        const v = activeFilters[k];
        if (v == null) {
            delete activeFilters[k];
        }
    });

    console.log('[DEBUG] after cleanup →', activeFilters);
}

function mapFilterKey(rawKey) {
  return filterKeyMap[rawKey] || rawKey;
}

function clearFilters() {
    Object.keys(activeFilters).forEach(k => delete activeFilters[k]);
    currentPage = 1;

    hidePlaytestModal();
    applyFilters(1);
    updateToolbarButtonStates();
}

async function applyFilters(page = 1) {
    currentPage = page;
    hidePlaytestModal();

    const params = new URLSearchParams({
        user_id,
        page_number: currentPage,
        page_size: itemsPerPage
    });
    Object.entries(activeFilters).forEach(([key, val]) => {
        if (Array.isArray(val)) {
            val.forEach(v => params.append(key, v));
        } else {
            params.append(key, val);
        }
    });

    try {
        const resp = await fetch(`api/submit/getPlaytests.php?${params.toString()}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        console.log("Resp",resp);

        if (!Array.isArray(data) || data.length === 0) {
            totalResults = 0;
            totalPages   = 1;
            renderPaginationButtons();
            showErrorMessage(t('popup.no_results'));
            clearFilters();
            return;
        }

        totalResults = data[0].total_results || 0;
        totalPages   = Math.ceil(totalResults / itemsPerPage);
        renderPaginationButtons();
        updateToolbarButtonStates();

        await Promise.all(data.map(async pt => {
            window.currentPlaytestData = data;
            const creatorId = String(pt.creator_ids || '0');
            pt.avatar = await fetchDiscordAvatar(creatorId);
        }));

        const container = document.getElementById('playtestCardContainer');
        container.innerHTML = data.map((pt,i) => renderPlaytestCard(pt,i)).join('');

        container.onclick = function(e) {
            const card = e.target.closest('.playtest-embed');
            if (!card) return;
            const idx = +card.dataset.ptidx;
            const selected = data[idx];
            if (!selected) return;
            const modal = document.getElementById('playtestModal');
            const modalInner = document.getElementById('playtestModalInner');
            modalInner.innerHTML = renderPlaytestModal(selected);
            modal.style.display = 'block';
            setupRatingDropdown();
            initDifficultyChart(selected.difficulty_value);
        };

    } catch (err) {
        console.error('Erreur getPlaytests:', err);
        showConfirmationMessage(t('errors.playtests_load_failed'));
    }
}

function updateToolbarButtonStates() {
    document.querySelectorAll(".toolbar-button").forEach(button => {
        const rawKey = button.id.replace("FilterButton", "").toLowerCase();
        const key = mapFilterKey(rawKey);

        const val = activeFilters[key];
        const isActive = Array.isArray(val)? val.length > 0 : val != null && val !== "";

        button.classList.toggle("active-filter", isActive);
    });
}

// --------- SUGGESTIONS ---------
function showSuggestions(event, apiEndpoint, containerId, propertyName) {
    const input = event.target;
    const suggestionsContainer = getSuggestionsContainer(containerId, input);
    suggestionsContainer.addEventListener('mousedown', e => e.stopPropagation());

    function outsideClickHandler(e) {
        if (!suggestionsContainer.contains(e.target) &&e.target !== input) {
            suggestionsContainer.style.display = 'none';
            document.removeEventListener('mousedown', outsideClickHandler);
        }
    }

    clearTimeout(toolbarDebounce);
    if (input.value.trim().length < 2) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    toolbarDebounce = setTimeout(() => {
        fetch(`api/autocomplete/${apiEndpoint}?value=${encodeURIComponent(input.value)}`)
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(data => {
            suggestionsContainer.innerHTML = '';
            data.forEach(item => {
                const display = propertyName === 'creator'
                    ? item.name
                    : (item.translated_map_name || item[propertyName]);
                const raw = propertyName === 'creator'
                    ? item.user_id
                    : item[propertyName];

                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = display;

                div.addEventListener('click', e => {
                    e.stopPropagation();
                    const key = mapFilterKey(propertyName);
                    activeFilters[key] = raw;
                    showConfirmationMessage(
                        t('popup.filter_applied', { filterId: propertyName, value: display })
                    );
                    updateActiveFilters();
                    updateToolbarButtonStates();
                    suggestionsContainer.style.display = 'none';
                    document.removeEventListener('mousedown', outsideClickHandler);
                    input.remove();
                    currentInput = null;
                });

                suggestionsContainer.appendChild(div);
            });

            if (data.length) {
                suggestionsContainer.style.display = 'block';
                document.addEventListener('mousedown', outsideClickHandler);
            } else {
                suggestionsContainer.style.display = 'none';
            }
        })
        .catch(() => {
            suggestionsContainer.style.display = 'none';
        });
    }, 200);
}

function getSuggestionsContainer(containerId, input) {
    let suggestionsContainer = document.getElementById(containerId);

    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement("div");
        suggestionsContainer.id = containerId;
        suggestionsContainer.classList.add("suggestions-container");
        document.body.appendChild(suggestionsContainer);
    }

    const inputRect = input.getBoundingClientRect();
    const inputWidth = input.offsetWidth;

    suggestionsContainer.style.position = "absolute";
    suggestionsContainer.style.top = `${inputRect.bottom + window.scrollY + 5}px`;
    suggestionsContainer.style.left = `${inputRect.left + window.scrollX}px`;
    suggestionsContainer.style.width = `${inputWidth}px`;

    return suggestionsContainer;
}

// ----- UTILS -----
function handleOutsideClick(e) {
    const toolbar = document.querySelector("#playtestSection .toolbar");
    const isClickInsideToolbar = toolbar && toolbar.contains(e.target);
    const isClickInsideDropdown = e.target.closest(".custom-options");
    const isClickInsideInput = e.target.closest(".custom-toolbar-input");

        if (!isClickInsideToolbar && !isClickInsideDropdown && !isClickInsideInput) {
        document.querySelectorAll(".custom-options").forEach((el) => {
            el.classList.remove("show");
            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 300);
        });

        document.querySelectorAll(".custom-toolbar-input").forEach((el) => {
            if (el.parentNode) el.parentNode.removeChild(el);
        });

        document.querySelectorAll(".suggestions-container").forEach((el) => {
            if (el.parentNode) el.parentNode.removeChild(el);
        });

        document.querySelectorAll(".toolbar-button.selected").forEach(btn => {
        btn.classList.remove("selected");
        });

        document.querySelectorAll(".toolbar-button.selected").forEach((btn) =>
            btn.classList.remove("selected")
        );

        document.removeEventListener("mousedown", handleOutsideClick);
    }
}

function positionInputOrDropdown(input, optionsContainer, button) {
    if (input) {
        if (currentInput && currentInput !== input) {
            currentInput.remove();
        }
        input.style.position = "absolute";
        input.style.top = `${button.offsetHeight + 5}px`;
        input.style.left = "-55px";
        input.style.display = "block";
        currentInput = input;
    }
    if (optionsContainer) {
        if (optionsContainer.parentNode !== button) {
            button.appendChild(optionsContainer);
        }
        const isWithWrapper = optionsContainer.classList.contains("with-wrapper");
        optionsContainer.style.position = "absolute";
        optionsContainer.style.top = `${button.offsetHeight + 8}px`;
        optionsContainer.style.left = isWithWrapper ? "-70px" : "-60px";
        optionsContainer.style.display = "block";
    }
}

// --------- INITIALISATION GLOBALE ---------
async function initializeSubmitMap() {
    loadMainCreatorFromUserId(user_id);
    populateStaticDropdowns();
    await loadDynamicOptions();
    await setupAllCustomDropdowns();
}
function initializeSubmitRecord() {
    dragAndDrop();
    qualityDropdown();
    mapCodeAutoComplete();
}

async function initializeApp() {
    showLoadingBar();
    await loadTranslations();
    if (!user_id) {
        showErrorMessage(t('popup.login_required_msg'));
        document.querySelector('.tab-buttons').style.display = 'none';
        hideLoadingBar();
        return;
    }
    setupTabs();
    setupForms();
    hideLoadingBar();
}

document.addEventListener("DOMContentLoaded", initializeApp);