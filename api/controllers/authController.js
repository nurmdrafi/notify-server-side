const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.TOKEN_SECRET;

// authenticate
exports.authenticate = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      next(err);
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const accessToken = jwt.sign(
          { email: req.body.email },
          accessTokenSecret,
          {
            expiresIn: "1h",
          }
        );

        res.json({
          status: "success",
          message: "user found!!!",
          data: accessToken,
        });
      } else {
        res.json({
          status: "error",
          message: "Invalid email/password!!!",
          data: null,
        });
      }
    }
  });
};
