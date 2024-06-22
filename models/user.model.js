import mongoose from "mongoose";

const usersProfileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
      enum: ["Admin", "ProductManager", "AccountManager"],
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("user", usersProfileSchema);
