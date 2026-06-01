(function () {
  var grid = document.querySelector(".attendance-grid");
  if (!grid) {
    return;
  }

  var year = 2025;
  var month = 4;
  var checkedUntil = 11;
  var today = 12;

  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();

  function numClass(day) {
    var date = new Date(year, month, day);
    var weekday = date.getDay();
    var classes = ["attendance-day__num"];

    if (day === today) {
      classes.push("attendance-day__num--today");
    } else if (day <= checkedUntil) {
      classes.push("attendance-day__num--checked");
    } else if (weekday === 0) {
      classes.push("attendance-day__num--sun");
    } else if (weekday === 6) {
      classes.push("attendance-day__num--sat");
    } else {
      classes.push("attendance-day__num--future");
    }

    return classes.join(" ");
  }

  function stampSrc(day) {
    return day <= checkedUntil
      ? "/assets/images/attendance/stamp-checked.svg"
      : "/assets/images/attendance/stamp-empty.svg";
  }

  for (var i = 0; i < firstDay; i += 1) {
    var blank = document.createElement("div");
    blank.className = "attendance-day attendance-day--blank";
    blank.setAttribute("aria-hidden", "true");
    blank.innerHTML = '<span class="attendance-day__num" aria-hidden="true"></span><span class="attendance-day__stamp" aria-hidden="true"></span>';
    grid.appendChild(blank);
  }

  for (var day = 1; day <= daysInMonth; day += 1) {
    var cell = document.createElement("div");
    cell.className = "attendance-day";

    var num = document.createElement("span");
    num.className = numClass(day);
    num.textContent = String(day);

    var stamp = document.createElement("img");
    stamp.className = "attendance-day__stamp";
    stamp.src = stampSrc(day);
    stamp.alt = day <= checkedUntil ? "출석 완료" : "";

    cell.appendChild(num);
    cell.appendChild(stamp);
    grid.appendChild(cell);
  }

  var checkBtn = document.querySelector(".attendance-check-btn");
  if (checkBtn) {
    checkBtn.addEventListener("click", function () {
      if (checkBtn.disabled) {
        return;
      }
      checkBtn.disabled = true;
      checkBtn.classList.add("attendance-check-btn--done");
    });
  }
})();
