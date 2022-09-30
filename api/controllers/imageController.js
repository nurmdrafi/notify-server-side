const Image = require("../models/imageModel");
const Note = require("../models/notesModel");
const mongoose = require("mongoose");

// upload Image
exports.handleUploadImage = async (req, res) => {
  try {
    const image = new Image({
      url: req.body.url,
      path: req.body.path,
    });
    await image.save();
    await Note.updateOne(
      {
        _id: req.body.note_id,
      },
      { $push: { images: image.url } }
    );
    res.json({ message: "Image Uploaded" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.handleUpdatePrevNoteImages = async (req, res) => {
  try {
    await Note.updateOne(
      {
        _id: req.body._id,
      },
      { $pull: { images: req.body.url } }
    );
    res.json({ message: "Image Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* exports.handleGetImageGallery = async (req, res) => {
  try {
    const gallery = await Image.find({
      user: mongoose.Types.ObjectId(req.decoded._id),
    });

    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}; */

// exports.handleDeleteImage = (req, res) => {};
