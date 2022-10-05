const routes = require("express").Router();
const imageController = require("../controllers/imageController");
const verifyJWT = require("../middlewares/verifyJWT");

routes.post("/upload", verifyJWT, imageController.handleUploadImage);
routes.patch(
  "/delPrevNoteImg",
  verifyJWT,
  imageController.handleUpdatePrevNoteImages
);
routes.patch(
  "/addFromGallery",
  verifyJWT,
  imageController.handleAddImgFromGallery
);

module.exports = routes;
