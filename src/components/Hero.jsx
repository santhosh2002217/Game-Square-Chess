import React from "react";
import { ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen bg-[#f5f3ee] flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <Trophy size={18} />
              <span className="text-sm font-semibold">Chess Tournaments</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
              THINK.
              <br />
              <span className="text-gray-500">PLAY.</span>
              <br />
              WIN.
            </h1>

            <p className="mt-6 text-gray-600 text-lg max-w-lg leading-relaxed">
              Experience competitive chess tournaments, meet passionate players
              and take your game to the next level.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/register"
                className="bg-black text-white px-7 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-800 transition"
              >
                Register Now
                <ArrowRight size={19} />
              </Link>

              <Link
                to="/tournaments"
                className="border border-black px-7 py-4 rounded-full font-bold hover:bg-black hover:text-white transition"
              >
                View Tournaments
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="bg-black rounded-[40px] p-6 shadow-2xl">
              <div className="grid grid-cols-4 aspect-square overflow-hidden rounded-2xl">
                {Array.from({ length: 64 }).map((_, index) => {
                  const row = Math.floor(index / 8);
                  const col = index % 8;

                  const dark = (row + col) % 2 === 1;

                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-center ${
                        dark ? "bg-[#8b7355]" : "bg-[#e8d5b5]"
                      }`}
                    >
                      {index === 27 && (
                        <span className="text-5xl sm:text-6xl">♛</span>
                      )}

                      {index === 36 && (
                        <span className="text-5xl sm:text-6xl text-white">
                          ♔
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4">
              <p className="text-xs text-gray-500">NEXT TOURNAMENT</p>

              <p className="font-bold">Open Chess Championship</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
