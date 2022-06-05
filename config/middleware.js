const jwt = require("jsonwebtoken");

const verification = (checkRol = null) => {
  return (req, res, next) => {
    try {
      const token = jwt.verify(req.headers.token, process.env.JWT_KEY);
      if (checkRol == null || token.rol == checkRol) {
        next();
      } else {
        res
          .status(403)
          .send("You are not allowed to entry, try to speak with an admin");
      }
    } catch (error) {
      res.status(401).send(error);
    }
  };
};

module.exports = verification;
