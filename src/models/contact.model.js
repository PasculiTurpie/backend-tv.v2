const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
  {
    nombreContact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    telefono: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = mongoose.model('Contact', ContactSchema)
module.exports = Contact;