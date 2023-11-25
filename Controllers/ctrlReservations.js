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


        let options = [];
        console.log(req.body)
        if(req.body.g4) options.push("High Speed 4G Wifi Personal Router");
        if(req.body.lunch) options.push("Lunch");
        if(req.body.dinner) options.push("Dinner");
        if(req.body.car) options.push("Airport Private Car Transportation (Up to 3 People)");
        if(req.body.van) options.push("Airport Private Van (Up to 12 People | One Way)");
        if(req.body.massage) options.push("Massage");
        let room = await Room.findOne({ where:{Title: req.body.room}});
        const reservation =  Reservation.create({
            roomTitle: req.body.roomTitle,
            guestEmail: req.session.user.email,
            startDate: req.body.arrivalDate,
            endDate: req.body.departureDate,
            numberOfAdults: req.body.numberOfAdults,
            numberOfChildren: req.body.numberOfChildren,
            options: options,
            price: room.startingPrice * days_between_dates + (150 * options.length)  
        }).then((reservation) => {
            res.status(201).json({ message: "reservation saved successfully" }); 
        });
    } catch(err){
        res.status(400).json({message:err.message})
    }}}

const  getUserReservations = async (req, res) => {
    return await Reservation.findAll({
        
        where: {
            guestEmail: req.session.user.email,         
            
        },
     order: [
        ['createdAt', 'DESC'], 
      ],
      limit: 5, 

       
    });

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
                roomTitle: req.body.roomTitle,   
            },
            
        });

        const room = await Room.findOne({where: {Title: req.body.roomTitle}})
        
        if(room != null)
        {    
        
                let count = 0;
                console.log(reservations)
                reservations.forEach(reservation => {
                    if(reservation.endDate > startDate && reservation.startDate < endDate )
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
    module.exports = {
        guest: {reserve  , getUserReservations , cancelReservation ,checkAvailability },
        admin: {getReservations}
    }