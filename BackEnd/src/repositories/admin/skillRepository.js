const { insert, update, deleteById } = require('../db');

const TABLE = 'skills';

const createSkill = (data) => insert(TABLE, data);
const updateSkill = (id, data) => update(TABLE, id, data);
const deleteSkill = (id) => deleteById(TABLE, id);

module.exports = { createSkill, updateSkill, deleteSkill };
