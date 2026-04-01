import { renderFeedPosts } from "./api.js";

export function setupWebSocket() {
  const socket = new WebSocket(`ws://${window.location.host}`);
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "newSession") {
      console.log(message);
      renderFeedPosts();
    }
  };
}
