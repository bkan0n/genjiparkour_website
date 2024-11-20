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
    const burgerMenuCheckbox = document.getElementById("burgerMenuScroll");
    const menuItems = document.getElementById("menuItems");
  
    let isAnimating = false;
  
    burgerMenuCheckbox.addEventListener("change", () => {
      if (isAnimating) {
        burgerMenuCheckbox.checked = !burgerMenuCheckbox.checked;
        return;
      }
  
      if (burgerMenuCheckbox.checked) {
        menuItems.classList.remove('hidden');
        menuItems.style.visibility = 'visible';
      } else {
        isAnimating = true;
        menuItems.classList.add('hidden');
        setTimeout(() => {
          menuItems.style.visibility = 'hidden';
          isAnimating = false;
        }, 200);
      }
    });
});
  
  

document.addEventListener("DOMContentLoaded", function () {
    const avatarIcon = document.getElementById("avatar-icon");
    const profileModal = document.getElementById("profileModal");
    const closeModal = document.getElementById("closeModal");

    if (!avatarIcon) {
        console.warn("L'utilisateur n'est pas connecté. Aucun modal ne sera affiché.");
        return;
    }

    if (avatarIcon && profileModal) {
        avatarIcon.addEventListener("click", () => {
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
