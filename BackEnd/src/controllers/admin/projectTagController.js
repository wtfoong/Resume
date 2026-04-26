const projectTagService = require('../../services/admin/projectTagService');

const createProjectTag = async (req, res, next) => {
  try { res.status(201).json(await projectTagService.createProjectTag(req.body)); }
  catch (err) { next(err); }
};

const updateProjectTag = async (req, res, next) => {
  try { res.json(await projectTagService.updateProjectTag(req.params.id, req.body)); }
  catch (err) { next(err); }
};

const deleteProjectTag = async (req, res, next) => {
  try { await projectTagService.deleteProjectTag(req.params.id); res.json({ message: 'Project tag deleted' }); }
  catch (err) { next(err); }
};

module.exports = { createProjectTag, updateProjectTag, deleteProjectTag }; 
