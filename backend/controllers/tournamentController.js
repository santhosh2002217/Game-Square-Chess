const tournamentService = require("../services/tournamentService");

const createTournament = async (req, res) => {
  try {
    const tournament =
  await tournamentService.getTournamentById(req.params.id);
    res.status(201).json({
      success: true,
      message: "Tournament created successfully",
      data: tournament,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllTournaments = async (req, res) => {
  try {
    const tournaments =
      await tournamentService.getAllTournaments();

    res.status(200).json({
      success: true,
      data: tournaments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getTournamentById = async (req, res) => {
  try {
    const tournament =
      await tournamentService.getTournamentById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tournament,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateTournament = async (req, res) => {
  try {
    const tournament =
      await tournamentService.updateTournament(
        req.params.id,
        req.body
      );

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tournament updated successfully",
      data: tournament,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteTournament = async (req, res) => {
  try {
    const tournament =
      await tournamentService.deleteTournament(
        req.params.id
      );

    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tournament deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createTournament,
  getAllTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
};