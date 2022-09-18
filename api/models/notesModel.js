const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    trim: true,
    require: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);