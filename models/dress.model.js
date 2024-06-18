import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the color and price schema
const ColorPriceSchema = new Schema({
  color: { type: String, required: true },
  price: { type: Number, required: true },
  stock: {
    type: Number,
    required: true,
  },
});

// Define the size schemas
const SizeSchema = new Schema({
  size: {
    type: String,
    enum: ["Small", "Medium", "Large", "XL", "XXL"],
    required: true,
  },
  colors: [ColorPriceSchema],
});

// Define the stock schema
const StockSchema = new Schema({
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  },
});

// Define the main dress schema
const DressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Unisex"],
      required: true,
    },
    SKU: {
      type: String,
      required: true,
      minlength: [6, "SKU should be at least 6 characters long."],
      maxlength: [10, "SKU should be at most 10 characters long."],
      validate: {
        validator: function (v) {
          return /^SKU-.{2,6}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid SKU! It should be in the format 'SKU-xxx'.`,
      },
    },
    sizes: [SizeSchema],
    stuffType: { type: String, required: true },
    clothCategory: {
      type: String,
      enum: ["01 Piece", "02 Piece", "03 Piece", "04 Piece", "Top", "Bottom"],
      required: true,
    },
    MadeType: {
      type: String,
      enum: ["Stiched", "Un-Stiched"],
      required: true,
    },
    discount: {
      type: Number,
      min: [0, "Discount should be at least 0%."],
      max: [100, "Discount should be at most 100%."],
      default: 0,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    photos: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length <= 5;
        },
        message: (props) => `${props.value} exceeds the limit of 5`, // Here {PATH} is used as props.path
      },
    },
    stock: {
      // Corrected placement of 'stock' field
      type: StockSchema,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Create the model from the schema

export default mongoose.model("dress", DressSchema);
