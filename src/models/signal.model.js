const mongoose = require('mongoose')

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
    equipos: [
      {
        _id: false,
        satelite: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Satellite",
        },
        _id: false,
        decoderIrd: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ird",
        },
        _id: false,
        conmutador: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Conmutador",
        },
        _id: false,
        encoderTitan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Titan",
        },
        _id: false,
        dcm: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dcm",
        },
        _id: false,
        dcmVmx: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DcmVmx",
        },
        _id: false,
        rtesVmx: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RtesVmx",
        },
        _id: false,
        routerAsr: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RouterAsr",
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Signal = mongoose.model('Signal', SignalSchema)
module.exports = Signal;