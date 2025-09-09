const mongoose = require("mongoose");

const SchemaEquipos = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    marca: {
      type: String,
      required: true,
      trim: true,
    },
    modelo: {
      type: String,
      required: true,
      trim: true,
    },
    tipoNombre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TipoEquipo",
      required: true,
      trim: true,
    },
    ip_gestion: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    satelliteRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Satellite",
      required: false,
    },
    irdRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ird",
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Equipo = mongoose.model("Equipo", SchemaEquipos);
module.exports = Equipo;
