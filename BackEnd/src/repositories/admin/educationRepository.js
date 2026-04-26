const { insert, update, deleteById } = require('../db');

const TABLE = 'education';

const createEducation = (data) => insert(TABLE, data);
const updateEducation = (id, data) => update(TABLE, id, data);
const deleteEducation = (id) => deleteById(TABLE, id);

module.exports = { createEducation, updateEducation, deleteEducation };
