const {Room, Characteristic, RoomsCharacteristic} = require('../Models/Room.js')
const Sequelize = require('sequelize');
const {Op} = require('sequelize');
const addRoom = async(req,res)=>{     
   let found = await Room.findOne({ where:{Title: req.body.Title}});
   if(found){
         return res.status(400).json({message:"room already exists"})
   }
   else{
    try{
    const room =  Room.create({
        Title: req.body.Title,
        quantity: req.body.quantity,
        startingPrice: req.body.startingPrice,
        capacity: req.body.capacity,
        description: req.body.description,
        executive: req.body.executive,
        imageURL: req.body.imageURL,
    }).then((room) => {
        for (let i = 0; i < req.body.characteristics.length; i++) {
        const roomsCharacteristic =  RoomsCharacteristic.create({
            room: req.body.Title,
            characteristic: req.body.characteristics[i],
        })}}).then((roomsCharacteristic) => {
        res.redirect('/admin')
    });
} catch(err){
    res.status(400).json({message:err.message})
}}
}

const removeRoom = async(req,res)=>{
    try { await Room.destroy({
        where: {
          Title: req.body.Title,
        },
      }).then((room) =>{
        res.status(201).json({ message: "room removed successfully" });
      })
    }
      catch(err) {
        console.error("Error: " + err);
        res.status(400).json({ message: err.message });
      }
    }


const getRooms = async(req,res)=>{
    return await Room.findAll();
}

const getRoom = async(req,res)=>{

    return await Room.findOne({where:{Title: req.params.roomTitle}})
}
const sessionedRoom = async(req,res)=>{
    return await Room.findOne({where:{Title: req.session.room}})
}

const getRoomCharacteristics = async(req,res)=>{
  let roomCharacteristics = await RoomsCharacteristic.findAll({where:{room: req.params.roomTitle}})
  let characteristics = []
  for(let i = 0; i<roomCharacteristics.length; i++){
    characteristics.push(await Characteristic.findOne({where:{characteristic: roomCharacteristics[i].characteristic}}))
  }
  return characteristics
}

const modifyRoom = async(req,res)=>{
        await Room.update({
            quantity: req.body.quantity,
            startingPrice: req.body.startingPrice,
            capacity: req.body.capacity,
            description: req.body.description,
            executive: req.body.executive,
            imageURL: req.body.imageURL,
        }, {
            where: {
                Title: req.body.Title,
            }
        }).then((room) => {

           let roomsCharacteristics = RoomsCharacteristic.findAll({where:{room: req.body.Title}}).then((roomsCharacteristics) => {
                for (let i = 0; i < roomsCharacteristics.length; i++) {
                    RoomsCharacteristic.destroy({where:{id: roomsCharacteristics[i].id}})
                }
            }).then((roomsCharacteristic) => {
                for (let i = 0; i < req.body.characteristics.length; i++) {
                    const roomsCharacteristic =  RoomsCharacteristic.create({
                        room: req.body.Title,
                        characteristic: req.body.characteristics[i],
                    })
                }
            })

            if(room)
            res.status(201).json({ message: "room modified successfully" });
            else
            res.status(400).json({ message: "room not found" });
        })
}

const findRoom = async (req, res) => {
  try {
    const input = req.body.Title;
    console.log(input);

    const search = await Room.findAll({
      where: {
        Title: {
          // Use [Op.iLike] for case-insensitive LIKE query
          [Op.regexp]: `^${input}.*`,
        },
      },
      limit: 10,
    });

    console.log(search);
    res.send(search);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};



module.exports ={
    public: {getRooms,getRoom, getRoomCharacteristics, sessionedRoom,findRoom},
    admin: {addRoom,removeRoom,modifyRoom}
}