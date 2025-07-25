const mongoose = require('mongoose')

const TitanSchema = new mongoose.Schema(
  {
    nombreTitan: {
      type: String,
      required: true,
      tirm: true,
    },
    urlTitan: {
      type: String,
      default: "https://i.ibb.co/zHmRSv8C/ateme-titan.png",
      tirm: true,
    },
    mcastIn: {
      type: String,
      required: true,
      tirm: true,
    },
    mcastOut: {
      type: String,
      required: true,
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

const Titan = mongoose.model('Titan', TitanSchema)
module.exports = Titan;