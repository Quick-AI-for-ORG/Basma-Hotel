const createReservationTableQuery = `
  CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_Title VARCHAR(255) NOT NULL,
    guest_email STRING NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    number_of_people INT NOT NULL,
    special_request TEXT
    FOREIGN KEY (id) REFERENCES guests (id) ON DELETE CASCADE
    FOREIGN KEY (Title) REFERENCES rooms (Title) ON DELETE CASCADE
  );
`;
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SWEProject",
});
connection.query(createReservationTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});
