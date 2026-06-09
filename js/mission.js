(function () {
  const missionRoot = document.querySelector(".mission");
  const missionList = document.querySelector(".mission-list");
  const ingredientChips = document.querySelectorAll(".ingredient-chip");
  const bakeButton = document.querySelector(".mission-bake-btn");
  const missionComplete = document.querySelector(".mission-complete");
  const checkIconSrc = "../../assets/images/missions/icon-check-done.svg";

  if (!missionList) {
    return;
  }

  function createDoneState() {
    const doneState = document.createElement("div");
    doneState.className = "mission-item__state mission-item__state--done";
    doneState.innerHTML =
      '<span class="mission-item__badge">기본 재료</span>' +
      '<div class="mission-item__done-label">' +
      '<img src="' +
      checkIconSrc +
      '" alt="" width="10" height="8" />' +
      "<strong>완료</strong>" +
      "</div>";
    return doneState;
  }

  function completeMissionItem(item, actionEl) {
    const progressBar = item.querySelector(".mission-item__progress span");
    const progressCount = item.querySelector(".mission-item__progress-row em");

    if (progressBar) {
      progressBar.style.width = "100%";
    }

    if (progressCount) {
      progressCount.textContent = "1 / 1";
    }

    actionEl.replaceWith(createDoneState());

    const itemIndex = Array.from(missionList.children).indexOf(item);
    if (ingredientChips[itemIndex]) {
      ingredientChips[itemIndex].classList.add("ingredient-chip--done");
    }

    updateAllCompleteState();
  }

  function updateAllCompleteState() {
    const hasPending = missionList.querySelector(".mission-item__state--link");
    if (hasPending) {
      return;
    }

    missionRoot.classList.add("mission--all-done");

    ingredientChips.forEach(function (chip) {
      chip.classList.add("ingredient-chip--done");
    });

    if (missionComplete) {
      missionComplete.hidden = false;
    }

    const missionScroll = document.querySelector(".mission-scroll");
    if (missionScroll) {
      missionScroll.scrollTop = 0;
    }

    if (bakeButton) {
      bakeButton.hidden = false;
    }
  }

  if (bakeButton) {
    bakeButton.addEventListener("click", function () {
      window.location.href = "./cooking.html";
    });
  }

  missionList.addEventListener("click", function (event) {
    const actionEl = event.target.closest(".mission-item__state--link");
    if (!actionEl) {
      return;
    }

    event.preventDefault();
    const item = actionEl.closest(".mission-item");
    if (!item) {
      return;
    }

    completeMissionItem(item, actionEl);
  });
})();
