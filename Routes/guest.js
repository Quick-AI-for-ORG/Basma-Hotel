const express = require('express')
const router = express.Router()
const pages = require('../Controllers/Pages')
const ctrlGuests = require('../Controllers/ctrlGuests')

router.get('/', pages.guest.myProfile)
router.get('/login', pages.guest.login)
router.get('/signup', pages.guest.signup)
router.get('/bookings', pages.guest.bookings)
router.post('/register', ctrlGuests.register)
router.post('/login', ctrlGuests.login)
router.post('/delete', ctrlGuests.deleteGuest)


module.exports = router