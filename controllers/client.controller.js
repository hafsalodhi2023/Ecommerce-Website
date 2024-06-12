// All Imports
import Model from "../models/client.model.js"; // Import the client model
import debug from "debug"; // Import the debug module for logging
import fs from "fs"; // Import the file system module for file operations
import bcryptor from "../utils/password-bcryptor.utils.js";
import jwtGenerator from "../utils/jwt-generator.utils.js";

// All Variables
const dbgr = debug("development:controllers:client"); // Create a debug instance for logging

// Register a new client
const register = async (req, res) => {
  try {
    dbgr("Registering a new client..."); // Log the start of the registration process
    const {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      address,
      country,
      province,
      city,
    } = req.body; // Destructure the request body

    // Check if any required fields are missing
    if (
      !first_name ||
      !email ||
      !password ||
      !mobile_number ||
      !address ||
      !country ||
      !province ||
      !city
    ) {
      if (req.file) fs.unlinkSync(`./public/images/${req.file.filename}`); // Remove the uploaded file if any required fields are missing
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please fill in all the required fields!",
        data: null,
      });
    }

    // Check if the email already exists
    const emailVerification = await Model.findOne({ email });
    if (emailVerification) {
      if (req.file) fs.unlinkSync(`./public/images/${req.file.filename}`); // Remove the uploaded file if the email already exists
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email already exists!",
        data: null,
      });
    }

    if (req.file) {
      if (
        req.file.mimetype !== "image/jpeg" &&
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpg"
      ) {
        fs.unlinkSync(`./public/images/${req.file.filename}`); // Remove the uploaded file if the type is invalid
        return res.status(400).json({
          success: false,
          error: true,
          message: "Only JPEG, JPG and PNG files are allowed.",
        });
      }

      if (req.file.size > 1024 * 1024 * 1) {
        fs.unlinkSync(`./public/images/${req.file.filename}`); // Remove the uploaded file if the size is too large
        return res.status(400).json({
          success: false,
          error: true,
          message: "The file size must be less than 1MB.",
        });
      }
    }

    let corrected_mobile_number = mobile_number.replace(0, "+92"); // Correct the mobile number format

    const bcryptedPassword = await bcryptor(password); // Hash the password
    const authToken = jwtGenerator({ email }); // Generate a JSON Web Token for the client

    // Create a new client
    const client = await Model.create({
      first_name,
      last_name,
      email,
      password: bcryptedPassword,
      mobile_number: corrected_mobile_number,
      address,
      country,
      province,
      city,
      photo: req.file ? req.file.filename : "default.png", // Save the uploaded file name
      auth_token: authToken, // Generate a JSON Web Token for the client
    });
    dbgr("Client successfully registered!"); // Log the successful registration

    // Return the created client
    return res.status(201).json({
      success: true,
      error: false,
      message: "Client successfully registered!",
      data: client,
    });
  } catch (error) {
    dbgr(error); // Log any errors

    if (req.file) fs.unlinkSync(`./public/images/${req.file.filename}`); // Remove the uploaded file if there's an error
    // Return an internal server error
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
      data: null,
    });
  }
};

// All Exports
export default {
  register, // Export the register function
};
