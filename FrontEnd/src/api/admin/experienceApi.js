import client from '../client';

export const createExperience = (data)     => client.post('/admin/experience', data);
export const updateExperience = (id, data) => client.put(`/admin/experience/${id}`, data);
export const deleteExperience = (id)       => client.delete(`/admin/experience/${id}`);
