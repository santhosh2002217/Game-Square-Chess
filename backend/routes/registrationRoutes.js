const express = require("express");

const registrationController =
  require("../controllers/registrationController");

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

const router = express.Router();


// User can register

router.post(
  "/",
  authMiddleware,
  registrationController.createRegistration
);


// Admin can view all registrations

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  registrationController.getAllRegistrations
);


// Admin can view registration

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  registrationController.getRegistrationById
);


// Admin can update

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  registrationController.updateRegistration
);


// Admin can delete

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  registrationController.deleteRegistration
);


module.exports = router;