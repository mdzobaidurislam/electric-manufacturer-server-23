const Order = require("../models/OrderModel ");
const Payment = require("../models/PaymentModel");
const stripe = require("stripe")(
  "sk_test_51KRIZyGc1O5eSd4L67co1FmQyYKcYot38QcKr0RMW7PiTmQbhgDBpw1fENm2zmpbxmKcFjX6viqL9Ab0BuozFwaZ00VNcM8HAr"
);

// add booking
const addOrder = async (req, res) => {
  const order = req.body;
  const result = await Order.create(order);
  res.status(201);
  res.json({
    success: true,
    msg: "Order Successfully Added!",
  });
};

//getAllAdminOrders
const getAllAdminOrders = async (req, res) => {
  const result = await Order.find({});
  if (result) {
    res.status(200).json({ success: true, result });
  } else {
    res.status(404);
    res.json({
      success: false,
      msg: "Orders not found!",
    });
  }
};

//getAllOrder for user
const getAllMyOrders = async (req, res) => {
  const result = await Order.find({ userEmail: req.params.email });
  if (result) {
    res.status(200).json({ success: true, result });
  } else {
    res.status(404);
    res.json({
      success: false,
      msg: "Orders not Added!",
    });
  }
};

// get order by id
const getOrderById = async (req, res) => {
  const result = await Order.findById(req.params.orderId);
  if (result) {
    res.status(200).json({ success: true, result });
  } else {
    res.status(401).res.json("Order not found");
  }
};

const paymentPaymentIntent = async (req, res) => {
  try {
    const service = req.body;
    const price = parseInt(service.price);
    const order_quantity = parseInt(service.order_quantity);
    const amount = order_quantity * price * 100;
    // const amount = null;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    if (paymentIntent) {
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
  } catch (e) {
    switch (e.type) {
      case "StripeCardError":
        res
          .status(401)
          .res.json({ msg: `A payment error occurred: ${e.message}` });
        break;
      case "StripeInvalidRequestError":
        res.json({ msg: `An invalid request occurred.` });
        break;
      default:
        res.status(401).res.json({
          msg: "Another problem occurred, maybe unrelated to Stripe.",
        });
        break;
    }
  }
};

const paymentPayUser = async (req, res) => {
  const { id, email } = req.params;
  const paymentData = req.body;
  const requestEmail = req.decoded.email;
  if (requestEmail === email) {
    const filter = { _id: id };
    const result = await Order.findOneAndUpdate(
      filter,
      {
        payment_status: true,
        transactionId: paymentData.transactionId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    if (result) {
      await Payment.create(paymentData);
      res.status(200).json({ success: true, msg: "Payment success!" });
    } else {
      res.status(401).res.json({ msg: "Not found url!" });
    }
  }
};
// order approved
const orderApproved = async (req, res) => {
  const id = req.body.id;
  const filter = { _id: id };
  const result = await Order.findOneAndUpdate(
    filter,
    {
      deliverd: "shipped ",
    },
    {
      new: true,
      upsert: true,
    }
  );
  if (result) {
    res.status(200).json({ success: true, msg: "Order shipped  success!" });
  } else {
    res.status(401).res.json({ success: false, msg: "Order not shipped !" });
  }
};
// delete the order
const AdminDeleteOrder = async (req, res) => {
  const { id } = req.params;
  const orderFind = await Order.findOne({ id });

  if (orderFind) {
    const result = await Order.findByIdAndDelete({ _id: id });
    if (result) {
      res.status(200).json({
        success: true,
        msg: "Order Deleted Successfully!",
      });
    }
  } else {
    res.status(404).json({
      msg: "Order not found!",
    });
  }
};
// delete the order
const deleteOrderById = async (req, res) => {
  const { id, email } = req.params;
  const requestEmail = req.decoded.email;
  const orderFind = await Order.findOne({ id });
  if (requestEmail === email) {
    if (orderFind) {
      const result = await Order.findByIdAndDelete({ _id: id });
      if (result) {
        res.status(200).json({
          success: true,
          msg: "Order Deleted Successfully!",
        });
      }
    } else {
      res.status(404).json({
        msg: "Order not found!",
      });
    }
  }
};

module.exports = {
  addOrder,
  getAllMyOrders,
  deleteOrderById,
  getOrderById,
  paymentPaymentIntent,
  paymentPayUser,
  getAllAdminOrders,
  orderApproved,
  AdminDeleteOrder,
};
