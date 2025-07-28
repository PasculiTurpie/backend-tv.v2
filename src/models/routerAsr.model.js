const mongoose = require("mongoose");

const RouterAsrSchema = new mongoose.Schema(
  {
    nombreRouterAsr: {
      type: String,
      required: true,
      trim: true,
    },
    urlRouterAsr: {
      type: String,
      default: "https://i.ibb.co/TxRKYM3X/router.png",
      trim: true,
    },
    mcastIn: {
      type: String,
      required: true,
      trim: true,
    },
    unicastMcast: {
      type: String,
      required: true,
      trim: true,
    },
    port: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const RouterAsr = mongoose.model("RouterAsr", RouterAsrSchema);
module.exports = RouterAsr;
