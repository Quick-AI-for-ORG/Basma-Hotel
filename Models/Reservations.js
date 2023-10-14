import mongoose from "mongoose";
const { Schema } = mongoose;

const reservationSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: "Guest",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  specialRequest: {
    type: String,
  },
}, {timestamps:true});

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
