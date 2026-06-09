(function () {
  function initInvite() {
    var inviteModal = document.getElementById("invite-modal");
    var closeBtn = document.getElementById("invite-close");
    var copyBtn = document.getElementById("invite-copy");
    var codeEl = document.getElementById("invite-code");
    var rewardOpen = document.getElementById("invite-reward-open");
    var rewardModal = document.getElementById("invite-reward-modal");

    var openInvite = function () {
      if (!inviteModal) return;
      inviteModal.classList.add("is-open");
      inviteModal.setAttribute("aria-hidden", "false");
    };

    var closeInvite = function () {
      if (!inviteModal) return;
      inviteModal.classList.remove("is-open");
      inviteModal.setAttribute("aria-hidden", "true");
      closeReward();
    };

    var openReward = function () {
      if (!rewardModal) return;
      rewardModal.classList.add("is-open");
      rewardModal.setAttribute("aria-hidden", "false");
    };

    var closeReward = function () {
      if (!rewardModal) return;
      rewardModal.classList.remove("is-open");
      rewardModal.setAttribute("aria-hidden", "true");
    };

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        if (document.body.classList.contains("invite-standalone")) {
          window.location.href = STORIT.page("main/index.html");
          return;
        }
        closeInvite();
      });
    }

    if (inviteModal) {
      var dim = inviteModal.querySelector(".invite-overlay__dim");
      if (dim) {
        dim.addEventListener("click", closeInvite);
      }
    }

    var toastEl = document.getElementById("invite-toast");
    var toastTimer;

    function showCopyToast() {
      if (!toastEl) return;
      toastEl.hidden = false;
      toastEl.classList.add("is-visible");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () {
        toastEl.classList.remove("is-visible");
        toastEl.hidden = true;
      }, 2000);
    }

    function copyInviteCode(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      return new Promise(function (resolve, reject) {
        var textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          document.body.removeChild(textarea);
        }
      });
    }

    if (copyBtn && codeEl) {
      copyBtn.addEventListener("click", function () {
        var text = codeEl.textContent.trim();
        copyInviteCode(text).then(showCopyToast).catch(showCopyToast);
      });
    }

    if (rewardOpen) {
      rewardOpen.addEventListener("click", openReward);
    }

    if (rewardModal) {
      rewardModal.querySelectorAll("[data-invite-reward-close]").forEach(function (el) {
        el.addEventListener("click", closeReward);
      });
    }

    document.querySelectorAll("[data-invite-open]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        openInvite();
      });
    });

    window.storitInvite = {
      open: openInvite,
      close: closeInvite,
      openReward: openReward,
      closeReward: closeReward,
    };

    var params = new URLSearchParams(window.location.search);
    if (params.get("invite") === "1") {
      openInvite();
    }
    if (params.get("reward") === "1") {
      openInvite();
      openReward();
    }

    return { openInvite: openInvite, closeInvite: closeInvite };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInvite);
  } else {
    initInvite();
  }
})();
