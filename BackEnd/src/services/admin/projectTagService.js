const repo = require('../../repositories/admin/projectTagRepository');
const AppError = require('../../utils/AppError');

const createProjectTag = async (data) => {
  const [result] = await repo.createProjectTag(data);
  return result;
};

const updateProjectTag = async (id, data) => {
  const [result] = await repo.updateProjectTag(id, data);
  if (!result) throw new AppError('Project tag not found', 404);
  return result;
};

const deleteProjectTag = async (id) => {
  await repo.deleteProjectTag(id);
};

module.exports = { createProjectTag, updateProjectTag, deleteProjectTag };
