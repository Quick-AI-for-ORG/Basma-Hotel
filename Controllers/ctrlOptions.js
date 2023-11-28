const {Options} = require('../Models/Reservation.js');

const addOption = async(req,res)=>{
    try{
    const option =  Options.create({
        option: req.body.option,
    }).then((option) => {
        res.status(201).json({ message: "option added successfully" }); 
    });
} catch(err){
    res.status(400).json({message:err.message})
}}

const removeOption = async(req,res)=>{
    try { await Options.destroy({
        where: {
          option: req.body.option,
        },
      }).then((option) =>{
        res.status(201).json({ message: "option removed successfully" });
      })
    }
        catch(err) {
        console.error("Error: " + err);
        res.status(400).json({ message: err.message });
        }
    }

const getOptions = async(req,res)=>{
    return await Options.findAll();
}

const getOption = async(req,res)=>{
    return await Options.findOne({where:{option: req.body.option}})
}

const modifyOption = async(req,res)=>{
    await Options.update({
        option: req.body.option,
    }, {
        where: {
            option: req.body.option,
        }
    }).then((option) => {
        if(option)
        res.status(201).json({ message: "option modified successfully" });
        else
        res.status(400).json({ message: "option not found" });
    })
}

module.exports = {
    admin: {addOption, removeOption, getOptions, getOption, modifyOption}
}