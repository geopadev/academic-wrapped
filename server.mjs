import express from "express";
import { getSessions, addSession } from "./sessions.mjs";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { addUser, getUserByUsername } from "./users.mjs";
import bcrypt from "bcrypt";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", () => {
  console.log("client connected, total:", wss.clients.size);
});

app.use(express.static("client"));
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    addUser({ username, email, password_hash });
    res.json({ username });
  } catch (error) {
    res.status(500).json("could not add user");
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = getUserByUsername(username);

    if (user === undefined) {
      res.status(401).json("unauthorized");
      return;
    }

    const passwordValidity = await bcrypt.compare(password, user.password_hash);

    if (!passwordValidity) {
      res.status(401).json("unauthorized");
      return;
    }
    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    res.status(401).json("could not find username");
  }
});

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

    for (const client of wss.clients) {
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
