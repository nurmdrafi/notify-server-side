const routes = require("express").Router();
const notesController = require("../controllers/notesController");
const { authenticateJWT } = require("../middlewares/authenticateJWT");

routes.get("/getAll", authenticateJWT, notesController.getAllNotes);
routes.get("/getOne/:id", notesController.getNoteById);
routes.get("/getByEmail/:email", authenticateJWT, notesController.getByEmail);
routes.post("/post", notesController.createNote);
routes.delete("/delete/:id", notesController.deleteNote);
routes.patch("/update/:id", notesController.updateNote);

module.exports = routes;
