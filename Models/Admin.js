const Staff = require('./Staff')
const Characteristic = require('./Characteristic')
const Room = require('./Room')
const Reservation = require('./Reservation')
const Guest = require('./Guest')
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
      let option = await Option.get(id)
      await option.modify(optionJSON)
      return option
    }
    async modifyCharacteristic(characteristic,characteristicJSON){
      let characteristic = await Characteristic.get(characteristic)
      await characteristic.modify(characteristicJSON)
      return characteristic
    }
    async addStaff(staffJSON){
      let staff = new Staff(staffJSON)
      await staff.create()
      return staff
  }

  async removeStaff(email){
      await Staff.remove(email)
      return true
  }
  async addAdmin(adminJSON){
    let admin = new Admin(adminJSON)
    await admin.create()
    return admin
  }
  async removeAdmin(email){
    await Admin.remove(email)
    return true
  }
  async removeGuest(email){
    await Guest.remove(email)
    return true
  }

  async modifyStaff(email,staffJSON){
    let staff = await Staff.get(email)
    await staff.modify(staffJSON)
    return staff
  }
  async modifyAdmin(email,adminJSON){
    let admin = await Admin.get(email)
    await admin.modify(adminJSON)
    return admin
  }
  async modifyGuest(email,guestJSON){
    let guest = await Guest.get(email)
    await guest.modify(guestJSON)
    return guest
  }


 }
 module.exports = Admin