import client from '../client';

export const updateProfile = (data) => client.put('/admin/profile', data);