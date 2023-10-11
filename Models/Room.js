import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  characteristics: {
    type: Boolean,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  executive: {
    type: Boolean,
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
