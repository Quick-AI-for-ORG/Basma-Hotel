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

const Characteristic = sequelize.define('Characteristic', {
  characteristic: {
    type: Sequelize.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  icon: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

const RoomsCharacteristic = sequelize.define('RoomsCharacteristic', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  room: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  characteristic: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

RoomsCharacteristic.belongsTo(Room, { foreignKey: 'room' });
RoomsCharacteristic.belongsTo(Characteristic, { foreignKey: 'characteristic' });

// Create the tables if they do not exist
async function createTable() {
  await Room.sync();
  await Characteristic.sync();
  await RoomsCharacteristic.sync();
}

module.exports = { createTable, Room, Characteristic, RoomsCharacteristic };
