const mongoose = require("mongoose");

const SchemaEquipos = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      tirm: true,
    },
    marca: {
      type: String,
      required: true,
      tirm: true,
    },
    modelo: {
      type: String,
      required: true,
      tirm: true,
    },
    tipoNombre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TipoEquipo",
      required: true,
      tirm: true,
    },
    ip_gestion: {
      type: String,
      unique: true,
      sparse: true,
      tirm: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Equipo = mongoose.model("Equipo", SchemaEquipos);
module.exports = Equipo;
