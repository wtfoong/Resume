const educationService = require('../../services/admin/educationService');

const createEducation = async (req, res, next) => {
  try { res.status(201).json(await educationService.createEducation(req.body)); }
  catch (err) { next(err); }
};

const updateEducation = async (req, res, next) => {
  try { res.json(await educationService.updateEducation(req.params.id, req.body)); }
  catch (err) { next(err); }
};

const deleteEducation = async (req, res, next) => {
  try { await educationService.deleteEducation(req.params.id); res.json({ message: 'Education deleted' }); }
  catch (err) { next(err); }
};

module.exports = { createEducation, updateEducation, deleteEducation };
