const Characteristic  = require('../Models/Characteristic.js')
const Admin = require('../Models/Admin.js')
const User = require("../Models/User.js")
const addCharacteristic = async(req,res)=>{
    if(req.session.user != null && req.session.user.role === 'Admin'){
        const admin = new Admin(await User.get(req.session.user.email))
        let characteristicJSON =  {
            characteristic: req.body.characteristic,
            icon: req.body.icon,
        }
        await admin.addCharacteristic(characteristicJSON)
        res.redirect('/admin/characteristics')
    }
    else res.redirect('/user/login')
}

const removeCharacteristic = async(req,res)=>{
    if(req.session.user != null && req.session.user.role === 'Admin'){
        const admin = new Admin(await User.get(req.session.user.email))
        await admin.removeCharacteristic(req.body.characteristic)
        res.redirect('/admin/characteristics')
    }
        else res.redirect('/user/login')
    }

const getCharacteristics = async(req,res)=>{
    return await Characteristic.getAll();
}

const getCharacteristic = async(req,res)=>{
    return await Characteristic.get(req.body.characteristic)
}

const modifyCharacteristic = async(req,res)=>{
    if(req.session.user != null && req.session.user.role === 'Admin'){
        const admin = new Admin(await User.get(req.session.user.email))
        let characteristicJSON =  {
            characteristic: req.body.characteristic,
            icon: req.body.icon,
        }
        await admin.modifyCharacteristic(req.body.characteristic,characteristicJSON)
        res.redirect('/admin/characteristics')
    }
    else res.redirect('/user/login')
}

module.exports = {
    admin: {addCharacteristic, removeCharacteristic, getCharacteristics, getCharacteristic, modifyCharacteristic}
}
