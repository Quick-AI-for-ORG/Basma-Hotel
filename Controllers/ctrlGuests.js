const bcrypt = require('bcrypt') // for password hashing
const Guests = require('../Models/Guest') //guest schema

const register = async(req,res) => {

    //check if user is already registered
    let found = await Guests.findOne({email: req.body.email})
    if(found){
        return res.status(400).json({message: "Email already in use"})
    }

    //create
    const guest = new Guests({
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password,12),
        phoneNumber: req.body.phoneNumber,
        yearOfBirth: req.body.yearOfBirth,
    })

    //save
    try {
        await guest.save()
        res.status(201).json({message: "User created"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }

}


const login = async(req,res) => {
    //check if user is already registered
    let found = await Guests.findOne({email: req.body.email})
    if(!found){
        return res.status(400).json({message: "Email not found"})
    }

    //check if password is correct
    const isMatch = await bcrypt.compare(req.body.password, found.password)
    if(!isMatch){
        return res.status(400).json({message: "Password incorrect"})
    }
    
    //define
    res.status(200).json({message: "User logged in"})

}

module.exports = {register, login}