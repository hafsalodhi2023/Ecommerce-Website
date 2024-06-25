// All Controllers Import
import registerController from "../controllers/register-client.controller.js";
import cartController from "../controllers/cart-client.controller.js";

import express from "express";
import upload from "../config/client-multer.config.js";

const router = express.Router();

router
  .post("/signup", upload.single("photo"), registerController.register)
  .patch("/addtocart/:sku", cartController.addToCart);

export default router;
