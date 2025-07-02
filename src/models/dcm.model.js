const mongoose = require("mongoose");

const DcmSchema = new mongoose.Schema(
  {
    nombreDcm: {
      type: String,
      required: true,
    },
    urlDcm: {
      type: String,
      default: "https://i.ibb.co/xKZdK3mK/dcm.png",
    },
    ipGestion: {
      type: String,
      required: true,
    },
    port: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Dcm = mongoose.model("Dcm", DcmSchema);
module.exports = Dcm;
