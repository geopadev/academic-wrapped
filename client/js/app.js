import { setupNavigation, showView } from "./navigation.js";
import { renderFeedPosts, postSession } from "./api.js";
import { setOnSessionComplete, setupTimer } from "./timer.js";
import { setupWebSocket } from "./ws.js";
import { registerServiceWorker } from "./sw-register.js";
import { setupAuth, setupLogout } from "./auth.js";
import { hideElement, showElement } from "./utils.js";

registerServiceWorker();

const user = JSON.parse(localStorage.getItem("user"));
const bottomNav = document.getElementById("bottom-nav");
if (user !== null) {
  showView("view-home");
  showElement(bottomNav, "view--hidden");
  setupNavigation();
  setupTimer();
  setOnSessionComplete(postSession);
  setupLogout();

  setupWebSocket();
  renderFeedPosts();
} else {
  showView("view-auth");

  setupAuth(() => {
    showView("view-home");
    setupNavigation();
    setupTimer();
    setOnSessionComplete(postSession);
    setupWebSocket();
    renderFeedPosts();
    setupLogout();
    showElement(bottomNav, "view--hidden");
  });
}
