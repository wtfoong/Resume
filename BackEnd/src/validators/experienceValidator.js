const Joi = require('joi');

const createExperienceSchema = Joi.object({
  company:         Joi.string().max(150).required(),
  role:            Joi.string().max(150).required(),
  location:        Joi.string().max(100).optional().allow('', null),
  employment_type: Joi.string().max(50).optional().allow('', null),
  start_date:      Joi.date().required(),
  end_date:        Joi.date().optional().allow(null),
  is_current:      Joi.boolean().optional(),
  sort_order:      Joi.number().integer().optional(),
});

const updateExperienceSchema = Joi.object({
  company:         Joi.string().max(150),
  role:            Joi.string().max(150),
  location:        Joi.string().max(100).allow('', null),
  employment_type: Joi.string().max(50).allow('', null),
  start_date:      Joi.date(),
  end_date:        Joi.date().allow(null),
  is_current:      Joi.boolean(),
  sort_order:      Joi.number().integer(),
}).min(1);

module.exports = { createExperienceSchema, updateExperienceSchema };
