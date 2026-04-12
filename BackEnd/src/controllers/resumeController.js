const service = require('../services/resumeService');

const getProfile    = async (req, res) => { try { res.json(await service.getProfile());    } catch (e) { res.status(500).json({ error: e.message }); } };
const getExperience = async (req, res) => { try { res.json(await service.getExperience()); } catch (e) { res.status(500).json({ error: e.message }); } };
const getEducation  = async (req, res) => { try { res.json(await service.getEducation());  } catch (e) { res.status(500).json({ error: e.message }); } };
const getSkills     = async (req, res) => { try { res.json(await service.getSkills());     } catch (e) { res.status(500).json({ error: e.message }); } };
const getProjects   = async (req, res) => { try { res.json(await service.getProjects());   } catch (e) { res.status(500).json({ error: e.message }); } };

module.exports = { getProfile, getExperience, getEducation, getSkills, getProjects };