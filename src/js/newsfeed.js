const roleColors = {
    Ninja: "ninja",
    Jumper: "jumper",
    Skilled: "skilled",
    Pro: "pro",
    Master: "master",
    Grandmaster: "grandmaster",
    God: "god",
};

const difficultyColors = {
    "Beginner": "#00ff1a",
    "Easy": "#cdff3a",
    "Medium": "#fbdf00",
    "Hard": "#ff9700",
    "Very Hard": "#ff4500",
    "Extreme": "#ff0000",
    "Hell": "#9a0000",
};

let currentPage = 1;
const pageSize = 20;
let totalResults = 0;
let totalPages = 0;
let translations = {};
let selectedType = null;

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

        const currentLang = document.documentElement.lang || "en";

        const format = translations.common.timestamp_format || "{month} {day}, {year} at {hour}:{minute} {AMorPM}";

        const monthName = date.toLocaleString(currentLang, { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');

        let formattedTimestamp;

        if (currentLang === "fr" || currentLang === "ru" || currentLang === "de") {
            formattedTimestamp = format
                .replace("{month}", monthName)
                .replace("{day}", day)
                .replace("{year}", year)
                .replace("{hour}", hours)
                .replace("{minute}", minutes)
                .replace("{AMorPM}", "");
        } else {
            const AMorPM = hours < 12 ? 'AM' : 'PM';
            const hour12 = hours % 12 || 12;
            formattedTimestamp = format
                .replace("{month}", monthName)
                .replace("{day}", day)
                .replace("{year}", year)
                .replace("{hour}", hour12)
                .replace("{minute}", minutes)
                .replace("{AMorPM}", AMorPM);
        }

        timestampElement.textContent = formattedTimestamp.trim();
    });
}

async function fetchEmoji(emojiName, emojiId) {
    try {
        const response = await fetch('api/getEmoji.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                emojiName: emojiName,
                emojiId: emojiId
            })
        });

        const result = await response.json();
        if (result.emoji) {
            return result.emoji;
        } else {
            console.warn("Émoji introuvable :", emojiName);
            return `<span class="missing-emoji">:${emojiName}:</span>`;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'émoji :", error);
        return `<span class="missing-emoji">:${emojiName}:</span>`;
    }
}

