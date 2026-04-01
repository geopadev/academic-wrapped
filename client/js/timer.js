import { showElement, hideElement } from "./utils.js";

let onSessionComplete = null;

export const DURATIONS = {
  pomodoro: 1500,
  flowtime: null,
  feynman: null,
};

export const BREAKS = {
  pomodoro: { short: 300, long: 900 },
};

let timeRemaining = 0;
let intervalId = null;
let currentPhase = "work";
let completedSessions = 0;
let isTimerRunning = false;
let subject = "";

const timerModal = document.querySelector(".timer-modal");
const ctaButton = document.querySelector(".bottom-nav__cta-button");
const siteHeaderCountdown = document.querySelector(".site-header__countdown");
const siteHeaderTitle = document.querySelector(".site-header__title");
const timerModalStart = document.querySelector(".timer-modal__start");
const timerModalBackdrop = document.querySelector(".timer-modal__backdrop");

export function setOnSessionComplete(callback) {
  onSessionComplete = callback;
}

export function startPomodoro(selectedSubject) {
  subject = selectedSubject;
  timeRemaining = DURATIONS.pomodoro;
  hideElement(timerModal, "timer-modal--hidden");
  hideElement(siteHeaderTitle, "site-header__title--hidden");
  showElement(siteHeaderCountdown, "site-header__countdown--hidden");
  ctaButton.textContent = "■";
  isTimerRunning = true;
  startTicking();
}

export function startTicking() {
  intervalId = setInterval(() => {
    timeRemaining--;
    siteHeaderCountdown.textContent = formatTime(timeRemaining);
    if (timeRemaining <= 0) {
      clearInterval(intervalId);

      switch (currentPhase) {
        case "work":
          completedSessions++;
          onSessionComplete?.();
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

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function playBeep() {
  const audioContext = new AudioContext();
  const sound = audioContext.createOscillator();
  sound.connect(audioContext.destination);
  sound.start();
  sound.stop(audioContext.currentTime + 0.3);
}

export function startFeynman() {
  console.log("feynman not yet implemented");
}

export function startFlowtime() {
  console.log("flowtime not yet implemented");
}

export function getSubject() {
  return subject;
}

export function setupTimer() {
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
  timerModalStart.addEventListener("click", (event) => {
    const checkedRadio = document.querySelector(
      'input[name="study-technique"]:checked',
    ).value;
    const subjectInput = document.querySelector("#subject-input").value;
    switch (checkedRadio) {
      case "pomodoro":
        startPomodoro(subjectInput);
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

  timerModalBackdrop.addEventListener("click", (event) => {
    timerModal.classList.add("timer-modal--hidden");
  });
}
