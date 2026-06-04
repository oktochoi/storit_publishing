(function () {
  var answers = document.getElementById("quiz-answers");
  if (answers) {
    var buttons = answers.querySelectorAll(".quiz-answer");
    var progressFill = document.getElementById("quiz-progress-fill");
    var progressCurrent = document.getElementById("quiz-progress-current");
    var mascotImg = document.getElementById("quiz-mascot-img");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("quiz-answer--active");
        });
        btn.classList.add("quiz-answer--active");

        if (mascotImg) {
          mascotImg.src = STORIT.asset("images/quiz/mascot-selected.svg");
        }

        if (progressFill) progressFill.style.width = "100%";
        if (progressCurrent) progressCurrent.textContent = "5";

        window.setTimeout(function () {
          var isCorrect = btn.hasAttribute("data-correct");
          window.location.href = isCorrect
            ? STORIT.page("quiz/result.html")
            : STORIT.page("quiz/result-low.html");
        }, 500);
      });
    });
  }

  document.querySelectorAll(".quiz-eval-chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      document.querySelectorAll(".quiz-eval-chip").forEach(function (c) {
        c.classList.remove("quiz-eval-chip--active");
      });
      chip.classList.add("quiz-eval-chip--active");
    });
  });
})();
