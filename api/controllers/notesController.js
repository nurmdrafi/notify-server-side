const mongoose = require("mongoose");
const Note = require("../models/notesModel");

// get all notes for admin
/* exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
}; */

// get notes for user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.decoded.userId });
    res.send(notes);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// create note
exports.createNote = (req, res) => {
  try {
    const note = new Note({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      body: req.body.body,
      userId: req.decoded.userId,
      time: req.body.time,
    });
    note.save();
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
      res.status(200).send();
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
      note.save();
      res.status(200).send(note);
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// get note by id
/* exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
}; */
