function initCreditsModal() {
    const closeBtn = document.getElementById("creditsModalClose");
    const closeIconBtn = document.querySelector(".close-modal");
    const creditsModal = document.getElementById("creditsModal");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            creditsModal.style.display = "none";
            document.body.classList.remove("modal-active");
        });
    }

    if (closeIconBtn) {
        closeIconBtn.addEventListener("click", () => {
            creditsModal.style.display = "none";
            document.body.classList.remove("modal-active");
        });
    }

    document.addEventListener("click", (event) => {
        if (event.target === creditsModal) {
            creditsModal.style.display = "none";
            document.body.classList.remove("modal-active");
        }
    });

    populateCredits();
}

function populateCredits() {
    const translators = [
        { name: "Vertigo", avatar: "assets/profile/vertigo.webp" },
        { name: "CoralMage", avatar: "assets/profile/coralmage.webp" },
        { name: "Lacepanties", avatar: "assets/profile/lacepanties.webp" },
        { name: "干しガキ", avatar: "assets/profile/weds.webp" }
    ];

    const websiteCreators = [
        { name: "Joe", avatar: "assets/profile/joe.jpg" },
        { name: "Arrow", avatar: "assets/profile/arrow.png" }
    ];

    const translatorsList = document.getElementById("translatorsList");

    translators.forEach((translator) => {
        translatorsList.innerHTML += `
            <div class="contributor">
                <img src="${translator.avatar}" alt="${translator.name}">
                <p>${translator.name}</p>
            </div>`;
    });

    const websiteCreatorsList = document.getElementById("websiteCreatorsList");

    websiteCreators.forEach((creator) => {
        websiteCreatorsList.innerHTML += `
            <div class="contributor">
                <img src="${creator.avatar}" alt="${creator.name}">
                <p>${creator.name}</p>
            </div>`;
    });
}
