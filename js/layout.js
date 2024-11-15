function closeMenuOnScroll() {
    const burgerMenuCheckbox = document.getElementById('burgerMenuScroll');


    if (burgerMenuCheckbox.checked) {
        burgerMenuCheckbox.checked = false; 
    }
}

window.addEventListener('scroll', closeMenuOnScroll);

document.addEventListener("DOMContentLoaded", function() {
    fetch("discord/check_session.php")
        .then(response => response.json())
        .then(data => {
            if (data.session_expired) {
                document.getElementById("sessionModal").style.display = "flex";
            }
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.getElementById("burgerMenu");
    const menuItems = document.getElementById("menuItems");

    burgerMenu.addEventListener("click", () => {
        if (menuItems.classList.contains('hidden')) {
            menuItems.style.visibility = 'visible';
            menuItems.classList.remove('hidden');
        } else {
            menuItems.classList.add('hidden');
            setTimeout(() => {
                menuItems.style.visibility = 'hidden';
            }, 1000);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const avatarIcon = document.getElementById("avatar-icon");
    const profileModal = document.getElementById("profileModal");
    const profileModalContent = document.getElementById("profileModalContent");
    const closeModal = document.getElementById("closeModal");

    if (!avatarIcon) {
        console.warn("L'utilisateur n'est pas connecté. Aucun modal ne sera affiché.");
        return;
    }

    if (avatarIcon && profileModal && profileModalContent) {
        avatarIcon.addEventListener("click", () => {
            profileModal.style.display = "block";

            fetch('modal/profile.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP : ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    profileModalContent.innerHTML = html;
                })
                .catch(error => {
                    console.error("Erreur lors du chargement de modal/profile.php :", error);
                    profileModalContent.innerHTML = "<p>Erreur lors du chargement du contenu du modal.</p>";
                });
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