const mongoose = require('mongoose')

const TitanSchema = new mongoose.Schema(
  {
    nombreTitan: {
      type: String,
      required: true,
      trim: true,
    },
    urlTitan: {
      type: String,
      default: "https://i.ibb.co/zHmRSv8C/ateme-titan.png",
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
    ipGestion: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Titan = mongoose.model('Titan', TitanSchema)
module.exports = Titan;