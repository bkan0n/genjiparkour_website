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
        menuItems.classList.toggle("hidden");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const profileModal = document.getElementById("profileModalContent");

    fetch('modal/profile.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            profileModal.innerHTML = html;
        })
        .catch(error => {
            console.error("Erreur lors du chargement du contenu du modal :", error);
            profileModal.innerHTML = "<p>Une erreur s'est produite lors du chargement.</p>";
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const avatarIcon = document.getElementById("avatar-icon");
    const profileModal = document.getElementById("profileModal");
    const closeModal = document.getElementById("closeModal");

    if (avatarIcon && profileModal) {
        avatarIcon.addEventListener("click", () => {
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