const bcrypt = require('bcrypt') // for password hashing
const mysql = require("mysql");



const register = async (req, res) => {

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "SWEProject",
    });

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

    console.log(req.body);
    sql = `INSERT INTO guests (firstName, lastName, email, password, phoneNumber, address) VALUES ('${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${req.body.password}', '${req.body.phoneNumber}', '${req.body.address}')`;    // let encryptedPassword = await bcrypt.hash(req.body.password, { saltRounds: 12 })



    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error("Error: " + error);
            res.status(400).json({ message: error.message });
        } else {
            res.status(201).json({ message: "User created" });

        }
    });

    req.session.user = {
        firstName: req.body.fname,
        lastName: req.body.lname,

        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password

    }


    //create


    //save


}


const login = async (req, res) => {
    //check if user is already registered
    // let found = await Guests.findOne({ email: req.body.email })
    // if (!found) {
    //     return res.status(400).json({ message: "Email not found" })
    // }
    const sql = `SELECT * FROM guests WHERE email = ${req.body.email}`

    //check if password is correct
    const isMatch = await bcrypt.compare(req.body.password, found.password)
    if (!isMatch) {
        return res.status(400).json({ message: "Password incorrect" })
    }

    //define
    res.status(200).json({ message: "User logged in" })

}

module.exports = { register, login }