import dressController from "../controllers/get-dress.controller.js";
import express from "express";

const router = express.Router();

router
  .get("/get", dressController.get);

export default router;
