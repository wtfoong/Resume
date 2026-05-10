 import client from './client';

export const getProfile    = () => client.get('/profile');
export const getExperience = () => client.get('/experience');
export const getEducation  = () => client.get('/education');
export const getSkills     = () => client.get('/skills');
export const getProjects   = () => client.get('/projects');
