const routes = require("express").Router();
const userController = require("../controllers/userController");
const  verifyJWT  = require("../middlewares/verifyJWT");

routes.get("/getAll", verifyJWT, userController.getALLUsers);
routes.delete("/delete/:id", verifyJWT, userController.deleteUser);

module.exports = routes;
