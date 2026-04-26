const repo = require('../../repositories/admin/skillRepository');
const AppError = require('../../utils/AppError');

const createSkill = async (data) => {
  const [skill] = await repo.createSkill(data);
  return skill;
};

const updateSkill = async (id, data) => {
  const [skill] = await repo.updateSkill(id, data);
  if (!skill) throw new AppError('Skill not found', 404);
  return skill;
};

const deleteSkill = async (id) => {
  await repo.deleteSkill(id);
};

module.exports = { createSkill, updateSkill, deleteSkill };
