const express = require("express");
const router = express.Router();
const controller = require("./usController.js");

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserId);
router.post("/", controller.newUser);
router.patch("/:id", controller.patchUser);
router.delete("/:id", controller.deleteUser);
router.patch("/card/:id", controller.addCard);
router.patch("/balance/:id", controller.addBalance);

router.post("/login", controller.getToken);

module.exports = router;
