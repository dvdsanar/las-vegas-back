const express = require("express");
const router = express.Router();
const controller = require("./gameController.js");

router.get("/", controller.getGames);
router.get("/:id", controller.getGameId);
router.post("/", controller.newGame);
// router.patch("/:id", controller.patchGame);
// router.delete("/:id", controller.deleteGame);

module.exports = router;
