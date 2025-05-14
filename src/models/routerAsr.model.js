const mongoose = require("mongoose");

const RouterAsrSchema = new mongoose.Schema(
  {
    nombreRouterAsr: {
      type: String,
      required: true,
    },
    urlRouterAsr: {
      type: String,
      default: "https://i.ibb.co/TxRKYM3X/router.png",
    },
    mcastIn: {
      type: String,
      required: true,
    },
    unicastMcast: {
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

const RouterAsr = mongoose.model("RouterAsr", RouterAsrSchema);
module.exports = RouterAsr;
