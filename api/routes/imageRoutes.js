const routes = require("express").Router();
const imageController = require("../controllers/imageController");
const verifyJWT = require("../middleware/verifyJWT");

routes.post("/upload", verifyJWT, imageController.handleUploadImage);
routes.patch("/upPrevNoteImg", imageController.handleUpdatePrevNoteImages);
// routes.get("/gallery", verifyJWT, imageController.handleGetImageGallery);

module.exports = routes;
