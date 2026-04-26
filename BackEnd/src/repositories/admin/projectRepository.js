const { insert, update, deleteById } = require('../db');

const TABLE = 'projects';

const createProject = (data) => insert(TABLE, data);
const updateProject = (id, data) => update(TABLE, id, data);
const deleteProject = (id) => deleteById(TABLE, id);

module.exports = { createProject, updateProject, deleteProject };
