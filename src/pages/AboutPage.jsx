import React from "react";

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-[#f5f3ee] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm font-bold text-gray-500">
              About Us
            </p>

            <h1 className="text-5xl font-black mt-4">
              Growing The Chess Community
            </h1>

            <p className="text-gray-600 mt-6 leading-relaxed">
              Game Square Chess is focused on creating competitive and enjoyable
              chess experiences for players of different skill levels.
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Our goal is to organize professional tournaments, encourage young
              players and build a strong chess community.
            </p>
          </div>

          <div className="bg-black rounded-[40px] p-8">
            <div className="aspect-square rounded-3xl bg-[#8b7355] flex items-center justify-center">
              <span className="text-[180px] text-white">♞</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
