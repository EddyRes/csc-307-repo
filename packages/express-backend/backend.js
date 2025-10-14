// packages/express-backend/backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import {
  getUsers,
  findUserById,
  addUser,
  deleteUserById,
} from "./models/user-services.js";

const app = express();
const port = 8000;

// Middleware
app.use(cors());            // allow FE <-> BE calls
app.use(express.json());    // parse JSON request bodies

// Connect to MongoDB
connectDB().catch((err) => {
  console.error("[db] connection error:", err);
  process.exit(1);
});

// Health check
app.get("/", (_req, res) => {
  res.send("API is up");
});

// GET /users  (?name=, ?job=, or both)
app.get("/users", (req, res) => {
  const { name, job } = req.query;
  getUsers(name, job)
    .then((docs) => res.send({ users_list: docs }))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  findUserById(id)
    .then((doc) => {
      if (!doc) return res.status(404).send("Resource not found.");
      res.send(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Invalid id");
    });
});

// POST /users  (returns 201 + created doc; Mongo generates _id)
app.post("/users", (req, res) => {
  addUser(req.body)
    .then((created) => res.status(201).send(created))
    .catch((err) => {
      console.error(err);
      res.status(400).send("Invalid user payload");
    });
});

// DELETE /users/:id  (204 on success, 404 if not found)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  deleteUserById(id)
    .then((deleted) => {
      if (!deleted) return res.status(404).send("Resource not found.");
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Invalid id");
    });
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

