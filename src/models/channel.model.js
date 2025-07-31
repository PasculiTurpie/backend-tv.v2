const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema(
  {
    nameChannel: {
      type: String,
      required: true,
      tirm: true,
    },
    numberChannelSur: {
      type: Number,
      required: true,
      tirm: true,
    },
    numberChannelCn: {
      type: Number,
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
     nodes: [
      {
        id: String,
        type: String,
        position: {
          x: Number,
          y: Number,
        },
         data: {
           label: String,
           image:String,
        },
      },
    ],
    edges: [
      {
        id: String,
        source: String,
        target: String,
        sourceHandle: String,
        targetHandle: String,
        type: String,
        label: String,
      },
    ],
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
