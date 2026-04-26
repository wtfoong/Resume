const contactService = require('../../services/admin/contactService');

const createContact = async (req, res, next) => {
  try { res.status(201).json(await contactService.createContact(req.body)); }
  catch (err) { next(err); }
};

const updateContact = async (req, res, next) => {
  try { res.json(await contactService.updateContact(req.params.id, req.body)); }
  catch (err) { next(err); }
};

const deleteContact = async (req, res, next) => {
  try { await contactService.deleteContact(req.params.id); res.json({ message: 'Contact deleted' }); }
  catch (err) { next(err); }
};

module.exports = { createContact, updateContact, deleteContact };
