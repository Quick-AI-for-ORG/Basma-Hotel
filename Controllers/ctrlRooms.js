const bcrypt = require('bcrypt') // for password hashing
const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "SWEProject",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL: " + err.stack);
        return;
    }
    console.log("Connected to MySQL as id " + connection.threadId);
});

const addRoom = async(req,res)=>{      
    let sql = `SELECT * FROM rooms WHERE title = ${req.body.title} `
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error: " + error)

        }
        if(results){        //check if room already exists
            return res.status(400).json( {message: "room already registered"})
        }
})
sql = `INSERT INTO rooms (title,quantity,startingPrice,characteristics,capacity,description,executive,imageUrl) 
VALUES ('${req.body.title}','${req.body.quantity}','${req.body.startingPrice}','${req.body.characteristics}','${req.body.capacity}','${req.body.description}','${req.body.executive}','${req.body.imageUrl}')`

connection.query(sql, (error, results) => {
    if (error) {
        console.error("Error: " + error);
        res.status(400).json({ message: error.message });
    } else {
        res.status(201).json({ message: "Room added" });
    }
console.log("room added")
})
}
////////////////////////////////
const removeRoom = async(req,res)=>{
    let sql = `DELETE FROM rooms WHERE title = ${req.body.title} `
    connection.query(sql,(error,results)=>{
        if (error) {
            console.error("Error: " + error)
        }

        if(results){
            console.log("room removed successfully")
        }
    })
    
}
///////////////////////////////
const getRooms = async(req,res)=>{
    let sql = `SELECT * FROM rooms `
    connection.query(sql, (error, results) => {
        if (error) {
            console.error("Error: " + error)

        }
        if(results){ 
            return res.json({results})
        }
})
}
////////////////////////////////////
const modifyRoom = async(req,res)=>{
    sql=`UPDATE rooms SET  (title,quantity,startingPrice,characteristics,capacity,description,executive,imageUrl) 
    VALUES ('${req.body.title}','${req.body.quantity}','${req.body.startingPrice}','${req.body.characteristics}','${req.body.capacity}','${req.body.description}','${req.body.executive}','${req.body.imageUrl}')
    where title =${req.body.title}`
    connection.query(sql,(error,results)=>{
        if (error) {
            console.error("Error: " + error)
        }

        if(results){
            console.log("room edited successfully")
        }
    })
}

module.exports ={addRoom,removeRoom,getRooms,modifyRoom}