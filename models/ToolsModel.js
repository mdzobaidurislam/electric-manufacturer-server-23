const mongoose = require("mongoose");

// ToolsSchema
const ToolsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    minimum_order_quantity: {
      type: String,
      default: 5,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Tool = mongoose.model("Tool", ToolsSchema);

module.exports = Tool;
