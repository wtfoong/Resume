const repo = require('../../repositories/admin/experienceDetailRepository');
const AppError = require('../../utils/AppError');

const createExperienceDetail = async (data) => {
  const [result] = await repo.createExperienceDetail(data);
  return result;
};

const updateExperienceDetail = async (id, data) => {
  const [result] = await repo.updateExperienceDetail(id, data);
  if (!result) throw new AppError('Experience detail not found', 404);
  return result;
};

const deleteExperienceDetail = async (id) => {
  await repo.deleteExperienceDetail(id);
};

module.exports = { createExperienceDetail, updateExperienceDetail, deleteExperienceDetail };
