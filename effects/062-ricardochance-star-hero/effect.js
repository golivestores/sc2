(() => {
  const params = new URLSearchParams(location.search);
  const preview = params.get("demo") === "preview";
  const capture = params.get("demo") === "capture";

  if (preview) {
    document.documentElement.classList.add("demo-preview");
    history.scrollRestoration = "manual";
    scrollTo(0, 0);
    const poster = document.createElement("div");
    poster.dataset.demoOnly = "hero-poster";
    poster.setAttribute("aria-hidden", "true");
    document.body.append(poster);
  }

  if (capture) {
    document.documentElement.classList.add("demo-capture");
  }

  const blockNavigation = (event) => {
    const target = event.target.closest("a, button");
    if (!target || target.closest("#sc2-overlay")) return;
    event.preventDefault();
  };

  document.addEventListener("click", blockNavigation, true);
  document.documentElement.dataset.effectReady = "true";
})();
