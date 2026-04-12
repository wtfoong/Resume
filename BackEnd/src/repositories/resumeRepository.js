const db = require('./db');

const findProfile = () => db('profile').first();

const findContactsByProfileId = (profileId) =>
  db('contacts').where({ profile_id: profileId }).orderBy('sort_order');

const findAllExperience = () =>
  db('experience').orderBy('sort_order');

const findExperienceDetails = (experienceId) =>
  db('experience_details').where({ experience_id: experienceId }).orderBy('sort_order');

const findAllEducation = () =>
  db('education').orderBy('sort_order');

const findEducationDetails = (educationId) =>
  db('education_details').where({ education_id: educationId }).orderBy('sort_order');

const findAllSkills = () =>
  db('skills').orderBy('category').orderBy('sort_order');

const findPublishedProjects = () =>
  db('projects').where({ is_published: true }).orderBy('sort_order');

const findProjectTags = (projectId) =>
  db('project_tags').where({ project_id: projectId }).orderBy('sort_order').pluck('tag');

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
};