function openMapDetailsModal(mapCode) {
    const modalOverlay = document.getElementById("detailsModalOverlay");
    const modalContainer = document.getElementById("modalDetailsContainer");

    modalContainer.innerHTML = `<p>${t('common.loading')}</p>`;
    modalOverlay.style.display = "flex";

    const getStars = (quality, maxStars = 6) => {
        let stars = '';
        const starCount = Math.floor(quality);
        const emptyStarCount = maxStars - starCount;
    
        for (let i = 0; i < starCount; i++) {
            stars += '<span class="star-full">★</span>';
        }
    
        for (let i = 0; i < emptyStarCount; i++) {
            stars += '<span class="star-empty">☆</span>';
        }
    
        return stars || t("common.na");
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
                
                const currentLang = document.documentElement.lang || "en";

                let mechanicsOptions = map.mechanics || [];
                let restrictionsOptions = map.restrictions || [];

                if (currentLang === "cn") {
                    mechanicsOptions = mechanicsOptions.map(option => t(`mechanics.${option.toLowerCase().replace(/ /g, '_')}`) || option);
                    restrictionsOptions = restrictionsOptions.map(option => t(`restrictions.${option.toLowerCase().replace(/ /g, '_')}`) || option);
                }

                const mechanics = mechanicsOptions.length ? mechanicsOptions.join(", ") : t('common.na');
                const restrictions = restrictionsOptions.length ? restrictionsOptions.join(", ") : t('common.na');
                const description = map.desc || t('common.no_description');
                const bannerPath = `assets/banners/${map.map_name?.toLowerCase().replace(/[\s()]+/g, "")}.png`;
                
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
                                    <h2>${t("thead.mapDetails")}</h2>
                                    <p><strong>${t("thead.mapCode")}:</strong> ${map.map_code || t('common.na')}</p>
                                    <p><strong>${t("thead.mapName")}:</strong> ${map.map_name || t('common.na')}</p>
                                    <p><strong>${t("thead.mapType")}:</strong> ${Array.isArray(map.map_type) ? map.map_type.join(", ") : t('common.na')}</p>
                                    <p><strong>${t("thead.mapCreator")}:</strong> ${map.creators?.join(", ") || t('common.na')}</p>
                                    <p><strong>${t("thead.mapDifficulty")}:</strong> <span style="color: ${difficultyColors[normalizeDifficulty(map.difficulty)] || '#fff'}"> ${map.difficulty || t('common.na')}</span></p>
                                    <p><strong>${t("thead.mapCheckpoints")}:</strong> ${map.checkpoints || t('common.na')}</p>
                                    <p><strong>${t("thead.mapQuality")}:</strong> <span class="modal-stars">${getStars(map.quality) || t('common.na')}</span></p>
                                    <p><strong>${t("thead.mapMechanics")}:</strong> ${mechanics}</p>
                                    <p><strong>${t("thead.mapRestrictions")}:</strong> ${restrictions}</p>
                                    <p><strong>${t("thead.mapDescription")}:</strong> ${description}</p>
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

function normalizeDifficulty(difficulty) {
    if (!difficulty) return '';
    return difficulty.replace(/\s*[+-]$/, '').trim();
}

document.getElementById("detailsModalOverlay").addEventListener("click", (event) => {
    const modalBox = document.getElementById("detailsModalBox");
    if (!modalBox.contains(event.target)) {
        closeDetailsModal();
    }
});

//Load
async function loadNewsfeed() {
    await loadTranslations();

    try {
        let url = `api/getNewsfeed.php?page_number=${currentPage}&page_size=${pageSize}`;
        if (selectedType) {
            url += `&type=${encodeURIComponent(selectedType)}`;
        }

        const response = await fetch(url);
        const newsfeed = await response.json();
        const container = document.getElementById("newsfeedContainer");

        totalResults = newsfeed.total_results || 0;
        totalPages = Math.ceil(totalResults / pageSize);

        const cards = await Promise.all(newsfeed.data.map(item => createNewsCard(item)));

        container.innerHTML = cards.join("");

        const newsCards = container.querySelectorAll(".news-card");

        newsCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, index * 100);         
        });

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


async function createNewsCard(item) {
    const { type, data, timestamp } = item;

    const userId = data?.user?.user_id || null;
    let nickname = data?.user?.nickname || "Unknown User";

    if (nickname === "nebula") {
        nickname = "joe";
    }

    let profileImage = "assets/profile/genjibot.png";
    if (userId === 141372217677053952) {
        profileImage = "assets/profile/joe.jpg";
    } else if (userId === 273775694008549376) {
        profileImage = "assets/profile/fishofire.jpg";
    }

    let content;

    if (type === "announcement") {
        let messageContent = data.message.content;

        messageContent = await convertTenorLinks(messageContent);
        const formattedMessageContent = await formatMessageContent(messageContent);

        const content = `
        <div class="news-card ${type}">
            <div class="loading-bar" id="loadingIndicator" style="display: none;"></div>
            <div class="userprofile-header">
                <img class="userprofile-logo" src="${profileImage}" alt="${nickname}'s Profile">
                <div class="userprofile-text">
                    <span class="user-name">${nickname}</span>
                </div>
            </div>
            <div class="news-header announcement">
                <h3>${t('newsfeed.announcement')}</h3>
                <p class="announcement-content">${formattedMessageContent}</p>
            </div>
            <p class="translated-text"></p>
            <button class="translate-button">${t('newsfeed.translate_button')}</button>
            <div class="timestamp" data-timestamp="${timestamp}"></div>
        </div>`;
        return content;
    }

    content = `
    <div class="news-card ${type}">
        <div class="genjibot-header">
            <img class="genjibot-logo" src="assets/profile/genjibot.png" alt="GenjiBot Logo">
            <div class="genjibot-text">
                <span class="genjibot-name">GenjiBot</span>
                <span class="genjibot-app">APP</span>
            </div>
        </div>`;
        
    if (type === "role" || type === "record" || type === "map_edit") {
        content += `<img class="role-banner" src="assets/img/card-banner.png" alt="Role Banner">`;
    }

    if (type === "bulk_archive" || type === "bulk_unarchive") {
        const actionText = type === "bulk_archive" ? t('newsfeed.bulk_archived') : t('newsfeed.bulk_unarchived');
        content += `
        <div class="news-header">
            <h3>${actionText}</h3>
            <p>${data.total_results}</p>
        </div>`;
    }

    if (type === "new_map") {
        const bannerPath = `assets/banners/${formatMapName(data.map.map_name)}.png`;
        const difficultyLogo = formatImageName(data.map.difficulty);
        content += `
        <img class="difficulty-badge" src="assets/ranks/${difficultyLogo}" alt="${data.map.difficulty} Badge">
        <div class="news-header">
            <h3>${t('newsfeed.new_map', {nickname: data.user.nickname, difficulty: data.map.difficulty, map_name: data.map.map_name})}</h3>
            <p>
                ${t('newsfeed.details_command')} 
                <code class="map-code" data-map-code="/map-search map_code:${data.map.map_code}">
                    /map-search map_code:${data.map.map_code}
                </code>
                <span class="click-here"> 
                    <a href="javascript:void(0)" onclick="openMapDetailsModal('${data.map.map_code}')">
                        ${t('newsfeed.click_here')}
                    </a>
                </span>
                ${t('common.to_see_details')}
                <img class="map-banner" src="${bannerPath}" alt="${data.map.map_name} Banner" onerror="this.style.display='none'">
            </p>
        </div>`;
    }

    if (type === "guide") {
        content += `
        <div class="news-header">
            <h3>${t('newsfeed.has_posted_guide', {nickname: data.user.nickname, map_code: data.map.map_code})}</h3>
            <a href="${data.map.guide[0]}" target="_blank">${t('newsfeed.watch_guide')}</a>
            <div id="videoContainer-${data.map.map_code}" class="embedded-video"></div>
        </div>`;
    }

    if (type === "record") {
        content += `
        <div class="news-header">
            <h3>${t('newsfeed.new_wr', {nickname: data.user.nickname})}</h3>
            <p><strong>${t('newsfeed.new_wr_info', {map_name: data.map.map_name, creators: data.map.creators, map_code: data.map.map_code})}</strong></p>
            <div class="record-details">
                <p>
                    <span class="record-label">Record:</span> ${data.record.record}
                    <img class="verified-icon" src="assets/verifications/new_wr.gif" alt="Verified World Record">
                </p>
                <p>
                    <span class="video-label">Video:</span>
                    <a href="${data.record.video}" target="_blank">${t('newsfeed.link')}</a>
                </p>
            </div>
        </div>`;
    }

    if (type === "archive") {
        content += `
        <div class="news-header">
            <h3>${t('newsfeed.archived_map', { map_code: data.map.map_code})}</h3>

                <p class="archive-description">${t('newsfeed.archived_description')}</p>
                <div class="archive-details">
                    <p>
                        <strong>${t('newsfeed.map_code')}:</strong> ${data.map.map_code}<br>
                        <strong>${t('newsfeed.creator')}:</strong> ${data.map.creators.join(", ")}<br>
                        <strong>${t('newsfeed.difficulty')}:</strong> ${data.map.difficulty}
                    </p>
                </div>
        </div>`;
    }

    if (type === "role") {
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
        let changes = "";
    
        for (const [key, value] of Object.entries(data.map)) {
            if (value !== null && key !== "map_code") {
                if (key === "new_map_code") {
                    changes += `<p><strong style="color: #FFFFFF;">Code:</strong> ${value}</p>`;
                } else {
                    const formattedKey = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
                    changes += `<p><strong style="color: #FFFFFF;">${formattedKey}:</strong> ${value}</p>`;
                }
            }
        }
    
        content += `
        <div class="news-header">
            <h3>${t('newsfeed.changed_code', { map_code: data.map.map_code })}</h3>
            ${changes || `<p>${t('newsfeed.no_changes')}</p>`}
        </div>`;
    }

    content += `<div class="timestamp" data-timestamp="${timestamp}"></div></div>`;
    return content;
}

//Replace
async function formatMessageContent(messageContent) {
    const emojiRegex = /<:(\w+):(\d+)>/g;
    const emojiPromises = [];

    let match;
    while ((match = emojiRegex.exec(messageContent)) !== null) {
        const [fullMatch, emojiName, emojiId] = match;
        emojiPromises.push(
            fetchEmoji(emojiName, emojiId).then(emojiHTML => {
                messageContent = messageContent.replace(fullMatch, emojiHTML);
            })
        );
    }

    await Promise.all(emojiPromises);

    return messageContent
        .replace(/<@&1073292414271356938>/g, '<span class="grey-highlight">@General Announcements</span>')
        .replace(/<#1316560101360013443>/g, '<span class="grey-highlight">#change-requests</span>')
        .replace(/`([^`]+)`/g, '<span class="code-highlight">$1</span>')
        .replace(/```([^`]+)```/gs, '<pre class="code-block">$1</pre>')
        .replace(/\*\*\*([^*]+)\*\*\*/g, '<span class="bold-italic">$1</span>')
        .replace(/\*\*([^*]+)\*\*/g, '<span class="bold">$1</span>')
        .replace(/\*([^*]+)\*/g, '<span class="italic">$1</span>')
        .replace(/__([^_]+)__/g, '<span class="underline">$1</span>')
        .replace(/~~([^~]+)~~/g, '<span class="strikethrough">$1</span>')
        .replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>')
        .replace(/###\s*([^\n]+)/g, '<h3 class="discord-heading">$1</h3>')
        .replace(/\n/g, "<br>");
}

async function convertTenorLinks(messageContent) {
    const tenorViewRegex = /https:\/\/tenor\.com\/view\/[\w-]+-(\d+)/g;

    const promises = [];
    let updatedContent = messageContent;

    let match;
    while ((match = tenorViewRegex.exec(messageContent)) !== null) {
        const tenorUrl = match[0];
        const gifId = match[1];

        const fetchGifUrl = fetch(`api/getGif.php?gifId=${gifId}`)
            .then(response => response.json())
            .then(result => {
                if (result.results && result.results.length > 0) {
                    const correctGifUrl = result.results[0].media_formats.gif.url;

                    const reformattedGifUrl = correctGifUrl.replace(
                        "https://media.tenor.com/",
                        "https://c.tenor.com/"
                    ).replace(".gif", "/tenor.gif");

                    //console.log(`GIF converti : ${tenorUrl} -> ${reformattedGifUrl}`);

                    const gifImage = `
                        <img src="${reformattedGifUrl}" alt="GIF Tenor" class="embedded-gif" style="max-width:100%; height:auto;">
                    `;
                    updatedContent = updatedContent.replace(tenorUrl, gifImage);
                }
            })
            .catch(error => {
                console.error(`Erreur lors de la récupération du GIF : ${error}`);
            });

        promises.push(fetchGifUrl);
    }

    await Promise.all(promises);
    return updatedContent;
}

//Trad
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('translate-button')) {
        const newsCard = event.target.closest('.news-card');
        const originalTextElement = newsCard.querySelector('.announcement-content');
        const translatedTextElement = newsCard.querySelector('.translated-text');
        const loadingIndicator = newsCard.querySelector('.loading-bar');

        if (!originalTextElement || !translatedTextElement || !loadingIndicator) return;

        const originalText = originalTextElement.innerHTML.replace(/<br>/g, "\n");
        const targetLang = document.documentElement.lang || 'en';

        const emojiRegex = /https:\/\/cdn\.discordapp\.com\/emojis\/(\d+)\.png/g;
        const emojiMap = new Map();
        let match;
        while ((match = emojiRegex.exec(originalText)) !== null) {
            emojiMap.set(match[1], match[0]);
        }

        loadingIndicator.style.display = 'flex';
        event.target.disabled = true;

        try {
            const response = await fetch('api/getTranslations.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ text: originalText, targetLang })
            });

            const data = await response.json();
            const correctedEmojisText = data.translatedText.replace(/https:\/\/cdn\.discordapp\.com\/emojis\/(\d+)\.png/g, (match, emojiId) => {
                return emojiMap.has(emojiId) ? emojiMap.get(emojiId) : match;
            }).replace(/\n/g, "<br>");

            translatedTextElement.innerHTML = correctedEmojisText || 'Translation failed.';
        } catch (error) {
            console.error('Error:', error);
            translatedTextElement.innerHTML = 'Error occurred during translation.';
        } finally {
            loadingIndicator.style.display = 'none';
            event.target.disabled = false;
        }
    }
});

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

