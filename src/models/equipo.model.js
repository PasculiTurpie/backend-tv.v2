const mongoose = require("mongoose");

const SchemaEquipos = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    marca: {
      type: String,
      required: true,
    },
    modelo: {
      type: String,
      required: true,
    },
    tipoNombre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TipoEquipo",
      required: true,
    },
    ip_gestion: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Equipo = mongoose.model("Equipo", SchemaEquipos);
module.exports = Equipo;
