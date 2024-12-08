const roleColors = {
    Ninja: "ninja",
    Jumper: "jumper",
    Skilled: "skilled",
    Pro: "pro",
    Master: "master",
    Grandmaster: "grandmaster",
    God: "god",
};

let currentPage = 1;
const pageSize = 20;
let totalResults = 0;
let totalPages = 0;
let translations = {};

async function loadTranslations() {
    try {
        const response = await fetch("translations/translations.json");
        const data = await response.json();
        const currentLang = document.documentElement.lang || "en";
        
        translations = data[currentLang] || {};
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
    }
    return result;
}

function updateTimestamps() {
    const timestamps = document.querySelectorAll(".timestamp");
    timestamps.forEach(timestampElement => {
        const serverTimestamp = timestampElement.getAttribute("data-timestamp");
        if (!serverTimestamp) return;

        const date = new Date(serverTimestamp);
        if (isNaN(date.getTime())) return;

        const format = translations.common.timestamp_format || "{month} {day}, {year} at {hour}:{minute} {AMorPM}";

        const monthName = date.toLocaleString('en-US', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const AMorPM = hours < 12 ? 'AM' : 'PM';
        hours = hours % 12 || 12;

        let formattedTimestamp = format
            .replace("{month}", monthName)
            .replace("{day}", day)
            .replace("{year}", year)
            .replace("{hour}", hours)
            .replace("{minute}", minutes)
            .replace("{AMorPM}", AMorPM);

        timestampElement.textContent = formattedTimestamp;
    });
}


function openMapDetailsModal(mapCode) {
    const modalOverlay = document.getElementById("detailsModalOverlay");
    const modalContainer = document.getElementById("modalDetailsContainer");

    modalContainer.innerHTML = `<p>${t('common.loading')}</p>`;
    modalOverlay.style.display = "flex";

    const getStars = (quality) => {
        if (!quality) return t('common.na');
        let stars = '';
        const starCount = Math.floor(quality);
        for (let i = 0; i < starCount; i++) {
            stars += '⭐';
        }
        return stars || t('common.na');
    };

    fetch('api/search/getMapSearch.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ map_code: mapCode }),
    })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                modalContainer.innerHTML = `<p>${t('common.error')}: ${result.error}</p>`;
            } else {
                const map = result[0];
                const mechanics = map.mechanics ? map.mechanics.join(", ") : t('common.na');
                const restrictions = map.restrictions ? map.restrictions.join(", ") : t('common.na');
                const description = map.desc || t('common.no_description');
                const bannerPath = `assets/banners/${map.map_name?.toLowerCase().replace(/\s+/g, "")}.png`;
                
                const medals = [];
                if (map.gold && map.gold !== "N/A") {
                    medals.push(`
                        <div class="medal-wrapper">
                            <img src="assets/verifications/gold_wr.gif" alt="Gold Medal" class="medal-image" />
                            <span class="medal-time">${map.gold}</span>
                        </div>
                    `);
                }
                if (map.silver && map.silver !== "N/A") {
                    medals.push(`
                        <div class="medal-wrapper">
                            <img src="assets/verifications/silver_wr.gif" alt="Silver Medal" class="medal-image" />
                            <span class="medal-time">${map.silver}</span>
                        </div>
                    `);
                }
                if (map.bronze && map.bronze !== "N/A") {
                    medals.push(`
                        <div class="medal-wrapper">
                            <img src="assets/verifications/bronze_wr.gif" alt="Bronze Medal" class="medal-image" />
                            <span class="medal-time">${map.bronze}</span>
                        </div>
                    `);
                }

                modalContainer.innerHTML = `
                    <div id="modalContentFrame" class="modal-content-frame">
                        <div id="modalLayout" class="modal-layout">
                            <div class="map-details">
                                <div id="modalTextSection" class="modal-text-section">
                                    <h2>Map Details</h2>
                                    <p><strong>Code:</strong> ${map.map_code || t('common.na')}</p>
                                    <p><strong>Name:</strong> ${map.map_name || t('common.na')}</p>
                                    <p><strong>Type:</strong> ${map.map_type?.[0]?.join(", ") || t('common.na')}</p>
                                    <p><strong>Creator:</strong> ${map.creators?.join(", ") || t('common.na')}</p>
                                    <p><strong>Difficulty:</strong> ${map.difficulty || t('common.na')}</p>
                                    <p><strong>Checkpoints:</strong> ${map.checkpoints || t('common.na')}</p>
                                    <p><strong>Quality:</strong> ${getStars(map.quality)}</p>
                                    <p><strong>Mechanics:</strong> ${mechanics}</p>
                                    <p><strong>Restrictions:</strong> ${restrictions}</p>
                                    <p><strong>Description:</strong> ${description}</p>
                                </div>
                            </div>
                            <div id="modalBannerSection" class="modal-banner-section">
                                <img src="${bannerPath}" alt="${map.map_name} Banner" class="modal-banner-image" onerror="this.style.display='none'" />
                                <div class="medals-container">
                                ${medals.join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error("API Request Error:", error);
            modalContainer.innerHTML = `<p>${t('common.error')} fetching map details: ${error.message}</p>`;
        });
}

function closeDetailsModal() {
    const modalOverlay = document.getElementById("detailsModalOverlay");
    modalOverlay.style.display = "none";
}

document.getElementById("detailsModalOverlay").addEventListener("click", (event) => {
    const modalBox = document.getElementById("detailsModalBox");
    if (!modalBox.contains(event.target)) {
        closeDetailsModal();
    }
});

async function loadNewsfeed() {
    await loadTranslations(); // Charger les traductions avant de charger le newsfeed
    try {
        const response = await fetch(`api/getNewsfeed.php?page_number=${currentPage}&page_size=${pageSize}`);
        const newsfeed = await response.json();
        const container = document.getElementById("newsfeedContainer");

        totalResults = newsfeed.total_results || 0;
        totalPages = Math.ceil(totalResults / pageSize);

        container.innerHTML = newsfeed.data.map(createNewsCard).join("");
        
        newsfeed.data.forEach(item => {
            if (item.type === "guide" && item.data.map.guide && item.data.map.guide[0]) {
                createEmbeddedVideo(`videoContainer-${item.data.map.map_code}`, item.data.map.guide[0]);
            }
        });

        updateTimestamps();
        renderPaginationButtons();
    } catch (error) {
        console.error("Erreur lors du chargement du fil d'actualité :", error);
    }
}

function createNewsCard(item) {
    const { type, data, timestamp } = item;

    let content = `
    <div class="news-card ${type}">
        <div class="genjibot-header">
            <img class="genjibot-logo" src="assets/profile/genjibot.png" alt="GenjiBot Logo">
            <div class="genjibot-text">
                <span class="genjibot-name">GenjiBot</span>
                <span class="genjibot-app">APP</span>
            </div>
        </div>`;

    if (type === "role" || type === "record" || type === "map_edit") {
        content += `<img class="role-banner" src="assets/img-2/card-banner.png" alt="Role Banner">`;
    }

    if (type === "new_map") {
        const bannerPath = `assets/banners/${formatMapName(data.map.map_name)}.png`;
        const difficultyLogo = formatImageName(data.map.difficulty);
        // {nickname} a soumis une nouvelle carte {difficulty} sur {map_name} !
        content += `
        <img class="difficulty-badge" src="assets/ranks/${difficultyLogo}" alt="${data.map.difficulty} Badge">
        <div class="news-header">
            <h3>${t('newsfeed.new_map', {nickname: data.user.nickname, difficulty: data.map.difficulty, map_name: data.map.map_name})}</h3>
            <p>
                ${t('newsfeed.details_command')} <code>/map-search map_code:${data.map.map_code}</code>
                <span class="click-here"> 
                    <a href="javascript:void(0)" onclick="openMapDetailsModal('${data.map.map_code}')">${t('newsfeed.click_here')}</a>
                </span>
                ${t('common.to_see_details',"TODO:ajouter traduction")} 
                <img class="map-banner" src="${bannerPath}" alt="${data.map.map_name} Banner" onerror="this.style.display='none'">
            </p>
        </div>`;
    }

    if (type === "guide") {
        // {nickname} has posted a guide for {map_code}
        content += `
        <div class="news-header">
            <h3>${t('newsfeed.has_posted_guide', {nickname: data.user.nickname, map_code: data.map.map_code})}</h3>
            <a href="${data.map.guide[0]}" target="_blank">${t('newsfeed.watch_guide')}</a>
            <div id="videoContainer-${data.map.map_code}" class="embedded-video"></div>
        </div>`;
    }

    if (type === "record") {
        // {nickname} has set a new World Record!
        content += `
        <div class="news-header">
            <h3>${t('newsfeed.new_wr', {nickname: data.user.nickname})}</h3>
            <p><strong>${data.map.map_name}</strong> by ${data.map.creators} (${data.map.map_code})</p>
            <div class="record-details">
                <p>
                    <span class="record-label">Record:</span> ${data.record.record}
                    <img class="verified-icon" src="assets/verifications/new_wr.gif" alt="Verified World Record">
                </p>
                <p>
                    <span class="video-label">Video:</span>
                    <a href="${data.record.video}" target="_blank">Link</a>
                </p>
            </div>
        </div>`;
    }

    if (type === "role") {
        // {nickname} got promoted!
        content += `
        <div class="news-header">
            <h3>${t('newsfeed.promoted', {nickname: data.user.nickname})}</h3>
            <div class="role-container">
                <ul>
                    ${data.user.roles
                      .map(role => {
                          const normalizedRole = normalizeRole(role);
                          const roleClass = roleColors[normalizedRole] || "default";
                          return `<li class="role-item ${roleClass}">${role}</li>`;
                      })
                      .join("")}
                </ul>
            </div>
        </div>`;
    }

    if (type === "map_edit") {
        // {map_code} has been changed:
        content += `
        <div class="news-header">
            <h3>${t('newsfeed.changed_code', {map_code: data.map.map_code})}</h3>
            <p><strong>Code:</strong> ${data.map.new_map_code || t('common.na')}</p>
        </div>`;
    }

    content += `<div class="timestamp" data-timestamp="${timestamp}"></div></div>`;
    return content;
}

function formatImageName(text) {
    return text ? text.toLowerCase().replace(/[+\-\s]/g, "") + ".png" : "default.png";
}

function normalizeRole(role) {
    return role.replace(/\s*\++$/, "");
}

function formatMapName(mapName) {
    if (!mapName) return "default";
    return mapName.toLowerCase().replace(/[^a-z0-9]/g, "");
}

document.addEventListener("DOMContentLoaded", () => {
    loadNewsfeed();
});

function createEmbeddedVideo(containerId, videoUrl) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let embedUrl = '';
    try {
        const url = new URL(videoUrl);
        const host = url.host;
        if (host.includes('youtube.com') || host.includes('youtu.be')) {
            const videoId = url.searchParams.get('v') || url.pathname.split("/")[1];
            if (videoId) {
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }
        } else if (host.includes('bilibili.com')) {
            const pathSegments = url.pathname.split('/');
            if (pathSegments.length > 1 && pathSegments[1]) {
                embedUrl = `https://player.bilibili.com/player.html?bvid=${pathSegments[1]}`;
            }
        } else {
            console.error('Lecteur vidéo non supporté:', host);
        }
    } catch (error) {
        console.error('Vidéo URL invalide:', error);
    }

    if (embedUrl) {
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.width = '100%';
        iframe.height = '315';
        iframe.style.borderRadius = '10px';
        iframe.style.overflow = 'hidden';
        iframe.style.border = 'none';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        container.innerHTML = '';
        container.appendChild(iframe);
    } else {
        container.innerHTML = '<p>La vidéo ne peut pas être intégrée. URL non supporté.</p>';
    }
}

function renderPaginationButtons() {
    const paginationContainer = document.getElementById("paginationContainer");
    if(!paginationContainer) return;
    paginationContainer.innerHTML = "";

    if (totalPages <= 1) {
        return;
    }

    const firstButton = document.createElement("button");
    firstButton.textContent = t('pagination.first');
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

function changePage(pageNumber) {
    currentPage = pageNumber;
    loadNewsfeed();
}
