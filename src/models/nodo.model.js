const mongoose = require('mongoose')

const NodeSchema = new mongoose.Schema({
  idChannel: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Channel',
    required:true,
  },
  type: {
    type: String,
    required: true,
    default: "image",
  },
  position: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
}, { timestamps: true, versionKey: false });

const Nodo = mongoose.model('Nodo', NodeSchema)
module.exports = Nodo;
