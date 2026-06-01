(function () {
  var agree = document.getElementById("exchange-agree");
  var btn = document.getElementById("confirm-btn");

  if (!agree || !btn) {
    return;
  }

  function updateBtn() {
    if (agree.checked) {
      btn.style.pointerEvents = "";
      btn.style.opacity = "";
    } else {
      btn.style.pointerEvents = "none";
      btn.style.opacity = "0.5";
    }
  }

  agree.addEventListener("change", updateBtn);
  updateBtn();

  btn.addEventListener("click", function (e) {
    if (!agree.checked) {
      e.preventDefault();
    }
  });
})();
