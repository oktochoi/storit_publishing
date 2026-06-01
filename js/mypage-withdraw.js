(function () {
  var agree = document.getElementById("withdraw-agree");
  var btn = document.getElementById("withdraw-btn");

  if (!agree || !btn) {
    return;
  }

  function update() {
    btn.disabled = !agree.checked;
  }

  agree.addEventListener("change", update);
  update();
})();
