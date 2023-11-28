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
  roomTitle: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  guestEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endDate: { 
    type: Sequelize.DATE,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  numberOfAdults: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  numberOfChildren: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  paid: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  },
  
});
const Option = sequelize.define('Options', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  option: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2), // Assuming a decimal type for price, adjust as needed
    allowNull: false,
  },
});

const reservationOption = sequelize.define('ReservationOption', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  option: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reservation: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Reservation.belongsTo(Room, {
  foreignKey: "roomTitle", onDelete: 'CASCADE' 
});

Reservation.belongsTo(Guest, {
  foreignKey: "guestEmail", onDelete: 'CASCADE' 
});
Guest.hasMany(Reservation, {
  foreignKey: "guestEmail", onDelete: 'CASCADE' 
});
Room.hasMany(Reservation, {
  foreignKey: "roomTitle", onDelete: 'CASCADE' 
});
Reservation.hasMany(reservationOption, {
  foreignKey: "reservation", onDelete: 'CASCADE' 
});
Option.hasOne(reservationOption, {
  foreignKey: "option", onDelete: 'CASCADE' 
});
reservationOption.belongsTo(Reservation, { foreignKey: 'reservation' });
reservationOption.belongsTo(Option, { foreignKey: 'option' });

async function createTable() {
  await Reservation.sync();
  await Option.sync();
  await reservationOption.sync();
}
module.exports = { createTable, Reservation, Option, reservationOption };
