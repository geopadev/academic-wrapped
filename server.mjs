import express from "express";
import { readFile, writeFile } from "fs/promises";
const app = express();

app.use(express.static("client"));
app.use(express.json());

app.get("/api/sessions", async (req, res) => {
  try {
    const sessionData = await readFile("data.json", "utf-8");
    const sessions = JSON.parse(sessionData);
    res.json(sessions);
  } catch (error) {
    res.status(500).json("could not load sessions");
  }
});
app.post("/api/sessions", async (req, res) => {
  try {
    const sessionData = await readFile("data.json", "utf-8");
    const sessions = JSON.parse(sessionData);
    sessions.push(req.body);
    await writeFile("data.json", JSON.stringify(sessions, null, 2));
    res.json(req.body);
  } catch (error) {
    res.status(500).json("could not save sessions");
  }
});

app.listen(8080);
