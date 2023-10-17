const express= require('express')
const router= express.Router()
const page = require('../Controllers/Pages')

router.get('/login',page.guest.login)
router.get('/signup', page.guest.signup)
router.get('/bookings', page.guest.bookings)