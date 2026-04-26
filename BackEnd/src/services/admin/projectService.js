const repo = require('../../repositories/admin/projectRepository');
const AppError = require('../../utils/AppError');

const createProject = async (data) => {
  const [project] = await repo.createProject(data);
  return project;
};

const updateProject = async (id, data) => {
  const [project] = await repo.updateProject(id, data);
  if (!project) throw new AppError('Project not found', 404);
  return project;
};

const deleteProject = async (id) => {
  await repo.deleteProject(id);
};

module.exports = { createProject, updateProject, deleteProject };