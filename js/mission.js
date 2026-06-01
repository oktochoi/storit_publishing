(function () {
  const missionRoot = document.querySelector(".mission");
  const missionList = document.querySelector(".mission-list");
  const ingredientChips = document.querySelectorAll(".ingredient-chip");
  const bakeButton = document.querySelector(".mission-bake-btn");
  const missionComplete = document.querySelector(".mission-complete");

  if (!missionList) {
    return;
  }

  function completeMissionItem(item, actionEl) {
    const progressBar = item.querySelector(".mission-item__progress span");
    if (progressBar) {
      progressBar.style.width = "100%";
    }

    const doneState = document.createElement("div");
    doneState.className = "mission-item__state mission-item__state--done";
    doneState.innerHTML = "<small>기본 재료</small><strong>완료</strong>";
    actionEl.replaceWith(doneState);

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
