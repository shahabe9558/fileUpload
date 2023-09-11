const express = require('express');
const router = express.Router();

const {localFileUpload, uploadImage} = require('../controllers/fileUpload');

// api router 
router.post('/localFileUpload', localFileUpload);

router.post('/imageUpload', uploadImage);


module.exports = router;
