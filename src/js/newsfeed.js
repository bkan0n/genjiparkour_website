document.addEventListener("DOMContentLoaded", () => {
    const timestamps = document.querySelectorAll(".timestamp");
    timestamps.forEach(timestampElement => {
        const serverTimestamp = timestampElement.getAttribute("data-timestamp");

        const date = new Date(serverTimestamp);

        const optionsDate = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        const optionsTime = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        const formattedDate = date.toLocaleDateString("en-US", optionsDate);
        const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

        timestampElement.textContent = `${formattedDate} at ${formattedTime}`;
    });
});

function openMapDetailsModal(mapCode) {
    const modalOverlay = document.getElementById("detailsModalOverlay");
    const modalContainer = document.getElementById("modalDetailsContainer");

    modalContainer.innerHTML = "<p>Loading...</p>";
    modalOverlay.style.display = "flex";

    const getStars = (quality) => {
        let stars = '';
        const starCount = Math.floor(quality);
        for (let i = 0; i < starCount; i++) {
            stars += '⭐';
        }
        return stars || 'N/A';
    };

    fetch('api/search/getMapSearch.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ map_code: mapCode }),
    })
        .then(response => {
            console.log("API Request Status:", response.status);
            return response.json();
        })
        .then(result => {
            console.log("API Response:", result);
            const medals = [];

            if (result.error) {
                modalContainer.innerHTML = `<p>Error: ${result.error}</p>`;
            } else {
                const map = result[0];
                const mechanics = map.mechanics ? map.mechanics.join(", ") : "N/A";
                const restrictions = map.restrictions ? map.restrictions.join(", ") : "N/A";
                const description = map.desc || "No description available";
                const bannerPath = `assets/banners/${map.map_name.toLowerCase().replace(/\s+/g, "")}.png`;
                if (map.gold && map.gold !== "N/A") {
                    medals.push(`
                        <div class="medal-wrapper">
                            <img src="assets/verifications/gold_wr.gif" alt="Gold Medal" class="medal-image" />
                            <span class="medal-time">${map.gold}</span>
                        </div>
                    `);
                }
                if (map.silver && map.silver !== "N/A") {
                    medals.push(`
                        <div class="medal-wrapper">
                            <img src="assets/verifications/silver_wr.gif" alt="Silver Medal" class="medal-image" />
                            <span class="medal-time">${map.silver}</span>
                        </div>
                    `);
                }
                if (map.bronze && map.bronze !== "N/A") {
                    medals.push(`
                        <div class="medal-wrapper">
                            <img src="assets/verifications/bronze_wr.gif" alt="Bronze Medal" class="medal-image" />
                            <span class="medal-time">${map.bronze}</span>
                        </div>
                    `);
                }

                modalContainer.innerHTML = `
                    <div id="modalContentFrame" class="modal-content-frame">
                        <div id="modalLayout" class="modal-layout">
                            <div class="map-details">
                                <div id="modalTextSection" class="modal-text-section">
                                    <h2>Map Details</h2>
                                    <p><strong>Code:</strong> ${map.map_code || "N/A"}</p>
                                    <p><strong>Name:</strong> ${map.map_name || "N/A"}</p>
                                    <p><strong>Type:</strong> ${map.map_type?.[0]?.join(", ") || "N/A"}</p>
                                    <p><strong>Creator:</strong> ${map.creators?.join(", ") || "N/A"}</p>
                                    <p><strong>Difficulty:</strong> ${map.difficulty || "N/A"}</p>
                                    <p><strong>Checkpoints:</strong> ${map.checkpoints || "N/A"}</p>
                                    <p><strong>Quality:</strong> ${getStars(map.quality) || "N/A"}</p>
                                    <p><strong>Mechanics:</strong> ${mechanics}</p>
                                    <p><strong>Restrictions:</strong> ${restrictions}</p>
                                    <p><strong>Description:</strong> ${description}</p>
                                </div>
                            </div>
                            <div id="modalBannerSection" class="modal-banner-section">
                                <img src="${bannerPath}" alt="${map.map_name} Banner" class="modal-banner-image" onerror="this.style.display='none'" />
                                <div class="medals-container">
                                ${medals.join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error("API Request Error:", error);
            modalContainer.innerHTML = `<p>Error fetching map details: ${error.message}</p>`;
        });
}

function closeDetailsModal() {
    const modalOverlay = document.getElementById("detailsModalOverlay");
    modalOverlay.style.display = "none";
}

document.getElementById("detailsModalOverlay").addEventListener("click", (event) => {
    const modalBox = document.getElementById("detailsModalBox");
    if (!modalBox.contains(event.target)) {
        closeDetailsModal();
    }
});