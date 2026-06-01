(function () {
  var editModal = document.getElementById("modal-edit");
  var editInput = document.getElementById("modal-edit-value");
  var confirmBtn = document.getElementById("modal-edit-confirm");
  var activePref = null;

  document.querySelectorAll(".mypage-pref__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".mypage-pref");
      if (!card || !editModal || !editInput) {
        return;
      }
      activePref = card;
      editInput.value = card.querySelector("p").textContent.trim();
      editModal.hidden = false;
      editInput.focus();
      editInput.select();
    });
  });

  function closeEditModal() {
    if (editModal) {
      editModal.hidden = true;
    }
    activePref = null;
  }

  document.querySelectorAll("[data-modal-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (editModal && !editModal.hidden) {
        closeEditModal();
      } else if (editModal) {
        editModal.hidden = true;
      }
    });
  });

  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      if (activePref && editInput) {
        var value = editInput.value.trim();
        if (value) {
          activePref.querySelector("p").textContent = value;
        }
      }
      closeEditModal();
    });
  }

  if (editModal) {
    editModal.addEventListener("click", function (e) {
      if (e.target === editModal) {
        closeEditModal();
      }
    });
  }
})();
