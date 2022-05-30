const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  date: Date,
  bet: String,
  result: Number,
});
const Model = mongoose.model("Games", Schema);
module.exports = Model;
