import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, MapPin, IndianRupee, Users, Trophy } from "lucide-react";

import API from "../services/api";

const TournamentDetails = () => {
  const { id } = useParams();

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTournament = async () => {
    try {
      const response = await API.get(`/tournaments/${id}`);

      setTournament(response.data.data);
    } catch (error) {
      console.error(error);

      setError("Tournament not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournament();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading tournament...</p>
      </section>
    );
  }

  if (error || !tournament) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">
          {error || "Tournament not found"}
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f3ee] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="bg-white rounded-[35px] overflow-hidden">
          {/* Header */}

          <div className="bg-black text-white p-8 md:p-14">
            <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">
              {tournament.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-black mt-6">
              {tournament.title}
            </h1>

            <p className="text-gray-300 max-w-2xl mt-6 leading-relaxed">
              {tournament.description}
            </p>
          </div>

          {/* Details */}

          <div className="p-8 md:p-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-gray-100 rounded-2xl p-5">
                <CalendarDays />

                <p className="text-sm text-gray-500 mt-3">Date</p>

                <p className="font-bold mt-1">
                  {new Date(tournament.date).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-5">
                <MapPin />

                <p className="text-sm text-gray-500 mt-3">Venue</p>

                <p className="font-bold mt-1">{tournament.location}</p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-5">
                <IndianRupee />

                <p className="text-sm text-gray-500 mt-3">Entry Fee</p>

                <p className="font-bold mt-1">₹{tournament.fee}</p>
              </div>

              <div className="bg-gray-100 rounded-2xl p-5">
                <Users />

                <p className="text-sm text-gray-500 mt-3">Maximum Players</p>

                <p className="font-bold mt-1">{tournament.maxPlayers}</p>
              </div>
            </div>

            {/* Tournament Information */}

            <div className="mt-12">
              <h2 className="text-3xl font-black">Tournament Information</h2>

              <div className="grid md:grid-cols-2 gap-5 mt-6">
                <div className="border rounded-2xl p-5">
                  <Trophy />

                  <h3 className="font-bold mt-3">Tournament Format</h3>

                  <p className="text-gray-600 mt-2">
                    Swiss-system tournament with multiple rounds.
                  </p>
                </div>

                <div className="border rounded-2xl p-5">
                  <Users />

                  <h3 className="font-bold mt-3">Eligibility</h3>

                  <p className="text-gray-600 mt-2">
                    Players can participate according to the tournament
                    eligibility rules.
                  </p>
                </div>
              </div>
            </div>

            {/* Register */}

            <Link
              to={`/register?tournament=${tournament._id}`}
              className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold mt-10 hover:bg-gray-800"
            >
              Register for Tournament
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentDetails;
