window.translations = window.translations || {};

async function loadTranslations() {
  try {
      const response = await fetch("translations/translations.json");
      const data = await response.json();
      
      const currentLangData = data[currentLang] || {};
      
      const { popup = {} } = currentLangData;
      
      window.translations = { popup };

      //console.log("Traductions chargées :", window.translations);
  } catch (error) {
      console.error("Erreur lors du chargement des traductions :", error);
  }
}

function t(path, params = {}) {
  const parts = path.split('.');
  let result = window.translations;
  for (const part of parts) {
      result = result?.[part];
      if (!result) break;
  }
  if (!result) {
      return path;
  }
  for (const key in params) {
      result = result.replace(`{${key}}`, params[key]);
      if (!result) {
          console.error(`Clé de traduction introuvable: ${path}`);
          return path;
      }
  }
  return result;
}

function idToNotificationType(checkboxId) {
  let type = checkboxId.replace(/^setting-/, "");
  type = type.replace(/-/g, "_");
  return type.toUpperCase();
}

function notificationTypeToId(notificationType) {
  let id = notificationType.toLowerCase();
  id = id.replace(/_/g, "-");
  return "setting-" + id;
}

function loadUserNotifications() {
  if (!userId) {
    console.error("Aucun userId défini !");
    return;
  }

  fetch(`api/settings/getNotifications.php?user_id=${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des notifications (HTTP non-OK)");
      }
      return response.json();
    })
    .then(data => {
      //console.log("Réponse API getNotifications :", data);

      const notifs = data.notifications || [];

      const checkboxes = document.querySelectorAll('.settings-item input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        const checkboxId = checkbox.id;
        const notifType = idToNotificationType(checkboxId);
    
        if (notifs.includes(notifType)) {
          //console.log(`${notifType} est présent`);
          checkbox.checked = true;
        } else {
          //console.log(`${notifType} est absent`);
          checkbox.checked = false;
        }
      });
    })    
    .catch(error => {
      console.error("Erreur loadUserNotifications :", error);
    });
}

function updateUserNotification(notificationType, enabled) {
  fetch("api/settings/updateNotifications.php", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      notification_type: notificationType,
      enabled: enabled
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "error") {
      console.error("Erreur API lors de la mise à jour :", data.message);
    } else {
      //console.log("Mise à jour OK :", data.message);
    }
  })
  .catch(error => {
    console.error("Erreur de requête PATCH :", error);
  });
}

function initSettingsModal() {
  const settingsModal = document.querySelector(".settings-modal");
  if (!settingsModal) {
    console.warn("Pas de .settings-modal dans le DOM");
    return;
  }
  
  const currentLang = window.currentLang;
  loadTranslations();
  loadUserNotifications();
  loadOverwatchUsername();

  const checkboxes = settingsModal.querySelectorAll('.settings-item input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", event => {
      const checkboxId = event.target.id;
      const notificationType = idToNotificationType(checkboxId);
      const enabled = event.target.checked;
      updateUserNotification(notificationType, enabled);
    });
  });

  const closeBtn = settingsModal.querySelector(".close-modal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      settingsModal.style.display = "none";
      document.body.classList.remove("modal-active");
    });
  }

  settingsModal.addEventListener("click", (event) => {
    if (event.target === settingsModal) {
      settingsModal.style.display = "none";
      document.body.classList.remove("modal-active");
    }
  });
}

// OW Actuel
function loadOverwatchUsername() {
  if (!userId || isNaN(userId)) {
    console.error("userId is not defined or invalid");
    document.getElementById('overwatch-username').placeholder = "No user ID";
    return;
  }

  fetch(`api/settings/getOverwatchUsernames.php?user_id=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    })
    .then(data => {
      if (data.usernames && data.usernames.length > 0) {
        document.getElementById('overwatch-username').placeholder = data.usernames[0].username || "No username set";
      } else {
        document.getElementById('overwatch-username').placeholder = "No username set";
      }
    })
    .catch(error => {
      console.error('Error loading Overwatch username:', error);
      document.getElementById('overwatch-username').placeholder = "Error loading username";
    });
}

// MAJ name
document.getElementById('confirm-overwatch-username').addEventListener('click', () => {
  const newUsername = document.getElementById('overwatch-username').value.trim();
  if (newUsername.length === 0) {
      showErrorMessage(t("popup.enter_username"));
      return;
  }

  fetch('api/settings/updateOverwatchUsernames.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user_id: userId,
          usernames: [{
              username: newUsername,
              is_primary: true
          }]
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
        showConfirmationMessage(t("popup.username_updated"));
        document.getElementById('overwatch-username').value = "";
        loadOverwatchUsername();
      } else {
          console.error("Update error:", data.error);
          showErrorMessage("Error updating username: " + JSON.stringify(data.error));
      }
  })
  .catch(error => {
      console.error('Error updating Overwatch username:', error);
      showErrorMessage("An error occurred.");
  });
});