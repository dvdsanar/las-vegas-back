const express = require("express");
const router = express.Router();
const controller = require("./usController.js");

router.get("/", controller.getUsers); //Cualquier rol puede acceder al no tener ningún parametro el middleware
router.get("/:id", controller.getUserId);
router.post("/", controller.newUser); //Solo puede acceder el rol admin
router.patch("/:id", controller.patchUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
