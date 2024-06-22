import getController from "../controllers/get-dress.controller.js";
import express from "express";

const router = express.Router();

router.get("/get", getController.get);

export default router;
