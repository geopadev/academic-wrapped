import { setupNavigation, showView } from "./navigation.js";
import { renderFeedPosts, postSession } from "./api.js";
import { setOnSessionComplete, setupTimer } from "./timer.js";
import { setupWebSocket } from "./ws.js";
import { registerServiceWorker } from "./sw-register.js";

registerServiceWorker();

setupNavigation();
setupTimer();
setOnSessionComplete(postSession);
showView("view-home");
setupWebSocket();
renderFeedPosts();
