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
const getFiltered = async (req, res) => {
  try {
    dbgr("User getting dress...");

    const { limit, size, color, pricegt, pricelt, ...otherQueries } = req.query; // Destructure limit, size, and other query parameters

    const limitNumber = +limit;

    let queryObject = { ...otherQueries };

    if (size) {
      queryObject["sizes.size"] = size;
    }

    if (color) {
      queryObject["sizes.colors.color"] = color;
    }

    if (pricegt && pricelt) {
      queryObject["sizes.colors.price"] = { $gt: +pricegt, $lt: +pricelt };
    }
    const dress = await Model.find(queryObject).limit(limitNumber); // Find dresses based on query and limit

    res.status(200).json({
      success: true,
      error: false,
      message: "You have gotten dress successfully!",
      data: dress,
    });
  } catch (error) {
    dbgr(error);
    res.status(500).json({
      success: false,
      error: true,
      message: "An error occurred while getting the dress.",
      data: null,
    });
  }
};

export default { getAll, getFiltered };
