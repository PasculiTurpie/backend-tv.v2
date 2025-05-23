const mongoose = require("mongoose");

const RtesVmxSchema = new mongoose.Schema(
  {
    nombreRtesVmx: {
      type: String,
      required: true,
    },
    urlRtes: {
      type: String,
      default: "https://i.ibb.co/sSnvD0G/vmx-encryptor.png",
    },
    mcastIn: {
      type: String,
      required: true,
    },
    mcastOut: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const RtesVmx = mongoose.model("RtesVmx", RtesVmxSchema);
module.exports = RtesVmx;
