const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  date: Date,
  betAmountColour: Number,
  betAmountParity: Number,
  betColour: String,
  betParity: Boolean,
  result: Object,
});
const Model = mongoose.model("Games", Schema);
module.exports = Model;
