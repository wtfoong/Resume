const skillService = require('../../services/admin/skillService');

const createSkill = async (req, res, next) => {
  try { res.status(201).json(await skillService.createSkill(req.body)); }
  catch (err) { next(err); }
};

const updateSkill = async (req, res, next) => {
  try { res.json(await skillService.updateSkill(req.params.id, req.body)); }
  catch (err) { next(err); }
};

const deleteSkill = async (req, res, next) => {
  try { await skillService.deleteSkill(req.params.id); res.json({ message: 'Skill deleted' }); }
  catch (err) { next(err); }
};

module.exports = { createSkill, updateSkill, deleteSkill };
