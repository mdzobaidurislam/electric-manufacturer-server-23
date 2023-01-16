const mongoose = require("mongoose");

// OrderSchema
const OrderSchema = mongoose.Schema(
  {
    toolId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tool",
    },
    name: {
      type: String,
      required: true,
    },
    user_name: {
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
    order_quantity: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      default: null,
    },
    payment_status: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
      default: null,
    },
    deliverd: {
      type: String,
      default: "pending",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
