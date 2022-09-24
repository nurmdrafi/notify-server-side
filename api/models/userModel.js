const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    lowercase: true,
    unique: true,
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

// hashed user password before saving into database
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
