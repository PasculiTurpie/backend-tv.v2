const mongoose = require("mongoose");

const SatelliteSchema = new mongoose.Schema(
  {
    satelliteName: {
      type: String,
      required: true,
      tirm: true,
    },
    satelliteType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Polarization",
      require: true,
      tirm: true,
    },
    urlImagen: {
      type: String,
      default: "https://i.ibb.co/m5dxbBRh/parabolic.png",
      tirm: true,
    },
    satelliteUrl: {
      type: String,
      default: "https://www.lyngsat.com/",
      tirm: true,
    },
  },
  { timestamps: true, versionKey: false }
);

SatelliteSchema.index({ satelliteName: 1, satelliteType: 1 }, { unique: true });
const Satellite = mongoose.model("Satellite", SatelliteSchema);
module.exports = Satellite;
