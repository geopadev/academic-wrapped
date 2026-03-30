import express from "express";

const app = express();

const feedPosts = [
  {
    avatar: "url",
    username: "John Doe",
    action: "completed a pomodoro session",
    subject: "maths",
    duration: 25,
    date: "2023-10-10T14:30:00Z",
  },

  {
    avatar: "url",
    username: "Jane Smith",
    action: "started a flowtime session",
    subject: "history",
    duration: 45,
    date: "2023-10-11T14:30:00Z",
  },

  {
    avatar: "url",
    username: "Alice Johnson",
    action: "completed a feynman session",
    subject: "physics",
    duration: 30,
    date: "2023-10-12T14:30:00Z",
  },
];

app.use(express.static("client"));
app.use(express.json());
app.get("/api/sessions", (req, res) => {
  res.json(feedPosts);
});
app.post("/api/sessions", (req, res) => {
  feedPosts.push(req.body);
  res.json(req.body);
});

app.listen(8080);
