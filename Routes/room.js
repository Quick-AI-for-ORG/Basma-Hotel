const express = require('express');
const router=  express.Router();
const pages = require('../Controllers/Pages')
const ctrlRooms = require('../Controllers/ctrlRooms')

router.post('/addRoom', ctrlRooms.addRoom)
router.post('/removeRoom', ctrlRooms.removeRoom)
router.post('/modifyRoom', ctrlRooms.modifyRoom)
router.post('/getRoom', ctrlRooms.getRooms)

module.exports=router
