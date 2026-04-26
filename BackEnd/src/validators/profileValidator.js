const Joi = require('joi');

const updateProfileSchema = Joi.object({
  full_name: Joi.string().max(100),
  location:  Joi.string().max(100),
}).min(1); // at least one field required

module.exports = { updateProfileSchema };
