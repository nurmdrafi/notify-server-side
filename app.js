/* ================
 include packages
================ */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

/* ================
 app configuration
================ */
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// testing
app.get("/messages", (req, res) => {
  res.send("Hello");
});

// app.use((req, res, next) => {
//   res.status(404).send("Page Not Found");
// });

/* ================
 mongodb setup
================ */

const database = process.env.MONGO_URI;
const mongooseOptions = {
  useNewUrlParser: true,
};

mongoose
  .connect(database, mongooseOptions)
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Error connecting to database"));

/* ================
      routes
================ */
const routes = require("./api/routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
