let checkSessionInterval;

function checkSession() {
    if (!isLoggedIn) return;

    fetch(`${REDIRECT_URL}discord/check_session.php?nocache=${Date.now()}`)
        .then(response => response.json())
        .then(data => {
            sessionExpirationTimestamp = data.expiration_time;

            if (data.session_expired) {
                clearInterval(checkSessionInterval);
                displaySessionExpiredModal();
            }
        })
        .catch(error => console.error('Erreur lors de la vérification de la session :', error));
}

function loadModalStylesheet() {
    if (!document.getElementById("modalStylesheet")) {
        const link = document.createElement("link");
        link.id = "modalStylesheet";
        link.rel = "stylesheet";
        link.href = `${REDIRECT_URL}styles/session_expired.css`;
        document.head.appendChild(link);
    }
}

function displaySessionExpiredModal() {
    loadModalStylesheet();

    fetch(`${REDIRECT_URL}modal/session_expired.php`)
        .then(response => response.text())
        .then(html => {
            const sessionModalContent = document.getElementById("sessionModalContent");
            const sessionModal = document.getElementById("sessionModal");

            if (sessionModalContent && sessionModal) {
                sessionModalContent.innerHTML = html;
                sessionModal.style.display = "flex";
            } else {
                console.warn("L'élément sessionModal ou sessionModalContent est introuvable dans le DOM.");
            }
        })
        .catch(error => console.error("Erreur lors du chargement du modal session expirée :", error));
}

sessionStorage.setItem('returnUrl', window.location.href);

function startSessionCheck() {
    checkSessionInterval = setInterval(checkSession, 15000);
}

function redirectToLogin() {
    window.location.href = REDIRECT_URL + 'discord/login.php';
}

function closeSessionModal() {
    const redirectUrl = window.location.href;
    window.location.href = `${REDIRECT_URL}discord/logout.php?redirect=` + encodeURIComponent(redirectUrl);
}
