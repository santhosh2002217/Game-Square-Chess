import React, { useEffect, useState } from "react";
import API from "../../services/api";

const AdminResults = () => {
  const [tournaments, setTournaments] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [results, setResults] = useState([]);

  const [formData, setFormData] = useState({
    tournamentId: "",
    playerId: "",
    round: 1,
    opponent: "",
    result: "win",
  });

  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const [tournamentResponse, registrationResponse, resultResponse] =
        await Promise.all([
          API.get("/tournaments"),
          API.get("/registrations"),
          API.get("/results"),
        ]);

      setTournaments(tournamentResponse.data.data || []);

      setRegistrations(registrationResponse.data.data || []);

      setResults(resultResponse.data.data || []);
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data?.message || "Failed to load data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/results", formData);

      setMessage("Result added successfully.");

      setFormData({
        ...formData,
        round: Number(formData.round) + 1,
        opponent: "",
        result: "win",
      });

      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add result.");
    }
  };

  const deleteResult = async (id) => {
    if (!window.confirm("Delete this result?")) {
      return;
    }

    try {
      await API.delete(`/results/${id}`);

      setMessage("Result deleted successfully.");

      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete result.");
    }
  };

  const selectedTournamentPlayers = registrations.filter(
    (registration) => registration.tournamentId?._id === formData.tournamentId,
  );

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-black">Results Management</h2>

        <p className="text-gray-500 mt-2">Add and manage tournament results.</p>
      </div>

      {message && (
        <div className="bg-white border rounded-xl p-4 mb-6">{message}</div>
      )}

      {/* Add Result */}

      <div className="bg-white rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-6">Add Result</h3>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          {/* Tournament */}

          <div>
            <label className="block font-semibold mb-2">Tournament</label>

            <select
              name="tournamentId"
              value={formData.tournamentId}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Tournament</option>

              {tournaments.map((tournament) => (
                <option key={tournament._id} value={tournament._id}>
                  {tournament.title}
                </option>
              ))}
            </select>
          </div>

          {/* Player */}

          <div>
            <label className="block font-semibold mb-2">Player</label>

            <select
              name="playerId"
              value={formData.playerId}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Player</option>

              {selectedTournamentPlayers.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>

          {/* Round */}

          <div>
            <label className="block font-semibold mb-2">Round</label>

            <input
              type="number"
              name="round"
              min="1"
              value={formData.round}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Opponent */}

          <div>
            <label className="block font-semibold mb-2">Opponent</label>

            <input
              type="text"
              name="opponent"
              value={formData.opponent}
              onChange={handleChange}
              required
              placeholder="Opponent name"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Result */}

          <div>
            <label className="block font-semibold mb-2">Result</label>

            <select
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="win">Win — 1 Point</option>

              <option value="draw">Draw — 0.5 Point</option>

              <option value="loss">Loss — 0 Point</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-full font-bold"
            >
              Add Result
            </button>
          </div>
        </form>
      </div>

      {/* Results Table */}

      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Results</h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Tournament</th>
                <th className="p-3">Player</th>
                <th className="p-3">Round</th>
                <th className="p-3">Opponent</th>
                <th className="p-3">Result</th>
                <th className="p-3">Points</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {results.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-3">{item.tournamentId?.title || "N/A"}</td>

                  <td className="p-3 font-semibold">
                    {item.playerId?.name || "N/A"}
                  </td>

                  <td className="p-3">{item.round}</td>

                  <td className="p-3">{item.opponent}</td>

                  <td className="p-3 capitalize">{item.result}</td>

                  <td className="p-3 font-bold">{item.points}</td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteResult(item._id)}
                      className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminResults;
