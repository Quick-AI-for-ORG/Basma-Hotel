const {reservationModel, reservationOptionModel} = require('./DBsequelize');
const Option = require('./Option')
const {Op} = require('sequelize')
const crudInterface = require('./CRUD')
const garInterface = require('./GAR')
class Reservation {
    static crudInterface = crudInterface;
    static garInterface = garInterface;
    constructor(reservationJSON) {
        this.jsonToObject(reservationJSON)
        this.options = []
    }
    jsonToObject(reservationJSON){
        this.roomTitle = reservationJSON.roomTitle,
        this.guestEmail = reservationJSON.guestEmail,
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
        this.id = await Reservation.generateID()+1;
        await Reservation.crudInterface.create(this,reservationModel,"id") 
      }
      static async remove(id){
        await Reservation.crudInterface.remove(id,reservationModel,"id") 
        return null
      }
      static async get(id){
        const record = await Reservation.crudInterface.get(id,reservationModel,"id") 
        const searchedReservation = new Reservation(record)
        searchedReservation.id = record.id
        searchedReservation.paid = record.paid
        return searchedReservation
      }
      static async getAll(){
        const records = await Reservation.crudInterface.getAll(reservationModel) 
        return Reservation.jsonToObjects(records)
     }
     async getReservationOptions(){
        const records = await Reservation.garInterface.get(this.id,reservationOptionModel,"reservation")
        if(!records) return null
        let options = await Option.getAll()
        let reservationOptions = []
        for(let i = 0; i < records.length; i++){
            for(let j = 0; j < options.length; j++){
            if(options[j].id == records[i].option)
            reservationOptions.push(options[j])
            }
        }
        return this.options = reservationOptions
    }
    async addReservationOption(option){
        for(let i = 0; i < this.options.length; i++){
            if(this.options[i].id == option.id)
            return
        }
        await Reservation.garInterface.add(this.id,reservationOptionModel,"reservation",option.id,"option")
        this.options.push(await Option.get(option.option))
    }
    async removeReservationOption(option){
        for(let i = 0; i < this.options.length; i++){
            if(this.options[i].id == option.id){
            await Reservation.garInterface.remove(this.id,reservationOptionModel,"reservation",option.id,"option")
            this.options.splice(i,1)
            }
        }
       return
    }
    static async getGuestReservations(email){
        const records = await reservationModel.findAll({where:{ guestEmail : email}, order: [['createdAt', 'DESC']]})
        return Reservation.jsonToObjects(records)
    }
    static async getRoomReservations(title){
        const records = await reservationModel.findAll({where:{ roomTitle : title}, order: [['createdAt', 'DESC']]})
        return Reservation.jsonToObjects(records)
    }
    static async getGuestRoomReservations(email,title){
        const records = await reservationModel.findAll({where:{ guestEmail : email, roomTitle: title}, order: [['createdAt', 'DESC']]})
        return Reservation.jsonToObjects(records)

    }
    static async searchByDate(startDate=null, endDate=null){
        if(arrivalDate && departureDate)
         whereclause = {
            arrivalDate: {[Op.between]: [startDate, endDate]},
          departureDate: { [Op.between]: [startDate, endDate]}
        }
        else if (startDate) 
        whereclause = { [Op.or]: [
            {arrivalDate: startDate},
            {departureDate:startDate},
          ]}
        else if (endDate)
        whereclause = { [Op.or]: [
            {arrivalDate: endDate},
            {departureDate:endDate},
          ]}
        const records = await reservationModel.findAll({where:whereclause})
        return Reservation.jsonToObjects(records)
    }
    async modify(boolean,price){
        this.paid = boolean
        this.price = price
        await Reservation.crudInterface.modify(this.id,this,reservationModel,"id")
        return this
    }
    static jsonToObjects(records){
        if(records.length>0){
            let reservations = []
            for(let i =0; i<records.length;i++){
                reservations.push(new Reservation(records[i]))
                reservations[i].id = records[i].id
                reservations[i].paid = records[i].paid
            }
            return reservations
        }
        return null
    }


}
module.exports = Reservation