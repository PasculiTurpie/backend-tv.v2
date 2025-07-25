const mongoose = require("mongoose");

const RouterAsrSchema = new mongoose.Schema(
  {
    nombreRouterAsr: {
      type: String,
      required: true,
      tirm: true,
    },
    urlRouterAsr: {
      type: String,
      default: "https://i.ibb.co/TxRKYM3X/router.png",
      tirm: true,
    },
    mcastIn: {
      type: String,
      required: true,
      tirm: true,
    },
    unicastMcast: {
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

const RouterAsr = mongoose.model("RouterAsr", RouterAsrSchema);
module.exports = RouterAsr;
