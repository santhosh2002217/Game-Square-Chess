const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },

    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },

    round: {
      type: Number,
      required: true,
      min: 1,
    },

    opponent: {
      type: String,
      required: true,
      trim: true,
    },

    result: {
      type: String,
      enum: ["win", "draw", "loss"],
      required: true,
    },

    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Result",
  resultSchema
);