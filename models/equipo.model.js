const mongoose = require("mongoose");

const EquipoSchema = new mongoose.Schema(
  {
    nombreEquipment: {
      type: String,
      required: true,
    },
    typeEquipment:{
      type: String,
      required: true,
    },
    ipEquipment: {
      type: String,
    },
    description: {
      type: String,
    },
    urlImagen: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Equipo = mongoose.model("Equipo", EquipoSchema);
module.exports = Equipo;
