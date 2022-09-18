const routes = require("express").Router();
const notesController = require("../controllers/notesController");
const { verifyJWT } = require("../middlewares/verifyJWT");

routes.get("/getAll", verifyJWT, notesController.getAllNotes);
routes.get("/getOne/:id", notesController.getNoteById);
routes.get("/getByEmail/:email", verifyJWT, notesController.getByEmail);
routes.post("/post", verifyJWT, notesController.createNote);
routes.delete("/delete/:id", verifyJWT, notesController.deleteNote);
routes.patch("/update/:id", verifyJWT, notesController.updateNote);

module.exports = routes;
