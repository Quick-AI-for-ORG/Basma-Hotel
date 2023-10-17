const createRoomTableQuery = `
  CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    startingPrice DECIMAL(10, 2) NOT NULL,
    characteristics JSON NOT NULL,
    capacity INT NOT NULL,
    description TEXT NOT NULL,
    executive TINYINT(1) NOT NULL,
    imageURL VARCHAR(255) NOT NULL
  );
`;

connection.query(createRoomTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});
