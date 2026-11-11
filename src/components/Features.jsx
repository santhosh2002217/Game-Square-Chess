import React from "react";
import { Trophy, Users, Medal, ShieldCheck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Trophy size={30} />,
      title: "Competitive Events",
      description: "Participate in professionally organized chess tournaments.",
    },
    {
      icon: <Users size={30} />,
      title: "Chess Community",
      description: "Connect with chess players and enthusiasts.",
    },
    {
      icon: <Medal size={30} />,
      title: "Player Recognition",
      description: "Showcase your skills and compete for exciting prizes.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Fair Play",
      description:
        "Enjoy a professional and transparent tournament environment.",
    },
  ];

  return (
    <section className="py-24 bg-[#f5f3ee]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="uppercase tracking-widest text-sm font-bold text-gray-500">
            Why Game Square
          </p>

          <h2 className="text-4xl sm:text-5xl font-black mt-3">
            More Than A Game
          </h2>

          <p className="text-gray-600 mt-5">
            A platform created for players who love the challenge, strategy and
            excitement of chess.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-7 hover:-translate-y-2 transition duration-300"
            >
              <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mt-6">{feature.title}</h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
