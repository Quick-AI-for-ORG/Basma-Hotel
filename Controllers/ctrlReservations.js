const {Room} = require('../Models/Room.js')
const {Reservation} = require('../Models/Reservation.js');


const reserve = async (req, res) => {
    try{
        const milliseconds_between_dates = req.bodyDepartureDate.getTime() -req.bodyDepartureDate.getTime();
        const days_between_dates = Math.floor(milliseconds_between_dates / (1000 * 60 * 60 * 24));
        let room = await Room.findOne({ where:{Title: req.body.room}});
        const reservation =  Reservation.create({
            room_Title: req.body.room,
            guest_email: req.session.user.email,
            start_date: req.bodyDepartureDate,
            end_date: req.bodyDepartureDate,
            price: room.startingPrice * days_between_dates ,
            number_of_people: room.capacity,
           
        }).then((reservation) => {
            res.status(201).json({ message: "room added successfully" }); 
        });
    } catch(err){
        res.status(400).json({message:err.message})
    }}

    module.exports = {reserve}
