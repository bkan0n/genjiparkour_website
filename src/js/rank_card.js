console.log("rank_card.js chargé avec succès.");
let selectedUserId = null;

function initRankCard() {
    const rankCardContent = document.getElementById("rankCardContent");
    const badgeMasteryContent = document.getElementById("badgeMasteryContent");
    const btnRankCard = document.getElementById("btnRankCard");
    const btnBadges = document.getElementById("btnBadges");

    btnRankCard.addEventListener("click", () => toggleTabs(rankCardContent, badgeMasteryContent, btnRankCard, btnBadges));
    btnBadges.addEventListener("click", () => toggleTabs(badgeMasteryContent, rankCardContent, btnBadges, btnRankCard));

    loadRankCardContent();
    loadUserMasteryContent();
    createSearchSuggestions();
}

function loadRankCardContent() {
    const rankCardContent = document.getElementById("rankCardContent");
    const imageUrl = 'api/rankcard/getRankCard.php';
    showLoadingBar();

    const wrapper = document.createElement("div");
    wrapper.className = "rank-card-image-wrapper hidden";

    const img = new Image();
    img.src = imageUrl;
    img.alt = "Rank Card";
    img.className = "rank-card-image";

    img.onload = () => {
        wrapper.classList.remove("hidden");
        rankCardContent.classList.add("active");
        hideLoadingBar();
    };

    img.onerror = () => {
        console.error("Erreur de chargement de l'image");
        hideLoadingBar();
    };

    wrapper.appendChild(img);
    rankCardContent.appendChild(wrapper);
}

function loadUserMasteryContent() {
    const badgeMasteryContent = document.getElementById("badgeMasteryContent");
    badgeMasteryContent.style.display = "none";

    fetch('api/rankcard/getUserMastery.php')
        .then(response => response.json())
        .then(data => {
            badgeMasteryContent.innerHTML = "";
            if (!data || data.length === 0) {
                badgeMasteryContent.innerHTML = `<p class="error">Aucun badge trouvé.</p>`;
                return;
            }

            data.forEach(badge => {
                if (badge.map_name === "Tools" || badge.map_name === "Framework") return;

                const badgeLevel = badge.level === "Placeholder" ? "Unranked" : badge.level;

                const badgeElement = document.createElement("div");
                badgeElement.className = "badge-item";

                if (badge.level === "Prodigy") {
                    badgeElement.classList.add("glowing");
                }

                badgeElement.innerHTML = `
                    <img src="${badge.icon_url}" alt="${badge.map_name}" class="badge-icon">
                    <p class="badge-name">${badge.map_name}</p>
                    <p class="badge-level">${badgeLevel}</p>
                    <p class="badge-amount">${t('rank_card.completions', { amount: badge.amount })}</p>
                `;
                badgeMasteryContent.appendChild(badgeElement);
            });

            badgeMasteryContent.style.display = "grid";
        })
        .catch(err => {
            console.error("Erreur de chargement des badges :", err);
            badgeMasteryContent.innerHTML = `<p class="error">Erreur de chargement des badges.</p>`;
        });
}

function toggleTabs(showContent, hideContent, activeBtn, inactiveBtn) {
    activeBtn.classList.add("active");
    inactiveBtn.classList.remove("active");

    showContent.classList.add("active");
    showContent.classList.remove("hidden");

    hideContent.classList.add("hidden");
    hideContent.classList.remove("active");
}

