const mongoose = require("mongoose");

const SignalSchema = new mongoose.Schema(
  {
    nameChannel: {
      type: String,
      required: true,
    },
    numberChannelSur: {
      type: Number,
      required: true,
    },
    numberChannelCn: {
      type: Number,
      required: true,
    },
    logoChannel: {
      type: String,
      required: true,
    },
    severidadChannel: {
      type: String,
      required: true,
    },
    tipoServicio: {
      type: String,
      required: true,
    },
    tipoTecnologia: {
      type: String,
      required: true,
    },
    source: {
      type: String,
    },
    contact: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

// Índice combinado único
SignalSchema.index({ nameChannel: 1, tipoTecnologia: 1 }, { unique: true });

const Signal = mongoose.model("Signal", SignalSchema);
module.exports = Signal;
