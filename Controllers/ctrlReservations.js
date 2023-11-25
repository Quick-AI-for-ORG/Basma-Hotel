const {Room} = require('../Models/Room.js')
const {Reservation, Option , reservationOption } = require('../Models/Reservation.js');


const reserve = async (req, res) => {
    if (req.session.user === undefined) {
        res.redirect("/guest/login");
      } else {
    try{
       if(await checkAvailability(req,res)){
        let options = [];        
        let room = await Room.findOne({ where:{Title: req.body.roomTitle}});
        let days_between_dates = Math.ceil(( new Date(req.body.departureDate).getTime() - new Date(req.body.arrivalDate).getTime()) / (1000 * 60 * 60 * 24));
        const reservation =  await Reservation.create({
            roomTitle: req.body.roomTitle,
            guestEmail: req.session.user.email,
            startDate: req.body.arrivalDate,
            endDate: req.body.departureDate,
            numberOfAdults: req.body.numberOfAdults,
            numberOfChildren: req.body.numberOfChildren,
            price: room.startingPrice * days_between_dates
        }).then(async(reservation) => {
        if(req.body.g4 == 'on') options.push("High Speed 4G Wifi Personal Router");
        if(req.body.lunch == 'on') options.push("Lunch");
        if(req.body.dinner == 'on') options.push("Dinner");
        if(req.body.car == 'on') options.push("Airport Private Car Transportation (Up to 3 People)");
        if(req.body.van == 'on') options.push("Airport Private Van (Up to 12 People | One Way)");
        if(req.body.massage == 'on') options.push("Massage");
        for(let i = 0; i<options.length; i++){
                const reservationOptions =  await reservationOption.create({
                    option: options[i],
                    reservation: reservation.id,
                })}
                res.redirect('/guest');
        })
    }} catch(err) {
        console.log(err)
    }
    }
}

const modifyReservationOptions = async (req, res) => {
    try{
        let options = [];
        if(req.body.g4 == 'on') options.push("High Speed 4G Wifi Personal Router");
        if(req.body.lunch == 'on') options.push("Lunch");
        if(req.body.dinner == 'on') options.push("Dinner");
        if(req.body.car == 'on') options.push("Airport Private Car Transportation (Up to 3 People)");
        if(req.body.van == 'on') options.push("Airport Private Van (Up to 12 People | One Way)");
        if(req.body.massage == 'on') options.push("Massage");
        await reservationOption.destroy({
            where: {
                reservation: req.body.id
            }
        })
        for(let i = 0; i<options.length; i++){
                const reservationOptions =  await reservationOption.create({
                    option: options[i],
                    reservation: req.body.id,
                })}
                res.redirect('/guest');
    } catch(err) {
        console.log(err)
    }
}

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

const getUserReservationOptions = async (req, res) => {
    let reservationOptions = await reservationOption.findAll({
        where: {
            reservation: req.body.id,         
            
        }, order: [
            ['createdAt', 'DESC'], 
          ],
          limit: 5,   
        });
    let options = [];
    for(let i = 0; i<reservationOptions.length; i++){
        options.push(await Option.findOne({where:{option: reservationOptions[i].option}}))
      }
      return options;
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


        let startDate = new Date(req.body.arrivalDate);
        let endDate = new Date(req.body.departureDate);
    
        const reservations = await Reservation.findAll({
            where: {
                roomTitle: req.body.roomTitle,   
            },
            
        });

        const room = await Room.findOne({where: {Title: req.body.roomTitle}})
        
        if(room != null)
        {    
        
                let count = 0;
                reservations.forEach(reservation => {
                    if(reservation.endDate > startDate && reservation.startDate < endDate )
                    {
                        count = count +1;
                    }
                  
                });
                if(count >= room.quantity)
                    {
                        
                        return false;
                    }
                else
                {
                    
                    return true;
                }
            
    
        }  
    }
    module.exports = {
        guest: {reserve  , getUserReservations , cancelReservation ,checkAvailability, modifyReservationOptions, getUserReservationOptions },
        admin: {getReservations}
    }