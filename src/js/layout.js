document.addEventListener("DOMContentLoaded", function() {
    fetch("discord/check_session.php")
        .then(response => response.json())
        .then(data => {
            if (data.session_expired) {
                document.getElementById("sessionModal").style.display = "flex";
            }
        });
});

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
            document.body.style.overflowY = "hidden";
        });

        if (closeModal) {
            closeModal.addEventListener("click", () => {
                profileModal.style.display = "none";
                document.body.style.overflowY = "auto";
            });
        }

        window.addEventListener("click", (event) => {
            if (event.target === profileModal) {
                profileModal.style.display = "none";
                document.body.style.overflowY = "auto";
            }
        });
    }
});

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
    preventExcessiveRefresh(5, 5000);
});

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

            closeAllMenus();

            dropdownMenu.classList.toggle('open');

            if (dropdownMenu.classList.contains('open')) {
                arrow.style.transform = 'rotate(135deg) translate(-1px, -4px)';
            } else {
                arrow.style.transform = 'rotate(-45deg) translate(5px, 2px)';
            }

            event.stopPropagation();
        });
    });

    if (avatarIcon) {
        avatarIcon.addEventListener("click", (event) => {
            closeAllMenus();

            avatarDropdown.classList.toggle("open");

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


function forceScrollbar() {
    const body = document.body;
    const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;

    if (!hasScrollbar) {
        body.style.overflowY = "scroll";
    } else {
        body.style.overflowY = "auto";
    }
}

window.addEventListener("load", forceScrollbar);

window.addEventListener("resize", forceScrollbar);

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




