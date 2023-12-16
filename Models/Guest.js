const User = require('./User')
const {userModel} = require('./DBsequelize')
const Reservation = require('./Reservation')
const Question = require('./Question')
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
  async pay(id,method){
    let reservation = await Reservation.get(id)
    let options = await reservation.getReservationOptions()
    let totalOptions = 0
    for(let i = 0; i < options.length; i++){
      totalOptions +=parseFloat(options[i].price)
    }
    let daysBetweenDates = (reservation.departureDate.getTime() - reservation.arrivalDate.getTime()) / (1000 * 3600 * 24)
    let price = (totalOptions * daysBetweenDates) + parseFloat(reservation.price)
    if(method == "card")  await reservation.modify(true,price.toFixed(2))
    else await reservation.modify(false,price)
  }
  async askQuestion(questionJSON){
    let question = new Question(questionJSON)
    await question.create()
    return question
  }
}

module.exports = Guest






