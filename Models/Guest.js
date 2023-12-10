const User = require('./User')
const Reservation = require('./Reservation')
class Guest extends User{
  constructor(guestJSON) {
    super(guestJSON,"Guest")
  }
  static async get(email){
    const user = await User.crudInterface.get(email,userModel,"email")
    if(user) return new Guest(user) 
    else return null
  }
  async reserve(reservationJSON,options){
    let reservation = new Reservation(reservationJSON)
    await reservation.create()
    for(let i = 0; i < options.length; i++){
      await reservation.addReservationOption(options[i])
    }
    await this.getReservations()
    return reservation
  }
  async cancelReservation(id){
      let records = await this.getReservations()
      for (let i = 0; i < records.length; i++) {
        if (records[i].id === id) await Reservation.remove(id)
      }
      await this.getReservations()
  }
  async getReservations(){
    return this.reservations = await Reservation.getGuestReservations()
  }
  async pay(id){
    let records = await this.getReservations()
    for (let i = 0; i < records.length; i++) {
      if (records[i].id === id) { 
        await records[i].modifyPaid(true)
        return records[i]
      }
    }
    return null
  }

}

module.exports = Guest






