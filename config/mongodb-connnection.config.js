// Imports
import mongoose from "mongoose"; // Import the mongoose library for MongoDB
import config from "config"; // Import the config library for environment variables
import debug from "debug"; // Import the debug library for debugging

// All Variables
const dbgr = debug("development:mongoose"); // Create a debug instance for MongoDB

// Connect to MongoDB
mongoose
  .connect(`${config.get("MONGODB_URI")}/ZubizShop`) // Connect to MongoDB using the URI from environment variables
  .then(() => dbgr("Database Connected Successfully!")) // Log a success message if connected
  .catch((err) => dbgr("Database Connection Error!", err)); // Log an error message if connection fails

// All Exports
export default mongoose.connection; // Export the MongoDB connection object
