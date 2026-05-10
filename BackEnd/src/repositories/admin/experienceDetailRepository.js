const { insert, update, deleteById } = require('../db');

const TABLE = 'experience_details';

const createExperienceDetail = (data) => insert(TABLE, data);
const updateExperienceDetail = (id, data) => update(TABLE, id, data);
const deleteExperienceDetail = (id) => deleteById(TABLE, id);

module.exports = { createExperienceDetail, updateExperienceDetail, deleteExperienceDetail };

