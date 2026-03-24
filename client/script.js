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
let currentPhase = "work";
let completedSessions = 0;

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

  switch (checkedRadio) {
    case "pomodoro":
      startPomodoro();
      break;
    case "flowtime":
      startFlowtime();
      break;
    case "feynman":
      startFeynman();
      break;
    default:
      console.log(`unknown technique ${checkedRadio}`);
  }
});

function showElement(el, className) {
  el.classList.remove(className);
}

function hideElement(el, className) {
  el.classList.add(className);
}

function startPomodoro() {
  timeRemaining = DURATIONS.pomodoro;
  hideElement(timerModalForm, "timer-modal__form--hidden");
  showElement(timerModalCountdown, "timer-modal__countdown--hidden");
  intervalId = setInterval(() => {
    timeRemaining--;
    timerModalCountdown.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}



showView("view-home");
