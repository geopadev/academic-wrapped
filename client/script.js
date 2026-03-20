const views = document.querySelectorAll(".view");
const navLinks = document.querySelectorAll(".bottom-nav__link");
const timerModal = document.querySelector(".timer-modal");
const ctaButton = document.querySelector(".bottom-nav__cta-button");
const timerModalBackdrop = document.querySelector(".timer-modal__backdrop");

function showView(viewId) {
  for (const view of views) {
    view.classList.add("view--hidden");
  }
  const targetView = document.getElementById(viewId);
  targetView.classList.remove("view--hidden");
}

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

ctaButton.addEventListener("click", (event) => {
  timerModal.classList.remove("timer-modal--hidden");
});

timerModalBackdrop.addEventListener("click", (event) => {
  timerModal.classList.add("timer-modal--hidden");
});

showView("view-home");
