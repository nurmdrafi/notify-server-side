const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const passwordValidators = [
  {
    validator: (v) => /^\S*$/.test(v),
    message: "Your password must not contain whitespace",
  },
  {
    validator: (v) => /^(?=.*[A-Z]).*$/.test(v),
    message: "Your password must have at least one uppercase character",
  },
  {
    validator: (v) => /^(?=.*[a-z]).*$/.test(v),
    message: "Your password must have at least one lowercase character",
  },
  {
    validator: (v) => /^(?=.*[0-9]).*$/.test(v),
    message: "Your password must have at least one digit",
  },
  {
    validator: (v) =>
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(v),
    message: "Your password must have at least one special symbol",
  },
];

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    minLength: [3, "Your username must have 3 characters"],
    required: [true, "Please enter your username"],
  },
  email: {
    type: String,
    trim: true,
    require: [true, "Please enter your email"],
    lowercase: true,
    unique: true,
    validate: {
      validator: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    minLength: [8, "Your password must have 8 characters"],
    trim: true,
    required: [true, "Please enter your password"],
    validate: passwordValidators,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  refreshToken: {
    type: String,
  },
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
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
