const express = require("express");

const tournamentController =
  require("../controllers/tournamentController");

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

const router = express.Router();


// Public routes

router.get(
  "/",
  tournamentController.getAllTournaments
);

router.get(
  "/:id",
  tournamentController.getTournamentById
);


// Admin routes

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  tournamentController.createTournament
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  tournamentController.updateTournament
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  tournamentController.deleteTournament
);


module.exports = router;