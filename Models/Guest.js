const Sequelize = require('sequelize');

const sequelize = new Sequelize('SWEProject', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Guest = sequelize.define('Guest', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  cardNumber: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: '0000 0000 0000 0000',
  },
  expirationDate: {
    type: Sequelize.STRING(10),
    allowNull: false,
    defaultValue: '01/25',
  },
  cvv: {
    type: Sequelize.STRING(5),
    allowNull: false,
    defaultValue: '000',
  },
  role: {
    type: Sequelize.STRING(10),
    allowNull: false,
    defaultValue: 'Guest',
  },
  bio: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'No bio yet',
  },
  address: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'No address yet',
  },
});

async function createTable() {
  await Guest.sync();
}

module.exports = {createTable, Guest};