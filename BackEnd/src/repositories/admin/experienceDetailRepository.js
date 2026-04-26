const { insert, update, deleteById } = require('../db');

const TABLE = 'education_details';

const createEducationDetail = (data) => insert(TABLE, data);
const updateEducationDetail = (id, data) => update(TABLE, id, data);
const deleteEducationDetail = (id) => deleteById(TABLE, id);

module.exports = { createEducationDetail, updateEducationDetail, deleteEducationDetail };
