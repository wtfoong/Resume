const { insert, update, deleteById } = require('../db');

const TABLE = 'project_tags';

const createProjectTag = (data) => insert(TABLE, data);
const updateProjectTag = (id, data) => update(TABLE, id, data);
const deleteProjectTag = (id) => deleteById(TABLE, id);

module.exports = { createProjectTag, updateProjectTag, deleteProjectTag };
