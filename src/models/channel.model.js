const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
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
    tipoTecnologia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TipoTech",
      tirm: true,
    },
    contact: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
        tirm: true,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

ChannelSchema.index({ nameChannel: 1, tipoTecnologia: 1 }, { unique: true });
const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;
