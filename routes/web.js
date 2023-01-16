const express = require("express");
const { getAllBlog, getBlogById } = require("../controller/BlogController");
const {
  addOrder,
  getAllMyOrders,
  deleteOrderById,
  getOrderById,
  paymentPaymentIntent,
  paymentPayUser,
  getAllAdminOrders,
  orderApproved,
  AdminDeleteOrder,
} = require("../controller/OrderController");
const { addReview, getAllReview } = require("../controller/ReviewController");
const {
  getAllTools,
  getToolById,
  getAllProduct,
  deleteProductById,
  addProduct,
} = require("../controller/ToolsController");
const {
  userRegistration,
  getAdmin,
  userUpdateProfile,
  getAllUser,
  makeAdmin,
  makeUser,
  getUser,
} = require("../controller/userController");
const {
  apiMiddleware,
  verifyAdminMiddleware,
} = require("../middlewares/authMiddleware");
const router = express.Router();

// check admin routes.
router.route("/admin/:email").get(getAdmin);
router.route("/user/:email").get(getUser);
// user routes
router.put("/user/", userRegistration);
router.put("/update-profile/:email", userUpdateProfile);

// blog routes
router.get("/blog/", getAllBlog);
router.get("/blog/:id", getBlogById);

// admin routes
router.get("/admin-alluser", apiMiddleware, verifyAdminMiddleware, getAllUser);
router.put("/make-admin", apiMiddleware, verifyAdminMiddleware, makeAdmin);
router.put("/make-user", apiMiddleware, verifyAdminMiddleware, makeUser);
// order admin routes
router.get(
  "/admin-order",
  apiMiddleware,
  verifyAdminMiddleware,
  getAllAdminOrders
);
router.put(
  "/admin-order-approved",
  apiMiddleware,
  verifyAdminMiddleware,
  orderApproved
);
// delete order for admin
router.delete(
  "/admin-order/:id",
  apiMiddleware,
  verifyAdminMiddleware,
  AdminDeleteOrder
);

// admin product for tool model
router.get(
  "/admin-product",
  apiMiddleware,
  verifyAdminMiddleware,
  getAllProduct
);
router.delete(
  "/admin-product/:id",
  apiMiddleware,
  verifyAdminMiddleware,
  deleteProductById
);
router.post("/admin-product", apiMiddleware, verifyAdminMiddleware, addProduct);

// Tools routes
router.get("/tool/", getAllTools);
router.get("/tool/:id", getToolById);

// order routes
router.get("/order/:email", apiMiddleware, getAllMyOrders);
router.post("/order/", addOrder);
router.delete("/order/:id/:email", apiMiddleware, deleteOrderById);
router.get("/orderid/:orderId", getOrderById);
router.post("/create-payment-intent", paymentPaymentIntent);
router.patch("/order-payment-update/:id/:email", apiMiddleware, paymentPayUser);

// review routes
router.get("/review/", getAllReview);
router.post("/review/", addReview);

module.exports = router;
