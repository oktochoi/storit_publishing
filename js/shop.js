(function () {
  var cats = document.querySelectorAll(".shop-cat");
  var catIcons = {
    all: { active: STORIT.asset("images/shop/cat-all-fill.svg"), default: STORIT.asset("images/shop/cat-all-fill.svg") },
    coupon: {
      active: STORIT.asset("images/shop/cat-coupon-fill.svg"),
      default: STORIT.asset("images/shop/cat-coupon-outline.svg"),
    },
    store: {
      active: STORIT.asset("images/shop/cat-store-outline.svg"),
      default: STORIT.asset("images/shop/cat-store-outline.svg"),
    },
    cafe: {
      active: STORIT.asset("images/shop/cat-cafe-fill.svg"),
      default: STORIT.asset("images/shop/cat-cafe-outline.svg"),
    },
    food: {
      active: STORIT.asset("images/shop/cat-food-fill.svg"),
      default: STORIT.asset("images/shop/cat-food-outline.svg"),
    },
    etc: {
      active: STORIT.asset("images/shop/cat-more-fill.svg"),
      default: STORIT.asset("images/shop/cat-more-outline.svg"),
    },
  };

  cats.forEach(function (btn) {
    btn.addEventListener("click", function () {
      cats.forEach(function (other) {
        other.classList.remove("shop-cat--active");
        var key = other.getAttribute("data-cat");
        var img = other.querySelector("img");
        if (img && catIcons[key]) {
          img.src = catIcons[key].default;
        }
      });
      btn.classList.add("shop-cat--active");
      var activeKey = btn.getAttribute("data-cat");
      var activeImg = btn.querySelector("img");
      if (activeImg && catIcons[activeKey]) {
        activeImg.src = catIcons[activeKey].active;
      }
    });
  });
})();
