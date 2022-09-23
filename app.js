require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

/* app configuration */
const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// testing
app.get("/hello", (req, res) => {
  res.send({ message: "Hello World" });
});

/* mongodb setup */
const database = process.env.MONGO_URI;
const mongooseOptions = {
  useNewUrlParser: true,
};

mongoose
  .connect(database, mongooseOptions)
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Error connecting to database"));

/* routes */
const routes = require("./api/routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
