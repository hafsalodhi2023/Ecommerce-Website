import createController from "../controllers/create-user.controller.js";
import express from "express";
import upload from "../config/user-multer.config.js";

const route = express.Router();

route.post("/create", upload.single("photo"), createController.create);

export default route;
