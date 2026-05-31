function formatBirthDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

function syncBirthDateDisplay() {
  const birthDate = document.getElementById("birth-date");
  const display = document.querySelector(".userinfo-input__display");

  if (!birthDate || !display) return;

  const placeholder = display.dataset.placeholder || "생년월일 선택하기";

  if (!birthDate.value) {
    display.textContent = placeholder;
    display.classList.remove("userinfo-input__display--filled");
    return;
  }

  display.textContent = formatBirthDate(birthDate.value);
  display.classList.add("userinfo-input__display--filled");
}

function isFormValid() {
  const nickname = document.getElementById("nickname");
  const birthDate = document.getElementById("birth-date");

  if (!nickname || !birthDate) return false;

  return nickname.value.trim().length > 0 && birthDate.value.length > 0;
}

function updateNextButton() {
  const nextBtn = document.getElementById("userinfo-next");
  if (!nextBtn) return;

  nextBtn.disabled = !isFormValid();
}

function initBirthDateField() {
  const birthDate = document.getElementById("birth-date");
  const dateField = document.querySelector(".userinfo-input--date");

  if (!birthDate) return;

  const today = new Date();
  const maxDate = today.toISOString().slice(0, 10);
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
    .toISOString()
    .slice(0, 10);

  birthDate.max = maxDate;
  birthDate.min = minDate;

  const onBirthDateUpdate = () => {
    syncBirthDateDisplay();
    updateNextButton();
  };

  birthDate.addEventListener("change", onBirthDateUpdate);
  birthDate.addEventListener("input", onBirthDateUpdate);

  dateField?.addEventListener("click", (event) => {
    event.preventDefault();
    if (typeof birthDate.showPicker === "function") {
      birthDate.showPicker();
    } else {
      birthDate.focus();
    }
  });

  syncBirthDateDisplay();
}

function initGenderButtons() {
  const buttons = [...document.querySelectorAll(".userinfo-gender__btn")];

  buttons.forEach((btn) => {
    btn.setAttribute("aria-pressed", "false");

    btn.addEventListener("click", () => {
      const isSelected = btn.classList.contains("userinfo-gender__btn--selected");

      buttons.forEach((b) => {
        b.classList.remove("userinfo-gender__btn--selected");
        b.setAttribute("aria-pressed", "false");
      });

      if (!isSelected) {
        btn.classList.add("userinfo-gender__btn--selected");
        btn.setAttribute("aria-pressed", "true");
      }
    });
  });
}

function openNotifyModal() {
  const modal = document.getElementById("notify-modal");
  if (!modal) return;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function goToWelcome() {
  const nickname = document.getElementById("nickname")?.value.trim();

  if (nickname) {
    sessionStorage.setItem("storit-nickname", nickname);
  } else {
    sessionStorage.removeItem("storit-nickname");
  }

  window.location.href = "./welcome2.html";
}

function handleNextStep() {
  if (!isFormValid()) return;
  openNotifyModal();
}

function initNotifyModal() {
  const modal = document.getElementById("notify-modal");
  const nextBtn = document.getElementById("userinfo-next");
  const form = document.querySelector(".userinfo-form");

  if (!modal) return;

  nextBtn?.addEventListener("click", handleNextStep);

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    handleNextStep();
  });

  modal.querySelectorAll("[data-modal-close]").forEach((el) => {
    el.addEventListener("click", goToWelcome);
  });

  modal.querySelector(".notify-modal__btn--primary")?.addEventListener("click", goToWelcome);
}

function initUserinfoPage() {
  const nickname = document.getElementById("nickname");

  nickname?.addEventListener("input", updateNextButton);

  initBirthDateField();
  initGenderButtons();
  initNotifyModal();
  updateNextButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initUserinfoPage);
} else {
  initUserinfoPage();
}
