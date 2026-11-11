import React, { useEffect, useState } from "react";

import API from "../../services/api";

const AdminDashboard = () => {
  const [tournaments, setTournaments] = useState([]);

  const [registrations, setRegistrations] = useState([]);

  const fetchData = async () => {
    try {
      const tournamentResponse = await API.get("/tournaments");

      const registrationResponse = await API.get("/registrations");

      setTournaments(tournamentResponse.data.data);

      setRegistrations(registrationResponse.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-black">Dashboard</h2>

      <p className="text-gray-500 mt-2">Manage your chess platform.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <div className="bg-white rounded-2xl p-6">
          <p className="text-gray-500">Total Tournaments</p>

          <p className="text-4xl font-black mt-3">{tournaments.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <p className="text-gray-500">Total Registrations</p>

          <p className="text-4xl font-black mt-3">{registrations.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <p className="text-gray-500">Upcoming Tournaments</p>

          <p className="text-4xl font-black mt-3">
            {tournaments.filter((item) => item.status === "upcoming").length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-bold">Recent Registrations</h3>

        <div className="overflow-x-auto mt-5">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Player</th>

                <th className="p-3">Email</th>

                <th className="p-3">Tournament</th>
              </tr>
            </thead>

            <tbody>
              {registrations.slice(0, 5).map((registration) => (
                <tr key={registration._id} className="border-b">
                  <td className="p-3 font-semibold">{registration.name}</td>

                  <td className="p-3">{registration.email}</td>

                  <td className="p-3">{registration.tournamentId?.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
