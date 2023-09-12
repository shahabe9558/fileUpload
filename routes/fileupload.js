const express = require('express');
const router = express.Router();

const {localFileUpload, uploadImage, videoUpload} = require('../controllers/fileUpload');

// api router 
router.post('/localFileUpload', localFileUpload);

router.post('/imageUpload', uploadImage);

router.post('/videoUpload', videoUpload);

module.exports = router;
