const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    nombreContact: {
      type: String,
      unique: true,
      required: true,
      set: v => v === "" ? undefined : v,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      set: v => v === "" ? undefined : v,
    },
    telefono: {
      type: String,
      unique: true,
      sparse: true,
      set: v => v === "" ? undefined : v,
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
