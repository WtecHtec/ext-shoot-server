const express = require('express');
const extensionController = require('./extensionController');

const router = express.Router();

router.get('/health',extensionController.getHealth);
router.post('/open-extension', extensionController.openExtension);
router.post('/pages', extensionController.getHtmlPages);
router.post('/active-extension', extensionController.activateExtensionByName);
router.get('/detect', extensionController.detectBrowser);
module.exports = router;
