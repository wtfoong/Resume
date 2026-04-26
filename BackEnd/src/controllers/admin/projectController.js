const projectService = require('../../services/admin/projectService');

const createProject = async (req, res, next) => {
  try { res.status(201).json(await projectService.createProject(req.body)); }
  catch (err) { next(err); }
};

const updateProject = async (req, res, next) => {
  try { res.json(await projectService.updateProject(req.params.id, req.body)); }
  catch (err) { next(err); }
};

const deleteProject = async (req, res, next) => {
  try { await projectService.deleteProject(req.params.id); res.json({ message: 'Project deleted' }); }
  catch (err) { next(err); }
};

module.exports = { createProject, updateProject, deleteProject };
