const {reservationModel, reservationOptionModel} = require('./DBsequelize');
const Option = require('./Option')
const crudInterface = require('./CRUD');
class Reservation {
    static crudInterface = crudInterface;
    constructor(reservationJSON) {
        this.jsonToObject(reservationJSON)
        this.options = []
    }
    jsonToObject(reservationJSON){
        this.roomTitle = reservationJSON.roomTitle,
        this.guestEmail = reservationJSON.email,
        this.arrivalDate = reservationJSON.arrivalDate,
        this.departureDate = reservationJSON.departureDate,
        this.numberOfAdults =  reservationJSON.numberOfAdults,
        this.numberOfChildren = reservationJSON.numberOfChildren,
        this.price = reservationJSON.price
    }
    static async generateID() {
        if(reservationModel.max('id') == null) return 0
          return await reservationModel.max('id')
      }
      async create(){ 
        this.id = Reservation.generateID()+1;
        await Reservation.crudInterface.create(this,reservationModel,"id") 
      }
      static async modify(id,newReservation){
        const record = await Reservation.crudInterface.modify(id,newReservation,reservationModel,"id") 
        this.jsonToObject(record)
        this.id = record.id
      }
      static async remove(id){
        await Reservation.crudInterface.remove(id,reservationModel,"id") 
        return null
      }
      static async get(id){
        const record = await Reservation.crudInterface.get(id,reservationModel,"id") 
        this.jsonToObject(record)
        this.id = record.id
      }
      static async getAll(){
        const records = await Reservation.crudInterface.getAll(reservationModel) 
        let reservations = []
        if(records.length > 0){
        for(let i = 0; i < records.length; i++){
            reservations.push(new Reservation(records[i]))
        }
        return reservations
     }
     return null
     }
     async getReservationOptions(){
        const records = await reservationOptionModel.findAll({where : {reservation : this.id}})
        if(records.length > 0){
        for(let i = 0; i < records.length; i++){
          this.options.push(Option.get(records[i].option))
        }
        return this.options
     }
     return null
    }
    async addReservationOption(option){
        for(let i = 0; i < this.options.length; i++){
            if(this.options[i].option == option)
            return
        }
        this.options.push(Characteristic.get(option))
        await reservationOptionModel.create({reservation : this.id, option:option})
    }
    async removeReservationOption(option){
        for(let i = 0; i < this.options.length; i++){
            if(this.options[i].option == option){
            this.options.splice(i,1)
            await reservationOptionModel.destroy({where : {reservation : this.id, option:option}})
            }
        }
       return
    }
}
module.exports = Reservation