const Room = require("../Models/Room.js");
const Characteristic = require("../Models/Characteristic.js");
const Admin = require("../Models/Admin.js");
const addRoom = async (req, res) => {
  if(req.session.user != null && req.session.user.role == "Admin"){

      const roomJSON = {
        title: req.body.Title,
        quantity: req.body.quantity,
        startingPrice: req.body.startingPrice,
        capacity: req.body.capacity,
        description: req.body.description,
        executive: req.body.executive,
        imageURL: req.body.imageURL,
      }
      const admin = new Admin(await User.get(req.session.user.email))
      await admin.addRoom(roomJSON)
      const room =  await Room.get(roomJSON.title)
      const characteristics = await Characteristic.getAll()
      for(let i = 0; i < characteristics.length; i++) {
        if(req.body[`${characteristics[i].characteristic}`]){
          if(req.body[`${characteristics[i].characteristic}`] == 'on')
          await room.addRoomCharacteristic(characteristics[i].characteristic)
        }
      }
      res.redirect('/admin/rooms')
  }
  else res.redirect('/user/login')
}

const removeRoom = async (req, res) => {
  if(req.session.user != null && req.session.user.role == "Admin"){

  await Room.remove(req.body.title)
  }
}

const getRooms = async (req, res) => {
  return await Room.getAll();
};

const getRoom = async (req, res) => {
  return await Room.get(req.params.roomTitle);
};

const sessionedRoom = async (req, res) => {
  return await Room.get(req.session.room);
};

const getRoomCharacteristics = async (req, res) => {
  const room = await Room.get(req.params.roomTitle)
  return await room.getRoomCharacteristics()
};
const getRoomsAndCharacteristics = async (req, res) => {
  let rooms = await Room.getAll()
  for (let i = 0; i < rooms.length; i++) {
    rooms[i].characteristics = await rooms[i].getRoomCharacteristics()
  }
  return rooms
};


const modifyRoom = async (req, res) => {

   let roomJSON = {
      quantity: req.body.quantity,
      startingPrice: req.body.startingPrice,
      capacity: req.body.capacity,
      description: req.body.description,
      executive: req.body.executive,
      imageURL: req.body.imageURL,
    }
    const room = await Room.modify(req.body.title,roomJSON)  
    const characteristics = await Characteristic.getAll()
      for(let i = 0; i < characteristics.length; i++) {
        if(req.body[`${characteristics[i].characteristic}`]){
          if(req.body[`${characteristics[i].characteristic}`] == 'on')
          await room.addRoomCharacteristic(characteristics[i].characteristic)
        else await room.removeRoomCharacteristic(characteristics[i].characteristic)
        }
      }
}



const findRoom = async (req, res) => {
 res.send( await Room.searchByTitle(req.body.title))
};



module.exports = {
  public: { getRooms, getRoom, getRoomCharacteristics, sessionedRoom ,findRoom},
  admin: { addRoom, removeRoom, modifyRoom, getRooms ,getRoomsAndCharacteristics },
};
