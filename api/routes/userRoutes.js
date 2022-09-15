const routes = require("express").Router();
const userController = require("../controllers/userController");
routes.get("/users", userController.getUsers);
routes.post("/user", userController.createUsers);

module.exports = routes;
