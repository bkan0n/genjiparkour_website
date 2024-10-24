// script.js

const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('shrink');
    } else {
      nav.classList.remove('shrink');
    }
});

let isSorting = false;

// Fonction pour réappliquer les événements de tri
function reapplySortEvents() {
    document.querySelectorAll('.sort-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            sortTableAjax(event, button.getAttribute('data-column'), button);
        });
    });
}

// Fonction pour effectuer le tri via AJAX
function sortTableAjax(event, column, button) {
    event.preventDefault();

    if (isSorting) {
        console.log("Tri déjà en cours, action bloquée.");
        return;
    }

    isSorting = true;
    button.disabled = true;

    const urlParams = new URLSearchParams(window.location.search);
    let currentOrder = urlParams.get('order');
    const currentSort = urlParams.get('sort');

    if ((column === "player_xp" || column === "player_wr" || column === "rank_name") && (!currentSort || currentSort !== column)) {
        currentOrder = 'desc';
    } else {
        if (currentSort === column) {
            currentOrder = currentOrder === 'asc' ? 'desc' : 'asc';
        } else {
            currentOrder = 'asc';
        }
    }

    urlParams.set('sort', column);
    urlParams.set('order', currentOrder);

    const newUrl = `?${urlParams.toString()}`;
    history.pushState(null, '', newUrl);

    fetch(`leaderboard.php?${urlParams.toString()}`)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const newDocument = parser.parseFromString(html, 'text/html');
            const newTbody = newDocument.querySelector('#leaderboard tbody');
            document.querySelector('#leaderboard tbody').innerHTML = newTbody.innerHTML;

            reapplySortEvents();
            button.disabled = false;
            isSorting = false;

            document.querySelectorAll('.sort-btn').forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove('asc', 'desc');
                }
            });

            if (currentOrder === 'asc') {
                button.classList.add('asc');
            } else {
                button.classList.add('desc');
            }
        })
        .catch(error => {
            console.error('Erreur AJAX:', error);
            button.disabled = false;
            isSorting = false;
        });
}

// Fonction d'animation pour les boutons de tri
function animation(button) {
    button.classList.add('disable-click');

    const stroke1 = button.querySelector('.stroke1');
    const stroke2 = button.querySelector('.stroke2');
    const stroke3 = button.querySelector('.stroke3');

    stroke1.classList.toggle("resize1");
    stroke2.classList.toggle("bounce");
    stroke3.classList.toggle("resize2");

    setTimeout(() => {
        button.classList.remove('disable-click');
    }, 1000);
}

// Fonction pour mettre à jour les résultats de recherche via AJAX
function updateSearchResults() {
    const searchInput = document.getElementById('search-input').value;
    const searchBy = document.getElementById('selected-search-by').value;

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', searchInput);
    urlParams.set('search_by', searchBy);

    const newUrl = `?${urlParams.toString()}`;
    history.pushState(null, '', newUrl);

    fetch(`leaderboard.php?${urlParams.toString()}`)
        .then(response => response.text())
        .then(html => {

            const parser = new DOMParser();
            const newDocument = parser.parseFromString(html, 'text/html');
            const newTbody = newDocument.querySelector('#leaderboard tbody');
            document.querySelector('#leaderboard tbody').innerHTML = newTbody.innerHTML;

            reapplySortEvents();
        })
        .catch(error => {
            console.error('Erreur AJAX:', error);
        });
}

