import client from '../client';

export const createExperienceDetail = (data)     => client.post('/admin/experience-details', data);
export const updateExperienceDetail = (id, data) => client.put(`/admin/experience-details/${id}`, data);
export const deleteExperienceDetail = (id)       => client.delete(`/admin/experience-details/${id}`);
