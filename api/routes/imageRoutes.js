const routes = require("express").Router();
const imageController = require("../controllers/imageController");
const verifyJWT = require("../middleware/verifyJWT");

routes.post("/upload", verifyJWT, imageController.handleUploadImage);
routes.get("/gallery", verifyJWT, imageController.handleGetImageGallery);
routes.patch("/upPrevNoteImg", imageController.handleUpdatePrevNoteImages);

module.exports = routes;
