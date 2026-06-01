function initMainPage() {
  const nicknameEl = document.getElementById("main-nickname");
  const storedNickname = sessionStorage.getItem("storit-nickname");

  if (nicknameEl && storedNickname) {
    nicknameEl.textContent = storedNickname;
  }

  const cookieModal = document.getElementById("cookie-modal");
  const freeQuizTrigger = document.getElementById("freequiz-trigger");
  const freeQuizImage = document.querySelector(".main-quiz-banner__image");

  const openCookieModal = () => {
    if (!cookieModal) return;
    cookieModal.classList.add("is-open");
    cookieModal.setAttribute("aria-hidden", "false");
  };

  const closeCookieModal = () => {
    if (!cookieModal) return;
    cookieModal.classList.remove("is-open");
    cookieModal.setAttribute("aria-hidden", "true");
  };

  if (cookieModal) {
    cookieModal.querySelectorAll("[data-modal-close]").forEach((el) => {
      el.addEventListener("click", closeCookieModal);
    });
  }

  if (freeQuizTrigger) {
    freeQuizTrigger.addEventListener("click", openCookieModal);
  }

  if (freeQuizImage) {
    freeQuizImage.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openCookieModal();
    });
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
