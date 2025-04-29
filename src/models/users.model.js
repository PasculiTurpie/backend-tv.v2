const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: "https://i.ibb.co/GQzZ3wBJ/profile-default.png",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default:'admin'
    }
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;