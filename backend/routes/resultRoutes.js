const express = require("express");

const resultController =
  require("../controllers/resultController");

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

const router = express.Router();


// Admin creates result

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  resultController.createResult
);


// Public can view all results

router.get(
  "/",
  resultController.getAllResults
);


// Public tournament results

router.get(
  "/tournament/:tournamentId",
  resultController.getTournamentResults
);


// Admin deletes result

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  resultController.deleteResult
);


module.exports = router;