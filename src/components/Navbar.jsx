import React, { useState } from "react";
import { Menu, X, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-black text-white p-2 rounded-lg">
              <Crown size={25} />
            </div>

            <div>
              <h1 className="font-black text-xl tracking-tight">GAME SQUARE</h1>

              <p className="text-xs text-gray-500 tracking-widest">CHESS</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-black font-medium">
              Home
            </Link>

            <Link
              to="/tournaments"
              className="text-gray-700 hover:text-black font-medium"
            >
              Tournaments
            </Link>

            <Link
              to="/results"
              className="text-gray-700 hover:text-black font-medium"
            >
              Results
            </Link>

            <Link
              to="/gallery"
              className="text-gray-700 hover:text-black font-medium"
            >
              Gallery
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-black font-medium"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-black font-medium"
            >
              Contact
            </Link>

            <Link
              to="/register"
              className="bg-black text-white px-5 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t py-5 space-y-4">
            <Link
              onClick={() => setOpen(false)}
              to="/"
              className="block font-medium"
            >
              Home
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/tournaments"
              className="block font-medium"
            >
              Tournaments
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/results"
              className="block font-medium"
            >
              Results
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/gallery"
              className="block font-medium"
            >
              Gallery
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/about"
              className="block font-medium"
            >
              About
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/contact"
              className="block font-medium"
            >
              Contact
            </Link>

            <Link
              onClick={() => setOpen(false)}
              to="/register"
              className="block bg-black text-white text-center px-5 py-3 rounded-full font-semibold"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
