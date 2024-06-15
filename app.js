// Imported required modules
import express from "express";
import cors from "cors";
import mongodbConnection from "./config/mongodb-connnection.config.js";
import debug from "debug";
import dotenv from "dotenv";
dotenv.config();

// All Routers Imports
import clientRouter from "./routers/client.router.js";
import dressRouter from "./routers/dress.router.js";

// All Variables
const app = express(); // Create an instance of the Express application
const dbgr = debug("development:server"); // Create an instance of debugger to debug messages

// Configure middleware for parsing request bodies, stopping cors policy messages and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors()); // Configure CORS (Cross-Origin Resource Sharing) options

// All Routers
app.use("/api/client", clientRouter); // Client Router
app.use("/api/dress", dressRouter); // Dress Router

// Define a route for the root URL
app.get("/", (req, res) => {
    res.render("index", { url: "http://localhost:8080" }); // Render the "index" view
});

// Start the server and listen on port 3000
app.listen(8080, () => {
    dbgr("Server is running on port 8080"); // Log a message when the server starts
});
