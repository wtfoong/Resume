const Joi = require('joi');

const createContactSchema = Joi.object({
  profile_id: Joi.string().uuid().required(),
  label:      Joi.string().max(100).required(),
  value:      Joi.string().max(255).required(),
  url:        Joi.string().optional().allow('', null),  // ← no longer uri() enforced
  sort_order: Joi.number().integer().optional(),
});

const updateContactSchema = Joi.object({
  label:      Joi.string().max(100),
  value:      Joi.string().max(255),
  url:        Joi.string().optional().allow('', null),
  sort_order: Joi.number().integer(),
}).min(1);

module.exports = { createContactSchema, updateContactSchema };
