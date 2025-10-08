// packages/express-backend/backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

// Parse JSON bodies
app.use(cors());
app.use(express.json());

// ---- In-memory data ----
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac",     job: "Bouncer" },
    { id: "ppp222", name: "Mac",     job: "Professor" },
    { id: "yat999", name: "Dee",     job: "Aspring actress" },
    { id: "zap555", name: "Dennis",  job: "Bartender" }
  ]
};

// ---- Helpers ----
const findUserByName = (name) =>
  users["users_list"].filter((user) => user["name"] === name);

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUsersByNameAndJob = (name, job) =>
  users["users_list"].filter(
    (u) => u["name"] === name && u["job"] === job
  );

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  const idx = users["users_list"].findIndex((u) => u["id"] === id);
  if (idx === -1) return false;
  users["users_list"].splice(idx, 1);
  return true;
};

const genId = () =>
  Math.random().toString(36).slice(2, 8) + Math.random().toString(36).slice(2, 8);

// ---- Routes ----
app.get("/", (req, res) => {
  res.send("Hello from nodemon 🚀");
});

// GET /users (supports: ?name= and ?name=&job=)
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name !== undefined && job !== undefined) {
    const result = { users_list: findUsersByNameAndJob(name, job) };
    res.send(result);
  } else if (name !== undefined) {
    const result = { users_list: findUserByName(name) };
    res.send(result);
  } else {
    res.send(users);
  }
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// POST /users
app.post("/users", (req, res) => {
  const userToAdd = { ...req.body, id: genId() };
  addUser(userToAdd);
  res.status(201).send(userToAdd); // Created
});

// DELETE /users/:id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const ok = deleteUserById(id);
  if (!ok) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send(); // No Content
  }
});

// ---- Server ----
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

