if (typeof window.currentLang === "undefined") {
    window.currentLang = document.documentElement.lang || "en";
}

let translations2 = {};

document.addEventListener("DOMContentLoaded", () => {
    loadTranslationsPopup();
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
        const uid = (typeof user_id !== 'undefined' && user_id !== null)
            ? `<p><strong>User ID :</strong> ${user_id}</p>`
            : '';

        document.body.innerHTML = `
          <h1>Excessive page refresh (${maxRefreshes} rafraîchissements en ${timeWindow/1000}s détectés)</h1>
          ${uid}
        `;
        throw new Error(typeof user_id !== 'undefined' && user_id !== null ? `Excessive page refresh. Page blocked. UID: ${user_id}` : 'Excessive page refresh. Page blocked.');
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

    const keySelectionContainer = document.querySelector('.key-selection-container');
    const keyTypeButton = document.getElementById('key-type-button');
    const keyDropdown = document.getElementById('key-dropdown');
    const arrow = keyTypeButton?.querySelector('.arrow');

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

        if (keyDropdown) {
            keyDropdown.classList.remove('open');
            if (arrow) {
                arrow.style.transform = 'rotate(-45deg) translate(5px, 2px)';
            }
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

    if (keySelectionContainer) {
        keySelectionContainer.addEventListener('click', (event) => {
            if (keyDropdown.classList.contains('open')) {
                keyDropdown.classList.remove('open');
                if (arrow) {
                    arrow.style.transform = 'rotate(-45deg) translate(5px, 2px)';
                }
            } else {
                closeAllMenus();
                keyDropdown.classList.add('open');
                if (arrow) {
                    arrow.style.transform = 'rotate(135deg) translate(-1px, -4px)';
                }
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

//Responsive design for dropdown/lan
document.addEventListener("DOMContentLoaded", () => {
    const currentLang = document.documentElement.lang || "en";
    
    if (currentLang === "cn" || currentLang === "jp") {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            const parentLi = menu.closest('li');
            if (!parentLi || !parentLi.classList.contains('lang-dropdown-nav')) {
                menu.style.width = "170px";
            }
        });
    }

    if (currentLang === "de") {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            const parentLi = menu.closest('li');
            if (!parentLi || !parentLi.classList.contains('lang-dropdown-nav')) {
                menu.style.width = "150px";
            }
        });
    }
});

//Search redirect
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function handleCtaSubmit() {
    if (!user_id) {
        showErrorMessage(t2('popup.login_required_msg'));
    } else {
        //window.location.href = 'submit.php?section=playtest';
        showErrorMessage("This page is not available yet");
    }
}

function activateSectionFromURL() {
    const section = getQueryParam('section');
    if (section && typeof selectSection === 'function') {
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
    if (!modal || !modalMessage || !closeModal) {
        console.warn('Modal or sub-element not in dom');
        return;
    }

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
    if (!logoIcon) return;

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

//Trad
async function loadTranslationsPopup() {
    try {
        const response2 = await fetch("translations/translations.json");
        const data2 = await response2.json();
        
        const currentLangData2 = data2[currentLang] || {};
        
        const { popup = {} } = currentLangData2;
        
        translations2 = { popup };

        //console.log("Traductions chargées :", translations2);
    } catch (error) {
        console.error("Erreur lors du chargement des traductions :", error);
    }
}

function t2(path, params = {}) {
    const parts = path.split('.');
    let result = translations2;
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

//Popup
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
        confirmationPopup.classList.add('show-popup');
    }, 10);

    setTimeout(() => {
        confirmationPopup.classList.add('fade-out-popup');
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
        errorPopup.classList.add('show-popup');
    }, 10);

    setTimeout(() => {
        errorPopup.classList.add('fade-out-popup');
        errorPopup.addEventListener('transitionend', () => {
            errorPopup.remove();
        }, { once: true });
    }, 800);
}

//Credits
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Erreur lors du chargement du script : ${src}`));
        document.head.appendChild(script);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const creditsBtn = document.getElementById("creditsBtn");
    const creditsModal = document.getElementById("creditsModal");

    if (!creditsBtn || !creditsModal) {
        console.warn("Bouton ou modal des crédits manquant");
        return;
    }

    creditsBtn.addEventListener("click", async () => {
        try {
            loadCSS("styles/credits.css");
            const response = await fetch('modal/credits.php');
            const html = await response.text();

            creditsModal.innerHTML = html;
            creditsModal.style.display = "flex";
            document.body.classList.add("modal-active");

            await loadScript("js/credits.js");

            if (typeof initCreditsModal === "function") {
                initCreditsModal();
            } else {
                console.warn("Aucune fonction initCreditsModal trouvée");
            }
        } catch (error) {
            console.error("Erreur lors du chargement du modal des crédits :", error);
        }
    });

    window.addEventListener("click", (event) => {
        if (event.target === creditsModal) {
            creditsModal.style.display = "none";
            document.body.classList.remove("modal-active");
        }
    });
});

function loadCSS(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = href;
    document.head.appendChild(link);
    //console.log(`CSS chargé : ${href}`);
}

//Settings
document.addEventListener("DOMContentLoaded", function () {
    const settingsBtn = document.getElementById("user-settings");
    const settingsModal = document.getElementById("settingsModal");

    if (!settingsBtn || !settingsModal) {
        console.warn("Bouton ou modal #settingsModal manquant");
        return;
    }

    settingsBtn.addEventListener("click", async () => {
        try {
            loadCSS("styles/notifications.css");

            const response = await fetch('modal/notifications.php');
            const html = await response.text();

            settingsModal.innerHTML = html;

            settingsModal.style.display = "flex";
            document.body.classList.add("modal-active");

            await loadScript("js/notifications.js");

            if (typeof initSettingsModal === "function") {
                initSettingsModal();
            } else {
                console.warn("initSettingsModal non défini dans notifications.js");
            }

        } catch (error) {
            console.error("Erreur lors du chargement du modal :", error);
        }
    });

    window.addEventListener("click", (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = "none";
            document.body.classList.remove("modal-active");
        }
    });
});

//Loading bar
function showLoadingBar() {
    const loadingContainer = document.getElementById("loadingContainer");
    if (loadingContainer) {
        loadingContainer.style.display = "flex";
        loadingContainer.style.opacity = "0";
        loadingContainer.style.transition = "opacity 0.2s ease-in";
        
        requestAnimationFrame(() => {
            loadingContainer.style.opacity = "1";
        });
    }
}

function hideLoadingBar() {
    const loadingContainer = document.getElementById("loadingContainer");
    if (loadingContainer) {
        loadingContainer.style.transition = "opacity 0.2s ease-out";
        loadingContainer.style.opacity = "0";

        setTimeout(() => {
            loadingContainer.style.display = "none";
        }, 200);
    }
}

//Traceback js 
(function() {
    function sendErrorToServer(errorDetails) {
        fetch('api/sendJsError.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(errorDetails)
        })
        .then(response => response.json())
        .then(data => console.log('Error sent to webhook:', data))
        .catch(err => console.error('Error while sending error to server:', err));
    }

    window.onerror = function(message, source, lineno, colno, error) {
        const errorDetails = {
            message: message,
            source: source,
            lineno: lineno,
            colno: colno,
            error: error ? error.stack : null
        };

        sendErrorToServer(errorDetails);
        return true;
    };

    window.addEventListener('unhandledrejection', function(event) {
        const errorDetails = {
            message: event.reason.message,
            source: 'Unhandled Promise Rejection',
            lineno: 'N/A',
            colno: 'N/A',
            error: event.reason.stack
        };

        sendErrorToServer(errorDetails);
    });

    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        const wrappedListener = function(event) {
            try {
                listener.apply(this, arguments);
            } catch (error) {
                captureError(error, event);
            }
        };
        originalAddEventListener.call(this, type, wrappedListener, options);
    };

    function captureError(error, event) {
        const errorDetails = {
            message: error.message,
            source: 'Event Listener Error',
            lineno: error.lineNumber || 'N/A',
            colno: error.columnNumber || 'N/A',
            error: error.stack
        };

        if (event) {
            errorDetails.eventType = event.type;
            errorDetails.eventTarget = event.target ? event.target.tagName : 'unknown';
        }

        sendErrorToServer(errorDetails);
    }

})();