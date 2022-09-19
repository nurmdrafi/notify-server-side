const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// get token
exports.getToken = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const currentUser = await User.findOne({ email: email });
    // evaluate password
    const isMatch = await bcrypt.compare(password, currentUser.password);
    if (isMatch) {
      // create JWTs
      const accessToken = jwt.sign(
        { email: req.body.email },
        accessTokenSecret,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { email: req.body.email },
        refreshTokenSecret,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        success: true,
        accessToken,
      });
    } else {
      res.json({
        success: false,
        error: "Invalid email/password!!!",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.verifyRefreshToken = (req, res) => {
  try {
    const refreshToken = req?.cookies?.jwt;

    jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Forbidden Access" });
      } else {
        const accessToken = jwt.sign(
          {
            email: req.body.email,
          },
          accessTokenSecret,
          {
            expiresIn: "20m",
          }
        );
        return res.json({ success: true, accessToken });
      }
    });
  } catch (error) {
    return res.status(406).json({ message: "Unauthorized" });
  }
};
