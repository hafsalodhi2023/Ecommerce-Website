// routes/clientRoutes.js
import clientController from "../controllers/client.controller.js";
import express from "express";
import upload from "../config/client-multer.config.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), clientController.register);

export default router;
