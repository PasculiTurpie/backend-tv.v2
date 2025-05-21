const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref:"TipoTech",
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

ChannelSchema.index({ nameChannel: 1, tipoTecnologia: 1 }, { unique: true });
const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;
