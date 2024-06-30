import cartDressModel from "../models/cart-dress.model.js";
import clientModel from "../models/client.model.js";
import dressModel from "../models/dress.model.js";
import debug from "debug";

const dbgr = debug("development:controllers:cart:dress");

const addToCart = async (req, res) => {
  try {
    dbgr(req.body);

    const { email, SKU, price, quantity, size, color } = req.body;
    const dress = await dressModel.findOne({ SKU });
    const client = await clientModel.findOne({ email });
    const cartInfo = await cartDressModel.findOne({ user: client._id });
    const clientId = client._id;

    const discountPrice = (price / 100) * dress.discount;
    const subtotal = (price - discountPrice) * quantity;

    let cart;
    if (!cartInfo) {
      cart = new cartDressModel({
        user: clientId,
        products: [],
        grandTotal: 0,
      });
    }

    const productExistIndex = cart.products.findIndex((item) =>
      item.product.equals(dress.id),
    );

    if (productExistIndex > -1) {
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: true, message: "Internal Server Error!" });
  }
};

export default { addToCart };
