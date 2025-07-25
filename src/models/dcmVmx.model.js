const mongoose = require("mongoose");

const DcmVmxSchema = new mongoose.Schema(
  {
    nombreDcmVmx: {
      type: String,
      required: true,
      tirm: true,
    },
    urlDcmVmx: {
      type: String,
      default: "https://i.ibb.co/sSnvD0G/vmx-encryptor.png",
      tirm: true,
    },
    ipGestion: {
      type: String,
      required: true,
      tirm: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const DcmVmx = mongoose.model("DcmVmx", DcmVmxSchema);
module.exports = DcmVmx;
