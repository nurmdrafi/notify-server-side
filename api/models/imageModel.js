const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  url: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);
