import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
          Your Move
        </p>

        <h2 className="text-4xl sm:text-6xl font-black mt-5">
          Ready to make your move?
        </h2>

        <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
          Join our next tournament and experience the excitement of competitive
          chess.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold mt-8 hover:bg-gray-200 transition"
        >
          Register Now
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
