import { setupNavigation, showView } from "./navigation.js";
import { renderFeedPosts, postSession } from "./api.js";
import { setOnSessionComplete, setupTimer } from "./timer.js";
import { setupWebSocket } from "./ws.js";
import { registerServiceWorker } from "./sw-register.js";
import { setupAuth } from "./auth.js";

registerServiceWorker();

const user = JSON.parse(localStorage.getItem("user"));

if (user !== null) {
  showView("view-home");
  setupNavigation();
  setupTimer();
  setOnSessionComplete(postSession);

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
  });
}
