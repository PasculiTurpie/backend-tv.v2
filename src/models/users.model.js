const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      tirm: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      tirm: true,
    },
    profilePicture: {
      type: String,
      default: "https://i.ibb.co/GQzZ3wBJ/profile-default.png",
      tirm: true,
    },
    password: {
      type: String,
      required: true,
      tirm: true,
    },
    role: {
      type: String,
      default: "admin",
      tirm: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// 🔒 Middleware para encriptar antes de guardar
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // no volver a encriptar
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔒 Middleware para encriptar antes de actualizar
UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }

  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
