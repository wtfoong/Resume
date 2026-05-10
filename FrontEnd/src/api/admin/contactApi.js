import client from '../client';

export const createContact = (data)     => client.post('/admin/contacts', data);
export const updateContact = (id, data) => client.put(`/admin/contacts/${id}`, data);
export const deleteContact = (id)       => client.delete(`/admin/contacts/${id}`);
