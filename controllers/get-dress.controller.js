import Model from "../models/dress.model.js"; // Import the dress model
import debug from "debug";

const dbgr = debug("development:get:dress:controller"); // Create an instance of debugger to debug messages

const getAll = async (req, res) => {
  try {
    dbgr("User getting dresses...");
    const dresses = await Model.find(); // Find all dresses in the database
    res.status(200).json({
      success: true,
      error: false,
      message: "You have gotten dresses successfully!",
      data: dresses,
    }); // Send the dresses to the client
  } catch (error) {
    res.status(500).json({
      success: true,
      error: false,
      message: "Internal Server Error!",
    });
  }
};
const getOne = async (req, res) => {
    try {
        dbgr(req.query);
        dbgr("User getting dress...");
        const dress = await Model.find(req.query);
        res.status(200).json({
            success: true,
            error: false,
            message: "You have gotten dress successfully!",
            data: dress,
        });
    } catch (error) {
        dbgr(error);
    }
};

export default { getAll, getOne };
