function initWelcome2Page() {
  const nicknameEl = document.getElementById("welcome-nickname");
  const storedNickname = sessionStorage.getItem("storit-nickname");

  if (nicknameEl && storedNickname) {
    nicknameEl.textContent = storedNickname;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWelcome2Page);
} else {
  initWelcome2Page();
}
