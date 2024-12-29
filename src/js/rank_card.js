if (typeof availableAvatars === "undefined") {
    let selectedUserId = null;
}

async function initRankCard() {
    const rankCardContent = document.getElementById("rankCardContent");
    const badgeMasteryContent = document.getElementById("badgeMasteryContent");
    const btnRankCard = document.getElementById("btnRankCard");
    const btnBadges = document.getElementById("btnBadges");
    const buttonContainer = document.getElementById("buttonContainer");
    const searchButton = document.getElementById("searchButton");

    const updateButtonContainerClass = () => {
        const currentUserId = getCurrentUserId();

        if (selectedUserId === currentUserId || selectedUserId === null) {
            if (btnRankCard.classList.contains("active")) {
                buttonContainer.classList.add("active");
            } else {
                buttonContainer.classList.remove("active");
            }
        } else {
            buttonContainer.classList.remove("active");
        }
    };

    btnRankCard.addEventListener("click", () => {
        toggleTabs(rankCardContent, badgeMasteryContent, btnRankCard, btnBadges);
        updateButtonContainerClass();
    });

    btnBadges.addEventListener("click", () => {
        toggleTabs(badgeMasteryContent, rankCardContent, btnBadges, btnRankCard);
        updateButtonContainerClass();
    });

    searchButton.addEventListener("click", () => {
        updateButtonContainerClass();
    });

    resetFilter.addEventListener("click", () => {
        const inputField = document.getElementById("searchUserName");
        if (inputField) {
            inputField.value = "";
        }

        selectedUserId = null;
        loadRankCardContent();
        loadUserMasteryContent();
        buttonContainer.classList.add("active");
    });
    
    showLoadingBar();
    await Promise.all([
        loadTranslations(),
        preloadAvatarPreviews(),
        preloadAvatarOptions(),
        preloadBackgroundsOptions(),
        preloadBackgroundPreview(),
    ]);

    initBadgesChanges();
    initBackgroundChanges();
    initAvatarChanges();

    loadUserMasteryContent();
    createSearchSuggestions();

    loadRankCardContent().then(() => {
        buttonContainer.classList.add("active");
    });
}

function getCurrentUserId() {
    const currentUserInput = document.getElementById("currentUserId");
    const currentUserId = currentUserInput ? currentUserInput.value : null;
    return currentUserId;
}

