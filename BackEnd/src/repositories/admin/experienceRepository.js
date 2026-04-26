const { insert, update, deleteById } = require('../db');

const TABLE = 'experience';

const createExperience = (data) => insert(TABLE, data);
const updateExperience = (id, data) => update(TABLE, id, data);
const deleteExperience = (id) => deleteById(TABLE, id);

module.exports = { createExperience, updateExperience, deleteExperience };
