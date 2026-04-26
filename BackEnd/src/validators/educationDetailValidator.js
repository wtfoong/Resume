const Joi = require('joi');

const createEducationDetailSchema = Joi.object({
  education_id: Joi.string().uuid().required(),
  detail:       Joi.string().required(),
  sort_order:   Joi.number().integer().optional(),
});

const updateEducationDetailSchema = Joi.object({
  detail:     Joi.string(),
  sort_order: Joi.number().integer(),
}).min(1);

module.exports = { createEducationDetailSchema, updateEducationDetailSchema };