//Recherche rankcard self
async function loadRankCardContent(user_id) {
    const rankCardContent = document.getElementById("rankCardContent");

    try {
        const response = await fetch(`api/rankcard/getRankCard.php`);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        rankCardContent.innerHTML = `
        <div class="rank-card">
            <div class="background">
                <img src="${data.background_url || 'default-background.webp'}" alt="Background">
            </div>
            <div class="content-rankcard ">
                <div class="player-name">${data.nickname}</div>
                <div class="main-container">
                    <div class="rank-details-container">
                        <div class="rank-section-container">
                            <div class="rank-section">
                                <div class="medals-header">
                                    <span></span>
                                    <div class="medals-icons">
                                        <span>🥇</span>
                                        <span>🥈</span>
                                        <span>🥉</span>
                                    </div>
                                </div>
                                ${Object.entries(data.difficulties).map(([level, stats]) => `
                                    <div class="rank-row">
                                        <span class="rank-title">${t(`rank_card.difficulties.${level.toLowerCase().replace(/\s+/g, '_')}`)}</span>
                                        <div class="progress-bar">
                                            <div class="progress ${level.toLowerCase().replace(/\s+/g, '-')}" data-width="${(stats.completed / stats.total) * 100}"></div>
                                        </div>
                                        <div class="medals-values">
                                            <span>${stats.gold}</span>
                                            <span>${stats.silver}</span>
                                            <span>${stats.bronze}</span>
                                        </div>
                                        <div class="info-overlay">
                                            ${t("rank_card.completed_total", { completed: stats.completed, total: stats.total })}
                                        </div>
                                    </div>
                                `).join("")}
                            </div>

                            <div class="combined-container">
                                <div class="badges-container">
                                    ${Object.values(data.badges).map(badge => badge.url ? `
                                        <img src="${badge.url}" alt="${badge.name || 'Badge'}" class="badge">
                                    ` : '').join("")}
                                </div>
                                <div class="stats-section">
                                    <div class="stat-item">
                                        <span class="stat-label">${t("rank_card.maps_label")}</span>
                                        <span class="stat-value" data-value="${data.total_maps_created}">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">${t("rank_card.playtests_label")}</span>
                                        <span class="stat-value" data-value="${data.total_playtests}">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">${t("rank_card.world_records_label")}</span>
                                        <span class="stat-value" data-value="${data.world_records}">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="player-info">
                            <span class="player-rank-name">${data.rank_name}</span>
                            <img src="${data.avatar_url || 'assets/default_avatar.png'}" alt="Player Avatar" class="player-avatar">
                            <img src="${data.rank_url || 'assets/default_rank.png'}" alt="Player Rank Badge" class="player-rank-badge">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        setTimeout(() => {
            const progressBars = document.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.transition = 'width 2s ease-in-out';
                bar.style.width = `${width}%`;
            });
        }, 100);

        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const endValue = parseInt(stat.getAttribute('data-value'), 10);
            animateValue(stat, 0, endValue, 2000);
        });

        hideLoadingBar();
    } catch (error) {
        console.error("Erreur lors du chargement des données de la carte de rang:", error);
        hideLoadingBar();
    }
}

//Anim valeurs stats-section
function animateValue(element, start, end, duration) {
    const range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * range + start);
        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

//Rechercher badges self
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
                    <img src="${badge.icon_url}" alt="${badge.map_name}" class="badge-icon" onclick="showBadgeViewer('${badge.icon_url}', '${badge.map_name}')">
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

//Inspection badge
function showBadgeViewer(iconUrl, mapName) {
    const badgeViewer = document.getElementById('badgeViewer');
    const badgeViewerImage = document.getElementById('badgeViewerImage');

    badgeViewerImage.src = iconUrl;
    badgeViewerImage.alt = mapName;
    badgeViewer.style.display = 'flex';

    badgeViewerImage.style.transition = 'transform 0.2s ease-out';
    badgeViewerImage.setAttribute('data-current-rotation', '0');

    badgeViewerImage.addEventListener('mousedown', startBadgeRotation);
}

function closeBadgeViewer() {
    const badgeViewer = document.getElementById('badgeViewer');
    const badgeViewerImage = document.getElementById('badgeViewerImage');

    badgeViewer.style.display = 'none';

    badgeViewerImage.style.transform = 'rotateY(0deg)';
    badgeViewerImage.setAttribute('data-current-rotation', '0');

    badgeViewerImage.removeEventListener('mousedown', startBadgeRotation);
}

function startBadgeRotation(event) {
    event.preventDefault();

    const badge = event.target;
    let initialX = event.clientX;
    let currentRotation = parseFloat(badge.getAttribute('data-current-rotation')) || 0;

    badge.style.transition = 'none';

    const rotate = (e) => {
        const deltaX = e.clientX - initialX;
        const newRotation = currentRotation + deltaX * 0.5;
        badge.style.transform = `rotateY(${newRotation}deg)`;
    };

    const stopRotation = (e) => {
        const deltaX = e.clientX - initialX;
        currentRotation += deltaX * 0.5;
        badge.setAttribute('data-current-rotation', currentRotation);

        badge.style.transition = 'transform 0.2s ease-out';

        window.removeEventListener('mousemove', rotate);
        window.removeEventListener('mouseup', stopRotation);
    };

    window.addEventListener('mousemove', rotate);
    window.addEventListener('mouseup', stopRotation);
}

function toggleTabs(showContent, hideContent, activeBtn, inactiveBtn) {
    activeBtn.classList.add("active");
    inactiveBtn.classList.remove("active");

    showContent.classList.add("active");
    showContent.classList.remove("hidden");

    hideContent.classList.add("hidden");
    hideContent.classList.remove("active");
}

//Recherche
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

// Recherche rankcard user_id
async function fetchUserRankCard() {
    const rankCardContent = document.getElementById("rankCardContent");

    if (!selectedUserId) {
        return;
    }

    showLoadingBar();

    try {
        const response = await fetch(`api/rankcard/getRankCard.php?user_id=${selectedUserId}`);
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            hideLoadingBar();
            return;
        }

        rankCardContent.innerHTML = `
        <div class="rank-card">
            <div class="background">
                <img src="${data.background_url || 'default-background.webp'}" alt="Background">
            </div>
            <div class="content-rankcard ">
                <div class="player-name">${data.nickname}</div>
                <div class="main-container">
                    <div class="rank-details-container">
                        <div class="rank-section-container">
                            <div class="rank-section">
                                <div class="medals-header">
                                    <span></span>
                                    <div class="medals-icons">
                                        <span>🥇</span>
                                        <span>🥈</span>
                                        <span>🥉</span>
                                    </div>
                                </div>
                                ${Object.entries(data.difficulties).map(([level, stats]) => `
                                    <div class="rank-row">
                                        <span class="rank-title">${t(`rank_card.difficulties.${level.toLowerCase().replace(/\s+/g, '_')}`)}</span>
                                        <div class="progress-bar">
                                            <div class="progress ${level.toLowerCase().replace(/\s+/g, '-')}" data-width="${(stats.completed / stats.total) * 100}"></div>
                                        </div>
                                        <div class="medals-values">
                                            <span>${stats.gold}</span>
                                            <span>${stats.silver}</span>
                                            <span>${stats.bronze}</span>
                                        </div>
                                        <div class="info-overlay">
                                            Completed: ${stats.completed} / Total: ${stats.total}
                                        </div>
                                    </div>
                                `).join("")}
                            </div>

                            <div class="combined-container">
                                <div class="badges-container">
                                    ${Object.values(data.badges).map(badge => badge.url ? `
                                        <img src="${badge.url}" alt="${badge.name || 'Badge'}" class="badge">
                                    ` : '').join("")}
                                </div>
                                <div class="stats-section">
                                    <div class="stat-item">
                                        <span class="stat-label">${t("rank_card.maps_label")}</span>
                                        <span class="stat-value" data-value="${data.total_maps_created}">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">${t("rank_card.playtests_label")}</span>
                                        <span class="stat-value" data-value="${data.total_playtests}">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">${t("rank_card.world_records_label")}</span>
                                        <span class="stat-value" data-value="${data.world_records}">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="player-info">
                            <span class="player-rank-name">${data.rank_name}</span>
                            <img src="${data.avatar_url || 'assets/default_avatar.png'}" alt="Player Avatar" class="player-avatar">
                            <img src="${data.rank_url || 'assets/default_rank.png'}" alt="Player Rank Badge" class="player-rank-badge">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        setTimeout(() => {
            const progressBars = document.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.transition = 'width 2s ease-in-out';
                bar.style.width = `${width}%`;
            });
        }, 100);

        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const endValue = parseInt(stat.getAttribute('data-value'), 10);
            animateValue(stat, 0, endValue, 2000);
        });

        hideLoadingBar();
    } catch (error) {
        console.error("Erreur lors du chargement des données de la carte de rang:", error);
        hideLoadingBar();
    }
}

