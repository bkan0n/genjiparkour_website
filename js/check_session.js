let checkSessionInterval;

function checkSession() {
    if (!isLoggedIn) return;

    fetch(`${REDIRECT_URL}discord/check_session.php`)
        .then(response => response.json())
        .then(data => {
            console.log("Session expired status:", data.session_expired);
            if (data.session_expired) {
                clearInterval(checkSessionInterval);
                displaySessionExpiredModal();
            }
        })
        .catch(error => console.error('Erreur lors de la vérification de la session:', error));
}

function displaySessionExpiredModal() {
    fetch(`${REDIRECT_URL}modal/session_expired.php`)
        .then(response => response.text())
        .then(html => {
            const sessionModalContent = document.getElementById("sessionModalContent");
            const sessionModal = document.getElementById("sessionModal");
            
            if (sessionModalContent && sessionModal) {
                sessionModalContent.innerHTML = html;
                sessionModal.style.display = "flex";
            } else {
                console.warn("L'élément sessionModalContent ou sessionModal est introuvable dans le DOM.");
            }
        })
        .catch(error => console.error("Erreur lors du chargement de la session expirée :", error));
}

sessionStorage.setItem('returnUrl', window.location.href);

function startSessionCheck() {
    checkSessionInterval = setInterval(checkSession, 5000);
}

if (isLoggedIn) {
    startSessionCheck();
}

function redirectToLogin() {
    window.location.href = REDIRECT_URL + 'discord/login.php';
}

function closeSessionModal() {
    const redirectUrl = window.location.href;
    window.location.href = `${REDIRECT_URL}discord/logout.php?redirect=` + encodeURIComponent(redirectUrl);
    document.getElementById("sessionModal").style.display = "none";
}

const profileModal = document.getElementById("profileModal");
const avatarIcon = document.getElementById("avatar-icon");
const closeModal = document.getElementById("closeModal");

if (avatarIcon && profileModal && closeModal) {
    avatarIcon.addEventListener("click", () => {
        profileModal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        profileModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === profileModal) {
            profileModal.style.display = "none";
        }
    });
}
