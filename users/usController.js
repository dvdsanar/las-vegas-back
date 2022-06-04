const Users = require("./usModel.js");

module.exports.getUsers = async (req, res) => {
  try {
    if (req.query.name || req.query.email) {
      const filteredList = await Users.find({
        $or: [{ name: req.query.name }, { email: req.query.email }],
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
    res.json(await Users.find({ _id: req.params.id }));
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
      balance: 0.0,
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
    res.status(200).send("Usuario modificado");
  } catch (error) {
    res.json(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    await Users.deleteOne({ _id: req.params.id });
    res.json("Usuario eliminado");
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
    const userToAddMoney = await Users.find({ _id: req.params.id });
    await Users.updateOne(
      { _id: req.params.id },
      { balance: userToAddMoney[0].balance + req.body.balance }
    );
    res.status(200).send("You add " + req.body.balance + " to your balance");
  } catch (error) {
    res.json(error);
  }
};
