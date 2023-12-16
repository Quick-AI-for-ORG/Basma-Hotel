const Room = require("../Models/Room.js");
const Characteristic = require("../Models/Characteristic.js");

const addRoom = async (req, res) => {
      const roomJSON = {
        title: req.body.Title,
        quantity: req.body.quantity,
        startingPrice: req.body.startingPrice,
        capacity: req.body.capacity,
        description: req.body.description,
        executive: req.body.executive,
        imageURL: req.body.imageURL,
      }
      const room = new Room(roomJSON)
      await room.create()
      const characteristics = await Characteristic.getAll()
      for(let i = 0; i < characteristics.length; i++) {
        if(req.body[`${characteristics[i].characteristic}`]){
          if(req.body[`${characteristics[i].characteristic}`] == 'on')
          await room.addRoomCharacteristic(characteristics[i].characteristic)
        }
      }
}
        

const removeRoom = async (req, res) => {
  await Room.remove(req.body.title)
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
  return await Room.findAll({
    include: [{
      model: RoomsCharacteristic,
      required: true
    }]
  });
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
