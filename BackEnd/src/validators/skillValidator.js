const Joi = require('joi');

const createSkillSchema = Joi.object({
  category:   Joi.string().max(100).required(),
  name:       Joi.string().max(100).required(),
  sort_order: Joi.number().integer().optional(),
});

const updateSkillSchema = Joi.object({
  category:   Joi.string().max(100),
  name:       Joi.string().max(100),
  sort_order: Joi.number().integer(),
}).min(1);

module.exports = { createSkillSchema, updateSkillSchema };
