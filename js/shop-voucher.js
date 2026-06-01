(function () {
  var copyBtn = document.getElementById("copy-barcode");
  var codeEl = document.querySelector(".shop-barcode-card__num");

  if (!copyBtn || !codeEl) {
    return;
  }

  copyBtn.addEventListener("click", function () {
    var text = codeEl.textContent.replace(/\s/g, "");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
  });
})();
