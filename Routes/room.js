const express = require('express');
const router=  express.Router();
const pages = require('../Controllers/Pages')
const ctrlRooms = require('../Controllers/ctrlRooms')

router.get('/', (req, res) => {
    res.redirect('/room/1')
})
router.get('/:page', pages.room.viewRooms)
router.get('/details/:roomTitle',pages.room.viewRoom)
router.post('/addRoom', ctrlRooms.addRoom)
router.post('/removeRoom', ctrlRooms.removeRoom)
router.post('/modifyRoom', ctrlRooms.modifyRoom)


module.exports=router
