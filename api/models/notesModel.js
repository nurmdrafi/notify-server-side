const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: [true, "Please enter your title"],
  },
  body: {
    type: String,
    trim: true,
    required: [true, "Please type your note"],
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Note", noteSchema);
