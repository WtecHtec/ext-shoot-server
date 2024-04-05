const express = require('express');
const extensionController = require('./extensionController');

const router = express.Router();

router.get('/health',extensionController.getHealth);
router.post('/open-extension', extensionController.openExtension);
router.post('/pages', extensionController.getHtmlPages);

module.exports = router;
