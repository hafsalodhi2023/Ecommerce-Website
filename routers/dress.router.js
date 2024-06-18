import dressController from "../controllers/get-dress.controller.js";
import express from "express";

const router = express.Router();

router
    .get("/getall", dressController.getAll)
    .get("/get", dressController.getOne);

export default router;
