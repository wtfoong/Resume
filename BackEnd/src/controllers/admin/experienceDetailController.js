const experienceDetailService = require('../../services/admin/experienceDetailService');

const createExperienceDetail = async (req, res, next) => {
  try { res.status(201).json(await experienceDetailService.createExperienceDetail(req.body)); }
  catch (err) { next(err); }
};

const updateExperienceDetail = async (req, res, next) => {
  try { res.json(await experienceDetailService.updateExperienceDetail(req.params.id, req.body)); }
  catch (err) { next(err); }
};

const deleteExperienceDetail = async (req, res, next) => {
  try { await experienceDetailService.deleteExperienceDetail(req.params.id); res.json({ message: 'Experience detail deleted' }); }
  catch (err) { next(err); }
};

module.exports = { createExperienceDetail, updateExperienceDetail, deleteExperienceDetail };
