const Image = require("../models/imageModel");
const Note = require("../models/notesModel");

// upload Image
exports.handleUploadImage = async (req, res) => {
  try {
    const image = new Image({
      note: req.body.note_id,
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

exports.handleGetImageByNoteId = async (req, res) => {
  try {
    const image = await Note.findById({ _id: req.params.id }).populate(
      "images"
    );
    // check with decoded user
    if (`${image.user}` === req.decoded._id) {
      res.status(200).json(image);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.handleDeleteImage = (req, res) => {};
