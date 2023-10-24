const Sequelize = require('sequelize');

const sequelize = new Sequelize('SWEProject', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Room = sequelize.define('Room', {
  Title: {
    type: Sequelize.STRING(255),
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  startingPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  characteristics: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  capacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  executive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

// Create the table if it does not exist
async function createTable() {
  await Room.sync();
}

module.exports = { createTable, Room };
