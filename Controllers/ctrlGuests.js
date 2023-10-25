const bcrypt = require('bcrypt') // for password hashing
const { Guest } = require('../Models/Guest.js');

const register = async (req, res) => {

    //check if user is already registered
    Guest.findOne({ where: { email: req.body.email } }).then(async (user) => {
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
    })
    let hashed = await bcrypt.hash(req.body.password, 12);
    let user = Guest.create({
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashed,
        address: req.body.address,
        twitterLink: "",
        facebookLink: "",
        instagramLink: "",
        googleLink: "",
        bio: "",
        role: "Guest",
    }).then((user) => {
        req.session.user = user

            res.redirect('/guest');

    });




    //create
    //save


}


const login = async (req, res) => {

    const guestRecord = await Guest.findOne({
        where: {
          email: req.body.email,
        },
      });
    
      // If the guest record does not exist, return an error
      if (!guestRecord) {
         let err = new Error('Email not found');
         res.status(400).json({ message: err.message })
      }
        else{  const isMatch = await bcrypt.compare(req.body.password, guestRecord.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Password incorrect" });
            }
            else {
                req.session.user = guestRecord
                res.redirect('/guest');
            }

        }}



const deleteGuest =async (req, res) => {

   try { await Guest.destroy({
        where: {
          email: req.session.user.email,
        },
      }) }
      catch(err) {
        console.error("Error: " + err);
        res.status(400).json({ message: err.message });
      }
            req.session.destroy();
            res.redirect('/');


    }

const updateGuest = async (req, res) => {
    console.log(req.body);
    try{
    await Guest.update({
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        address: req.body.address,
    }, {
        where: {
            email: req.session.user.email,
        }
    
    })


} catch(err){
    console.error("Error: " + err);
    res.status(400).json({ message: err.message });
}
            req.session.user = {
                firstName: req.body.fname,
                lastName: req.body.lname,
                email: req.body.email,
                phone: req.body.phoneNumber,
                password: req.body.password,
                address: req.body.address,
                twitter: "",
                facebook: "",
                instagram: "",
                google: "",
                bio: "",
                role: "Guest",

            }
            // res.redirect('/guest');

        }



module.exports = { register, login, deleteGuest, updateGuest }