function createSearchSuggestions() {
    const searchInput = document.getElementById("searchUserName");
    const searchButton = document.getElementById("searchButton");
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.id = "suggestionsContainer";
    suggestionsContainer.className = "suggestions not-visible";
    searchInput.parentNode.appendChild(suggestionsContainer);

    searchInput.addEventListener("input", async () => {
        const query = searchInput.value.trim();
        if (query.length < 2) {
            suggestionsContainer.innerHTML = "";
            suggestionsContainer.classList.add("not-visible");
            suggestionsContainer.style.display = "none";
            return;
        }
        const inputWidth = searchInput.offsetWidth;
        suggestionsContainer.style.width = `${inputWidth}px`;

        try {
            const response = await fetch(`api/autocomplete/getUsersAutoComplete.php?value=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error("Erreur de chargement des suggestions.");
            const suggestions = await response.json();
            displaySuggestions(suggestions, suggestionsContainer);
        } catch (error) {
            console.error("Erreur lors du chargement des suggestions:", error);
        }
    });

    searchButton.addEventListener("click", () => fetchUserRankCard());
    searchButton.addEventListener("click", () => fetchUserMastery());
}

async function fetchUserRankCard() {
    if (!selectedUserId) {
        alert("Veuillez sélectionner un utilisateur valide.");
        return;
    }

    const rankCardContent = document.getElementById("rankCardContent");
    const badgeMasteryContent = document.getElementById("badgeMasteryContent");

    rankCardContent.innerHTML = "";
    badgeMasteryContent.innerHTML = "";

    const imageUrl = `api/rankcard/getRankCard.php?user_id=${selectedUserId}`;

    showLoadingBar();

    const wrapper = document.createElement("div");
    wrapper.className = "rank-card-image-wrapper hidden";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Rank Card";
    img.className = "rank-card-image";

    img.onload = () => {
        wrapper.classList.remove("hidden");
        rankCardContent.classList.add("active");
        hideLoadingBar();
    };

    img.onerror = () => {
        console.error("Erreur de chargement de l'image");
        hideLoadingBar();
    };

    wrapper.appendChild(img);
    rankCardContent.appendChild(wrapper);
}

async function fetchUserMastery() {
    if (!selectedUserId) {
        alert("Veuillez sélectionner un utilisateur valide.");
        return;
    }

    const badgeMasteryContent = document.getElementById("badgeMasteryContent");
    badgeMasteryContent.innerHTML = "";

    try {
        const response = await fetch(`api/rankcard/getUserMastery.php?user_id=${selectedUserId}`);
        const data = await response.json();

        if (!data || data.length === 0) {
            badgeMasteryContent.innerHTML = `<p class="error">Aucun badge trouvé.</p>`;
            return;
        }

        data.forEach(badge => {
            if (badge.map_name === "Tools" || badge.map_name === "Framework") return;

            const badgeLevel = badge.level === "Placeholder" ? "Unranked" : badge.level;

            const badgeElement = document.createElement("div");
            badgeElement.className = "badge-item";

            if (badge.level === "Prodigy") {
                badgeElement.classList.add("glowing");
            }

            badgeElement.innerHTML = `
                <img src="${badge.icon_url}" alt="${badge.map_name}" class="badge-icon">
                <p class="badge-name">${badge.map_name}</p>
                <p class="badge-level">${badgeLevel}</p>
                <p class="badge-amount">${t('rank_card.completions', { amount: badge.amount })}</p>
            `;
            badgeMasteryContent.appendChild(badgeElement);
        });
    } catch (err) {
        console.error("Erreur de chargement des badges :", err);
        badgeMasteryContent.innerHTML = `<p class="error">Erreur de chargement des badges.</p>`;
    }
}

function displaySuggestions(suggestions, container) {
    container.innerHTML = "";
    if (suggestions.length === 0) {
        container.classList.add("not-visible");
        return;
    }

    suggestions.forEach(user => {
        const suggestionItem = document.createElement("div");
        suggestionItem.className = "suggestion-item";
        suggestionItem.textContent = user.name;
        suggestionItem.addEventListener("click", () => {
            document.getElementById("searchUserName").value = user.name;
            selectedUserId = user.user_id;
            container.classList.add("not-visible");
            suggestionsContainer.style.display = "none";
        });
        container.appendChild(suggestionItem);
    });

    suggestionsContainer.style.display = "block";
    container.classList.remove("not-visible");
}

function showLoadingBar() {
    const loadingContainer = document.getElementById("loadingContainer");
    if (!loadingContainer) {
        console.error("loadingContainer introuvable.");
        return;
    }
    loadingContainer.style.display = "flex";
    loadingContainer.style.opacity = "1";
}

function hideLoadingBar() {
    const loadingContainer = document.getElementById("loadingContainer");
    if (!loadingContainer) {
        console.error("loadingContainer introuvable.");
        return;
    }
    loadingContainer.style.opacity = "0";
    setTimeout(() => loadingContainer.style.display = "none", 200);
}

document.addEventListener("click", (event) => {
    const rankCardModal = document.getElementById("rankCardModal");
    const modalContent = document.querySelector(".rank-card-container");
    const closeButton = document.querySelector(".close-modal");

    if (
        (event.target === rankCardModal && !modalContent.contains(event.target)) || 
        event.target === closeButton || 
        closeButton.contains(event.target)
    ) {
        rankCardModal.style.display = "none";
        document.body.classList.remove("modal-active");
    }
});


window.addEventListener("click", (event) => {
    const suggestionsContainer = document.getElementById("suggestionsContainer");
    const searchInput = document.getElementById("searchUserName");

    if (!suggestionsContainer.contains(event.target) && event.target !== searchInput) {
        suggestionsContainer.classList.add("not-visible");
        suggestionsContainer.style.display = "none";
    }
});