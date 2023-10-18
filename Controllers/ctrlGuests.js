const bcrypt = require('bcrypt') // for password hashing
const Guests = require('../Models/Guest') //guest schema

const register = async (req, res) => {

    //check if user is already registered

    let sql = `SELECT * FROM guests WHERE email = ${req.body.email} `
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error: " + error)

        }
        if (results.length > 0) {
            return res.status(400).json({ message: "Email already in use" })
        }


    })

    sql = `INSERT INTO guests (firstName, lastName, email, password, phoneNumber, yearOfBirth,) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [req.body.fname, req.body.lname, req.body.email, await bcrypt.hash(req.body.password, 12), req.body.phoneNumber, req.body.yearOfBirth];

    try {
        const [rows, fields] = await connection.execute(sql, values);
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(400).json({ message: error.message });
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