const mongoose = require("mongoose");

const IrdSchema = new mongoose.Schema(
  {
    urlIrd: {
      type: String,
      default:"https://i.ibb.co/pvW06r6K/ird-motorola.png"
    },
    ipAdminIrd: {
      type: String,
      tirm:true
    },
    marcaIrd: {
      type: String,
      tirm:true
    },
    modelIrd: {
      type: String,
      tirm:true
    },
    versionIrd: {
      type: String,
      tirm:true
    },
    uaIrd: {
      type: String,
      tirm:true
    },
    tidReceptor: {
      type: String,
      tirm:true
    },
    typeReceptor: {
      type: String,
      tirm:true
    },
    feqReceptor: {
      type: String,
      tirm:true
    },
    symbolRateIrd: {
      type: String,
      tirm:true
    },
    fecReceptorIrd: {
      type: String,
      tirm:true
    },
    modulationReceptorIrd: {
      type: String,
      tirm:true
    },
    rellOfReceptor: {
      type: String,
      tirm:true
    },
    nidReceptor: {
      type: String,
      tirm:true
    },
    cvirtualReceptor: {
      type: String,
      tirm:true
    },
    vctReceptor: {
      type: String,
      tirm:true
    },
    outputReceptor: {
      type: String,
      tirm:true
    },
    multicastReceptor: {
      type: String,
      tirm:true
    },
    ipVideoMulticast: {
      type: String,
      tirm:true
    },
    locationRow: {
      type: String,
      tirm:true
    },
    locationCol: {
      type: String,
      tirm:true
    },
  },
  { timestamps: true, versionKey: false }
);

const Ird = mongoose.model("Ird", IrdSchema);
module.exports = Ird;