// Gérer la sélection des tris et rangs
document.addEventListener("DOMContentLoaded", function() {

    const sortTrigger = document.getElementById('sort-trigger');
    const rankTrigger = document.getElementById('rank-trigger');
    const searchByTrigger = document.getElementById('search-by-trigger');

    const sortOptions = document.querySelectorAll('#sort-select .custom-option');
    const rankOptions = document.querySelectorAll('#rank-select .custom-option');
    const searchOptions = document.querySelectorAll('#search-by-select .custom-option');

    // Gestion de la sélection pour les tris
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            sortTrigger.textContent = this.textContent;
            document.getElementById('selected-sort').value = this.getAttribute('data-value');
        });
    });

    // Gestion de la sélection pour les rangs
    rankOptions.forEach(option => {
        option.addEventListener('click', function() {
            rankTrigger.textContent = this.textContent;
            document.getElementById('selected-rank').value = this.getAttribute('data-value');
        });
    });

    // Gérer la sélection du critère de recherche
    searchOptions.forEach(option => {
        option.addEventListener('click', function() {
            searchByTrigger.textContent = this.textContent;
            const selectedValue = this.getAttribute('data-value');
            const searchInput = document.getElementById('search-input');
            document.getElementById('selected-search-by').value = selectedValue;

            if (selectedValue === 'player_name') {
                searchInput.placeholder = "Search by player name...";
            } else if (selectedValue === 'player_tag') {
                searchInput.placeholder = "Search by player tag...";
            } else {
                searchInput.placeholder = "Search by name & tag...";
            }
        });
    });

    // Gestion des cases à cocher pour afficher/cacher les colonnes
    const checkboxes = document.querySelectorAll('.toggle-col');

    // Fonction pour mettre à jour l'URL en fonction de l'état des cases à cocher
    function updateUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);

        checkboxes.forEach(checkbox => {
            const column = checkbox.getAttribute('data-col');
            const hiddenInput = document.getElementById(`show_${column}_input`);
            urlParams.set(`show_${column}`, hiddenInput.value);
        });

        const newUrl = `?${urlParams.toString()}`;
        history.replaceState(null, '', newUrl);

        updatePaginationLinks();
    }

    checkboxes.forEach(checkbox => {
        const column = checkbox.getAttribute('data-col');
        const urlParams = new URLSearchParams(window.location.search);
        const showColumn = urlParams.get(`show_${column}`);

        const hiddenInputId = `show_${column}_input`;
        const hiddenInput = document.getElementById(hiddenInputId);

        if (showColumn === '0') {
            checkbox.checked = false;
            const elements = document.querySelectorAll(`.col-${column}`);
            elements.forEach(el => el.style.display = 'none');
            hiddenInput.value = '0';
        } else {
            checkbox.checked = true;
            const elements = document.querySelectorAll(`.col-${column}`);
            elements.forEach(el => el.style.display = '');
            hiddenInput.value = '1';
        }
    });

    // Ajoute un gestionnaire d'événements à chaque case à cocher pour modifier l'affichage
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const column = this.getAttribute('data-col');
            const colClass = `.col-${column}`;
            const elements = document.querySelectorAll(colClass);
            const hiddenInputId = `show_${column}_input`;
            const hiddenInput = document.getElementById(hiddenInputId);

            if (this.checked) {
                elements.forEach(el => el.style.display = '');
                hiddenInput.value = '1';
            } else {
                elements.forEach(el => el.style.display = 'none');
                hiddenInput.value = '0';
            }

            updateUrlParams();
        });
    });

    // Fonction pour ajouter les états des cases à cocher aux liens de pagination
    function updatePaginationLinks() {
        const paginationLinks = document.querySelectorAll('.pagination a');
        paginationLinks.forEach(link => {
            const url = new URL(link.href, window.location.origin);
            const urlParams = new URLSearchParams(window.location.search);

            const pageNumber = url.searchParams.get('page');
            urlParams.set('page', pageNumber);

            checkboxes.forEach(checkbox => {
                const column = checkbox.getAttribute('data-col');
                const hiddenInputId = `show_${column}_input`;
                const hiddenInput = document.getElementById(hiddenInputId);
                urlParams.set(`show_${column}`, hiddenInput.value);
            });

            link.href = `${window.location.pathname}?${urlParams.toString()}`;
        });
    }

    updatePaginationLinks();

    reapplySortEvents();

    window.addEventListener('popstate', function(event) {
        location.reload();
    });
});

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');

    dropdownMenu.classList.toggle('open');

    if (dropdownMenu.classList.contains('open')) {
        // Transform hamburger bars into a smaller cross
        bar1.style.transform = 'rotate(45deg) translate(3px, 3px)';
        bar1.style.width = '15px'; // Small cross size
        bar2.style.opacity = '0';
        bar3.style.transform = 'rotate(-45deg) translate(3px, -3px)';
        bar3.style.width = '15px'; // Small cross size
    } else {
        // Reset the bars to their original state
        bar1.style.transform = 'none';
        bar1.style.width = '100%';
        bar2.style.opacity = '1';
        bar3.style.transform = 'none';
        bar3.style.width = '100%';
    }
}

// Fonction pour fermer le menu lors du scroll vers le bas
function closeMenuOnScroll() {
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (dropdownMenu.classList.contains('open')) {
        toggleMenu(); // Ferme le menu s'il est ouvert lorsque l'utilisateur fait défiler
    }
}

// Écouter l'événement de scroll pour fermer le menu lors du défilement
window.addEventListener('scroll', closeMenuOnScroll);





