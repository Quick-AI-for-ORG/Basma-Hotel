const express = require('express')
const router = express.Router()
const pages = require('../Controllers/Pages')
const ctrlGuests = require('../Controllers/ctrlGuests')

router.get('/login', pages.guest.login)
router.get('/signup', pages.guest.signup)
router.get('/bookings', pages.guest.bookings)
router.post('/register', ctrlGuests.register)


module.exports = router