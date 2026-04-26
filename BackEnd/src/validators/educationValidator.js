const Joi = require('joi');

const createEducationSchema = Joi.object({
  institution: Joi.string().max(150).required(),
  degree:      Joi.string().max(150).required(),
  field:       Joi.string().max(150).optional().allow('', null),
  start_date:  Joi.date().required(),
  end_date:    Joi.date().optional().allow(null),
  gpa:         Joi.number().precision(2).optional().allow(null),
  sort_order:  Joi.number().integer().optional(),
});

const updateEducationSchema = Joi.object({
  institution: Joi.string().max(150),
  degree:      Joi.string().max(150),
  field:       Joi.string().max(150).allow('', null),
  start_date:  Joi.date(),
  end_date:    Joi.date().allow(null),
  gpa:         Joi.number().precision(2).allow(null),
  sort_order:  Joi.number().integer(),
}).min(1);

module.exports = { createEducationSchema, updateEducationSchema };
