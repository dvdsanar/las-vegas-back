const Users = require("./usModel.js");
const jwt = require("jsonwebtoken");

module.exports.getUsers = async (req, res) => {
  try {
    if (req.query.name || req.query.email || req.query.id) {
      const filteredList = await Users.find({
        $or: [
          { name: req.query.name },
          { email: req.query.email },
          { _id: req.query.id },
        ],
      });
      res.json(filteredList);
    } else {
      const list = await Users.find({});
      res.json(list);
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports.getUserId = async (req, res) => {
  try {
    res.json(await Users.findOne({ _id: req.params.id }));
  } catch (error) {
    res.json(error);
  }
};

module.exports.newUser = async (req, res) => {
  try {
    const userToCreate = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rol: "user",
      card: 0000,
      balance: 5,
    };
    const usuario = new Users(userToCreate);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.json(error);
  }
};

module.exports.patchUser = async (req, res) => {
  try {
    await Users.updateOne({ _id: req.params.id }, req.body);
    res.status(200).send("User modified");
  } catch (error) {
    res.json(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await Users.deleteOne({ _id: req.params.id });
    res.json("User eliminated");
  } catch (error) {
    res.json(error);
  }
};

module.exports.addCard = async (req, res) => {
  try {
    await Users.updateOne({ _id: req.params.id }, { card: req.body.card });
    res.status(200).send("You modified your card");
  } catch (error) {
    res.json(error);
  }
};

module.exports.addBalance = async (req, res) => {
  try {
    const userToAddMoney = await Users.findOne({ _id: req.params.id });
    await Users.updateOne(
      { _id: req.params.id },
      { balance: userToAddMoney.balance + req.body.balance }
    );
    res.status(200).send("You add " + req.body.balance + " to your balance");
  } catch (error) {
    res.json(error);
  }
};

module.exports.getToken = async (req, res) => {
  try {
    const user = await Users.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        { id: user._id, rol: user.rol },
        process.env.JWT_KEY
      );
      res.json({ token: token, id: user._id, rol: user.rol });
    } else {
      res.status(401).send("Sorry, you have to register to login");
    }
  } catch (error) {
    res.json(error);
  }
};
