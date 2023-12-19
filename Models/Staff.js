const User = require('./User')
const Reservation = require('./Reservation')
const Room = require('./Room')
const Guest = require('./Guest')
const Question = require('./Question')
class Staff extends User{
    constructor(staffJSON) {
        super(staffJSON, "Staff")
    }
    static async get(email){
        const user = await User.crudInterface.get(email, userModel, "email")
        if (user) return new Staff(user)
        else return null
    }
    async getAllGuests(){
        const users = await User.getAll()
        let guests = []
        for(let i = 0; i < users.length; i++){
            if(users[i].role == "Guest") guests.push(await Guest.get(users[i].email))
        }
        if(guests.length == 0) return null
        else return guests
    }

    async getAllReservations(){
        return await Reservation.getAll()
    }

    async getAllRooms(){
        return await Room.getAll()
    }

    async searchReservationsByDate(startDate=null, endDate=null){
        return await Reservation.searchByDate(startDate, endDate)
    }    

    async searchReservationsByGuest(email){
        return await Reservation.getGuestReservations(email)
    }

    async searchReservationsByRoom(title){
        return await Reservation.getRoomReservations(title)
    }

    async addReservation(reservationJSON){
        let reservation = new Reservation(reservationJSON)
        await reservation.create()
        return reservation
    }

    async removeReservation(id){
        await Reservation.remove(id)
        return true
    }

    async addGuest(guestJSON){
        let guest = new Guest(guestJSON)
        await guest.create()
        return guest
    }

    async getQuestions(){
        return await Question.getAll()
    }
    async addReservation(reservationJSON){
        let reservation = new Reservation(reservationJSON)
        await reservation.create()
        return reservation
    }
}
module.exports = Staff
