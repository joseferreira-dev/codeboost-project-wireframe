const express = require('express');

const router = express.Router();

const ContactController = require('./app/controllers/ContactController');

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);

module.exports = router;
