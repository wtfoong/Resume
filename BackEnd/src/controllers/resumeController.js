const service = require('../services/resumeService');

const getProfile    = async (req, res, next) => { try { res.json(await service.getProfile());    } catch (e) { next(e); } };
const getExperience = async (req, res, next) => { try { res.json(await service.getExperience()); } catch (e) { next(e); } };
const getEducation  = async (req, res, next) => { try { res.json(await service.getEducation());  } catch (e) { next(e); } };
const getSkills     = async (req, res, next) => { try { res.json(await service.getSkills());     } catch (e) { next(e); } };
const getProjects   = async (req, res, next) => { try { res.json(await service.getProjects());   } catch (e) { next(e); } };
const getSkillsRaw  = async (req, res, next) => { try { res.json(await service.getSkillsRaw());  } catch (e) { next(e); } };

module.exports = { getProfile, getExperience, getEducation, getSkills, getProjects, getSkillsRaw };