import client from '../client';

export const createEducation = (data)     => client.post('/admin/education', data);
export const updateEducation = (id, data) => client.put(`/admin/education/${id}`, data);
export const deleteEducation = (id)       => client.delete(`/admin/education/${id}`);
