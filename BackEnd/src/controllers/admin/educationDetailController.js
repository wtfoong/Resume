const educationDetailService = require('../../services/admin/educationDetailService');

const createEducationDetail = async (req, res, next) => {
  try { res.status(201).json(await educationDetailService.createEducationDetail(req.body)); }
  catch (err) { next(err); }
};

const updateEducationDetail = async (req, res, next) => {
  try { res.json(await educationDetailService.updateEducationDetail(req.params.id, req.body)); }
  catch (err) { next(err); }
};

const deleteEducationDetail = async (req, res, next) => {
  try { await educationDetailService.deleteEducationDetail(req.params.id); res.json({ message: 'Education detail deleted' }); }
  catch (err) { next(err); }
};

module.exports = { createEducationDetail, updateEducationDetail, deleteEducationDetail };
