const createReservationTableQuery = `
  CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    guest_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    number_of_people INT NOT NULL,
    special_request TEXT
  );
`;

connection.query(createReservationTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});