//Pag
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

//Clipboard
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => {
        const target = event.target;
        
        if (target.classList.contains("map-code")) {
            const mapCodeText = target.dataset.mapCode || target.textContent;

            navigator.clipboard.writeText(mapCodeText)
                .then(() => {
                    //console.log("Texte copié:", mapCodeText);
                    showConfirmationMessage(t('newsfeed.copy_clipboard'));
                })
                .catch(err => {
                    console.error("Erreur de copie:", err);
                    showErrorMessage(t('newsfeed.copy_clipboard_error'));
                });
        }
    });
});

function showConfirmationMessage(message) {
    const existingPopup = document.querySelector('.confirmation-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const confirmationPopup = document.createElement('div');
    confirmationPopup.className = 'confirmation-popup';
    confirmationPopup.textContent = message;

    document.body.appendChild(confirmationPopup);

    setTimeout(() => {
        confirmationPopup.classList.add('show');
    }, 10);

    setTimeout(() => {
        confirmationPopup.classList.add('fade-out');
        confirmationPopup.addEventListener('transitionend', () => {
            confirmationPopup.remove();
        }, { once: true });
    }, 800);
}

function showErrorMessage(message) {
    const errorPopup = document.createElement('div');
    errorPopup.className = 'error-popup';
    errorPopup.textContent = message;

    document.body.appendChild(errorPopup);

    setTimeout(() => {
        errorPopup.classList.add('show');
    }, 10);

    setTimeout(() => {
        errorPopup.classList.add('fade-out');
        errorPopup.addEventListener('transitionend', () => {
            errorPopup.remove();
        }, { once: true });
    }, 800);
}

//Filtres
document.addEventListener("DOMContentLoaded", () => {
    const selectTrigger = document.querySelector(".select-trigger");
    const customSelect = document.querySelector(".custom-select-large");
    const customOptions = document.querySelectorAll(".custom-option");
    const resetFiltersButton = document.querySelector(".reset-filters-btn");

    const urlParams = new URLSearchParams(window.location.search);
    selectedType = urlParams.get("type") || null;

    if (selectedType) {
        const matchingOption = Array.from(customOptions).find(option => option.dataset.value === selectedType);
        if (matchingOption) {
            selectTrigger.textContent = matchingOption.textContent;
            matchingOption.classList.add("selected");
        }
    } else {
        document.addEventListener("DOMContentLoaded", async () => {
            await loadTranslations();
            selectTrigger.textContent = t("newsfeed.search_by_filter");
        });
    }

    customOptions.forEach(option => {
        option.addEventListener("click", (e) => {
            e.stopPropagation();
            selectedType = e.target.dataset.value;
            selectTrigger.textContent = e.target.textContent;
            customOptions.forEach(opt => opt.classList.remove("selected"));
            e.target.classList.add("selected");
            customSelect.classList.remove("open");

            currentPage = 1;
            const url = new URL(window.location);
            url.searchParams.set("type", selectedType);
            history.pushState(null, '', url);

            loadNewsfeed();
        });
    });

    resetFiltersButton.addEventListener("click", () => {
        selectedType = null;
        selectTrigger.textContent = t("newsfeed.search_by_filter");
        customOptions.forEach(opt => opt.classList.remove("selected"));

        currentPage = 1;
        const url = new URL(window.location);
        url.searchParams.delete("type");
        history.pushState(null, '', url);

        loadNewsfeed();
    });

    document.addEventListener("click", (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove("open");
        }
    });

    loadNewsfeed();
});