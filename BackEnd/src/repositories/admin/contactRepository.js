const { insert, update, deleteById } = require('../db');

const TABLE = 'contacts';

const createContact = (data) => insert(TABLE, data);
const updateContact = (id, data) => update(TABLE, id, data);
const deleteContact = (id) => deleteById(TABLE, id);

module.exports = { createContact, updateContact, deleteContact };