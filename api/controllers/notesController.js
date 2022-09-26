const Note = require("../models/notesModel");
const User = require("../models/userModel");


// get notes by user
exports.getNotes = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.decoded._id }).populate(
      "notes"
    );
    res.send(user.notes);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// create note
exports.createNote = async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      body: req.body.body,
      user: req.decoded._id,
      createdAt: new Date().toLocaleDateString(),
    });
    const note = await newNote.save();

    await User.updateOne(
      { _id: req.decoded._id },
      {
        $push: {
          notes: note._id,
        },
      }
    );
    res.status(201).json({ message: "New Note Created" });
  } catch (error) {
    if(error.name === "ValidationError"){
      res.status(400).send({ message: error.message });
    } else{
      res.status(401).json({ message: "Unauthorized" });
    }
  }
};

// delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.params.id });
    // check with decoded user
    console.log(note.user);
    if (`${note.user}` === req.decoded._id) {
      await Note.findByIdAndDelete(req.params.id);

      await User.updateOne(
        { _id: req.decoded._id },
        {
          $pull: { notes: req.params.id },
        }
      );
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

// get all notes for admin
/* exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.send(notes);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}; */

// get note by id
/* exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params._id);
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
}; */
