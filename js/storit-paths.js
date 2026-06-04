/**
 * file:// 로 HTML을 열어도 assets·pages 경로가 동작하도록 프로젝트 루트를 계산합니다.
 * Live Server(http)에서도 동일하게 사용할 수 있습니다.
 */
(function (global) {
  function normalizeHref(href) {
    try {
      return decodeURI(href).replace(/\\/g, "/");
    } catch (e) {
      return href.replace(/\\/g, "/");
    }
  }

  function projectRoot() {
    var href = normalizeHref(global.location.href);
    var pagesIdx = href.indexOf("/pages/");
    if (pagesIdx !== -1) {
      return href.slice(0, pagesIdx + 1);
    }
    var lastSlash = href.lastIndexOf("/");
    return lastSlash >= 0 ? href.slice(0, lastSlash + 1) : href;
  }

  var root = projectRoot();

  function stripLeading(path, prefix) {
    if (path.charAt(0) === "/") path = path.slice(1);
    if (path.indexOf(prefix) === 0) path = path.slice(prefix.length);
    return path;
  }

  global.STORIT = {
    root: root,
    asset: function asset(path) {
      return root + "assets/" + stripLeading(path, "assets/");
    },
    page: function page(path) {
      return root + "pages/" + stripLeading(path, "pages/");
    },
  };
})(window);
