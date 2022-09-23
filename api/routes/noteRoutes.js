const routes = require("express").Router();
const notesController = require("../controllers/notesController");
const { verifyJWT } = require("../middleware/verifyJWT");

// routes.get("/getAll", verifyJWT, notesController.getAllNotes);
// routes.get("/getOne/:id", verifyJWT, notesController.getNoteById);
routes.get("/get", verifyJWT, notesController.getNotes);
routes.post("/post", verifyJWT, notesController.createNote);
routes.delete("/delete/:id", verifyJWT, notesController.deleteNote);
routes.patch("/update/:id", verifyJWT, notesController.updateNote);

module.exports = routes;
