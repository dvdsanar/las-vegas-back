const mongoose = require("mongoose");

const dbconect = async () => {
  await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Succes!! You are connected"))
    .catch((error) => console.log("You have a problem", error));
};

module.exports = dbconect;
