function initRankCard() {
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
        loadRankCardContent();
        loadUserMasteryContent();
        buttonContainer.classList.add("active");
    });

    loadRankCardContent();
    loadUserMasteryContent();
    createSearchSuggestions();

    initBadgesChanges();
}

function getCurrentUserId() {
    const currentUserInput = document.getElementById("currentUserId");
    const currentUserId = currentUserInput ? currentUserInput.value : null;
    return currentUserId;
}

//Recherche rankcard self
async function loadRankCardContent(user_id) {
    const rankCardContent = document.getElementById("rankCardContent");

    showLoadingBar();

    try {
        const response = await fetch(`api/rankcard/getRankCard.php`);
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
                                        <span class="rank-title">${level.toUpperCase()}</span>
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
                                        <span class="stat-label">Maps</span>
                                        <span class="stat-value" data-value="${data.total_maps_created}">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Playtests</span>
                                        <span class="stat-value" data-value="${data.total_playtests}">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">World Records</span>
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
                                        <span class="rank-title">${level.toUpperCase()}</span>
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
                                        <span class="stat-label">Maps</span>
                                        <span class="stat-value" data-value="${data.total_maps_created}">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Playtests</span>
                                        <span class="stat-value" data-value="${data.total_playtests}">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">World Records</span>
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
    resetBadgesButton.textContent = "Reset badges";
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
    
        console.log("Badges réinitialisés localement :", badgeData);
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
            console.error("No rewards preloaded");
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

                console.log("Badge data final envoyé :", badgeData);

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