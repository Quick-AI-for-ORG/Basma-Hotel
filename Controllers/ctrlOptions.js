const Option = require('../Models/Option.js');
const Admin = require('../Models/Admin.js');

const addOption = async(req,res)=>{
    if(req.session.user != null && req.session.user.role === 'Admin'){
        const admin = new Admin(await User.get(req.session.user.email))
        const optionJSON = {
            option : req.body.option,
            price: req.body.price
        }
        await admin.addOption(optionJSON)
        res.redirect('/admin/options')
    }
    else res.redirect('/user/login')
}

const removeOption = async(req,res)=>{
       if(req.session.user != null && req.session.user.role === 'Admin'){
        const admin = new Admin(await User.get(req.session.user.email))
        const option = await getOption(req,res)
        await admin.removeOption(option.id)
        res.redirect('/admin/options')
    }
    else res.redirect('/user/login')
}

const getOptions = async(req,res)=>{
    return await Option.getAll();
}

const getOption = async(req,res)=>{
    return await Option.get(req.body.option)
}

const modifyOption = async(req,res)=>{
    if(req.session.user != null && req.session.user.role === 'Admin'){
        const admin = new Admin(await User.get(req.session.user.email))
        const optionJSON = {
            option : req.body.option,
            price: req.body.price
        }
        const option = await getOption(req,res)
        await admin.modifyOption(option.id,optionJSON)
        res.redirect('/admin/options')
    }
    else res.redirect('/user/login')
}


module.exports = {
    admin: {addOption, removeOption, getOptions, getOption, modifyOption}
}