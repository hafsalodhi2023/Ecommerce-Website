// Import required modules
import multer from "multer";
import debug from "debug";
import path from "path";

// Create a debug instance for logging
const dbgr = debug("development:config:multer");

// Configure multer disk storage
// Set up options for file uploads
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  // Generate a unique filename for each uploaded file
  filename: (req, file, cb) => {
    const extname = file.mimetype.split("/")[1];
    cb(null, Date.now() + "." + extname);
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage: storage });

// Export the multer instance for use in other parts of the application
export default upload;
