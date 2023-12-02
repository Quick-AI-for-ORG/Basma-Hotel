const {Room} = require('../Models/Room.js')
const {Reservation, Option , reservationOption } = require('../Models/Reservation.js');
const {admin} = require('../Controllers/ctrlOptions.js');

const reserve = async (req, res) => {
    if (req.session.user === undefined) {
        res.redirect("/guest/login");
      } else {
    try{
       if(await checkAvailability(req,res)){
        let numberOfGuests = req.body.numberOfAdults + req.body.numberOfChildren;
        let room = await Room.findOne({ where:{Title: req.body.roomTitle}});
        if(numberOfGuests > room.capacity){
        let days_between_dates = Math.ceil(( new Date(req.body.departureDate).getTime() - new Date(req.body.arrivalDate).getTime()) / (1000 * 60 * 60 * 24));
        const reservation =  await Reservation.create({
            roomTitle: req.body.roomTitle,
            guestEmail: req.session.user.email,
            startDate: req.body.arrivalDate,
            endDate: req.body.departureDate,
            numberOfAdults: req.body.numberOfAdults,
            numberOfChildren: req.body.numberOfChildren,
            price: room.startingPrice * days_between_dates,
            
        }).then(async(reservation) => {
            let options = await admin.getOptions(req,res);      
        for(let i = 0; i<options.length; i++){
            if(req.body[`${i+1}`]=='on'){
                let reservationOptions =  await reservationOption.create({
                    option: options[i].id,
                    reservation: reservation.id,
                })}
            }
            req.session.reservation = reservation.id
            req.session.room = req.body.roomTitle
                res.redirect('/guest/payment');
        })
    }}} catch(err) {
        console.log(err)
    }
    }
}



const modifyReservationOptions = async (req, res) => {
    try{
        let options = await admin.getOptions(req,res);      
        for(let i = 0; i<options.length; i++){
            if(req.body[`${i+1}`]=='on'){
        await reservationOption.destroy({
            where: {
                reservation: req.body.id
            }})
        }}
        for(let i = 0; i<options.length; i++){
                const reservationOptions =  await reservationOption.create({
                    option: options[i].id,
                    reservation: req.body.id,
                })}
                res.redirect('/guest');
    }catch(err) {
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
            reservation: req.session.reservation,   
        } });
    let options = [];
    for(let i = 0; i<reservationOptions.length; i++){
        options.push(await Option.findOne({where:{id: reservationOptions[i].option}}))
      }
      return options;
    }

    const sessionedReservation = async(req,res) => {
        return await Reservation.findOne({where:{id: req.session.reservation}})
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
        guest: {reserve  , getUserReservations , cancelReservation ,checkAvailability, modifyReservationOptions, getUserReservationOptions ,sessionedReservation},
        admin: {getReservations}
    }