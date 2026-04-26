const repo = require('../../repositories/admin/contactRepository');
const AppError = require('../../utils/AppError');

const createContact = async (data) => {
  const [contact] = await repo.createContact(data);
  return contact;
};

const updateContact = async (id, data) => {
  const [contact] = await repo.updateContact(id, data);
  if (!contact) throw new AppError('Contact not found', 404);
  return contact;
};

const deleteContact = async (id) => {
  await repo.deleteContact(id);
};

module.exports = { createContact, updateContact, deleteContact };
