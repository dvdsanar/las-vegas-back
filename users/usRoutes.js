const express = require("express");
const router = express.Router();
const controller = require("./usController.js");
const verification = require("../config/middleware.js");

router.get("/", verification(), controller.getUsers);
router.get("/:id", verification(), controller.getUserId);
router.post("/", controller.newUser);
router.patch("/:id", verification(), controller.patchUser);
router.delete("/:id", verification("admin"), controller.deleteUser);
router.patch("/card/:id", verification(), controller.addCard);
router.patch("/balance/:id", verification(), controller.addBalance);

router.post("/login", controller.getToken);

module.exports = router;
