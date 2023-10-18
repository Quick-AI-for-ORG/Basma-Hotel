const createTableQuery = `
  CREATE TABLE IF NOT EXISTS guests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    cardNumber VARCHAR(20) NOT NULL DEFAULT '0000 0000 0000 0000',
    expirationDate VARCHAR(10) NOT NULL DEFAULT '01/25',
    cvv VARCHAR(5) NOT NULL DEFAULT '000',
    role VARCHAR(10) NOT NULL DEFAULT 'Guest',
    bio VARCHAR(255) NOT NULL DEFAULT 'No bio yet',
    address VARCHAR(255) NOT NULL DEFAULT 'No address yet',
    instagramLink VARCHAR(255),
    facebookLink VARCHAR(255),
    twitterLink VARCHAR(255)
  );
`;
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SWEProject",
});
connection.query(createTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});
