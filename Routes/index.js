const express = require('express');
const router=  express.Router();
const pages = require('../Controllers/Pages')

router.get('/', pages.root.basma)
router.get('/about us', pages.root.about)
router.get('/facilities',pages.root.facilities)
router.get('/privacyPolicy',pages.root.privacy)
module.exports=router
