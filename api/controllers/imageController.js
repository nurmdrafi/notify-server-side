const Image = require("../models/imageModel");
const Note = require("../models/notesModel");

// upload new Image
exports.handleUploadImage = async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.body.note_id });

    // check with decoded user
    if (`${note.user}` === req.decoded._id) {
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
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// delete from note's
exports.handleUpdatePrevNoteImages = async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.body.note_id });

    // check with decoded user
    if (`${note.user}` === req.decoded._id) {
      await Note.updateOne(
        {
          _id: req.body.note_id,
        },
        { $pull: { images: req.body.url } }
      );
      res.json({ message: "Image Deleted" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.handleAddImgFromGallery = async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.body.note_id });

    // check with decoded user
    if (`${note.user}` === req.decoded._id) {
      await Note.updateOne(
        {
          _id: req.body.note_id,
        },
        { $push: { images: req.body.url } }
      );
      res.json({ message: "Image Added" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
