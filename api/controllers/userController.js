const mongoose = require("mongoose");
const User = require("../models/userModel");
exports.getUsers = (req, res) => {
  console.log("not working");
  res.send("not working");
};

exports.createUsers = (req, res) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "New user created successfully",
        User: newUser,
      });
    })
    .catch((error) =>
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      })
    );
};
