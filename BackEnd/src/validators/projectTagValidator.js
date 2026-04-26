const Joi = require('joi');

const createProjectTagSchema = Joi.object({
  project_id: Joi.string().uuid().required(),
  tag:        Joi.string().max(50).required(),
  sort_order: Joi.number().integer().optional(),
});

const updateProjectTagSchema = Joi.object({
  tag:        Joi.string().max(50),
  sort_order: Joi.number().integer(),
}).min(1);

module.exports = { createProjectTagSchema, updateProjectTagSchema };
