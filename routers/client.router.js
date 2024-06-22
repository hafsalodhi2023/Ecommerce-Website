// routes/clientRoutes.js
import registerController from "../controllers/register-client.controller.js";
import express from "express";
import upload from "../config/client-multer.config.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), registerController.register);

export default router;
