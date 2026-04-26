const repo = require('../../repositories/admin/educationDetailRepository');
const AppError = require('../../utils/AppError');

const createEducationDetail = async (data) => {
  const [result] = await repo.createEducationDetail(data);
  return result;
};

const updateEducationDetail = async (id, data) => {
  const [result] = await repo.updateEducationDetail(id, data);
  if (!result) throw new AppError('Education detail not found', 404);
  return result;
};

const deleteEducationDetail = async (id) => {
  await repo.deleteEducationDetail(id);
};

module.exports = { createEducationDetail, updateEducationDetail, deleteEducationDetail };
