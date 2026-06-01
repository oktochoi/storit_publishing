(function () {
  function closeModals() {
    document.querySelectorAll(".shop-modal").forEach(function (modal) {
      modal.hidden = true;
    });
  }

  function openModal(id) {
    var modal = document.getElementById(id);
    if (modal) {
      modal.hidden = false;
    }
  }

  document.querySelectorAll("[data-modal-close]").forEach(function (el) {
    el.addEventListener("click", closeModals);
  });

  document.querySelectorAll(".shop-modal").forEach(function (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModals();
      }
    });
  });

  var params = new URLSearchParams(window.location.search);
  if (params.get("modal") === "cookie") {
    openModal("modal-cookie-lack");
  }
  if (params.get("modal") === "fail") {
    openModal("modal-fail");
  }
})();
