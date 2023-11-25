const {Characteristic } = require('../Models/Room.js')

const addCharacteristic = async(req,res)=>{
    try{
    const characteristic =  Characteristic.create({
        characteristic: req.body.characteristic,
        icon: req.body.icon,
    }).then((characteristic) => {
        res.status(201).json({ message: "characteristic added successfully" }); 
    });
} catch(err){
    res.status(400).json({message:err.message})
}}

const removeCharacteristic = async(req,res)=>{
    try { await Characteristic.destroy({
        where: {
          characteristic: req.body.characteristic,
        },
      }).then((characteristic) =>{
        res.status(201).json({ message: "characteristic removed successfully" });
      })
    }
        catch(err) {
        console.error("Error: " + err);
        res.status(400).json({ message: err.message });
        }
    }

const getCharacteristics = async(req,res)=>{
    return await Characteristic.findAll();
}

const getCharacteristic = async(req,res)=>{
    return await Characteristic.findOne({where:{characteristic: req.body.characteristic}})
}

const modifyCharacteristic = async(req,res)=>{
    await Characteristic.update({
        icon: req.body.icon,
    }, {
        where: {
            characteristic: req.body.characteristic,
        }
    }).then((characteristic) => {
        if(characteristic)
        res.status(201).json({ message: "characteristic modified successfully" });
        else
        res.status(400).json({ message: "characteristic not found" });
    })
}

module.exports = {
    admin: {addCharacteristic, removeCharacteristic, getCharacteristics, getCharacteristic, modifyCharacteristic}
}
