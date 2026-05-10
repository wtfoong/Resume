import client from './client';

export const login          = (data) => client.post('/auth/login', data);
export const logout         = ()     => client.post('/auth/logout');
export const refresh        = ()     => client.post('/auth/refresh');
export const verify         = ()     => client.get('/auth/verify');
export const forgotPassword = (data) => client.post('/auth/forgot-password', data);
export const resetPassword  = (data) => client.post('/auth/reset-password', data);

export const changePassword = (data) => client.put('/admin/auth/change-password', data);
export const changeEmail    = (data) => client.put('/admin/auth/change-email', data);