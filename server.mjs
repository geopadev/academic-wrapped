import express from "express";
import { getSessions, addSession } from "./sessions.mjs";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });
wss.on("connection", () => {
  console.log("client connected, total:", wss.clients.size);
});

app.use(express.static("client"));
app.use(express.json());

app.get("/api/sessions", (req, res) => {
  try {
    res.json(getSessions());
  } catch (error) {
    res.status(500).json("could not load sessions");
  }
});
app.post("/api/sessions", (req, res) => {
  try {
    addSession(req.body);
    console.log("POST received");
    for (const client of wss.clients) {
      console.log("readyState:", client.readyState, "OPEN:", WebSocket.OPEN);
      if (client.readyState === WebSocket.OPEN) {
        console.log("broadcasting to", wss.clients.size, "clients");
        client.send(JSON.stringify({ type: "newSession", data: req.body }));
      }
    }
    res.json(req.body);
  } catch (error) {
    res.status(500).json("could not save sessions");
  }
});

server.listen(8080);
