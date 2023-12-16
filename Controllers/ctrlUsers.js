const bcrypt = require('bcrypt')
const User  = require('../Models/User.js')
const Guest = require('../Models/Guest.js')
const Admin = require('../Models/Admin.js')
const Staff = require('../Models/Staff.js')

const register = async (req, res) => {
  let hashed = await bcrypt.hash(req.body.password, 12);
  let guestJSON = {
    firstName: req.body.fname,
    lastName: req.body.lname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: hashed,
    address: req.body.address,
    bio: "Add your bio"
  }
  const user = new Guest(guestJSON)
  await user.create();
  req.session.user = user;
  res.redirect("/user");

}

const login = async (req, res) => {
      let user = await User.login(req.body.email, req.session.password)
      if(user != null) {
      req.session.user = user;
      if(user.role=="Admin") res.redirect("/admin");
      else res.redirect("/user");
      }
      else await validateLogin(req, req)
}

const removeUser = async (req, res) => {
  let user = await User.get(req.session.user.email)
  await user.remove();
  req.session.destroy();
  res.redirect("/");
};

const modifyUser = async (req, res) => {
  if(!req.body.role) req.body.role = "Guest"
  let temp = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    address: req.body.address,
    role: req.body.role,
  }
  let user = await User.get(req.session.user.email)
  await user.modify(temp)
  req.session.user = user;
  res.redirect("/user");
}

const modifyBio = async (req, res) => {
  let user = await User.get(req.session.user.email)
  await user.modify({bio: req.body.bio})
  req.session.user.bio = req.body.bio,
  res.redirect("/user");
}


const validateSignup = async (req, res) => {
    if (await User.get(req.body.email) != null) res.send({ result: "found" });
    else res.send({ result: "not found" });
};

const validateLogin = async (req, res) => {
  if (await User.login(req.body.email, req.body.password) != null) res.send({ result: "found" });
    else res.send({ result: "not found" });
};

const getAllUsers = async (req, res) => {
  if(req.session.user != null && req.session.user.role == "Admin"){
    const admin = new Admin(await User.get(req.session.user.email))
    return await admin.getAllUsers();
  }
};

const getAllGuests = async (req, res) => {
  if(req.session.user != null && (req.session.user.role == "Admin"||req.session.user.role == "Staff")){
    const staff = new Staff(await User.get(req.session.user.email))
    return await staff.getAllGuests();
  }
};

const addUsers = async (req, res) => {
  if(req.session.user != null && req.session.user.role == "Admin"){
    let hashed = await bcrypt.hash(req.body.password, 12);
    let userJSON = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashed,
      address: req.body.address,
      role: req.body.role,
    }
    const admin = new Admin(await User.get(req.session.user.email))
    await admin.addUser(userJSON);
    res.redirect('/user/guests')
  }
  else res.redirect('/user/login')
}

const removeUsers = async(req,res) =>{
  if(req.session.user != null && req.session.user.role == "Admin"){
    const admin = new Admin(await User.get(req.session.user.email))
    await admin.removeUser(req.body.email)
    res.redirect('/admin/guests')

  }
  else res.redirect('/user/login')
}

const modifyUsers = async(req,res) =>{
  if(req.session.user != null && req.session.user.role == "Admin"){
    let userJSON = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      address: req.body.address,
      role: req.body.role,
    }
    const admin = new Admin(await User.get(req.session.user.email))
    await admin.modifyUser(req.body.email,userJSON)
    res.redirect('/admin/guests')

  }
  else res.redirect('/user/login')
}




module.exports = {
  user: { modifyUser, modifyBio, removeUser, login, validateLogin },
  guest: {register, validateSignup},
  admin:{getAllUsers, addUsers,removeUsers, modifyUsers},
  staff:{getAllGuests}
};
