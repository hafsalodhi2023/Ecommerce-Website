import multer from "multer";
import debug from "debug";

// Create a debug instance for logging
const dbgr = debug("development:config:multer:user");

// Configure multer disk storage
// Set up options for file uploads
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, "./public/images/users");
  },
  // Generate a unique filename for each uploaded file
  filename: (req, file, cb) => {
    const filename = Date.now() + "." + file.mimetype.split("/")[1];
    cb(null, filename);
    dbgr(filename);
  },
});

// Create a multer instance with the configured storage
const upload = multer({ storage: storage });

export default upload;
