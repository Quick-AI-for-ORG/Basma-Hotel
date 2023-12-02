const express = require('express');
const router=  express.Router();
const pages = require('../Controllers/Pages')
const ctrlRooms = require('../Controllers/ctrlRooms')

router.get('/', (req, res) => {
    res.redirect('/room/1')
})
router.get('/:page', pages.public.viewRooms)
router.get('/details/:roomTitle',pages.public.viewRoom)
router.post('/addRoom', ctrlRooms.admin.addRoom)
router.post('/removeRoom', ctrlRooms.admin.removeRoom)
router.post('/modifyRoom', ctrlRooms.admin.modifyRoom)
router.post('/findRooms', ctrlRooms.public.findRoom)


module.exports=router
