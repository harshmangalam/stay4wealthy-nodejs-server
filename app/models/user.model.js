const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: [30, "Name must not be longer than 30 characters"],
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Phone must not be empty"],
    },

    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be longer than 6 character"],
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
