const { model, Schema } = require("mongoose");

const enquirySchema = new Schema(
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
      required: [true, "Phone must not be empty"],
    },

    question: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Enquiry", enquirySchema);
