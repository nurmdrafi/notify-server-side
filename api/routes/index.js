const routes = require("express").Router(),
  userRoutes = require("./userRoutes"),
  notesRoutes = require("./notesRoutes");

routes.use("/users", userRoutes);
routes.use("/notes", notesRoutes);

module.exports = routes;
