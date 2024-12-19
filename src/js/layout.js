//Session
document.addEventListener("DOMContentLoaded", function() {
    fetch("discord/check_session.php")
        .then(response => response.json())
        .then(data => {
            if (data.session_expired) {
                document.getElementById("sessionModal").style.display = "flex";
            }
        });
});

//Profil discord
document.addEventListener("DOMContentLoaded", function () {
    const profileBtn = document.getElementById("user-profile");
    const profileModal = document.getElementById("profileModal");
    const closeModal = document.getElementById("closeModal");

    if (!profileBtn) {
        console.warn("L'utilisateur n'est pas connecté. Aucun modal ne sera affiché.");
        return;
    }

    if (profileBtn && profileModal) {
        profileBtn.addEventListener("click", () => {
            profileModal.style.display = "block";
        });

        if (closeModal) {
            closeModal.addEventListener("click", () => {
                profileModal.style.display = "none";
            });
        }

        window.addEventListener("click", (event) => {
            if (event.target === profileModal) {
                profileModal.style.display = "none";
            }
        });
    }
});

//Prevent spam
function preventExcessiveRefresh(maxRefreshes, timeWindow) {
    const storageKey = 'pageRefreshes';
    const now = Date.now();

    let refreshes = localStorage.getItem(storageKey);
    refreshes = refreshes ? JSON.parse(refreshes) : [];

    refreshes = refreshes.filter(timestamp => now - timestamp < timeWindow);

    refreshes.push(now);

    if (refreshes.length > maxRefreshes) {
        document.body.innerHTML = `<h1>Excessive page refresh (${maxRefreshes} in ${timeWindow / 1000} secondes detected)</h1>`;
        throw new Error('Excessive page refresh. Page blocked.');
    }

    localStorage.setItem(storageKey, JSON.stringify(refreshes));
}

document.addEventListener("DOMContentLoaded", function () {
    preventExcessiveRefresh(5, 2000);
});

//Arrow rotations
document.addEventListener("DOMContentLoaded", () => {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle-nav');
    const avatarIcon = document.getElementById("avatar-icon");
    const avatarDropdown = avatarIcon?.parentElement;

    const closeAllMenus = () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('open');
            const associatedToggle = menu.previousElementSibling;
            if (associatedToggle) {
                const associatedArrow = associatedToggle.querySelector('.arrow');
                if (associatedArrow) {
                    associatedArrow.style.transform = 'rotate(-45deg) translate(5px, 2px)';
                }
            }
        });

        if (avatarDropdown) {
            avatarDropdown.classList.remove('open');
        }
    };

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            const dropdownMenu = toggle.nextElementSibling;
            const arrow = toggle.querySelector('.arrow');

            if (dropdownMenu.classList.contains('open')) {
                dropdownMenu.classList.remove('open');
                arrow.style.transform = 'rotate(-45deg) translate(5px, 2px)';
            } else {
                closeAllMenus();
                dropdownMenu.classList.add('open');
                arrow.style.transform = 'rotate(135deg) translate(-1px, -4px)';
            }

            event.stopPropagation();
        });
    });

    if (avatarIcon) {
        avatarIcon.addEventListener("click", (event) => {
            if (avatarDropdown.classList.contains("open")) {
                avatarDropdown.classList.remove("open");
            } else {
                closeAllMenus();
                avatarDropdown.classList.add("open");
            }

            event.stopPropagation();
        });
    }

    document.addEventListener("click", () => {
        closeAllMenus();
    });

    document.querySelectorAll(".dropdown-menu, .user-avatar-dropdown .dropdown-menu").forEach(menu => {
        menu.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });
});

//Search redirect
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function activateSectionFromURL() {
    const section = getQueryParam('section');
    if (section) {
        selectSection(section);

        const activeButton = document.getElementById(section + "Btn");
        if (activeButton) {
            document.querySelectorAll('.tab-buttons button').forEach(button => {
                button.classList.remove('active');
            });
            activeButton.classList.add('active');
        }
    }
}

window.addEventListener("load", activateSectionFromURL);

//Translation dropdown
document.addEventListener('DOMContentLoaded', () => {
    const unavailableLinks = document.querySelectorAll('a.unavailable');
    const modal = document.getElementById('translationModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModal = document.getElementById('closeModal');

    unavailableLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const message = link.getAttribute('data-message');
            const closeText = link.getAttribute('data-close-text');

            modalMessage.innerHTML = message;
            closeModal.textContent = closeText;

            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

//Favicon navbar
document.addEventListener("DOMContentLoaded", () => {
    const logoIcon = document.getElementById("logoIcon");

    logoIcon.addEventListener("mouseenter", () => {
        logoIcon.src = "assets/img/favicon-anim.gif";
    });

    logoIcon.addEventListener("mouseleave", () => {
        logoIcon.src = "assets/img/favicon.png";
    });

    logoIcon.addEventListener("click", () => {
        window.location.href = "404.php";
    });
});

//Redirect 404
function checkConnectivity() {
    if (!navigator.onLine) {
        window.location.href = './404.php';
    }
}

checkConnectivity();

window.addEventListener('offline', () => {
    checkConnectivity();
});

//Rankcard
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const rankCardBtn = document.getElementById("user-rankcard");
    const rankCardModal = document.getElementById("rankCardModal");

    if (!rankCardBtn || !rankCardModal) {
        console.warn("Bouton ou modal manquant.");
        return;
    }

    rankCardBtn.addEventListener("click", async () => {
        try {
            await loadTranslationsRankcard();
    
            const response = await fetch('modal/rank_card.php');
            const html = await response.text();
    
            rankCardModal.innerHTML = html;
            rankCardModal.style.display = "flex";
            document.body.classList.add("modal-active");
    
            await loadScript("js/rank_card.js");
    
            if (typeof initRankCard === "function") {
                initRankCard();
            } else {
                throw new Error("Fonction initRankCard non définie");
            }
        } catch (error) {
            console.error("Erreur chargement modal :", error);
        }
    });
});

async function loadTranslationsRankcard() {
    try {
        const response = await fetch("translations/translations.json");
        const data = await response.json();
        const currentLang = document.documentElement.lang || "en";
        const currentLangData = data[currentLang] || {};
        translations = { rank_card: currentLangData.rank_card || {} };
    } catch (error) {
        console.error("Erreur chargement traductions :", error);
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
    }
    return result;
}