//Recherche badges user_id
async function fetchUserMastery() {
    if (!selectedUserId) {
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
                <img src="${badge.icon_url}" alt="${badge.map_name}" class="badge-icon" onclick="showBadgeViewer('${badge.icon_url}', '${badge.map_name}')">
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

//Affichage suggestions
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

//Barre chargement
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

//Event listener suggestion/rankcard modal/edit modal
document.addEventListener("click", (event) => {
    const rankCardModal = document.getElementById("rankCardModal");
    const modalContent = document.querySelector(".rank-card-container");
    const closeButton = document.querySelector(".close-modal");

    if (rankCardModal && (
        (event.target === rankCardModal && !modalContent.contains(event.target)) ||
        event.target === closeButton ||
        closeButton.contains(event.target)
    )) {
        rankCardModal.style.display = "none";
        document.body.classList.remove("modal-active");
        return;
    }

    const suggestionsContainer = document.getElementById("suggestionsContainer");
    const searchInput = document.getElementById("searchUserName");

    if (
        suggestionsContainer &&
        !suggestionsContainer.contains(event.target) &&
        event.target !== searchInput
    ) {
        suggestionsContainer.classList.add("not-visible");
        suggestionsContainer.style.display = "none";
    }
});

//Change Badges
function initBadgesChanges() {
    const changeBadgesButton = document.getElementById("changeBadges");
    const rankCardContainer = document.querySelector(".rank-card-container");

    const circleContainer = document.createElement("div");
    circleContainer.id = "circleContainer";
    circleContainer.style.display = "none";
    rankCardContainer.appendChild(circleContainer);

    const saveBadgeChangesButton = document.createElement("button");
    saveBadgeChangesButton.id = "saveBadgeChanges";
    saveBadgeChangesButton.className = "save-badge-changes";
    saveBadgeChangesButton.textContent = "✔";
    circleContainer.appendChild(saveBadgeChangesButton);

    const resetBadgesButton = document.createElement("button");
    resetBadgesButton.id = "resetBadges";
    resetBadgesButton.className = "reset-badges ";
    resetBadgesButton.textContent = t("rank_card.reset_badges_button"); 
    circleContainer.appendChild(resetBadgesButton);

    let badgeData = {};

    resetBadgesButton.addEventListener("click", () => {
        circles.forEach((circle, index) => {
            circle.innerHTML = "";
            circle.textContent = (index + 1).toString();
            circle.title = "";
    
            badgeData[`badge_name${index + 1}`] = null;
            badgeData[`badge_type${index + 1}`] = null;
            badgeData[`badge_url${index + 1}`] = null;
        });
    
        //console.log("Badges réinitialisés localement :", badgeData);
    });

    const circles = [];
    const badgeTypeMap = {};
    let activeCircle = null;
    let preloadedRewards = [];

    for (let i = 0; i < 6; i++) {
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.textContent = (i + 1).toString();
        circleContainer.appendChild(circle);
        circles.push(circle);

        circle.addEventListener("click", (event) => {
            event.stopPropagation();
            activeCircle = circle;
            displayRewardsContainer(circle);
        });
    }

    const rewardsContainer = document.createElement("div");
    rewardsContainer.id = "rewardsContainer";
    rewardsContainer.className = "suggestions-container";
    rewardsContainer.style.display = "none";
    rankCardContainer.appendChild(rewardsContainer);

    const fetchEquippedBadges = () => {
        fetch(`api/rankcard/getBadgesSettings.php`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch equipped badges");
                }
                return response.json();
            })
            .then(data => {
                circles.forEach((circle, index) => {
                    const badgeUrl = data[`badge_url${index + 1}`];
                    circle.innerHTML = "";

                    if (badgeUrl) {
                        const badgeImage = document.createElement("img");
                        badgeImage.src = badgeUrl;
                        badgeImage.alt = data[`badge_name${index + 1}`];
                        badgeImage.style.width = "100%";
                        badgeImage.style.height = "100%";
                        badgeImage.style.borderRadius = "50%";

                        circle.appendChild(badgeImage);
                    } else {
                        circle.textContent = (index + 1).toString();
                        circle.title = "";
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching equipped badges:", error);
                circles.forEach((circle, index) => {
                    circle.textContent = (index + 1).toString();
                    circle.title = "";
                });
            });
    };

    const preloadRewards = () => {
        fetch(`api/lootbox/viewUserRewards.php`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user rewards");
                }
                return response.json();
            })
            .then(data => {
                preloadedRewards = data
                    .filter(reward => reward.type === "spray" || reward.type === "mastery")
                    .filter((reward, index, self) =>
                        index === self.findIndex(r => r.name === reward.name)
                    );

                preloadedRewards.forEach(badge => {
                    badgeTypeMap[badge.name] = badge.type;
                });
            })
            .catch(error => {
                console.error("Error preloading rewards:", error);
            });
    };

    const displayRewardsContainer = (circle) => {
        if (preloadedRewards.length === 0) {
            showErrorMessage(t("rank_card.no_badges_found"));
            return;
        }

        const circleRect = circle.getBoundingClientRect();
        const parentRect = rankCardContainer.getBoundingClientRect();

        rewardsContainer.style.left = `${circleRect.left - parentRect.left - 50}px`;
        rewardsContainer.style.top = `${circleRect.top - parentRect.top + circleRect.height + 10}px`;
        rewardsContainer.style.width = "auto";
        rewardsContainer.style.display = "block";

        rewardsContainer.innerHTML = "";

        preloadedRewards.forEach(badge => {
            const badgeElement = document.createElement("div");
            badgeElement.className = "badge-items";
            badgeElement.textContent = `${badge.name} (${badge.rarity})`;
            rewardsContainer.appendChild(badgeElement);

            badgeElement.addEventListener("click", (event) => {
                event.stopPropagation();
                if (activeCircle) {
                    activeCircle.innerHTML = "";

                    const badgeImage = document.createElement("img");
                    badgeImage.src = badge.url;
                    badgeImage.alt = badge.name;
                    badgeImage.style.width = "100%";
                    badgeImage.style.height = "100%";
                    badgeImage.style.borderRadius = "50%";

                    activeCircle.appendChild(badgeImage);

                    rewardsContainer.style.display = "none";
                    activeCircle = null;
                }
            });
        });
    };

    fetchEquippedBadges();
    preloadRewards();

    changeBadgesButton.addEventListener("click", () => {
        circleContainer.style.display = "flex";
    });

    saveBadgeChangesButton.addEventListener("click", () => {
        fetch(`api/rankcard/getBadgesSettings.php`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch existing badges.");
                }
                return response.json();
            })
            .then(existingBadges => {
                const badgeData = {};

                circles.forEach((circle, index) => {
                    const badgeImage = circle.querySelector("img");
                    const badgeNameKey = `badge_name${index + 1}`;
                    const badgeTypeKey = `badge_type${index + 1}`;
                    const badgeUrlKey = `badge_url${index + 1}`;

                    if (!badgeImage) {
                        badgeData[badgeNameKey] = null;
                        badgeData[badgeTypeKey] = null;
                        badgeData[badgeUrlKey] = null;
                    } else {
                        const badgeName = badgeImage.alt;
                        let badgeUrl = badgeImage.src;
    
                        if (badgeUrl.includes("assets/")) {
                            badgeUrl = badgeUrl.substring(badgeUrl.indexOf("assets/"));
                        } else {
                            badgeUrl = null;
                        }
    
                        if (
                            badgeName !== existingBadges[badgeNameKey] ||
                            badgeUrl !== existingBadges[badgeUrlKey]
                        ) {
                            badgeData[badgeNameKey] = badgeName;
                            badgeData[badgeTypeKey] = badgeTypeMap[badgeName] || "Unknown";
                            badgeData[badgeUrlKey] = badgeUrl;
                        } else {
                            badgeData[badgeNameKey] = existingBadges[badgeNameKey];
                            badgeData[badgeTypeKey] = existingBadges[badgeTypeKey];
                            badgeData[badgeUrlKey] = existingBadges[badgeUrlKey];
                        }
                    }
                });

                //console.log("Badge data envoyé :", badgeData);

                return fetch(`api/rankcard/setBadgesSettings.php`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(badgeData)
                });
            })
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                } else {
                    throw new Error(`Erreur API: ${response.status}`);
                }
            })
            .then(data => {
                if (data.response) {
                    try {
                        const parsedResponse = JSON.parse(data.response);

                        if (
                            parsedResponse.user_id &&
                            Object.keys(parsedResponse).some(key => key.startsWith("badge_name"))
                        ) {
                            //console.log("Données sauvegardées :", parsedResponse);
                            circleContainer.style.display = "none";
                            updateBadgesContainer(parsedResponse);
                            showConfirmationMessage(t("rank_card.badges_saved"));
                            return;
                        }
                    } catch (parseError) {
                        console.error("Erreur lors de l'analyse de la réponse API :", parseError);
                    }
                }

                if (data.success) {
                    circleContainer.style.display = "none";
                } else {
                    console.error(data.error || "Réponse inattendue de l'API.");
                }
            })
            .catch(error => {
                console.error("Erreur lors de la requête API :", error);
            });
    });    

    document.addEventListener("click", (event) => {
        if (!rewardsContainer.contains(event.target) && !circleContainer.contains(event.target)) {
            rewardsContainer.style.display = "none";
        }
    });

    document.addEventListener("click", (event) => {
        const isClickInsideRewardsContainer = rewardsContainer.contains(event.target);
        const isClickInsideCircleContainer = circleContainer.contains(event.target);
        const isClickOnChangeBadgesButton = changeBadgesButton.contains(event.target);
    
        if (!isClickInsideRewardsContainer) {
            rewardsContainer.style.display = "none";
        }
    
        if (!isClickInsideCircleContainer && !isClickOnChangeBadgesButton) {
            circleContainer.style.display = "none";
        }
    });    
}

