
const express = require('express')
const router = express.Router()
const pages = require('../Controllers/Pages')
const ctrlGuests = require('../Controllers/ctrlGuests')
const ctrlReservations = require('../Controllers/ctrlReservations')
const ctrlRooms = require('../Controllers/ctrlRooms')
const ctrlQuestions = require('../Controllers/ctrlQuestions')

router.get('/',pages.admin.dashboard)

module.exports = router