const { db, findAll, findBy } = require('./db');

const findProfile = () => findBy('profile', {}, { first: true });

const findContactsByProfileId = (profileId) =>
  findBy('contacts', { profile_id: profileId }, { orderBy: 'sort_order' });

const findAllExperience = () => findAll('experience', { orderBy: 'sort_order' });

const findExperienceDetails = (experienceId) =>
  findBy('experience_details', { experience_id: experienceId }, { orderBy: 'sort_order' });

const findAllEducation = () => findAll('education', { orderBy: 'sort_order' });

const findEducationDetails = (educationId) =>
  findBy('education_details', { education_id: educationId }, { orderBy: 'sort_order' });

const findAllSkills = () =>
  db('skills').orderBy('category').orderBy('sort_order');

const findPublishedProjects = () =>
  findBy('projects', { is_published: true }, { orderBy: 'sort_order' });

const findProjectTags = (projectId) =>
  findBy('project_tags', { project_id: projectId }, { orderBy: 'sort_order' });

const findAllSkillsRaw = () => findAll('skills', { orderBy: 'sort_order' });

module.exports = {
  findProfile,
  findContactsByProfileId,
  findAllExperience,
  findExperienceDetails,
  findAllEducation,
  findEducationDetails,
  findAllSkills,
  findPublishedProjects,
  findProjectTags,
  findAllSkillsRaw
};