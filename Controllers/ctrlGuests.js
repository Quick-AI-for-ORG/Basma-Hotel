const bcrypt = require('bcrypt') // for password hashing
const mysql = require("mysql");
const connection = require('../Models/Guest')


const register = async (req, res) => {



    // Connect to the MySQL database
    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL: " + err.stack);
            return;
        }
        console.log("Connected to MySQL as id " + connection.threadId);
    });
    //check if user is already registered

    let sql = `SELECT * FROM guests WHERE email = ${req.body.email} `
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error: " + error)

        }
        if (results) {
            return res.status(400).json({ message: "Email already in use" })
        }


    })
    let hashed = await bcrypt.hash(req.body.password, 12);
    sql = `INSERT INTO guests (firstName, lastName, email, password, phoneNumber, address) VALUES ('${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${hashed}', '${req.body.phoneNumber}', '${req.body.address}')`;    // let encryptedPassword = await bcrypt.hash(req.body.password, { saltRounds: 12 })




    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error("Error: " + error);
            res.status(400).json({ message: error.message });
        } else {
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
            res.redirect('/guest');
            r = results;

        }
    });




    //create
    //save


}


const login = async (req, res) => {
    //check if user is already registered
    // let found = await Guests.findOne({ email: req.body.email })
    // if (!found) {
    //     return res.status(400).json({ message: "Email not found" })
    // }
    const sql = `SELECT * FROM guests WHERE email = '${req.body.email}'`
    connection.query(sql, async (err, result) => {
        console.log(result)
        if (err) {
            console.error("Error: " + err);
            res.status(400).json({ message: err.message });
        } else {
            if (result.length === 0) {
                return res.status(400).json({ message: "Email not found" });
            }
            const isMatch = await bcrypt.compare(req.body.password, result[0].password);
            if (!isMatch) {
                return res.status(400).json({ message: "Password incorrect" });
            }
            req.session.user = {
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                email: result[0].email,
                phone: result[0].phoneNumber,
                password: result[0].password,
                address: result[0].address,
                twitter: result[0].twitterLink,
                facebook: result[0].facebookLink,
                instagram: result[0].instagramLink,
                google: "",
                bio: result[0].bio,
                role: "Guest",
            }
            res.redirect('/guest');
        }


    })


}

const deleteGuest = (req, res) => {


    sql = `DELETE FROM guests WHERE email = '${req.session.user.email}'`;
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error("Error: " + error);
            res.status(400).json({ message: error.message });
        } else {
            req.session.destroy();
            res.redirect('/');


        }
    });
}

module.exports = { register, login, deleteGuest }