const Option = require('../Models/Option.js');

const addOption = async(req,res)=>{
    if(req.session.user.role === 'Admin'){
    const optionJSON = {
        option : req.body.option,
        price: req.body.price
    }
    const option = new Option(optionJSON)
    await option.create()
    }
    else res.redirect('/user/login')
}

const removeOption = async(req,res)=>{
    if(req.session.user.role === 'Admin')
        await Option.remove(req.body.option)
        else res.redirect('/user/login')
    }

const getOptions = async(req,res)=>{
    return await Option.getAll();
}

const getOption = async(req,res)=>{
    return await Option.get(req.body.option)
}

const modifyOption = async(req,res)=>{
    if(req.session.user.role === 'Admin'){
        const optionJSON = {
            option : req.body.option,
            price: req.body.price
        }
        await Option.modify(req.body.option,optionJSON)
    }
    else res.redirect('/user/login')
}

module.exports = {
    admin: {addOption, removeOption, getOptions, getOption, modifyOption}
}