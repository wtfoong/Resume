import client from '../client';

export const createProjectTag = (data)     => client.post('/admin/project-tags', data);
export const updateProjectTag = (id, data) => client.put(`/admin/project-tags/${id}`, data);
export const deleteProjectTag = (id)       => client.delete(`/admin/project-tags/${id}`);
