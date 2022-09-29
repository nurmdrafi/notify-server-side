const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
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
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
