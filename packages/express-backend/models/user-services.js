// packages/express-backend/models/user-services.js
import User from "./user.js";

// GET /users with optional filters: name, job, or both
export function getUsers(name, job) {
  if (!name && !job) return User.find();
  if (name && !job)  return findUserByName(name);
  if (job && !name)  return findUserByJob(job);
  // both name & job
  return User.find({ name, job });
}

export function findUserById(id) {
  return User.findById(id);
}

export function addUser(user) {
  const u = new User(user);
  return u.save(); // returns a Thenable (like a Promise)
}

export function findUserByName(name) {
  return User.find({ name });
}

export function findUserByJob(job) {
  return User.find({ job });
}

export function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}

