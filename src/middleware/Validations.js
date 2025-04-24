const { Joi, Segments } = require("celebrate");

const createSatelliteValidation = {
  [Segments.BODY]: Joi.object().keys({
    satelliteName: Joi.string().min(3).required(),
    satelliteType: Joi.string().length(24).required(), // ID de Mongo
    urlImagen: Joi.string().uri().optional(),
    satelliteUrl: Joi.string().uri().optional(),
  }),
};

const updateSatelliteValidation = {
  [Segments.BODY]: Joi.object().keys({
    satelliteName: Joi.string().min(3).optional(),
    satelliteType: Joi.string().length(24).optional(),
    urlImagen: Joi.string().uri().optional(),
    satelliteUrl: Joi.string().uri().optional(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().length(24).required(),
  }),
};

module.exports = {
  createSatelliteValidation,
  updateSatelliteValidation,
};
