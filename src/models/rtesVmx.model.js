const mongoose = require("mongoose");

const RtesVmxSchema = new mongoose.Schema(
  {
    nombreRtesVmx: {
      type: String,
      required: true,
      trim: true,
    },
    urlRtes: {
      type: String,
      default: "https://i.ibb.co/sSnvD0G/vmx-encryptor.png",
      trim: true,
    },
    mcastIn: {
      type: String,
      required: true,
      trim: true,
    },
    mcastOut: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const RtesVmx = mongoose.model("RtesVmx", RtesVmxSchema);
module.exports = RtesVmx;
