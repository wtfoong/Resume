const repo = require('../../repositories/admin/profileRepository');

const updateProfile = async (data) => {
  await repo.updateProfile(data);
};

module.exports = { updateProfile };