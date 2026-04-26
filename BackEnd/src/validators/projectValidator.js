const Joi = require('joi');

const createProjectSchema = Joi.object({
  title:        Joi.string().max(150).required(),
  description:  Joi.string().optional().allow('', null),
  github_url:   Joi.string().uri().optional().allow('', null),
  live_url:     Joi.string().uri().optional().allow('', null),
  is_published: Joi.boolean().optional(),
  sort_order:   Joi.number().integer().optional(),
});

const updateProjectSchema = Joi.object({
  title:        Joi.string().max(150),
  description:  Joi.string().allow('', null),
  github_url:   Joi.string().uri().allow('', null),
  live_url:     Joi.string().uri().allow('', null),
  is_published: Joi.boolean(),
  sort_order:   Joi.number().integer(),
}).min(1);

module.exports = { createProjectSchema, updateProjectSchema };
