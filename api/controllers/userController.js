require("dotenv").config();
const User = require("../models/userModel");

// get all users
exports.getALLUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.sendStatus(500);
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
