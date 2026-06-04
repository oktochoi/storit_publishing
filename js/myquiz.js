(function () {
  /* 목록 필터 */
  var filters = document.querySelectorAll(".myquiz-filter");
  var cards = document.querySelectorAll(".myquiz-card[data-status]");

  if (filters.length && cards.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");

        filters.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("myquiz-filter--active", active);
          b.setAttribute("aria-selected", active ? "true" : "false");
        });

        cards.forEach(function (card) {
          var status = card.getAttribute("data-status");
          card.hidden = filter !== "all" && filter !== status;
        });
      });
    });
  }

  /* 상세 상태 */
  var params = new URLSearchParams(window.location.search);
  var status = params.get("status");
  if (status && document.body) {
    var allowed = { approved: true, review: true, rejected: true };
    if (!allowed[status]) status = "approved";
    document.body.setAttribute("data-status", status);

    var label = document.querySelector("[data-status-label]");
    if (label) {
      label.className = "myquiz-status-pill myquiz-status-pill--" + status;
      if (status === "approved") label.textContent = "승인완료";
      else if (status === "review") label.textContent = "심사중";
      else label.textContent = "반려";
    }
  }

  /* 퀴즈 만들기 */
  var createRoot = document.getElementById("myquiz-create");
  if (!createRoot) return;

  var modalExit = document.getElementById("modal-exit");
  var backBtn = document.getElementById("create-back");
  var submitBtn = document.getElementById("submit-quiz");
  var questionInput = document.getElementById("quiz-question");
  var answerInputs = createRoot.querySelectorAll(".myquiz-answers input");
  var dirty = false;

  function openModal() {
    if (!modalExit) return;
    modalExit.hidden = false;
  }

  function closeModal() {
    if (!modalExit) return;
    modalExit.hidden = true;
  }

  function markDirty() {
    dirty = true;
  }

  function hasContent() {
    if (questionInput && questionInput.value.trim()) return true;
    for (var i = 0; i < answerInputs.length; i++) {
      if (answerInputs[i].value.trim()) return true;
    }
    return dirty;
  }

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      if (hasContent()) openModal();
      else window.location.href = STORIT.page("myquiz/index.html");
    });
  }

  createRoot.querySelectorAll("[data-modal-close]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.tagName === "A") return;
      e.preventDefault();
      closeModal();
    });
  });

  if (questionInput) questionInput.addEventListener("input", markDirty);
  answerInputs.forEach(function (input) {
    input.addEventListener("input", markDirty);
  });

  /* 웹툰 선택 */
  var webtoons = createRoot.querySelectorAll(".myquiz-webtoon:not(.myquiz-webtoon--dim)");
  webtoons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      webtoons.forEach(function (b) {
        b.classList.remove("myquiz-webtoon--active");
      });
      btn.classList.add("myquiz-webtoon--active");
      markDirty();
    });
  });

  /* 회차 선택 */
  var episodes = createRoot.querySelectorAll(".myquiz-episode:not([disabled])");
  episodes.forEach(function (btn) {
    btn.addEventListener("click", function () {
      episodes.forEach(function (b) {
        b.classList.remove("myquiz-episode--active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("myquiz-episode--active");
      btn.setAttribute("aria-selected", "true");
      markDirty();
    });
  });

  /* 정답 행 선택 */
  var answerRows = createRoot.querySelectorAll(".myquiz-answer-row--editable");
  answerRows.forEach(function (row) {
    row.addEventListener("click", function (e) {
      if (e.target.tagName === "INPUT") return;
      answerRows.forEach(function (r) {
        r.classList.remove("is-correct");
      });
      row.classList.add("is-correct");
      markDirty();
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      window.location.href = STORIT.page("myquiz/complete.html");
    });
  }

  if (params.get("exit") === "1") openModal();
})();
