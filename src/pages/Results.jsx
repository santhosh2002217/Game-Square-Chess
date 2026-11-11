import React from "react";

const Results = () => {
  const results = [
    {
      rank: 1,
      name: "Arjun Kumar",
      points: 8,
      rating: 1850,
    },
    {
      rank: 2,
      name: "Rahul Raj",
      points: 7,
      rating: 1780,
    },
    {
      rank: 3,
      name: "Vijay Anand",
      points: 6.5,
      rating: 1710,
    },
    {
      rank: 4,
      name: "Karthik S",
      points: 6,
      rating: 1650,
    },
  ];

  return (
    <section className="min-h-screen bg-[#f5f3ee] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-sm font-bold text-gray-500">
            Leaderboard
          </p>

          <h1 className="text-5xl font-black mt-3">Tournament Results</h1>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-5">Rank</th>
                  <th className="p-5">Player</th>
                  <th className="p-5">Rating</th>
                  <th className="p-5">Points</th>
                </tr>
              </thead>

              <tbody>
                {results.map((player) => (
                  <tr key={player.rank} className="border-b last:border-none">
                    <td className="p-5 font-bold">{player.rank}</td>

                    <td className="p-5 font-semibold">{player.name}</td>

                    <td className="p-5">{player.rating}</td>

                    <td className="p-5 font-bold">{player.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
