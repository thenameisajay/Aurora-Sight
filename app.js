require("dotenv").config();
const express = require("express");
const home = require("./routes/home");
const path = require("path");
const connectDB = require("./config/db");
const buildPath = path.join(__dirname, 'build')

const cors = require("cors");

// Middleware for parsing JSON and urlencoded form data
// Initializing the express app
const app = express();
app.use(express.static(buildPath)) // Serve static files from the React app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database to store the data from the API.
connectDB();

// Intialising the routes
 app.use("/api", home);  // This is the route for the API

// //Serve static files from the React frontend app
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

// Define a catch-all route to serve the React app's HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
});

// Intialising the server

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});