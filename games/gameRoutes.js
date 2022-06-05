const express = require("express");
const router = express.Router();
const controller = require("./gameController.js");
const verification = require("../config/middleware.js");

router.get("/", verification(), controller.getGames);
router.get("/:id", verification(), controller.getGameId);
router.post("/", verification(), controller.newGame);
// router.patch("/:id", controller.patchGame);
// router.delete("/:id", controller.deleteGame);

module.exports = router;
