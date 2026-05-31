function setItemChecked(item, checked) {
  item.classList.toggle("agree-item--checked", checked);
  item.dataset.checked = checked ? "true" : "false";

  const path = item.querySelector(".agree-item__check path");
  if (path) {
    path.setAttribute("stroke", checked ? "#FFD95E" : "#D4D4CC");
  }
}

function updateAllState() {
  const items = [...document.querySelectorAll(".agree-item")];
  const allChecked = items.every((item) => item.dataset.checked === "true");
  const requiredChecked = items
    .filter((item) => item.dataset.required === "true")
    .every((item) => item.dataset.checked === "true");

  const agreeAll = document.querySelector("[data-agree-all]");
  if (agreeAll) {
    agreeAll.setAttribute("aria-pressed", allChecked ? "true" : "false");
  }

  const nextBtn = document.querySelector(".agree-next");
  if (nextBtn) {
    nextBtn.disabled = !requiredChecked;
  }
}

function initAgreePage() {
  document.querySelectorAll(".agree-item").forEach((item) => {
    item.dataset.checked = "false";

    const toggle = () => {
      const checked = item.dataset.checked !== "true";
      setItemChecked(item, checked);
      updateAllState();
    };

    item.querySelector(".agree-item__check")?.addEventListener("click", toggle);
    item.querySelector(".agree-item__label")?.addEventListener("click", toggle);
  });

  document.querySelector("[data-agree-all]")?.addEventListener("click", () => {
    const items = [...document.querySelectorAll(".agree-item")];
    const allChecked = items.every((item) => item.dataset.checked === "true");
    items.forEach((item) => setItemChecked(item, !allChecked));
    updateAllState();
  });

  document.querySelector(".agree-next")?.addEventListener("click", () => {
    const nextBtn = document.querySelector(".agree-next");
    if (nextBtn && !nextBtn.disabled) {
      window.location.href = "./userinfo.html";
    }
  });

  updateAllState();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAgreePage);
} else {
  initAgreePage();
}
