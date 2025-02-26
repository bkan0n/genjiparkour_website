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

  loadUserNotifications();

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
}
