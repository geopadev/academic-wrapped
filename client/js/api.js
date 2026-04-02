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
    
    const feedPost = document.createElement("feed-post");
    feedPost.setAttribute("avatar", post.avatar);
    feedPost.setAttribute("username", post.username);
    feedPost.setAttribute("action", post.action);
    feedPost.setAttribute("subject", post.subject);
    feedPost.setAttribute("duration", post.duration);
    feedPost.setAttribute("date", post.date);
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
