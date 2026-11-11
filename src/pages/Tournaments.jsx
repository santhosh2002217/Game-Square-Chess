import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, IndianRupee } from "lucide-react";

import API from "../services/api";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTournaments = async () => {
    try {
      const response = await API.get("/tournaments");

      setTournaments(response.data.data);
    } catch (error) {
      console.error(error);

      setError("Unable to load tournaments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading tournaments...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f3ee] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="uppercase tracking-[0.3em] text-sm font-bold text-gray-500">
            Compete
          </p>

          <h1 className="text-5xl font-black mt-3">Chess Tournaments</h1>

          <p className="text-gray-600 mt-5">
            Find your next tournament and compete against passionate chess
            players.
          </p>
        </div>

        {tournaments.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center">
            <p className="text-gray-500">No tournaments available.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {tournaments.map((tournament) => (
              <div
                key={tournament._id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                {tournament.image && (
                  <img
                    src={tournament.image}
                    alt={tournament.title}
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-6">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold">
                    {tournament.category}
                  </span>

                  <h2 className="text-2xl font-bold mt-4">
                    {tournament.title}
                  </h2>

                  <div className="mt-5 space-y-3 text-gray-600">
                    <div className="flex gap-3 items-center">
                      <CalendarDays size={18} />

                      {new Date(tournament.date).toLocaleDateString()}
                    </div>

                    <div className="flex gap-3 items-center">
                      <MapPin size={18} />

                      {tournament.location}
                    </div>

                    <div className="flex gap-3 items-center">
                      <IndianRupee size={18} />

                      {tournament.fee}
                    </div>
                  </div>

                  <Link
                    to={`/tournaments/${tournament._id}`}
                    className="block text-center bg-black text-white rounded-full py-3 mt-6 font-semibold hover:bg-gray-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tournaments;
