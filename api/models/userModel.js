const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

// hash user password before saving into database
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
