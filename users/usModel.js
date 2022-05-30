const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  rol: String,
  card: Number,
  balance: Number,
});
const Model = mongoose.model("Users", Schema);
module.exports = Model;
