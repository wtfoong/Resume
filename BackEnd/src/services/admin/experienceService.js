const repo = require('../../repositories/admin/experienceRepository');
const AppError = require('../../utils/AppError');

const createExperience = async (data) => {
  const [experience] = await repo.createExperience(data);
  return experience;
};

const updateExperience = async (id, data) => {
  const [experience] = await repo.updateExperience(id, data);
  if (!experience) throw new AppError('Experience not found', 404);
  return experience;
};

const deleteExperience = async (id) => {
  await repo.deleteExperience(id);
};

module.exports = { createExperience, updateExperience, deleteExperience };
