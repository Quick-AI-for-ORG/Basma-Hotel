const Reservation = require("../Models/Reservation")
const Option = require("../Models/Option")
const Room = require("../Models/Room")
const Guest = require("../Models/Guest")

const reserve = async (req, res) => {
    if (req.session.user === undefined || req.session.user.role != "Guest") 
            res.redirect("/user/login");
       if(await checkAvailability(req,res)){
        const numberOfGuests = req.body.numberOfAdults + req.body.numberOfChildren;
        const room = await Room.get(req.body.roomTitle)
        if(numberOfGuests > room.capacity){
            res.redirect(`/room/${room.title}`);
        }
        let days_between_dates = Math.ceil(( new Date(req.body.departureDate).getTime() - new Date(req.body.arrivalDate).getTime()) / (1000 * 60 * 60 * 24));
        const reservationJSON =  {
            roomTitle: req.body.roomTitle,
            guestEmail: req.session.user.email,
            arrivalDate: req.body.arrivalDate,
            departureDate: req.body.departureDate,
            numberOfAdults: req.body.numberOfAdults,
            numberOfChildren: req.body.numberOfChildren,
            price: room.startingPrice * days_between_dates,     
        }
        const reservation = new Reservation(reservationJSON)
        await reservation.create()
        const options = await Option.getAll();      
        for(let i = 0; i<options.length; i++){
            if(req.body[`${i+1}`]=='on')
                reservation.addReservationOption(options[i].option)
        }
            req.session.reservation = reservation.id
            req.session.room = req.body.roomTitle
                res.redirect('/user/payment');
    }
    else res.redirect(`/room/${req.body.roomTitle}`)
}



const modifyReservationOptions = async (req, res) => {
    const reservation = Reservation.get(req.body.id)
    const options = await Option.getAll();      
    for(let i = 0; i<options.length; i++){
        if(req.body[`${i+1}`]=='on')
            await reservation.addReservationOption(options[i].option)
        else (await reservation).removeReservationOption(options[i].option)
    }
    res.redirect('/user');
}

const  getUserReservations = async (req, res) => {
    if (req.session.user === undefined || req.session.user.role != "Guest") 
            res.redirect("/user/login");
    const records = await Reservation.getGuestReservations(req.session.user.email)
    if(!records) return null
    if(records.length>10) records = records.slice(0,10)
    return records
}

const getUserReservationOptions = async (req, res) => {
   const reservation = await Reservation.get(req.session.reservarion)
    return await reservation.getReservationOptions()
    }

    const sessionedReservation = async(req,res) => {
        return await Reservation.get(req.session.reservation)
    }

const getReservations = async(req,res)=>{
    return await Reservation.getAll();
}
const cancelReservation = async(req,res)=>{
    if (req.session.user === undefined || req.session.user.role != "Guest") 
            res.redirect("/user/login");
    const guest = await Guest.get(req.session.user.email)
    await guest.cancelReservation(req.body.id)
    }

    const checkAvailability = async (req, res) => {
        const arrivalDate = new Date(req.body.arrivalDate);
        const departureDate = new Date(req.body.departureDate);
        const reservations = await Reservation.getRoomReservations(req.body.roomTitle)
        const room = await Room.get(req.body.roomTitle)
        if(room) {    
            let count = 0;
            reservations.forEach(reservation => {
                if(reservation.endDate > arrivalDate && reservation.startDate < departureDate )
                    count = count +1;
            });
            if(count >= room.quantity) return false
            else return true;
        }  
    }

    module.exports = {
        guest: {reserve  , getUserReservations , cancelReservation ,checkAvailability, modifyReservationOptions, getUserReservationOptions ,sessionedReservation},
        staff: {getReservations}
    }