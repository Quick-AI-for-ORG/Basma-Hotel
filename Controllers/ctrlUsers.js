const bcrypt = require('bcrypt')
const User  = require('../Models/User.js')
const Guest = require('../Models/Guest.js')


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
      res.redirect("/user");
      }
      else await checkLogin(req, req)
}

const removeUser = async (req, res) => {
  req.session['user'].remove();
  req.session.destroy();
  res.redirect("/");
};

const modifyUser = async (req, res) => {
  let temp = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    address: req.body.address,
    role: req.body.user.role,
  }
  req.session['user'].modify(temp)
  res.redirect("/user");
}

const modifyBio = async (req, res) => {
  req.sessions['user'].modify({bio: req.body.bio})
  req.session.user.bio = req.body.bio,
  res.redirect("/user");
}


const validateSignup = async (req, res) => {
    if (await User.get(req.body.mail) != null) res.send({ result: "found" });
    else res.send({ result: "not found" });
};

const validateLogin = async (req, res) => {
  if (await User.login(req.body.mail) != null) res.send({ result: "found" });
    else res.send({ result: "not found" });
};




module.exports = {
  user: { modifyUser, modifyBio, removeUser, login, validateLogin },
  guest: {register, validateSignup},
};
