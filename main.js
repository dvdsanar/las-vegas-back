const express = require("express");
const app = express();
const dbconect = require("./config/connection.js");
const dotenvProject = require("dotenv");
const usRoutes = require("./users/usRoutes.js");

dotenvProject.config();

dbconect();

app.use(express.json());

app.listen(process.env.PORT, () => console.log("Succes!! Server is running"));

app.use("/users", usRoutes);
