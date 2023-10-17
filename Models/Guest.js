const createTableQuery = `
  CREATE TABLE IF NOT EXISTS guests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    yearOfBirth INT NOT NULL,
    cardNumber VARCHAR(20) NOT NULL DEFAULT '0000 0000 0000 0000',
    expirationDate VARCHAR(10) NOT NULL DEFAULT '01/25',
    cvv VARCHAR(5) NOT NULL DEFAULT '000'
  );
`;

connection.query(createTableQuery, (error, results) => {
  if (error) {
    console.error("Error creating table: " + error);
    return;
  }
  console.log("Table created successfully.");
});
