const Staff = require('./Staff')
const Characteristic = require('./Characteristic')
const Room = require('./Room')
const User = require('./User')
const Option = require('./Option')
class Admin extends Staff{
    constructor(adminJSON) {
      super(adminJSON, "Admin")
    }
    static async get(email){
      const user = await Staff.crudInterface.get(email,userModel,"email")
      if(user) return new Admin(user) 
      else return null
    }
    async getAllCharacteristics(){
      return await Characteristic.getAll()
    }
    async getAllUsers(){
      return await User.getAll()
    }
    async getAllOptions(){
      return await Option.getAll()
    }
   async addRoom(roomJSON){
    let room = new Room(roomJSON)
    await room.create()
    return room
    }
    async addOption(optionJSON){
      let option = new Option(optionJSON)
      await option.create()
      return option
    }
    async addCharacteristic(characteristicJSON){
      let characteristic = new Characteristic(characteristicJSON)
      await characteristic.create()
      return characteristic
    }
    async removeRoom(title){
      await Room.remove(title)
      return true
    }
    async removeOption(id){
      await Option.remove(id)
      return true
    }
    async removeCharacteristic(characteristic){
      await Characteristic.remove(characteristic)
      return true
    }
    async modifyRoom(title,roomJSON){
      let room = await Room.get(title)
      await room.modify(roomJSON)
      return room
    }
    async modifyOption(id,optionJSON){
      await Option.modify(id,optionJSON)
      return true
    }
    async modifyCharacteristic(key,characteristicJSON){
      let characteristic = await Characteristic.get(key)
      await characteristic.modify(characteristicJSON)
      return characteristic
    }
    async addUser(userJSON){
      let user = new User(userJSON,userJSON.role)
      await user.create()
      return user
    }
    async removeUser(email){
      if (email == 'admin@basmahotel.com')
      return false
      await User.remove(email)
      return true
    }
    async modifyUser(email,userJSON){
      if (email == 'admin@basmahotel.com')
      return false
      let user = await User.get(email)
      await user.modify(userJSON)
      return user
    }


 }
 module.exports = Admin