// controllers/equipo.controller.js
const mongoose = require("mongoose");
const Equipo = require("../models/equipo.model");
const TipoEquipo = require("../models/tipoEquipo"); // <-- asegúrate de la ruta correcta

// Nota: tu Schema de TipoEquipo usa "require: true" (typo). Debe ser "required: true".
// models/TipoEquipo.js => tipoNombre: { type: String, required: true, unique: true, trim: true }

module.exports.createEquipo = async (req, res) => {
  try {
    const p = req.body;

    // 1) Resolver tipoNombre -> ObjectId de TipoEquipo
    //    Acepta:
    //    - ObjectId (string válido)  ej: "66d...f91"
    //    - Nombre (string)           ej: "ird"
    //    - Si no viene, usa "ird" por defecto
    let tipoNombreId;
    const rawTipo = (p.tipoNombre || "ird").toString().trim();

    if (mongoose.Types.ObjectId.isValid(rawTipo)) {
      // ya viene como ObjectId
      tipoNombreId = rawTipo;
    } else {
      // viene como nombre: buscar o crear
      let tipo = await TipoEquipo.findOne({ tipoNombre: rawTipo });
      if (!tipo) {
        tipo = await TipoEquipo.create({ tipoNombre: rawTipo });
      }
      tipoNombreId = tipo._id;
    }

    // 2) Mapeo flexible de campos (acepta variantes desde el frontend)
    const doc = {
      nombre: p.nombre ?? p.nombreIrd ?? p.nombreEquipo,
      marca: p.marca ?? p.marcaIrd ?? p.marcaEquipo,
      modelo: p.modelo ?? p.modelIrd ?? p.modelEquipo,
      ip_gestion: p.ip_gestion ?? p.ipAdminIrd ?? p.ipAdminEquipo ?? null,
      tipoNombre: tipoNombreId,
      irdRef: p.irdRef || undefined, // opcional, por si lo guardas
    };

    // 3) Validación mínima (según tu Schema: nombre, marca, modelo, tipoNombre)
    const faltantes = [];
    if (!doc.nombre) faltantes.push("nombre");
    if (!doc.marca) faltantes.push("marca");
    if (!doc.modelo) faltantes.push("modelo");
    if (!doc.tipoNombre) faltantes.push("tipoNombre");

    if (faltantes.length) {
      return res.status(400).json({
        message: "Campos requeridos faltantes",
        missing: faltantes,
      });
    }

    // 4) Crear equipo
    const equipo = new Equipo(doc);
    await equipo.save();

    // 201 Created para recursos nuevos
    return res.status(201).json(equipo);
  } catch (error) {
    // Duplicidad (unique en nombre / ip_gestion)
    if (error?.code === 11000) {
      const campoEnConflicto = Object.keys(error.keyValue)[0];
      const valorEnConflicto = error.keyValue[campoEnConflicto];
      const mensaje = `Ya existe un equipo con ${campoEnConflicto}: '${valorEnConflicto}'.`;
      return res.status(409).json({ message: mensaje, detail: error.keyValue });
    }

    console.error("Error al crear equipo:", error);
    return res
      .status(500)
      .json({ message: "Error al crear equipo", detail: error?.message });
  }
};

module.exports.getEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.find()
      .populate("tipoNombre")
      .sort({ nombre: 1 });
    res.json(equipo);
  } catch (error) {
    res.send(404).json({ message: `Error al encontrar equipos` });
  }
};



module.exports.getIdEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de equipo inválido" });
    }
    const equipo = await Equipo.findById(id).populate("tipoNombre");
    if (!equipo) return res.status(404).json({ message: "Equipo no encontrado" });
    res.json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener equipo" });
  }
};


module.exports.updateEquipo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    const equipo = await Equipo.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("tipoNombre");

    if (!equipo) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    res.json(equipo);
  } catch (error) {
    console.error("Error al actualizar equipo:", error);
    res.status(500).json({ message: "Error al actualizar equipo" });
  }
};

module.exports.deleteEquipo = async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndDelete(req.params.id);
    if (!equipo)
      return res.status(404).json({ message: "Equipo no encontrado" });
    res.json({ message: "equipo eliminado de la base de datos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar equipo" });
  }
};
