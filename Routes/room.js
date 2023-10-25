const express = require('express');
const router=  express.Router();
const pages = require('../Controllers/Pages')
const ctrlRooms = require('../Controllers/ctrlRooms')

router.post('/addRoom', ctrlRooms.addRoom)
router.post('/removeRoom', ctrlRooms.removeRoom)
router.post('/modifyRoom', ctrlRooms.modifyRoom)
router.post('/getRooms', ctrlRooms.getRooms)
router.post('/getRoom', ctrlRooms.getRoom)

module.exports=router
