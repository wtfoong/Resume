const experienceService = require('../../services/admin/experienceService');

const createExperience = async (req, res, next) => {
  try { res.status(201).json(await experienceService.createExperience(req.body)); }
  catch (err) { next(err); }
};

const updateExperience = async (req, res, next) => {
  try { res.json(await experienceService.updateExperience(req.params.id, req.body)); }
  catch (err) { next(err); }
};

const deleteExperience = async (req, res, next) => {
  try { await experienceService.deleteExperience(req.params.id); res.json({ message: 'Experience deleted' }); }
  catch (err) { next(err); }
};

module.exports = { createExperience, updateExperience, deleteExperience };
