const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  time: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
