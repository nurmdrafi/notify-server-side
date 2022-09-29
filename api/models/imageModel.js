const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
  url: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Image", imageSchema);
