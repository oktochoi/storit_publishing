(function () {
  document.querySelectorAll("[data-ranking-next]").forEach(function (screen) {
    var nextUrl = screen.getAttribute("data-ranking-next");
    if (!nextUrl) return;

    screen.addEventListener("click", function (event) {
      if (event.target.closest("a[href]")) return;
      window.location.href = nextUrl;
    });

    screen.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("a[href]")) return;
      event.preventDefault();
      window.location.href = nextUrl;
    });
  });
})();
