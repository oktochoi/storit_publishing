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

function updateNextButton() {
  const nickname = document.getElementById("nickname");
  const birthDate = document.getElementById("birth-date");
  const nextBtn = document.querySelector(".userinfo-next");

  if (!nextBtn || !nickname || !birthDate) return;

  const nicknameValid = nickname.value.trim().length > 0;
  const birthDateValid = birthDate.value.length > 0;
  nextBtn.disabled = !(nicknameValid && birthDateValid);
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

  birthDate.addEventListener("change", () => {
    syncBirthDateDisplay();
    updateNextButton();
  });

  birthDate.addEventListener("input", updateNextButton);

  dateField?.addEventListener("click", () => {
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

function initUserinfoPage() {
  const nickname = document.getElementById("nickname");

  nickname?.addEventListener("input", updateNextButton);

  initBirthDateField();
  initGenderButtons();
  updateNextButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initUserinfoPage);
} else {
  initUserinfoPage();
}
