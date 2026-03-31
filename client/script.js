const views = document.querySelectorAll(".view");
const navLinks = document.querySelectorAll(".bottom-nav__link");
const timerModal = document.querySelector(".timer-modal");
const ctaButton = document.querySelector(".bottom-nav__cta-button");
const timerModalBackdrop = document.querySelector(".timer-modal__backdrop");
const timerModalStart = document.querySelector(".timer-modal__start");
const timerModalForm = document.querySelector(".timer-modal__form");
const siteHeaderCountdown = document.querySelector(".site-header__countdown");
const siteHeaderTitle = document.querySelector(".site-header__title");
const activityFeed = document.querySelector(".activity-feed");
const activityFeedError = document.querySelector(".activity-feed__error");

let timeRemaining = 0;
let intervalId = null;
let currentPhase = "work";
let completedSessions = 0;
let isTimerRunning = false;
let subject = "";

const DURATIONS = {
  pomodoro: 1500,
  flowtime: null,
  feynman: null,
};

const BREAKS = {
  pomodoro: { short: 300, long: 900 },
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

function showElement(el, className) {
  el.classList.remove(className);
}

function hideElement(el, className) {
  el.classList.add(className);
}

function startPomodoro(selectedSubject) {
  subject = selectedSubject;
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
          postSession();
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

async function renderFeedPosts() {
  const response = await fetch("/api/sessions");

  if (!response.ok) {
    activityFeedError.textContent = "COULD NOT LOAD FEED POSTS!";
    showElement(activityFeedError, "activity-feed__error--hidden");
    hideElement(activityFeed, "activity-feed--hidden");
    return;
  }

  const data = await response.json();

  for (const post of data) {
    const feedPost = document.createElement("article");
    feedPost.classList.add("activity-feed__post");

    const feedPostAvatar = document.createElement("img");
    feedPostAvatar.classList.add("activity-feed__post-avatar");
    feedPostAvatar.setAttribute("src", post.avatar);

    const feedPostName = document.createElement("p");
    feedPostName.classList.add("activity-feed__post-name");
    const feedPostUsername = document.createElement("strong");
    feedPostUsername.textContent = post.username;

    const feedPostAction = document.createElement("p");
    feedPostAction.classList.add("activity-feed__post-action");
    feedPostAction.textContent = post.action;

    const feedPostSubj = document.createElement("p");
    feedPostSubj.classList.add("activity-feed__post-subject");
    feedPostSubj.textContent = `Subject: ${post.subject}`;

    const feedPostDuration = document.createElement("p");
    feedPostDuration.classList.add("activity-feed__post-duration");
    feedPostDuration.textContent = `Duration: ${post.duration} minutes`;

    const feedPostTime = document.createElement("time");
    feedPostTime.classList.add("activity-feed__post-datetime");
    feedPostTime.setAttribute("datetime", post.date);
    feedPostTime.textContent = new Date(post.date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    feedPostName.appendChild(feedPostUsername);
    feedPost.append(
      feedPostAvatar,
      feedPostName,
      feedPostAction,
      feedPostSubj,
      feedPostDuration,
      feedPostTime,
    );

    activityFeed.appendChild(feedPost);
  }
}

function startFeynman() {
  console.log("feynman not yet implemented");
}

function startFlowtime() {
  console.log("flowtime not yet implemented");
}

async function postSession() {
  const newSession = {
    avatar: "url",
    username: "me",
    action: "completed a pomodoro session",
    subject: subject,
    duration: DURATIONS.pomodoro / 60,
    date: new Date().toISOString(),
  };

  await fetch("/api/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSession),
  });
}

showView("view-home");
renderFeedPosts();