function updateBadgesContainer(badgesData) {
    const badgesContainer = document.querySelector(".badges-container");
    if (!badgesContainer) return;

    badgesContainer.innerHTML = "";

    for (let i = 1; i <= 6; i++) {
        const badgeUrl = badgesData[`badge_url${i}`];
        const badgeName = badgesData[`badge_name${i}`];

        if (badgeUrl && badgeUrl.startsWith("assets/")) {
            const badgeImg = document.createElement("img");
            badgeImg.src = badgeUrl;
            badgeImg.alt = badgeName || `Badge ${i}`;
            badgeImg.className = "badge";

            badgesContainer.appendChild(badgeImg);
        }
    }
}

//Change background
function initBackgroundChanges() {
    const changeBackgroundButton = document.getElementById("changeBackground");
    const rankCardContainer = document.querySelector(".rank-card-container");

    const backgroundContainer = document.createElement("div");
    backgroundContainer.id = "backgroundContainer";
    backgroundContainer.style.display = "none";
    rankCardContainer.appendChild(backgroundContainer);

    const saveBackgroundChangesButton = document.createElement("button");
    saveBackgroundChangesButton.id = "saveBackgroundChanges";
    saveBackgroundChangesButton.className = "save-background-changes";
    saveBackgroundChangesButton.textContent = "✔";
    backgroundContainer.appendChild(saveBackgroundChangesButton);

    const resetBackgroundButton = document.createElement("button");
    resetBackgroundButton.id = "resetBackground";
    resetBackgroundButton.className = "reset-background";
    resetBackgroundButton.textContent = t("rank_card.reset_background_button");
    backgroundContainer.appendChild(resetBackgroundButton);

    let selectedBackground = null;

    const backgroundPreview = document.createElement("div");
    backgroundPreview.id = "backgroundPreview";
    backgroundPreview.textContent = "+";
    backgroundPreview.style.display = "flex";
    backgroundPreview.style.justifyContent = "center";
    backgroundPreview.style.alignItems = "center";
    backgroundPreview.style.fontSize = "24px";
    backgroundPreview.style.color = "#999";
    backgroundPreview.style.fontWeight = "bold";
    backgroundContainer.appendChild(backgroundPreview);

    const optionsContainer = document.createElement("div");
    optionsContainer.id = "backgroundOptions";
    optionsContainer.innerHTML = "";
    optionsContainer.style.display = "none";
    backgroundContainer.appendChild(optionsContainer);

    resetBackgroundButton.addEventListener("click", () => {
        selectedBackground = null;
        backgroundPreview.style.backgroundImage = "none";
        backgroundPreview.textContent = "+";
        //console.log("Background réinitialisé localement");
    });

    const displayBackgroundOptions = () => {
        if (preloadedBackgrounds.length === 0) {
            showErrorMessage(t("rank_card.no_backgrounds_found"));
            return;
        }

        const previewRect = backgroundPreview.getBoundingClientRect();
        const containerRect = backgroundContainer.getBoundingClientRect();

        optionsContainer.innerHTML = "";
        optionsContainer.style.display = "block";
        optionsContainer.style.position = "absolute";
        optionsContainer.style.top = `${previewRect.bottom - containerRect.top}px`;
        optionsContainer.style.left = `${previewRect.left - containerRect.left}px`;
        optionsContainer.style.width = `${backgroundPreview.offsetWidth}px`;
        optionsContainer.style.maxHeight = "150px";
        optionsContainer.style.overflowY = "auto";

        preloadedBackgrounds.forEach(background => {
            const backgroundOption = document.createElement("div");
            backgroundOption.className = "background-option";
            backgroundOption.textContent = `${background.name} (${background.rarity})`;
            optionsContainer.appendChild(backgroundOption);

            backgroundOption.addEventListener("click", () => {
                selectedBackground = {
                    name: background.name,
                    url: background.url,
                };
                backgroundPreview.style.backgroundImage = `url(${background.url})`;
                backgroundPreview.textContent = "";
                optionsContainer.style.display = "none";
            });
        });
    };

    backgroundPreview.addEventListener("click", () => {
        if (optionsContainer.style.display === "block") {
            optionsContainer.style.display = "none";
        } else {
            displayBackgroundOptions();
        }
    });

    saveBackgroundChangesButton.addEventListener("click", () => {
        if (!selectedBackground) {
            selectedBackground = { name: "placeholder", url: "assets/rank_card/background/placeholder.webp" };
        }
    
        //console.log("Envoi du background : ", selectedBackground);
    
        const payload = {
            background: {
                name: selectedBackground.name,
                url: selectedBackground.url
            }
        };
    
        fetch(`api/rankcard/setBackground.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
                return response.json();
            })
            .then(data => {
                backgroundContainer.style.display = "none";
    
                if (data.url) {
                    updateBackgroundContainer(data);
    
                    backgroundPreview.style.backgroundImage = `url(${data.url})`;
                    backgroundPreview.textContent = "";
    
                    currentBackground = {
                        url: data.url,
                        name: data.name || "placeholder"
                    };
    
                    //console.log("Background mis à jour :", currentBackground);
                    showConfirmationMessage(t("rank_card.background_saved"));
                } else {
                    console.error("Aucune URL valide");
                }
            })
            .catch(error => {
                console.error("Erreur sauvegarde :", error);
            });
    });

    document.addEventListener("click", (event) => {
        const isClickInsideOptionsContainer = optionsContainer.contains(event.target);
        const isClickInsideBackgroundContainer = backgroundContainer.contains(event.target);
        const isClickOnChangeBackgroundButton = changeBackgroundButton.contains(event.target);

        if (!isClickInsideOptionsContainer && !backgroundPreview.contains(event.target)) {
            optionsContainer.style.display = "none";
        }

        if (!isClickInsideBackgroundContainer && !isClickOnChangeBackgroundButton) {
            backgroundContainer.style.display = "none";
        }
    });

    changeBackgroundButton.addEventListener("click", () => {
        if (currentBackground) {
            backgroundPreview.style.backgroundImage = `url(${currentBackground.url})`;
            backgroundPreview.textContent = "";
        } else {
            backgroundPreview.style.backgroundImage = "none";
            backgroundPreview.textContent = "+";
        }

        backgroundContainer.style.display = "flex";
    });
}

function preloadBackgroundPreview() {
    return fetch(`api/rankcard/getBackground.php`)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to fetch the current background. Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data && data.url) {
                currentBackground = {
                    url: data.url,
                    name: data.name || "Default Background"
                };
                //console.log("Background actuel préchargé :", currentBackground);
            } else {
                currentBackground = null;
                console.warn("Aucun background actuel trouvé :", data);
            }
        })
        .catch(error => {
            console.error("Erreur lors du préchargement du background actuel :", error);
            currentBackground = null;
        });
}

function preloadBackgroundsOptions() {
    return fetch(`api/lootbox/viewUserRewards.php`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch user rewards");
            return response.json();
        })
        .then(data => {
            preloadedBackgrounds = data.filter(reward => reward.type === "background");
            preloadedBackgrounds.forEach(background => {
                const img = new Image();
                img.src = background.url;
            });
            //console.log("Backgrounds disponibles préchargés :", preloadedBackgrounds);
        })
        .catch(error => {
            console.error("Erreur lors du préchargement des backgrounds :", error);
        });
}

function updateBackgroundContainer(responseData) {
    const backgroundContainer = document.querySelector(".background");
    if (!backgroundContainer) {
        console.error("Élément avec la classe .background introuvable.");
        return;
    }

    backgroundContainer.innerHTML = "";

    if (!responseData || !responseData.url) {
        console.error("Les données du background sont invalides :", responseData);
        return;
    }

    const backgroundImg = document.createElement("img");
    backgroundImg.src = responseData.url;
    backgroundImg.alt = responseData.name || "Background";
    backgroundImg.className = "background-image";

    backgroundContainer.appendChild(backgroundImg);
    //console.log("Background mis à jour :", responseData);
}

//Change avatar
if (typeof availableAvatars === "undefined") {
    var availableAvatars = { skins: [], poses: [] };
}

function initAvatarChanges() {
    const changeAvatarButton = document.getElementById("changeAvatar");
    const rankCardContainer = document.querySelector(".rank-card-container");

    const avatarContainer = document.createElement("div");
    avatarContainer.id = "avatarContainer";
    avatarContainer.style.display = "none";
    rankCardContainer.appendChild(avatarContainer);

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "avatar-button-group";

    const changeSkinButton = document.createElement("button");
    changeSkinButton.id = "changeSkinButton";
    changeSkinButton.textContent = t("rank_card.change_skin_button");
    changeSkinButton.className = "change-skin-btn";
    buttonGroup.appendChild(changeSkinButton);

    const changePoseButton = document.createElement("button");
    changePoseButton.id = "changePoseButton";
    changePoseButton.textContent = t("rank_card.change_pose_button");
    changePoseButton.className = "change-pose-btn";
    buttonGroup.appendChild(changePoseButton);

    avatarContainer.appendChild(buttonGroup);

    const saveAvatarChangesButton = document.createElement("button");
    saveAvatarChangesButton.id = "saveAvatarChanges";
    saveAvatarChangesButton.className = "save-avatar-changes";
    saveAvatarChangesButton.textContent = "✔";
    avatarContainer.appendChild(saveAvatarChangesButton);

    const resetAvatarButton = document.createElement("button");
    resetAvatarButton.id = "resetAvatar";
    resetAvatarButton.className = "reset-avatar";
    resetAvatarButton.textContent = t("rank_card.reset_avatar_button");
    avatarContainer.appendChild(resetAvatarButton);

    const avatarSkinPreview = document.createElement("div");
    avatarSkinPreview.id = "avatarSkinPreview";
    avatarSkinPreview.textContent = "+";
    avatarSkinPreview.style.fontSize = "24px";
    avatarSkinPreview.style.color = "#999";
    avatarSkinPreview.style.fontWeight = "bold";
    avatarSkinPreview.style.display = "none";
    avatarContainer.appendChild(avatarSkinPreview);

    const avatarPosePreview = document.createElement("div");
    avatarPosePreview.id = "avatarPosePreview";
    avatarPosePreview.textContent = "+";
    avatarPosePreview.style.fontSize = "24px";
    avatarPosePreview.style.color = "#999";
    avatarPosePreview.style.fontWeight = "bold";
    avatarPosePreview.style.display = "none";
    avatarContainer.appendChild(avatarPosePreview);

    const optionsContainer = document.createElement("div");
    optionsContainer.id = "avatarOptions";
    optionsContainer.innerHTML = "";
    optionsContainer.style.display = "none";
    avatarContainer.appendChild(optionsContainer);

    let selectedSkin = null;
    let selectedPose = null;
    let currentSkin = "Overwatch 1";
    let currentPose = "heroic";

    const toggleActiveClass = (button) => {
        changeSkinButton.classList.remove("active");
        changePoseButton.classList.remove("active");
        button.classList.add("active");

        if (button === changeSkinButton) {
            avatarSkinPreview.style.display = "flex";
            avatarPosePreview.style.display = "none";
        } else if (button === changePoseButton) {
            avatarSkinPreview.style.display = "none";
            avatarPosePreview.style.display = "flex";
        }
    };

    changeSkinButton.addEventListener("click", () => {
        toggleActiveClass(changeSkinButton);
    });

    changePoseButton.addEventListener("click", () => {
        toggleActiveClass(changePoseButton);
    });

    resetAvatarButton.addEventListener("click", () => {
        selectedSkin = "Overwatch 1";
        selectedPose = "heroic";

        const formattedSkin = selectedSkin.toLowerCase().replace(/ /g, "_");
        const skinPoseUrl = `assets/rank_card/avatar/${formattedSkin}/${selectedPose}.webp`;

        avatarSkinPreview.style.backgroundImage = `url(${skinPoseUrl})`;
        avatarSkinPreview.textContent = "";

        avatarPosePreview.style.backgroundImage = `url(${skinPoseUrl})`;
        avatarPosePreview.textContent = "";

        updatePlayerAvatar({
            name: selectedSkin,
            url: skinPoseUrl
        });

        //console.log("Avatar par défaut ", selectedSkin, selectedPose);
    });

    const fetchCurrentAvatar = () => {
        Promise.all([
            fetch(`api/rankcard/getAvatarSkin.php`).then(response => response.json()),
            fetch(`api/rankcard/getAvatarPose.php`).then(response => response.json())
        ])
            .then(([skinData, poseData]) => {
                if (skinData.url) {
                    currentSkin = skinData.skin || currentSkin;
                    avatarSkinPreview.style.backgroundImage = `url(${skinData.url})`;
                    avatarSkinPreview.textContent = "";
                } else {
                    avatarSkinPreview.style.backgroundImage = "none";
                    avatarSkinPreview.textContent = "+";
                }

                if (poseData.url) {
                    currentPose = poseData.pose || currentPose;
                    avatarPosePreview.style.backgroundImage = `url(${poseData.url})`;
                    avatarPosePreview.textContent = "";
                } else {
                    avatarPosePreview.style.backgroundImage = "none";
                    avatarPosePreview.textContent = "+";
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des avatars actuels :", error);
            });
    };

    const displayAvatarOptions = (type) => {
        const avatars = type === "skin" ? availableAvatars.skins : availableAvatars.poses;

        if (!avatars || avatars.length === 0) {
            showErrorMessage(t("rank_card.no_type_found", { type }));
            return;
        }

        optionsContainer.innerHTML = "";

        avatars.forEach(avatar => {
            const avatarOption = document.createElement("div");
            avatarOption.className = "avatar-option";
            avatarOption.textContent = `${avatar.name} (${avatar.rarity})`;

            avatarOption.addEventListener("click", () => {
                if (type === "skin") {
                    selectedSkin = avatar.name;
                    avatarSkinPreview.style.backgroundImage = `url(${avatar.url})`;
                    avatarSkinPreview.textContent = "";
                } else if (type === "pose") {
                    selectedPose = avatar.name;
                    avatarPosePreview.style.backgroundImage = `url(${avatar.url})`;
                    avatarPosePreview.textContent = "";
                }
                optionsContainer.style.display = "none";
            });

            optionsContainer.appendChild(avatarOption);
        });

        const previewRect =
            type === "skin" ? avatarSkinPreview.getBoundingClientRect() : avatarPosePreview.getBoundingClientRect();
        const containerRect = avatarContainer.getBoundingClientRect();

        optionsContainer.style.display = "block";
        optionsContainer.style.top = `${previewRect.bottom - containerRect.top}px`;
        optionsContainer.style.left = `${previewRect.left - containerRect.left}px`;
        optionsContainer.style.width = `${type === "skin" ? avatarSkinPreview.offsetWidth : avatarPosePreview.offsetWidth}px`;
        optionsContainer.style.maxHeight = "150px";
        optionsContainer.style.overflowY = "auto";
    };

    avatarSkinPreview.addEventListener("click", () => {
        displayAvatarOptions("skin");
    });

    avatarPosePreview.addEventListener("click", () => {
        displayAvatarOptions("pose");
    });

    saveAvatarChangesButton.addEventListener("click", () => {
        const promises = [];

        if (selectedSkin && selectedSkin !== currentSkin) {
            const skinUrl = `api/rankcard/setAvatarSkin.php`;
            //console.log("Envoi de skin :", selectedSkin);
            promises.push(
                fetch(`${skinUrl}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ avatarSkin: selectedSkin }),
                })
            );
        }

        if (selectedPose && selectedPose !== currentPose) {
            const poseUrl = `api/rankcard/setAvatarPose.php`;
            //console.log("Envoi de pose :", selectedPose);
            promises.push(
                fetch(`${poseUrl}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ avatarPose: selectedPose }),
                })
            );
        }

        Promise.all(promises)
            .then((responses) => {
                if (responses.some((response) => !response.ok)) {
                    throw new Error("Erreur lors de la sauvegarde des avatars.");
                }
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((data) => {
                avatarContainer.style.display = "none";

                const formattedSkin = (selectedSkin || currentSkin).toLowerCase().replace(/ /g, "_");
                const formattedPose = (selectedPose || currentPose).toLowerCase();

                updatePlayerAvatar({
                    name: selectedSkin || currentSkin,
                    url: `assets/rank_card/avatar/${formattedSkin}/${formattedPose}.webp`
                });
                //console.log("Réponses API :", data);

                currentSkin = selectedSkin || currentSkin;
                currentPose = selectedPose || currentPose;
                showConfirmationMessage(t("rank_card.avatar_saved"));
            })
            .catch((error) => {
                console.error("Erreur lors de la sauvegarde :", error);
            });
    });

    document.addEventListener("click", (event) => {
        const isClickInsideOptionsContainer = optionsContainer.contains(event.target);
        const isClickInsideAvatarContainer = avatarContainer.contains(event.target);
        const isClickOnChangeAvatarButton = changeAvatarButton.contains(event.target);

        if (!isClickInsideOptionsContainer && !avatarSkinPreview.contains(event.target) && !avatarPosePreview.contains(event.target)) {
            optionsContainer.style.display = "none";
        }

        if (!isClickInsideAvatarContainer && !isClickOnChangeAvatarButton) {
            avatarContainer.style.display = "none";
        }
    });

    changeAvatarButton.addEventListener("click", () => {
        avatarContainer.style.display = "flex";
        fetchCurrentAvatar();
    });
}

function updatePlayerAvatar(responseData) {
    const playerAvatar = document.querySelector(".player-avatar");
    if (!playerAvatar) {
        console.error("Élément avec la classe .player-avatar introuvable.");
        return;
    }

    if (!responseData || !responseData.url) {
        console.error("Les données de l'avatar sont invalides :", responseData);
        return;
    }

    playerAvatar.src = responseData.url;
    playerAvatar.alt = responseData.name || "Player Avatar";
    
    //console.log("Avatar maj :", responseData);
}

function preloadAvatarPreviews() {
    const avatarSkinPreview = document.getElementById("avatarSkinPreview");
    const avatarPosePreview = document.getElementById("avatarPosePreview");

    if (avatarSkinPreview) {
        fetch(`api/rankcard/getAvatarSkin.php`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des skins.");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.url) {
                    avatarSkinPreview.style.backgroundImage = `url(${data.url})`;
                    avatarSkinPreview.textContent = "";
                } else {
                    avatarSkinPreview.style.backgroundImage = "none";
                    avatarSkinPreview.textContent = "+";
                }
            })
            .catch(error => {
                console.error("Erreur lors du préchargement de l'avatarSkinPreview :", error);
            });
    }

    if (avatarPosePreview) {
        fetch(`api/rankcard/getAvatarPose.php`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des poses.");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.url) {
                    avatarPosePreview.style.backgroundImage = `url(${data.url})`;
                    avatarPosePreview.textContent = "";
                } else {
                    avatarPosePreview.style.backgroundImage = "none";
                    avatarPosePreview.textContent = "+";
                }
            })
            .catch(error => {
                console.error("Erreur lors du préchargement de l'avatarPosePreview :", error);
            });
    }
}
function preloadAvatarOptions() {
    return fetch(`api/lootbox/viewUserRewards.php`)
        .then(response => {
            if (!response.ok) throw new Error("Erreur lors du chargement des récompenses.");
            return response.json();
        })
        .then(data => {
            availableAvatars.skins = data.filter(reward => reward.type === "skin");
            availableAvatars.poses = data.filter(reward => reward.type === "pose");

            //console.log("Skins chargés :", availableAvatars.skins);
            //console.log("Poses chargées :", availableAvatars.poses);

            availableAvatars.skins.forEach(skin => {
                const img = new Image();
                img.src = skin.url;
            });

            availableAvatars.poses.forEach(pose => {
                const img = new Image();
                img.src = pose.url;
            });
        })
        .catch(error => console.error("Erreur lors du préchargement des options d'avatar :", error));
}

//Trad
async function loadTranslations() {
    try {
        const response = await fetch("translations/translations.json");
        const data = await response.json();
        const currentLang = document.documentElement.lang || "en";
        
        const currentLangData = data[currentLang] || {};
        
        const { rank_card = {} } = currentLangData;
        
        translations = { rank_card };

        //console.log("Traductions chargées :", translations);
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
    if (!result) {
        return path;
    }
    for (const key in params) {
        result = result.replace(`{${key}}`, params[key]);
        if (!result) {
            console.error(`Clé de traduction introuvable: ${path}`);
            return path;
        }
    }
    return result;
}
