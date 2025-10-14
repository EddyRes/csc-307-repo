// packages/express-backend/models/user.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    job: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2) throw new Error("Invalid job, must be at least 2 characters.");
      },
    },
  },
  { collection: "users_list" } // keep the same collection name as before
);

const User = mongoose.model("User", UserSchema);
export default User;

