const mongoose = require("mongoose");

const SignalSchema = new mongoose.Schema(
  {
    nameChannel: {
      type: String,
      required: true,
      tirm: true,
    },
    numberChannelSur: {
      type: String,
      required: true,
      tirm: true,
    },
    numberChannelCn: {
      type: String,
      required: true,
      tirm: true,
    },
    logoChannel: {
      type: String,
      required: true,
      tirm: true,
    },
    severidadChannel: {
      type: String,
      required: true,
      tirm: true,
    },
    tipoServicio: {
      type: String,
      required: true,
      tirm: true,
    },
    tipoTecnologia: {
      type: String,
      required: true,
      tirm: true,
    },
    source: {
      type: String,
      tirm: true,
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
