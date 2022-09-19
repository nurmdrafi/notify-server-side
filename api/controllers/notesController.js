const mongoose = require("mongoose");
const Note = require("../models/notesModel");

// get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
};

// get by email
exports.getByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const notes = await Note.find({ email: email });
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
};

// create note
exports.createNote = (req, res) => {
  const note = new Note({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body,
    email: req.body.email,
    time: req.body.time,
  });
  try {
    const noteToSave = note.save();
    res.status(201).json(noteToSave);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(404).send("No item found");
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

// update note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    note.title = req.body.title;
    note.body = req.body.body;
    await note.save();
    await res.status(200).send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};

// get note by id
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};
