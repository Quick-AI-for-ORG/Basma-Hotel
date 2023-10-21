const createRoomTableQuery = `
  CREATE TABLE IF NOT EXISTS rooms (
    Title VARCHAR(255) PRIMARY KEY,
    quantity int NOT NULL,
    startingPrice DECIMAL(10, 2) NOT NULL,
    characteristics JSON NOT NULL,
    capacity INT NOT NULL,
    description TEXT NOT NULL,
    executive TINYINT(1) NOT NULL,
    imageURL VARCHAR(255) NOT NULL
  );
`;
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SWEProject",
});
connection.query(createRoomTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});
