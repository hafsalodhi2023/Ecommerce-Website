// Import required modules
import express from "express";
import cors from "cors";
import mongodbConnection from "./config/mongodb-connnection.js";
import debug from "debug";

// Create an instance of the Express application
const app = express();
const dbgr = debug("development:server");

// Configure middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Configure CORS (Cross-Origin Resource Sharing) options
app.use(
  cors({
    origin: "http://localhost:8080", // Specify the allowed origin
    methods: ["GET", "POST"], // Specify the allowed HTTP methods
    credentials: true, // Allow sending credentials (cookies, headers, etc.)
  })
);

// Define a route for the root URL
app.get("/", (req, res) => {
  res.render("index"); // Render the "index" view
});

// Start the server and listen on port 3000
app.listen(8080, () => {
  dbgr("Server is running on port 8080"); // Log a message when the server starts
});
