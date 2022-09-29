const routes = require("express").Router();
const imageController = require("../controllers/imageController");
const verifyJWT = require("../middleware/verifyJWT");

routes.post("/upload", verifyJWT, imageController.handleUploadImage);
routes.get("/:id", verifyJWT, imageController.handleGetImageByNoteId);
routes.delete("/:id", imageController.handleDeleteImage);

module.exports = routes;
