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
  if (!user_id) {
    console.error("Aucun user_id défini !");
    return;
  }

  fetch(`api/settings/getNotifications.php?user_id=${user_id}`)
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
      user_id: user_id,
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

  const tabs = settingsModal.querySelectorAll(".settings-tab");
  const sections = settingsModal.querySelectorAll(".settings-section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      sections.forEach(section => (section.style.display = "none"));

      tab.classList.add("active");

      const targetId = tab.getAttribute("data-target");
      const targetSection = settingsModal.querySelector("#" + targetId);
      if (targetSection) {
        targetSection.style.display = "block";
      }
    });
  });

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
  if (!user_id || isNaN(user_id)) {
    console.error("user_id is not defined or invalid");
    const listContainer = document.getElementById('overwatch-usernames-list');
    if (listContainer) listContainer.innerHTML = "";
    document.getElementById('overwatch-username').placeholder = "No user ID";
    return;
  }

  fetch(`api/settings/getOverwatchUsernames.php?user_id=${user_id}`)
    .then(response => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    })
    .then(data => {
      const input = document.getElementById('overwatch-username');
      const listContainer = document.getElementById('overwatch-usernames-list');
      listContainer.innerHTML = "";

      const usernames = data.usernames || [];

      if (usernames.length > 0) {
        const primaryUser = usernames.find(u => u.is_primary);
        
        if (primaryUser && primaryUser.username) {
          input.placeholder = primaryUser.username;
        } else {
          input.placeholder = usernames[0].username || t("popup.no_username_set");
        }
      } else {
        input.placeholder = t("popup.no_username_set");
      }

      usernames.forEach(userObj => {
        const container = document.createElement("div");
        container.className = "overwatch-username-item";
        if (userObj.is_primary) container.classList.add("primary");

        const userSpan = document.createElement("span");
        userSpan.textContent = userObj.username + (userObj.is_primary ? " (Primary)" : "");
        userSpan.style.cursor = "pointer";
        userSpan.title = userObj.is_primary ? "" : t("popup.set_primary_username");
        userSpan.addEventListener("click", () => {
          if (!userObj.is_primary) {
            setPrimaryUsername(userObj.username);
          }
        });
        container.appendChild(userSpan);

        const btnDelete = document.createElement("button");
        btnDelete.className = "btn-delete";
        btnDelete.title = t("popup.delete_username");
        btnDelete.innerHTML = "&#10006;";
        btnDelete.addEventListener("click", () => {
          deleteUsername(userObj.username);
        });
        container.appendChild(btnDelete);

        listContainer.appendChild(container);
      });

      const inputField = document.getElementById("overwatch-username");
      const confirmBtn = document.getElementById("confirm-overwatch-username");
      if (usernames.length >= 3) {
        inputField.disabled = true;
        confirmBtn.disabled = true;
        confirmBtn.title = "Maximum 3 usernames allowed";
      } else {
        inputField.disabled = false;
        confirmBtn.disabled = false;
        confirmBtn.title = "";
      }
    })
    .catch(error => {
      console.error('Error loading Overwatch usernames:', error);
      document.getElementById('overwatch-username').placeholder = "Error loading username";
    });
}

// Supp username
function deleteUsername(usernameToDelete) {
  if (!user_id || !usernameToDelete) return;

  fetch(`api/settings/getOverwatchUsernames.php?user_id=${user_id}`)
    .then(resp => resp.json())
    .then(data => {
      let usernames = data.usernames || [];
      usernames = usernames.filter(u => u.username !== usernameToDelete);

      if (!usernames.some(u => u.is_primary) && usernames.length > 0) {
        usernames[0].is_primary = true;
      }
      
      updateUsernames(usernames);
    })
    .catch(err => {
      console.error("Erreur deleting the username :", err);
      showErrorMessage("Erreur deleting the username");
    });
}

//Username principal
function setPrimaryUsername(usernamePrimary) {
  if (!user_id || !usernamePrimary) return;

  fetch(`api/settings/getOverwatchUsernames.php?user_id=${user_id}`)
    .then(resp => resp.json())
    .then(data => {
      const usernames = data.usernames || [];

      const updatedUsernames = usernames.map(u => ({
        username: u.username,
        is_primary: u.username === usernamePrimary
      }));

      return fetch('api/settings/updateOverwatchUsernames.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user_id,
          usernames: updatedUsernames
        })
      });
    })
    .then(res => {
      if (!res.ok) throw new Error('Network error');
      return res.json();
    })
    .then(data => {
      if (data.success) {
        showConfirmationMessage(t("popup.primary_username_updated"));
        loadOverwatchUsername();
      } else {
        const errorText = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
        throw new Error(errorText || "Unknown error");
      }
    })
    .catch(err => {
      console.error("Erreur changement primary username :", err);
      showErrorMessage("Erreur maj primary username");
    });
}

// MAJ username
function updateUsernames(usernamesArray) {
  if (!user_id) return;

  fetch('api/settings/updateOverwatchUsernames.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: user_id,
      usernames: usernamesArray
    })
  })
    .then(res => {
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        return res.json();
      } else {
        return res.text().then(text => { throw new Error("Invalid JSON response: " + text); });
      }
    })
    .then(data => {
      if (data.success) {
        showConfirmationMessage(t("popup.username_updated"));
        loadOverwatchUsername();
        document.getElementById('overwatch-username').value = "";
      } else {
        console.error("Update error:", data.error || data.message);
        showErrorMessage("Error while updating the usernames list");
      }
    })
    .catch(err => {
      console.error("Erreur API update:", err);
      showErrorMessage("Error while updating the usernames list");
    });
}

// Ajouter un nouveau username
document.getElementById('confirm-overwatch-username').addEventListener('click', () => {
  const newUsername = document.getElementById('overwatch-username').value.trim();
  if (newUsername.length === 0) {
    showErrorMessage(t("popup.enter_username"));
    return;
  }

  fetch(`api/settings/getOverwatchUsernames.php?user_id=${user_id}`)
    .then(resp => resp.json())
    .then(data => {
      let usernames = data.usernames || [];

      if (usernames.length >= 3) {
        showErrorMessage("Maximum 3 usernames allowed");
        return;
      }

      if (usernames.some(u => u.username.toLowerCase() === newUsername.toLowerCase())) {
        showErrorMessage(t("popup.already_exist_username"));
        return;
      }

      usernames.push({
        username: newUsername,
        is_primary: usernames.length === 0
      });

      updateUsernames(usernames);
    })
    .catch(err => {
      console.error("Erreur lors de l'ajout du username:", err);
      showErrorMessage("Erreur lors de l'ajout du nom.");
    });
});