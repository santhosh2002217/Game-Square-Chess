const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    fee: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    maxPlayers: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

const tournamentModel = mongoose.model(
  "Tournament",
  tournamentSchema
);

module.exports = tournamentModel;