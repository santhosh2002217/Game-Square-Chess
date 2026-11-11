const tournamentModel = require("../models/tournamentModel");

const createTournament = async (body) => {
  const tournament = await tournamentModel.create(body);

  return tournament;
};

const getAllTournaments = async () => {
  const tournaments = await tournamentModel.find()
    .sort({ date: 1 });

  return tournaments;
};

const getTournamentById = async (id) => {
  const tournament = await tournamentModel.findById(id);

  return tournament;
};

const updateTournament = async (id, body) => {
  const tournament = await tournamentModel.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
      runValidators: true,
    }
  );

  return tournament;
};

const deleteTournament = async (id) => {
  const tournament = await tournamentModel.findByIdAndDelete(id);

  return tournament;
};

module.exports = {
  createTournament,
  getAllTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
};