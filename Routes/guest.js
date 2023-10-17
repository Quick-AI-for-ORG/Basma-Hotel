const express= require('express')
const router= express.Router()
const pages = require('../Controllers/Pages')

router.get('/login',pages.guest.login)
router.get('/signup', pages.guest.signup)
router.get('/bookings', pages.guest.bookings)

module.exports = router