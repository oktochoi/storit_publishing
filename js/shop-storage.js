(function () {
  var tabs = document.querySelectorAll(".shop-tab");
  var panelAvailable = document.getElementById("panel-available");
  var panelUsed = document.getElementById("panel-used");

  if (!tabs.length) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var initial = params.get("tab") === "used" ? "used" : "available";

  function setTab(name) {
    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute("data-tab") === name;
      tab.classList.toggle("shop-tab--active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      var line = tab.querySelector(".shop-tab__line");
      if (line) {
        line.src = isActive
          ? STORIT.asset("images/shop/tab-line-active.svg")
          : STORIT.asset("images/shop/tab-line-inactive.svg");
      }
      if (!isActive) {
        tab.querySelector("span").style.color = "#888880";
      } else {
        tab.querySelector("span").style.color = "#1c1000";
      }
    });

    if (panelAvailable) {
      panelAvailable.hidden = name !== "available";
    }
    if (panelUsed) {
      panelUsed.hidden = name !== "used";
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setTab(tab.getAttribute("data-tab"));
    });
  });

  setTab(initial);
})();
