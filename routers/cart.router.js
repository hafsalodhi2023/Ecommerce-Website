// All Controllers Import
import cartController from "../controllers/cart-dress.controller.js";

import express from "express";

const router = express.Router();

router.post("/dress", cartController.addToCart);

export default router;
