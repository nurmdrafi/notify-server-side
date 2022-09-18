const routes = require("express").Router();
const notesController = require("../controllers/notesController");
const { verifyJWT } = require("../middlewares/verifyJWT");

routes.get("/getAll", notesController.getAllNotes);
routes.get("/getOne/:id", notesController.getNoteById);
routes.get("/getByEmail/:email", verifyJWT, notesController.getByEmail);
routes.post("/post", verifyJWT, notesController.createNote);
routes.delete("/delete/:id", notesController.deleteNote);
routes.patch("/update/:id", notesController.updateNote);

module.exports = routes;
