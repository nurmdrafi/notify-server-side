const mongoose = require("mongoose");
const Note = require("../models/notesModel");

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createNote = (req, res) => {
  const note = new Note({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body,
  });
  return note
    .save()
    .then((newNote) => {
      return res.status(201).json({
        success: true,
        message: "New note created successfully",
        Note: newNote,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

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

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body);
    await Note.save();
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};
