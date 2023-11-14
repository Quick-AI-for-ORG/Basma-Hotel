const {Room} = require('../Models/Room.js')
const {Reservation} = require('../Models/Reservation.js');


const reserve = async (req, res) => {
    if (req.session.user === undefined) {
        res.redirect("/guest/login");
      } else {
    try{
        let d = new Date(req.body.departureDate)
        let a = new Date(req.body.arrivalDate)
        const milliseconds_between_dates = d.getTime() -a.getTime();
        const days_between_dates = Math.floor(milliseconds_between_dates / (1000 * 60 * 60 * 24));



        let room = await Room.findOne({ where:{Title: req.body.room}});
        const reservation =  Reservation.create({
            room_Title: req.body.room,
            guest_email: req.session.user.email,
            start_date: req.body.arrivalDate,
            end_date: req.body.departureDate,
            price: room.startingPrice * days_between_dates ,
            number_of_people: room.capacity,
           
        }).then((reservation) => {
            res.status(201).json({ message: "reservation saved successfully" }); 
        });
    } catch(err){
        res.status(400).json({message:err.message})
    }}}

    module.exports = {reserve}
