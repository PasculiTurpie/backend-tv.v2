const mongoose = require('mongoose')


const TipoTechSchema = new mongoose.Schema(
  {
    nombreTipo: {
      type: String,
      require: true,
      unique: true,
      tirm: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const TipoTech = mongoose.model('TipoTech', TipoTechSchema);
module.exports = TipoTech;