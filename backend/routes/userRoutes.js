const express = require("express");

const userController =
  require("../controllers/userController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();


router.post(
  "/register",
  userController.registerUser
);


router.post(
  "/login",
  userController.loginUser
);


router.get(
  "/profile",
  authMiddleware,
  (req, res) => {

    res.json({
      success: true,
      message: "Protected profile",
      user: req.user,
    });

  }
);


module.exports = router;