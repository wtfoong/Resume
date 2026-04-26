const express = require('express');
const router = express.Router();
const profileCtrl = require('../../controllers/admin/profileController');
const validate = require('../../middleware/validate');
const { updateProfileSchema } = require('../../validators/profileValidator');

router.put('/', validate(updateProfileSchema), profileCtrl.updateProfile);

module.exports = router;
