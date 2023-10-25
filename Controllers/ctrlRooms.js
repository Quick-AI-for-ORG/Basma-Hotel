const {Room} = require('../Models/Room.js')



const addRoom = async(req,res)=>{     
   let found = await Room.findOne({Title: req.body.title});
   if(found){
         return res.status(400).json({message:"room already exists"})
   }
   else{
    try{
    const room =  Room.create({
        Title: req.body.Title,
        quantity: req.body.quantity,
        startingPrice: req.body.startingPrice,
        characteristics: req.body.characteristics,
        capacity: req.body.capacity,
        description: req.body.description,
        executive: req.body.executive,
        imageURL: req.body.imageURL,
    }).then((room) => {
        res.status(201).json({ message: "room added successfully" }); 
    });
} catch(err){
    res.status(400).json({message:err.message})
}}
}

////////////////////////////////
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

///////////////////////////////

const getRooms = async(req,res)=>{
    const rooms = await Room.findAll();
    if(rooms.length>0)
        res.status(200).json({rooms})
    else 
        res.status(400).json({message:"no rooms found"}) 
}

////////////////////////////////////
const getRoom = async(req,res)=>{
    const room = await Room.findOne({Title: req.body.Title});
    if(room)
        res.status(200).json({room})
    else 
        res.status(400).json({message:"room not found"})
}
////////////////////////////////////

const modifyRoom = async(req,res)=>{
        await Room.update({
            quantity: req.body.quantity,
            startingPrice: req.body.startingPrice,
            characteristics: req.body.characteristics,
            capacity: req.body.capacity,
            description: req.body.description,
            executive: req.body.executive,
            imageURL: req.body.imageURL,
        }, {
            where: {
                Title: req.body.Title,
            }
        }).then((room) => {
            if(room)
            res.status(201).json({ message: "room modified successfully" });
            else
            res.status(400).json({ message: "room not found" });
        })
}

module.exports ={addRoom,removeRoom,getRooms,getRoom,modifyRoom}