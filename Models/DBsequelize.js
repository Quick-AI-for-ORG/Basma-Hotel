const Sequelize = require('sequelize');
const sequelize = new Sequelize('SWEProject', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});


const userModel = sequelize.define('User', {
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
      unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 255], 
    },
    },
    phoneNumber: {
      type: Sequelize.STRING(20),
      allowNull: false,
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


  const questionModel = sequelize.define('Question', {
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  });
  
  questionModel.belongsTo(userModel, {
    foreignKey: 'email', onDelete: 'CASCADE' 
  });
  userModel.hasMany(questionModel, {
    foreignKey: 'email', onDelete: 'CASCADE' 
  });


  const roomModel = sequelize.define('Room', {
    title: {
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
  
  const characteristicModel = sequelize.define('Characteristics', {
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
  
  const roomCharacteristicModel = sequelize.define('RoomsCharacteristic', {
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
  
  roomCharacteristicModel.belongsTo(roomModel, { foreignKey: 'room' , onDelete: 'CASCADE' });
  roomCharacteristicModel.belongsTo(characteristicModel, { foreignKey: 'characteristic' , onDelete: 'CASCADE' });
  roomModel.hasMany(roomCharacteristicModel, { foreignKey: 'room' , onDelete: 'CASCADE' });
  characteristicModel.hasMany(roomCharacteristicModel, { foreignKey: 'characteristic' , onDelete: 'CASCADE' });
  

  const reservationModel = sequelize.define('Reservation', {
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
    arrivalDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    departureDate: { 
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
  const optionModel = sequelize.define('Option', {
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
      type: Sequelize.DECIMAL(10, 2), 
      allowNull: false,
    },
  });
  
  const reservationOptionModel = sequelize.define('ReservationsOption', {
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
  
  reservationModel.belongsTo(roomModel, {
    foreignKey: "roomTitle", onDelete: 'CASCADE' 
  });
  
  reservationModel.belongsTo(userModel, {
    foreignKey: "guestEmail", onDelete: 'CASCADE' 
  });
  userModel.hasMany(reservationModel, {
    foreignKey: "guestEmail", onDelete: 'CASCADE' 
  });
  roomModel.hasMany(reservationModel, {
    foreignKey: "roomTitle", onDelete: 'CASCADE' 
  });
  reservationModel.hasMany(reservationOptionModel, {
    foreignKey: "reservation", onDelete: 'CASCADE' 
  });
  optionModel.hasOne(reservationOptionModel, {
    foreignKey: "option", onDelete: 'CASCADE' 
  });
  reservationOptionModel.belongsTo(reservationModel, { foreignKey: 'reservation' });
  reservationOptionModel.belongsTo(optionModel, { foreignKey: 'option' });
  
  
  async function createTables() {
    await userModel.sync();
    await questionModel.sync()
    await roomModel.sync();
    await characteristicModel.sync();
    await roomCharacteristicModel.sync();
    await reservationModel.sync();
    await optionModel.sync();
    await reservationOptionModel.sync();
  }

module.exports = { createTables, userModel, questionModel, roomModel, characteristicModel, roomCharacteristicModel, reservationModel, optionModel, reservationOptionModel };