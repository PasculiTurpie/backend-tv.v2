const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    nombreContact: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    telefono: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
