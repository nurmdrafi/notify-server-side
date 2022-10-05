const Note = require("../models/notesModel");
const mongoose = require("mongoose");

// get notes by userId
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: mongoose.Types.ObjectId(req.decoded._id),
    });
    res.send(notes);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// create note
exports.createNote = async (req, res) => {
  try {
    // console.log(req.body);
    const note = new Note({
      title: req.body.title,
      body: req.body.body,
      user: req.decoded._id,
      images: [],
    });
    await note.save();
    res.status(201).json({
      id: note._id,
      message: "New Note Created",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send({ message: error.message });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
};

// delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.params.id });

    // check with decoded user
    if (`${note.user}` === req.decoded._id) {
      await Note.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Note Deleted" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// update note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.params.id });
    // check with decoded user
    if (`${note.user}` === req.decoded._id) {
      // update
      note.title = req.body.title;
      note.body = req.body.body;
      // save
      await note.save();
      res.status(200).json({ message: "Note Updated" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

