const mongoose = require("mongoose");

const DcmSchema = new mongoose.Schema(
  {
    nombreDcm: {
      type: String,
      required: true,
      tirm: true,
    },
    urlDcm: {
      type: String,
      default: "https://i.ibb.co/xKZdK3mK/dcm.png",
      tirm: true,
    },
    ipGestion: {
      type: String,
      required: true,
      tirm: true,
    },
    interface: {
      type: String,
      required: true,
      tirm: true,
    },
    port: {
      type: String,
      required: true,
      tirm: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Dcm = mongoose.model("Dcm", DcmSchema);
module.exports = Dcm;
