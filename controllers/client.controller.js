// All Imports
import Model from "../models/client.model.js";
import debug from "debug";
import fs from "fs";

// All Variables
const dbgr = debug("development:controllers:client");

const register = async (req, res) => {
  try {
    dbgr("Registering a new client...");
    dbgr(req.file);
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
    } = req.body;

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
      fs.unlinkSync(`./public/images/${req.file.filename}`);
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please fill in all the required fields!",
        data: null,
      });
    }
    const emailVerification = await Model.findOne({ email });

    if (emailVerification) {
      fs.unlinkSync(`./public/images/${req.file.filename}`);
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email already exists!",
        data: null,
      });
    }

    const client = await Model.create({
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      address,
      country,
      province,
      city,
      photo: req.file.filename,
    });
    dbgr("Client successfully registered!");

    return res.status(201).json({
      success: true,
      error: false,
      message: "Client successfully registered!",
      data: client,
    });
  } catch (error) {
    dbgr(error);

    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal sever error!",
      data: null,
    });
  }
};

// All Exports
export default {
  register,
};
