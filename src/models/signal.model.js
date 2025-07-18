const mongoose = require("mongoose");

const SignalSchema = new mongoose.Schema(
  {
    nameChannel: {
      type: String,
      required: true,
    },
    numberChannelSur: {
      type: String,
      required: true,
    },
    numberChannelCn: {
      type: String,
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
    tipoTecnologia: {
      type: String,
      required: true,
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

const Signal = mongoose.model("Signal", SignalSchema);
module.exports = Signal;
