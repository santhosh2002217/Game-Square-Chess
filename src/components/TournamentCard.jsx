import React from "react";
import { CalendarDays, MapPin, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

const TournamentCard = ({ title, date, location, fee, category }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
            {category}
          </span>

          <h3 className="text-2xl font-bold mt-4">{title}</h3>
        </div>

        <div className="bg-black text-white rounded-xl p-3">♟</div>
      </div>

      <div className="space-y-3 mt-6 text-gray-600">
        <div className="flex items-center gap-3">
          <CalendarDays size={18} />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18} />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-3">
          <IndianRupee size={18} />
          <span>{fee}</span>
        </div>
      </div>

      <Link
        to="/register"
        className="block text-center bg-black text-white rounded-full py-3 mt-6 font-semibold hover:bg-gray-800"
      >
        Register Now
      </Link>
    </div>
  );
};

export default TournamentCard;
