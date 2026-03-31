import { showElement, hideElement } from "./utils.js";
import { getSubject, DURATIONS } from "./timer.js";
const siteHeaderCountdown = document.querySelector(".site-header__countdown");
const activityFeed = document.querySelector(".activity-feed");
const activityFeedError = document.querySelector(".activity-feed__error");

export async function renderFeedPosts() {
  const response = await fetch("/api/sessions");

  if (!response.ok) {
    activityFeedError.textContent = "COULD NOT LOAD FEED POSTS!";
    showElement(activityFeedError, "activity-feed__error--hidden");
    hideElement(activityFeed, "activity-feed--hidden");
    return;
  }

  const data = await response.json();
  activityFeed.textContent = "";
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

export async function postSession() {
  const newSession = {
    avatar: "url",
    username: "me",
    action: "completed a pomodoro session",
    subject: getSubject(),
    duration: DURATIONS.pomodoro / 60,
    date: new Date().toISOString(),
  };

  const response = await fetch("/api/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSession),
  });

  if (!response.ok) {
    siteHeaderCountdown.textContent = "COULD NOT POST SESSION!";
    return;
  }
  renderFeedPosts();
}
