import mongoose from "mongoose";
const { Schema } = mongoose;

const guestSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  yearOfBirth: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    cardNumber: {
      type: String,
      required: true,
      default: "0000 0000 0000 0000",
    },
    expirationDate: {
      type: String,
      required: true,
      default: "01/25",
    },
    cvv: {
      type: String,
      required: true,
      default: "000",
    },
  },
});

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
