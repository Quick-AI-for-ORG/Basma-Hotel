const createRoomTableQuery = `
  CREATE TABLE IF NOT EXISTS questions (
    email varchar(255) NOT NULL,
    message varchar(255) NOT NULL
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
