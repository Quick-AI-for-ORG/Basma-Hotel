const {Room} = require('../Models/Room.js')



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
    return await Room.findAll();
}

////////////////////////////////////
const getRoom = async(req,res)=>{
    return await Room.findOne({Title: req.params[0].replace(/%20/g, ' ')})
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