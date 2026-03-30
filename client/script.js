const views = document.querySelectorAll(".view");
const navLinks = document.querySelectorAll(".bottom-nav__link");
const timerModal = document.querySelector(".timer-modal");
const ctaButton = document.querySelector(".bottom-nav__cta-button");
const timerModalBackdrop = document.querySelector(".timer-modal__backdrop");
const timerModalStart = document.querySelector(".timer-modal__start");
const timerModalForm = document.querySelector(".timer-modal__form");
const siteHeaderCountdown = document.querySelector(".site-header__countdown");
const siteHeaderTitle = document.querySelector(".site-header__title");

let timeRemaining = 0;
let intervalId = null;
let currentPhase = "work";
let completedSessions = 0;
let isTimerRunning = false;

const DURATIONS = {
  pomodoro: 1500,
  flowtime: null,
  feynman: null,
};

const BREAKS = {
  pomodoro: { short: 300, long: 900 },
};

const feedPosts = [
  {
    avatar: "url",
    username: "John Doe",
    action: "completed a pomodoro session",
    subject: "maths",
    duration: 25,
    date: "2023-10-10T14:30:00Z",
  },

  {
    avatar: "url",
    username: "Jane Smith",
    action: "started a flowtime session",
    subject: "history",
    duration: 45,
    date: "2023-10-11T14:30:00Z",
  },

  {
    avatar: "url",
    username: "Alice Johnson",
    action: "completed a feynman session",
    subject: "physics",
    duration: 30,
    date: "2023-10-12T14:30:00Z",
  },
];

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
  if (isTimerRunning === true) {
    clearInterval(intervalId);
    timeRemaining = 0;
    currentPhase = "work";
    completedSessions = 0;

    isTimerRunning = false;
    showElement(siteHeaderTitle, "site-header__title--hidden");
    hideElement(siteHeaderCountdown, "site-header__countdown--hidden");
    ctaButton.textContent = "+";
  } else {
    timerModal.classList.remove("timer-modal--hidden");
  }
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
  hideElement(timerModal, "timer-modal--hidden");
  hideElement(siteHeaderTitle, "site-header__title--hidden");
  showElement(siteHeaderCountdown, "site-header__countdown--hidden");
  ctaButton.textContent = "■";
  isTimerRunning = true;
  startTicking();
}

function startTicking() {
  intervalId = setInterval(() => {
    timeRemaining--;
    siteHeaderCountdown.textContent = formatTime(timeRemaining);
    if (timeRemaining <= 0) {
      clearInterval(intervalId);

      switch (currentPhase) {
        case "work":
          completedSessions++;
          if (completedSessions % 4 === 0) {
            timeRemaining = BREAKS.pomodoro.long;
          } else {
            timeRemaining = BREAKS.pomodoro.short;
          }
          currentPhase = "break";
          playBeep();
          break;
        case "break":
          currentPhase = "work";
          playBeep();
          timeRemaining = DURATIONS.pomodoro;
          break;
      }
      startTicking();
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function playBeep() {
  const audioContext = new AudioContext();
  const sound = audioContext.createOscillator();
  sound.connect(audioContext.destination);
  sound.start();
  sound.stop(audioContext.currentTime + 0.3);
}

showView("view-home");
