require("dotenv").config();
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split(" ")[1];

    jwt.verify(accessToken, accessTokenSecret, (err, decoded) => {
      if (err) {
        res.status(403).send({ message: "Forbidden Access" });
      } else {
        req.decoded = decoded;
        console.log(decoded, "verifyJWT")
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({ message: "UnAuthorized Access" });
  }
};
