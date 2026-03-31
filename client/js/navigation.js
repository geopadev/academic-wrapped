const views = document.querySelectorAll(".view");
const navLinks = document.querySelectorAll(".bottom-nav__link");

export function showView(viewId) {
  for (const view of views) {
    view.classList.add("view--hidden");
  }
  const targetView = document.getElementById(viewId);
  targetView.classList.remove("view--hidden");
}

export function setupNavigation() {
  for (const navLink of navLinks) {
    navLink.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = navLink.dataset.target;
      showView(targetId);
      for (const navHighlight of navLinks) {
        navHighlight.parentElement.classList.remove("bottom-nav__item--active");
      }
      navLink.parentElement.classList.add("bottom-nav__item--active");
    });
  }
}
