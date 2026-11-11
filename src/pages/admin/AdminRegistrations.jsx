import React, { useEffect, useMemo, useState } from "react";
import API from "../../services/api";

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [tournamentFilter, setTournamentFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchRegistrations = async () => {
    try {
      setLoading(true);

      const response = await API.get("/registrations");

      setRegistrations(response.data.data || []);
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Failed to load registrations.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Get unique tournaments
  const tournaments = useMemo(() => {
    const map = new Map();

    registrations.forEach((registration) => {
      const tournament = registration.tournamentId;

      if (tournament?._id) {
        map.set(tournament._id, tournament.title);
      }
    });

    return Array.from(map.entries());
  }, [registrations]);

  // Search + filter
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((registration) => {
      const tournament = registration.tournamentId;

      const searchText = search.toLowerCase();

      const matchesSearch =
        registration.name?.toLowerCase().includes(searchText) ||
        registration.email?.toLowerCase().includes(searchText) ||
        registration.phone?.toLowerCase().includes(searchText) ||
        registration.fideId?.toLowerCase().includes(searchText);

      const matchesTournament =
        tournamentFilter === "all" || tournament?._id === tournamentFilter;

      return matchesSearch && matchesTournament;
    });
  }, [registrations, search, tournamentFilter]);

  const updateStatus = async (id, field, value) => {
    try {
      await API.put(`/registrations/${id}`, {
        [field]: value,
      });

      setMessage("Registration updated.");

      fetchRegistrations();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to update registration.",
      );
    }
  };

  const deleteRegistration = async (id) => {
    const confirmed = window.confirm("Delete this registration?");

    if (!confirmed) return;

    try {
      await API.delete(`/registrations/${id}`);

      setMessage("Registration deleted successfully.");

      fetchRegistrations();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to delete registration.",
      );
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-3xl font-black">Registration Management</h2>

        <p className="text-gray-500 mt-2">
          Manage players registered for tournaments.
        </p>
      </div>

      {/* Message */}

      {message && (
        <div className="bg-white border rounded-xl p-4 mb-6">{message}</div>
      )}

      {/* Filters */}

      <div className="bg-white rounded-2xl p-5 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search player, email, phone or FIDE ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full"
          />

          <select
            value={tournamentFilter}
            onChange={(e) => setTournamentFilter(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full"
          >
            <option value="all">All Tournaments</option>

            {tournaments.map(([id, title]) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}

      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl p-5">
          <p className="text-gray-500">Total</p>

          <p className="text-3xl font-black mt-2">{registrations.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <p className="text-gray-500">Showing</p>

          <p className="text-3xl font-black mt-2">
            {filteredRegistrations.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <p className="text-gray-500">Paid</p>

          <p className="text-3xl font-black mt-2">
            {
              registrations.filter((item) => item.paymentStatus === "paid")
                .length
            }
          </p>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1200px]">
            <thead>
              <tr className="border-b">
                <th className="p-3">Player</th>
                <th className="p-3">Tournament</th>
                <th className="p-3">Contact</th>
                <th className="p-3">FIDE ID</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center p-10">
                    Loading registrations...
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-10 text-gray-500">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((registration) => (
                  <tr key={registration._id} className="border-b">
                    <td className="p-3">
                      <p className="font-bold">{registration.name}</p>

                      <p className="text-sm text-gray-500">
                        Age: {registration.age}
                      </p>
                    </td>

                    <td className="p-3">
                      {registration.tournamentId?.title || "N/A"}
                    </td>

                    <td className="p-3">
                      <p>{registration.email}</p>

                      <p className="text-sm text-gray-500">
                        {registration.phone}
                      </p>
                    </td>

                    <td className="p-3">{registration.fideId || "N/A"}</td>

                    <td className="p-3">{registration.rating || 0}</td>

                    <td className="p-3">
                      <select
                        value={registration.paymentStatus}
                        onChange={(e) =>
                          updateStatus(
                            registration._id,
                            "paymentStatus",
                            e.target.value,
                          )
                        }
                        className="border rounded-lg px-2 py-2"
                      >
                        <option value="pending">Pending</option>

                        <option value="paid">Paid</option>

                        <option value="failed">Failed</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <select
                        value={registration.registrationStatus}
                        onChange={(e) =>
                          updateStatus(
                            registration._id,
                            "registrationStatus",
                            e.target.value,
                          )
                        }
                        className="border rounded-lg px-2 py-2"
                      >
                        <option value="active">Active</option>

                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => deleteRegistration(registration._id)}
                        className="bg-black text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistrations;
