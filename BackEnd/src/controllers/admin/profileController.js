 const profileService = require('../../services/admin/profileService');

const updateProfile = async (req, res, next) => {
  try {
    await profileService.updateProfile(req.body);
    res.json({ message: 'Profile updated successfully' });
  } catch (err) { next(err); }
};

module.exports = { updateProfile };
