const routes = require("express").Router();
const userController = require("../controllers/userController");
routes.get("/getAll", userController.getALLUsers);
routes.post("/post", userController.createUser);
routes.delete("/delete/:id", userController.deleteUser);

module.exports = routes;
