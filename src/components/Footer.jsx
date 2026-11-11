import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-black">GAME SQUARE</h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Building a stronger chess community through competitive
              tournaments and meaningful events.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-5">Explore</h3>

            <div className="space-y-3 text-gray-400">
              <Link to="/tournaments" className="block hover:text-white">
                Tournaments
              </Link>

              <Link to="/results" className="block hover:text-white">
                Results
              </Link>

              <Link to="/gallery" className="block hover:text-white">
                Gallery
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-5">Company</h3>

            <div className="space-y-3 text-gray-400">
              <Link to="/about" className="block hover:text-white">
                About
              </Link>

              <Link to="/contact" className="block hover:text-white">
                Contact
              </Link>

              <Link to="/register" className="block hover:text-white">
                Register
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-5">Contact</h3>

            <div className="text-gray-400 space-y-2">
              <p>Puducherry, India</p>
              <p>gamesquarechess@gmail.com</p>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-7 text-gray-500 text-sm">
          © 2026 Game Square Chess. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
