const Joi = require('joi');

const createExperienceDetailSchema = Joi.object({
  experience_id: Joi.string().uuid().required(),
  detail:        Joi.string().required(),
  sort_order:    Joi.number().integer().optional(),
});

const updateExperienceDetailSchema = Joi.object({
  detail:     Joi.string(),
  sort_order: Joi.number().integer(),
}).min(1);

module.exports = { createExperienceDetailSchema, updateExperienceDetailSchema };
