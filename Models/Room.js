
const {roomModel, roomCharacteristicModel} = require('./DBsequelize')
const crudInterface = require('./CRUD');
const Characteristic = require('./Characteristic')
const garInterface = require('./GAR')
const {Op} = require('sequelize')
class Room {
    static crudInterface = crudInterface;
    static garInterface = garInterface;
    constructor(roomJSON){
        this.jsonToObject(roomJSON)
        this.characteristics = []
    }
    jsonToObject(roomJSON){
        this.title = roomJSON.title,
        this.quantity = roomJSON.quantity,
        this.startingPrice = roomJSON.startingPrice,
        this.capacity = roomJSON.capacity,
        this.description = roomJSON.description,
        this.executive = roomJSON.executive,
        this.imageURL = roomJSON.imageURL
    }
    async create(){
        await Room.crudInterface.create(this,roomModel,"title") 
    }
    static async modify(title,newRoom){
        const room = await Room.crudInterface.modify(title,newRoom,roomModel,"title") 
         this.jsonToObject(room)
     }
     static async remove(title){
        await Room.crudInterface.remove(title,roomModel,"title") 
        return null;
     }
     static async get(title){
       const room = await Room.crudInterface.get(title,roomModel,"title")
       if(room) return new Room(room) 
       else return null
     }
     static async getAll(){
       const records = await Room.crudInterface.getAll(roomModel) 
       let rooms = []
       if(records.length > 0){
       for(let i = 0; i < records.length; i++){
         rooms.push(new Room(records[i]))
       }
       return rooms
    }
    return null
    }

    async getRoomCharacteristics(){
        const records = await Room.garInterface.get(this.title,roomCharacteristicModel,"room")
        if(!records) return null
        let characteristics = []
        for(let i = 0; i < records.length; i++){
            characteristics.push(await Characteristic.get(records[i].characteristic))
        }
        return characteristics
    }
    async addRoomCharacteristic(characteristic){
        for(let i = 0; i < this.characteristics.length; i++){
            if(this.characteristics[i].characteristic == characteristic)
            return
        }
        await Room.garInterface.add(this.title,roomCharacteristicModel,"room",characteristic,"characteristic")
        this.characteristics.push(Characteristic.get(characteristic))
    }
    async removeRoomCharacteristic(characteristic){
        for(let i = 0; i < this.characteristics.length; i++){
            if(this.characteristics[i].characteristic == characteristic){
            await Room.garInterface.remove(this.title,roomCharacteristicModel,"room",characteristic,"characteristic")
            this.characteristics.splice(i,1)
            }
        }
       return
    }

    static async searchByTitle(regExTitle){
       const records = await roomModel.findAll({where : { title: {[Op.regexp]:`^.*${regExTitle}.*$`,}}})
       let searchedRooms = []
       if(records.length > 0){
       for(let i = 0; i < records.length; i++){
        searchedRooms.push(new Room(records[i]))
       }
       return searchedRooms
    }
    return null
    }
    

}
module.exports = Room