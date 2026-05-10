import client from '../client';

export const createSkill = (data)     => client.post('/admin/skills', data);
export const updateSkill = (id, data) => client.put(`/admin/skills/${id}`, data);
export const deleteSkill = (id)       => client.delete(`/admin/skills/${id}`);
