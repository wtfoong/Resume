const repo = require('../../repositories/admin/educationRepository');
const AppError = require('../../utils/AppError');

const createEducation = async (data) => {
  const [education] = await repo.createEducation(data);
  return education;
};

const updateEducation = async (id, data) => {
  const [education] = await repo.updateEducation(id, data);
  if (!education) throw new AppError('Education not found', 404);
  return education;
};

const deleteEducation = async (id) => {
  await repo.deleteEducation(id);
};

module.exports = { createEducation, updateEducation, deleteEducation };
