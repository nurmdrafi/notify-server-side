const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
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
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
