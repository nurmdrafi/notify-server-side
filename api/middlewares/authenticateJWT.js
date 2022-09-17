require("dotenv").config();
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.TOKEN_SECRET;

exports.authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const access_token = authHeader.split(" ")[1];

    jwt.verify(access_token, accessTokenSecret, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    res.status(401).send({ message: "UnAuthorized Access" });
  }
};
