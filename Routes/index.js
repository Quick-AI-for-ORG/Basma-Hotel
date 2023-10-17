const express = require('express');
const router=  express.Router();
const page = require('../Controllers/Pages')

router.get('/', page.basma.basma)
router.get('/about us', page.basma.about)
router.get('/facilities',page.basma.facilities)
router.get('/privacyPolicy',page.basma.privacy)
