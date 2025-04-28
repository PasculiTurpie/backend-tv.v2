const mongoose = require("mongoose");

const IrdSchema = new mongoose.Schema(
  {
    ipAdminIrd: {
      type: String,
    },
    marcaIrd: {
      type: String,
    },
    modelIrd: {
      type: String,
    },
    versionIrd: {
      type: String,
    },
    uaIrd: {
      type: String,
    },
    tidReceptor: {
      type: String,
    },
    typeReceptor: {
      type: String,
    },
    feqReceptor: {
      type: String,
    },
    symbolRateIrd: {
      type: String,
    },
    fecReceptorIrd: {
      type: String,
    },
    modulationReceptorIrd: {
      type: String,
    },
    rellOfReceptor: {
      type: String,
    },
    nidReceptor: {
      type: String,
    },
    cvirtualReceptor: {
      type: String,
    },
    vctReceptor: {
      type: String,
    },
    outputReceptor: {
      type: String,
    },
    multicastReceptor: {
      type: String,
    },
    ipVideoMulticast: {
      type: String,
    },
    locationRow: {
      type: String,
    },
    locationCol: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Ird = mongoose.model("Ird", IrdSchema);
module.exports = Ird;
