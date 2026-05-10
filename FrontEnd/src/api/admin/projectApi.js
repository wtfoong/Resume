import client from '../client';

export const createProject = (data)     => client.post('/admin/projects', data);
export const updateProject = (id, data) => client.put(`/admin/projects/${id}`, data);
export const deleteProject = (id)       => client.delete(`/admin/projects/${id}`);
