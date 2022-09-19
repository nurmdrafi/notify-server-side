const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

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
            expiresIn: "2h",
          }
        );
        const refreshToken = jwt.sign(
          { email: req.body.email },
          refreshTokenSecret,
          {
            expiresIn: "24h",
          }
        );

        res.json({
          success: true,
          accessToken,
          refreshToken,
        });
      } else {
        res.json({
          success: false,
          error: "Invalid email/password!!!",
        });
      }
    }
  });
};

exports.verifyRefresh = (req, res) => {
  const { email, refreshToken } = req.body;
  const isValid = verifyRefreshToken(email, refreshToken);
  console.log("verifyRefresh");

  if (!isValid) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid token, try login again" });
  }

  const accessToken = jwt.sign({ email: email }, "accessSecret", {
    expiresIn: "2m",
  });

  return res.status(200).json({ success: true, accessToken });
};
