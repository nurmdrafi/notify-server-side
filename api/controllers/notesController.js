const mongoose = require("mongoose");
const Note = require("../models/notesModel");

// get notes by user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.decoded.userId });
    res.send(notes);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// create note
exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      body: req.body.body,
      userId: req.decoded.userId,
      time: req.body.time,
    });
    await note.save();
    res.status(201).json({ message: "New Note Created" });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.params.id });
    // check with decoded userId
    if (`${note.userId}` === req.decoded.userId) {
      await Note.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Note Deleted" });
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// update note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.params.id });
    // check with decoded userId
    if (`${note.userId}` === req.decoded.userId) {
      // update
      note.title = req.body.title;
      note.body = req.body.body;
      // save
      await note.save();
      res.status(200).json({ message: "Note Updated" });
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// get all notes for admin
/* exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.send(notes);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}; */

// get note by id
/* exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
}; */
