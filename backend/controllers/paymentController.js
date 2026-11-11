const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const Registration =
  require("../models/registrationModel");


// Create Razorpay order

const createOrder = async (req, res) => {
  try {
    const {
      tournamentId,
      amount,
    } = req.body;

    if (!tournamentId || !amount) {
      return res.status(400).json({
        success: false,
        message:
          "Tournament and amount are required",
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",

      receipt:
        `chess_${Date.now()}`,
    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.status(201).json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to create payment order",
    });
  }
};


// Verify payment

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      registrationId,
    } = req.body;

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(body)
        .digest("hex");

    const isValid =
      expectedSignature ===
      razorpay_signature;

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid payment signature",
      });
    }

    const registration =
      await Registration.findById(
        registrationId
      );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message:
          "Registration not found",
      });
    }

    registration.paymentStatus =
      "paid";

    registration.paymentId =
      razorpay_payment_id;

    registration.orderId =
      razorpay_order_id;

    await registration.save();

    res.status(200).json({
      success: true,
      message:
        "Payment verified successfully",
      data: registration,
    });

  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Payment verification failed",
    });
  }
};


module.exports = {
  createOrder,
  verifyPayment,
};