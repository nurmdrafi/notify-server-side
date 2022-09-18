require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userModel");

// get all users
exports.getALLUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

// create user
exports.createUser = (req, res) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const userToSave = user.save();
    res.status(201).json(userToSave);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("No user found");
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
