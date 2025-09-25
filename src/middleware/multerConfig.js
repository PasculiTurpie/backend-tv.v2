// En multerConfig.js - agrega logs para debug
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(
      "Archivo recibido por multer:",
      file.originalname,
      file.mimetype
    );

    const allowedTypes = [".xlsx", ".xls"];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos Excel (.xlsx, .xls)"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = upload;
