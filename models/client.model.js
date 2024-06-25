// All Imports
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StockSchema = new Schema({
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  },
});

const cartSchema = new Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unisex"],
    required: true, // Gender is required
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
  price: {
    type: Number,
    required: true, // Price is required
  },
  quantity: {
    type: Number,
    required: true, // Quantity is required
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
  stuffType: {
    type: String,
    required: true,
  },
  clothCategory: {
    type: String,
    enum: ["02 Piece", "03 Piece", "04 Piece", "Top", "Bottom", "Dubatta"],
    required: true,
  },
  madeType: {
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
    type: StockSchema,
    required: true,
  },
});

// Define the schema for the Client model
const clientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true, // First name is required
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true,
      validate: {
        validator: function (value) {
          // Regular expression for validating an email
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email!`, // Custom error message for invalid email
      },
    },
    password: {
      type: String,
      required: true, // Password is required
    },
    mobile_number: {
      type: String, // Corrected type for mobile_number
      required: true, // Mobile number is required
    },
    address: {
      type: String,
      required: true, // Address is required
    },
    country: {
      type: String,
      required: true, // Country is required
    },
    province: {
      type: String,
      required: true, // Province is required
    },
    city: {
      type: String,
      required: true, // City is required
    },
    photo: {
      type: String,
    },
    auth_token: {
      type: String,
      required: true, // Auth token is required
    },
    cart: {
      type: [cartSchema],
      default: [],
    },
    createdAt: {
      type: Date,
      required: true, // Created date is required
      default: Date.now, // Default value is the current date/time
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Default value is the current date/time
    },
  },
  { timestamps: true },
);

// All Exports
export default mongoose.model("Client", clientSchema); // Create and export the Client model
