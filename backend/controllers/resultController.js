const Result = require("../models/resultModel");


// Create result

const createResult = async (req, res) => {
  try {
    const {
      tournamentId,
      playerId,
      round,
      opponent,
      result,
    } = req.body;

    let points = 0;

    if (result === "win") {
      points = 1;
    } else if (result === "draw") {
      points = 0.5;
    }

    const newResult = await Result.create({
      tournamentId,
      playerId,
      round,
      opponent,
      result,
      points,
    });

    res.status(201).json({
      success: true,
      message: "Result created successfully",
      data: newResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get all results

const getAllResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("tournamentId")
      .populate("playerId")
      .sort({
        round: 1,
      });

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get results for one tournament

const getTournamentResults = async (req, res) => {
  try {
    const results = await Result.find({
      tournamentId: req.params.tournamentId,
    })
      .populate("playerId")
      .sort({
        round: 1,
      });

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete result

const deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(
      req.params.id
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createResult,
  getAllResults,
  getTournamentResults,
  deleteResult,
};