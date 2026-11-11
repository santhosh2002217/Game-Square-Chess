const express = require("express");

const paymentController =
  require("../controllers/paymentController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();


// Create payment order

router.post(
  "/create-order",
  authMiddleware,
  paymentController.createOrder
);


// Verify payment

router.post(
  "/verify",
  authMiddleware,
  paymentController.verifyPayment
);


module.exports = router;