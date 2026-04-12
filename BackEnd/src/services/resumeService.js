const repo = require('../repositories/resumeRepository');

const getProfile = async () => {
  const profile = await repo.findProfile();
  const contacts = await repo.findContactsByProfileId(profile.id);
  return { ...profile, contacts };
};

const getExperience = async () => {
  const experience = await repo.findAllExperience();
  for (const exp of experience) {
    exp.details = await repo.findExperienceDetails(exp.id);
  }
  return experience;
};

const getEducation = async () => {
  const education = await repo.findAllEducation();
  for (const edu of education) {
    edu.details = await repo.findEducationDetails(edu.id);
  }
  return education;
};

const getSkills = async () => {
  const skills = await repo.findAllSkills();
  return skills.reduce((groups, skill) => {
    const cat = skill.category;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(skill.name);
    return groups;
  }, {});
};

const getProjects = async () => {
  const projects = await repo.findPublishedProjects();
  for (const project of projects) {
    project.tags = await repo.findProjectTags(project.id);
  }
  return projects;
};

module.exports = { getProfile, getExperience, getEducation, getSkills, getProjects };