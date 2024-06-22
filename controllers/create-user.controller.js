import Model from "../models/user.model.js";
import debug from "debug";
import fs from "fs"; // Import the file system module for file operations
import bcryptor from "../utils/password-bcryptor.utils.js";

const dbgr = debug("development:controllers:user:create");

const create = async (req, res) => {
  try {
    dbgr("creating a new user...");
    const { firstName, lastName, email, password, accountType } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !accountType ||
      !req.file
    ) {
      fs.unlinkSync(`./public/images/users/${req.file.filename}`);
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide all the required fields!",
        data: null,
      });
    }

    const emailVerification = await Model.findOne({ email });
    if (emailVerification) {
      if (req.file) fs.unlinkSync(`./public/images/users/${req.file.filename}`); // Remove the uploaded file if the email already exists
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
        fs.unlinkSync(`./public/images/users/${req.file.filename}`); // Remove the uploaded file if the type is invalid
        return res.status(400).json({
          success: false,
          error: true,
          message: "Only JPEG, JPG and PNG files are allowed.",
        });
      }

      if (req.file.size > 1024 * 1024 * 1) {
        fs.unlinkSync(`./public/images/users/${req.file.filename}`); // Remove the uploaded file if the size is too large
        return res.status(400).json({
          success: false,
          error: true,
          message: "The file size must be less than 1MB.",
        });
      }
    }

    const bcryptedPassword = await bcryptor(password); // Hash the password

    const user = await Model.create({
      firstName,
      lastName,
      email,
      password: bcryptedPassword,
      accountType,
      photo: req.file ? req.file.filename : "default.png",
    });
    dbgr("User successfully registered!"); // Log the successful registration
    res.status(201).json({
      success: true,
      error: false,
      message: "User created successfully!",
      data: user,
    });
  } catch (error) {
    dbgr(error);
    if (req.file) fs.unlinkSync(`./public/images/${req.file.filename}`); // Remove the uploaded file if there's an error
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error!",
      data: null,
    });
  }
};

export default {
  create,
};
