const {Room,Characteristic,RoomsCharacteristic,} = require("../Models/Room.js");
const Sequelize = require("sequelize");
const {Op} = require('sequelize');
const addRoom = async (req, res) => {
  let found = await Room.findOne({ where: { Title: req.body.Title } });
  if (found) {
    return res.status(400).json({ message: "room already exists" });
  } else {
    try {
      const room = Room.create({
        Title: req.body.Title,
        quantity: req.body.quantity,
        startingPrice: req.body.startingPrice,
        capacity: req.body.capacity,
        description: req.body.description,
        executive: req.body.executive,
        imageURL: req.body.imageURL,
      })
        .then((room) => {
          for (let i = 0; i < req.body.characteristics.length; i++) {
            const roomsCharacteristic = RoomsCharacteristic.create({
              room: req.body.Title,
              characteristic: req.body.characteristics[i],
            });
          }
        })
        .then((roomsCharacteristic) => {
          res.redirect("/admin");
        });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

const removeRoom = async (req, res) => {
  try {
    await Room.destroy({
      where: {
        Title: req.body.Title,
      },
    }).then((room) => {
      res.status(201).json({ message: "room removed successfully" });
    });
  } catch (err) {
    console.error("Error: " + err);
    res.status(400).json({ message: err.message });
  }
};

const getRooms = async (req, res) => {
  return await Room.findAll();
};

const getRoom = async (req, res) => {
  return await Room.findOne({ where: { Title: req.params.roomTitle } });
};
const sessionedRoom = async (req, res) => {
  return await Room.findOne({ where: { Title: req.session.room } });
};

const getRoomCharacteristics = async (req, res) => {
  let roomCharacteristics = await RoomsCharacteristic.findAll({
    where: { room: req.params.roomTitle },
  });
  let characteristics = [];
  for (let i = 0; i < roomCharacteristics.length; i++) {
    characteristics.push(
      await Characteristic.findOne({
        where: { characteristic: roomCharacteristics[i].characteristic },
      })
    );
  }
  return characteristics;
};
const getRoomsAndCharacteristics = async (req, res) => {
  return await Room.findAll({
    include: [{
      model: RoomsCharacteristic,
      required: true
    }]
  });
};

const getRooms_ = async () => {
  try {
    const rooms = await Room.findAll({
      include: [
        {
          model: RoomsCharacteristic,
          as: "characteristics",
          attributes: ["characteristic"],
          include: [
            {
              model: Characteristic,
              as: "characteristicDetails",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    // Process the data as needed
    const processedRooms = rooms.map((room) => {
      const roomData = room.get();
      const characteristics = roomData.characteristics.map(
        (characteristic) => characteristic.characteristicDetails.name
      );

      return {
        ...roomData,
        characteristics,
      };
    });

    return processedRooms;
  } catch (error) {
    throw error;
  }
};

const modifyRoom = async (req, res) => {
  await Room.update(
    {
      quantity: req.body.quantity,
      startingPrice: req.body.startingPrice,
      capacity: req.body.capacity,
      description: req.body.description,
      executive: req.body.executive,
      imageURL: req.body.imageURL,
    },
    {
      where: {
        Title: req.body.Title,
      },
    }
  ).then((room) => {
    let roomsCharacteristics = RoomsCharacteristic.findAll({
      where: { room: req.body.Title },
    })
      .then((roomsCharacteristics) => {
        for (let i = 0; i < roomsCharacteristics.length; i++) {
          RoomsCharacteristic.destroy({
            where: { id: roomsCharacteristics[i].id },
          });
        }
      })
      .then((roomsCharacteristic) => {
        for (let i = 0; i < req.body.characteristics.length; i++) {
          const roomsCharacteristic = RoomsCharacteristic.create({
            room: req.body.Title,
            characteristic: req.body.characteristics[i],
          });
        }
      });

    if (room) res.status(201).json({ message: "room modified successfully" });
    else res.status(400).json({ message: "room not found" });
  });
};

const findRoom = async (req, res) => {
  try {
    const input = req.body.Title;
    const search = await Room.findAll({
      where: {
        Title: {
          [Op.regexp]:`^.*${input}.*$`,
        },
      },
      
    });
    res.send(search);
  } catch (error) {
    console.error(error);
  }
};



module.exports = {
  public: { getRooms, getRoom, getRoomCharacteristics, sessionedRoom ,findRoom},
  admin: { addRoom, removeRoom, modifyRoom, getRooms ,getRoomsAndCharacteristics },
};
