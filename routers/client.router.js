// Import the clientController from the "../controllers/client.controller.js" file
import clientController from "../controllers/client.controller.js";
// Import the express module
import express from "express";
// Import the multer_config from the "../config/multer.config.js" file
import multer_config from "../config/client-multer.config.js";

// Create a new express router instance
const router = express.Router();

// Define a POST route for "/signup"
// Use multer_config.single("photo") middleware to handle file uploads with the field name "photo"
// Use clientController.register as the route handler
router.post(
  "/signup",
  multer_config.single("photo"),
  clientController.register
);

// Export the router instance
export default router;
