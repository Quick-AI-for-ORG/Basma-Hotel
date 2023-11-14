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

const  getUserReservations = async (req, res) => {
    return await Reservation.findAll({guest_email: req.session.user.email})
}
const getReservations = async(req,res)=>{
    return await Reservation.findAll();
}
const cancelReservation = async(req,res)=>{
    try { await Reservation.destroy({
        where: {
          id: req.body.id
        }
      }).then((reservation) =>{
        res.status(201).json({ message: "Reservation cancelled" });
      })
    }
      catch(err) {
        console.error("Error: " + err);
        res.status(400).json({ message: err.message });
      }
    }

    const checkAvailability = async (req, res) => {


        let startDate = new Date(req.body.startDate);
        let endDate = new Date(req.body.endDate);
    
        const reservations = await Reservation.findAll({
            where: {
                room_Title: req.body.roomTitle,
                
                
            },
            
        });

        const room = await Room.findOne({where: {Title: req.body.roomTitle}})
        
        if(room != null)
        {    
        
                let count = 0;
                console.log(reservations)
                reservations.forEach(reservation => {
                    if(reservation.end_date > startDate && reservation.start_date < endDate )
                    {
                        count = count +1;
                    }
                  
                });
                if(count >= room.quantity)
                    {
                        res.status(400).json({message: "Room is not available"})
                        console.log("Room is not available")
                    }
                else
                {
                    console.log(count)
                    res.status(200).json({message: "Room is available"})
                    console.log("Room is available")
                    
                }
            
    
        }   
        
    
    }


    module.exports = {reserve , getReservations , getUserReservations , cancelReservation, checkAvailability}