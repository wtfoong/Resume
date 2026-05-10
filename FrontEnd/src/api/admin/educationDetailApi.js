import client from '../client';

export const createEducationDetail = (data)     => client.post('/admin/education-details', data);
export const updateEducationDetail = (id, data) => client.put(`/admin/education-details/${id}`, data);
export const deleteEducationDetail = (id)       => client.delete(`/admin/education-details/${id}`);
