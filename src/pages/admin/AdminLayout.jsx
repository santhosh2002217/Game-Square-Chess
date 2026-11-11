import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}

      <aside className="fixed left-0 top-0 h-screen w-64 bg-black text-white p-6 hidden md:block">
        <h1 className="text-2xl font-black">Game Square</h1>

        <p className="text-gray-400 text-sm mt-1">Admin Panel</p>

        <nav className="mt-10 space-y-2">
          <Link
            to="/admin"
            className="block px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/tournaments"
            className="block px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Tournaments
          </Link>

          <Link
            to="/admin/registrations"
            className="block px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Registrations
          </Link>

          <Link
            to="/admin/results"
            className="block px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Results
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-8 left-6 right-6 bg-white text-black py-3 rounded-xl font-bold"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}

      <main className="md:ml-64 p-5 md:p-10">
        <div className="mb-8">
          <p className="text-gray-500">Welcome back,</p>

          <h1 className="text-3xl font-black">{user?.name || "Admin"}</h1>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
