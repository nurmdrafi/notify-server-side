const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// create new user / register
exports.handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check duplicate email in database
    const isExist = await User.findOne({ email: email });
    if (!isExist) {
      const user = new User({
        username: username,
        email: email,
        password: password,
        role: "user",
        refreshToken: "",
        notes: [],
      });
      await user.save();
      res.status(201).json({ message: "New User Registered" });
    } else {
      res.status(409).json({
        message: `${email} is already been registered`,
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
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
      const payload = {
        _id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        role: currentUser.role,
      };

      const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: "20m",
      });
      const refreshToken = jwt.sign(payload, refreshTokenSecret, {
        expiresIn: "1d",
      });

      // send tokens
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        username: currentUser.username,
        email: currentUser.email,
        role: currentUser.role,
        accessToken,
      });

      // store refresh token
      await User.updateOne(
        { email: email },
        { $set: { refreshToken: refreshToken } }
      );
    }
  } catch (error) {
    res.status(404).json({
      message: "Invalid Email/Password!!!",
    });
  }
};

exports.handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;

    // delete refresh token from database
    await User.updateOne(
      { refreshToken: refreshToken },
      { $set: { refreshToken: "" } }
    );

    // delete refresh token from cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "User Logout" });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.verifyRefreshToken = async (req, res) => {
  try {
    const prevRefreshToken = req?.cookies?.jwt;
    const currentUser = User.findOne({ refreshToken: prevRefreshToken });

    jwt.verify(prevRefreshToken, refreshTokenSecret, (err, decoded) => {
      if (err || !currentUser) {
        res.status(403).send({ message: "Forbidden Access" });
      } else {
        const payload = {
          _id: decoded._id,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
        };

        // create new tokens
        const accessToken = jwt.sign(payload, accessTokenSecret, {
          expiresIn: "20m",
        });
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
          expiresIn: "1d",
        });

        // send tokens
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
          accessToken,
        });

        // store new refresh token
        User.updateOne(
          { email: decoded.email },
          { $set: { refreshToken: refreshToken } }
        );
      }
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
