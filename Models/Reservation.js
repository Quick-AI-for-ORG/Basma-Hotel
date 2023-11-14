const Sequelize = require("sequelize");
const { Room } = require("./Room");
const { Guest } = require("./Guest");
const sequelize = new Sequelize("SWEProject", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Reservation = sequelize.define("Reservation", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  room_Title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  guest_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_date: { 
    type: Sequelize.DATE,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  number_of_people: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  special_request: Sequelize.TEXT,
});

// Define the foreign key constraints
Reservation.belongsTo(Room, {
  foreignKey: "room_Title",
});

Reservation.belongsTo(Guest, {
  foreignKey: "guest_email",
});

// Create the table if it does not exist
async function createTable() {
  await Reservation.sync();
}

module.exports = { createTable, Reservation };
