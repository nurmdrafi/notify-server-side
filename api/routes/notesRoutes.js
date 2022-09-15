const routes = require("express").Router();
const notesController = require("../controllers/notesController");

routes.get("/notes", notesController.getAllNotes);
routes.post("/note", notesController.createNote);
routes.get("/note/:id", notesController.getNoteById);
routes.delete("/note/:id", notesController.deleteNote);
routes.patch("/note/:id", notesController.updateNote);


module.exports = routes;
