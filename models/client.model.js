// All Imports
import mongoose from "mongoose";

// Define the schema for the Client model
const clientSchema = mongoose.Schema({
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
  cart: {
    type: Array,
    default: [],
  },
  created_at: {
    type: Date,
    required: true, // Created date is required
    default: Date.now, // Default value is the current date/time
  },
  modified_at: {
    type: Date,
    default: Date.now, // Default value is the current date/time
  },
});

// All Exports
export default mongoose.model("Client", clientSchema); // Create and export the Client model
