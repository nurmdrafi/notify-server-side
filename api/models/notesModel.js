const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
