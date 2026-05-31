function initMainPage() {
  const nicknameEl = document.getElementById("main-nickname");
  const storedNickname = sessionStorage.getItem("storit-nickname");

  if (nicknameEl && storedNickname) {
    nicknameEl.textContent = storedNickname;
  }

  document.querySelectorAll(".main-tabs__item").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".main-tabs__item").forEach((item) => {
        item.classList.remove("main-tabs__item--active");
      });
      tab.classList.add("main-tabs__item--active");
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMainPage);
} else {
  initMainPage();
}
