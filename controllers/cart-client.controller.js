import clientModel from "../models/client.model.js";
import dressModel from "../models/dress.model.js";
import debug from "debug";

const dbgr = debug("development:controllers:client:cart");

const addToCart = async (req, res) => {
  try {
    dbgr("Adding to cart...");
    const SKU = req.params.sku;
    const {
      name,
      description,
      gender,
      price,
      quantity,
      size,
      color,
      stuffType,
      clothCategory,
      madeType,
      discount,
      sale,
      photos,
      stock,
    } = req.body;
    const product = await dressModel.find({ SKU: SKU });
    res.status(200).send({
      success: true,
      error: false,
      message: "The product successfully added to cart",
      data: product,
    });
  } catch (error) {
    dbgr(error);
  }
};

export default { addToCart };
