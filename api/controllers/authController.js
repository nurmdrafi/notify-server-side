const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// create new user / register
exports.handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check duplicate email in database
    await User.findOne({ email: email }, function (err, docs) {
      if (docs) {
        return res.status(409).json({
          message: "Email already exist",
        });
      } else {
        // if unique email then create new user / register
        const user = new User({
          _id: mongoose.Types.ObjectId(),
          username: username,
          email: email,
          password: password,
          refreshToken: "",
        });
        user.save().then(() => {
          return res.status(201).json({ message: "User Created" });
        });
      }
    });
  } catch (error) {
    // return res.status(500).json({ message: "Internal Error" });
  }
};

// handle login
exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check valid user & password
    const currentUser = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, currentUser.password);

    if (currentUser && isMatch) {
      // create tokens
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
      // send tokens
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        currentUser,
        accessToken,
      });
      // store refresh token
      await User.updateOne(
        { email: email },
        { $set: { refreshToken: refreshToken } }
      );
    } else {
      return res.status(404).json({
        message: "Invalid Email/Password!!!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.verifyRefreshToken = async (req, res) => {
  try {
    const refreshToken = req?.cookies?.jwt;
    const currentUser = await User.findOne({ refreshToken: refreshToken });

    jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
      // console.log(currentUser.username !== decoded.username);
      if (err) {
        return res.status(403).send({ message: "Forbidden Access" });
      } else {
        const accessToken = jwt.sign(
          {
            email: decoded.email,
          },
          accessTokenSecret,
          {
            expiresIn: "15m",
          }
        );
        return res.json({
          username: currentUser.username,
          email: currentUser.email,
          accessToken,
        });
      }
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.logoutHandler = async (req, res) => {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    // delete refresh token from database
    await User.updateOne(
      { refreshToken: refreshToken },
      { $set: { refreshToken: "" } }
    );
    // delete refresh token from cookie
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "User Logout" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
