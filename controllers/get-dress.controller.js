import Model from "../models/dress.model.js"; // Import the dress model
import debug from "debug";

const dbgr = debug("development:controller:dress:get"); // Create an instance of debugger to debug messages

const get = async (req, res) => {
  try {
    dbgr("User getting dresses...");

    const { limit, size, pricegt, pricelt, ...otherQueries } = req.query; // Destructure limit, size, and other query parameters

    const limitNumber = +limit;

    let queryObject = { ...otherQueries };

    if (size) {
      queryObject["sizes.size"] = size;
    }

    if (pricegt && pricelt) {
      queryObject["sizes.price"] = { $gt: +pricegt, $lt: +pricelt };
    } else if (pricegt) {
      queryObject["sizes.price"] = { $gt: +pricegt };
    } else if (pricelt) {
      queryObject["sizes.price"] = { $lt: +pricelt };
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
      message: "Internal Server Error!",
      data: null,
    });
  }
};

export default { get };
