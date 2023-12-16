const {Characteristic } = require('../Models/Room.js')

const addCharacteristic = async(req,res)=>{
    if(req.session.user.role === 'Admin'){
    let characteristicJSON =  {
        characteristic: req.body.characteristic,
        icon: req.body.icon,
    }
    const characteristic = new Characteristic(characteristicJSON)
    await characteristic.create()
    }
    else res.redirect('/user/login')
}

const removeCharacteristic = async(req,res)=>{
    if(req.session.user.role === 'Admin')
        await Characteristic.remove(req.body.characteristic)
        else res.redirect('/user/login')
    }

const getCharacteristics = async(req,res)=>{
    return await Characteristic.getAll();
}

const getCharacteristic = async(req,res)=>{
    return await Characteristic.get(req.body.characteristic)
}

const modifyCharacteristic = async(req,res)=>{
    if(req.session.user.role === 'Admin'){
        let characteristicJSON =  {
            characteristic: req.body.characteristic,
            icon: req.body.icon,
        }
        await Characteristic.modify(req.body.option,characteristicJSON)
    }
    else res.redirect('/user/login')
    
}

module.exports = {
    admin: {addCharacteristic, removeCharacteristic, getCharacteristics, getCharacteristic, modifyCharacteristic}
}
