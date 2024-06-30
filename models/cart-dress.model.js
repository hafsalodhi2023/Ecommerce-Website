// All Imports
import mongoose from "mongoose";

const { Schema } = mongoose;

const StockSchema = new Schema({
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  },
});

const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "client",
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "dress",
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          enum: ["Small", "Medium", "Large", "XL", "XXL"],
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    grandTotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("dressesCart", cartSchema);
