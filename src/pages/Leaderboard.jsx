import React, { useEffect, useMemo, useState } from "react";
import API from "../services/api";

const Leaderboard = () => {
  const [tournaments, setTournaments] = useState([]);

  const [results, setResults] = useState([]);

  const [selectedTournament, setSelectedTournament] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tournamentResponse = await API.get("/tournaments");

        setTournaments(tournamentResponse.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedTournament) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await API.get(
          `/results/tournament/${selectedTournament}`,
        );

        setResults(response.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResults();
  }, [selectedTournament]);

  const leaderboard = useMemo(() => {
    const players = {};

    results.forEach((result) => {
      const player = result.playerId;

      if (!player?._id) return;

      if (!players[player._id]) {
        players[player._id] = {
          id: player._id,
          name: player.name,
          fideId: player.fideId || "N/A",
          rating: player.rating || 0,
          points: 0,
          games: 0,
          wins: 0,
          draws: 0,
          losses: 0,
        };
      }

      players[player._id].points += result.points;

      players[player._id].games += 1;

      if (result.result === "win") {
        players[player._id].wins += 1;
      }

      if (result.result === "draw") {
        players[player._id].draws += 1;
      }

      if (result.result === "loss") {
        players[player._id].losses += 1;
      }
    });

    return Object.values(players).sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      return b.rating - a.rating;
    });
  }, [results]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black">Chess Leaderboard</h1>

          <p className="text-gray-500 mt-2">Tournament standings and results</p>
        </div>

        {/* Tournament Select */}

        <div className="bg-white rounded-2xl p-6 mb-8">
          <label className="block font-bold mb-2">Select Tournament</label>

          <select
            value={selectedTournament}
            onChange={(e) => setSelectedTournament(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="">Select a tournament</option>

            {tournaments.map((tournament) => (
              <option key={tournament._id} value={tournament._id}>
                {tournament.title}
              </option>
            ))}
          </select>
        </div>

        {/* Leaderboard */}

        {selectedTournament && (
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-4">Rank</th>

                    <th className="p-4">Player</th>

                    <th className="p-4">FIDE ID</th>

                    <th className="p-4">Rating</th>

                    <th className="p-4">Games</th>

                    <th className="p-4">W</th>

                    <th className="p-4">D</th>

                    <th className="p-4">L</th>

                    <th className="p-4">Points</th>
                  </tr>
                </thead>

                <tbody>
                  {leaderboard.map((player, index) => (
                    <tr key={player.id} className="border-b">
                      <td className="p-4 font-black">{index + 1}</td>

                      <td className="p-4 font-bold">{player.name}</td>

                      <td className="p-4">{player.fideId}</td>

                      <td className="p-4">{player.rating}</td>

                      <td className="p-4">{player.games}</td>

                      <td className="p-4">{player.wins}</td>

                      <td className="p-4">{player.draws}</td>

                      <td className="p-4">{player.losses}</td>

                      <td className="p-4 font-black">{player.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!selectedTournament && (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
            Select a tournament to view the leaderboard.
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
