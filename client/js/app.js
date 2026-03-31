import { setupNavigation, showView } from "./navigation.js";
import { renderFeedPosts, postSession } from "./api.js";
import { setOnSessionComplete, setupTimer } from "./timer.js";

setupNavigation();
setupTimer();
setOnSessionComplete(postSession);
showView("view-home");
renderFeedPosts();

