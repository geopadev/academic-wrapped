const views = document.querySelectorAll(".view");
const navLinks = document.querySelectorAll(".bottom-nav__link");
const timerModal = document.querySelector(".timer-modal");
const ctaButton = document.querySelector(".bottom-nav__cta-button");
const timerModalBackdrop = document.querySelector(".timer-modal__backdrop");
const timerModalCountdown = document.querySelector(".timer-modal__countdown");
const timerModalStart = document.querySelector(".timer-modal__start");
const timerModalForm = document.querySelector(".timer-modal__form");

let timeRemaining = 0;
let intervalId = null;

const DURATIONS = {
  pomodoro: 1500,
  flowtime: null,
  feynman: null,
};

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

timerModalStart.addEventListener("click", (event) => {
  const checkedRadio = document.querySelector(
    'input[name="study-technique"]:checked',
  ).value;
  timeRemaining = DURATIONS[checkedRadio];
});

showView("view-home");
