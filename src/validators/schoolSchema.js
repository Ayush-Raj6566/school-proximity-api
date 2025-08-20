import Joi from "joi";

export const schoolBodySchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  address: Joi.string().trim().min(1).max(255).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

export const coordsQuerySchema = Joi.object({
  lat: Joi.number().min(-90).max(90).required(),
  lon: Joi.number().min(-180).max(180).required(),
});
