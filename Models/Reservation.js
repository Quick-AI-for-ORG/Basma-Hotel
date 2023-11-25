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
  
});
const Options = sequelize.define('Options', {
  option: {
    type: Sequelize.STRING(255),
    allowNull: false,
    primaryKey: true,
  }
});

const reservationOptions = sequelize.define('ReservationOption', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  option: {
    type: Sequelize.STRING(255),
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
Reservation.hasMany(reservationOptions, {
  foreignKey: "reservation", onDelete: 'CASCADE' 
});
Options.hasMany(reservationOptions, {
  foreignKey: "option", onDelete: 'CASCADE' 
});
reservationOptions.belongsTo(Reservation, { foreignKey: 'id' });
reservationOptions.belongsTo(Options, { foreignKey: 'option' });

async function createTable() {
  await Reservation.sync();
  await Options.sync();
  await reservationOptions.sync();
}
module.exports = { createTable, Reservation, Options, reservationOptions };
