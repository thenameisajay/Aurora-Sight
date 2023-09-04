require("dotenv").config();
const express = require("express");
const home = require("./routes/home");
const path = require("path");
const connectDB = require("./config/db");

const cors = require("cors");

// Middleware for parsing JSON and urlencoded form data
const app = express();
app.use(cors());

// Connect to the database to store the data from the API.
connectDB();

// Intialising the routes
app.use("/", home);

// Intialising the server

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
