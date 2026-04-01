import express from "express";
import { getSessions, addSession } from "./sessions.mjs";
const app = express();

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
    res.json(req.body);
  } catch (error) {
    res.status(500).json("could not save sessions");
  }
});

app.listen(8080);
