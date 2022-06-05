const Games = require("./gameModel.js");
const results = require("../src/ArrayNumbers.js");
const Users = require("../users/usModel");

module.exports.getGames = async (req, res) => {
  try {
    if (req.query.idUser || req.query.date) {
      const filteredList = await Games.find({
        $or: [{ idUser: req.query.idUser }, { date: req.query.date }],
      });
      res.json(filteredList);
    } else {
      const list = await Games.find({});
      res.json(list);
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.getGameId = async (req, res) => {
  try {
    res.json(await Games.find({ _id: req.params.id }));
  } catch (error) {
    res.json(error);
  }
};

module.exports.newGame = async (req, res) => {
  try {
    const d = new Date();
    const getRandomNumber = () => {
      return Math.floor(Math.random() * (0 - 37)) + 37;
    };
    const number = getRandomNumber();
    const player = await Users.findOne({ _id: req.body.idUser });

    const gameToCreate = {
      idUser: req.body.idUser,
      date: d,
      betAmountColour: req.body.betAmountColour || 0,
      betAmountParity: req.body.betAmountParity || 0,
      betColour: req.body.betColour || "green",
      betParity: req.body.betParity || true,
      result: results[number],
    };

    const totalBet =
      gameToCreate.betAmountColour + gameToCreate.betAmountParity;

    if (totalBet <= player.balance) {
      const game = new Games(gameToCreate);
      await game.save();

      // Add money to user balance
      if (game.result.number === 0) {
        await Users.updateOne(
          { _id: req.body.idUser },
          {
            balance:
              player.balance -
              req.body.betAmountColour / 2 -
              req.body.betAmountParity / 2,
          }
        );
      } else {
        let balanceTotal = player.balance;
        if (game.result.colour === game.betColour) {
          balanceTotal = balanceTotal + game.betAmountColour;
        }
        if (game.result.colour !== game.betColour) {
          balanceTotal = balanceTotal - game.betAmountColour;
        }

        if (game.result.parity === game.betParity) {
          balanceTotal = balanceTotal + game.betAmountParity;
        }
        if (game.result.parity !== game.betParity) {
          balanceTotal = balanceTotal - game.betAmountParity;
        }
        await Users.updateOne(
          { _id: req.body.idUser },
          {
            balance: balanceTotal,
          }
        );
      }
      res.json(game);
    } else {
      res.send("Sorry but you can't bet this amout, try to add more credit.");
    }
  } catch (error) {
    res.json(error);
  }
};

// module.exports.patchGame = async (req, res) => {
//   try {
//     await Games.updateOne({ _id: req.params.id }, req.body);
//     res.status(200).send("You Have Modified the Game");
//   } catch (error) {
//     res.json(error);
//   }
// };

// module.exports.deleteGame = async (req, res) => {
//   try {
//     await Games.deleteOne({ _id: req.params.id });
//     res.json("Game Deleted");
//   } catch (error) {
//     res.json(error);
//   }
// };
