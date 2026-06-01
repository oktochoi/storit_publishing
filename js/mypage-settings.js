(function () {
  document.querySelectorAll("[data-toggle]").forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      var on = toggle.classList.toggle("mypage-toggle--on");
      toggle.setAttribute("aria-pressed", on ? "true" : "false");
    });
  });

  var logoutModal = document.getElementById("modal-logout");
  var logoutOpen = document.getElementById("logout-open");

  if (logoutOpen && logoutModal) {
    logoutOpen.addEventListener("click", function () {
      logoutModal.hidden = false;
    });
  }

  document.querySelectorAll("[data-modal-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (logoutModal) {
        logoutModal.hidden = true;
      }
    });
  });

  if (logoutModal) {
    logoutModal.addEventListener("click", function (e) {
      if (e.target === logoutModal) {
        logoutModal.hidden = true;
      }
    });
  }
})();
