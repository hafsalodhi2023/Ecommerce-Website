// All Imports
import mongoose from "mongoose";
import config from "config";
import debug from "debug";

// All Variables
const dbgr = debug("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/NewEcommerceWebsite`)
  .then(() => dbgr("Database Connected Successfully!"))
  .catch((err) => dbgr("Database Connection Error!", err));

// All Exports
export default mongoose.connection;
