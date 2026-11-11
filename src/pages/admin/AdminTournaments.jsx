import React, { useEffect, useState } from "react";
import API from "../../services/api";

const initialForm = {
  title: "",
  category: "Open",
  description: "",
  date: "",
  location: "",
  fee: "",
  maxPlayers: "",
  status: "upcoming",
};

const AdminTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTournaments = async () => {
    try {
      const response = await API.get("/tournaments");
      setTournaments(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const data = {
        ...formData,
        fee: Number(formData.fee),
        maxPlayers: Number(formData.maxPlayers),
      };

      if (editingId) {
        await API.put(`/tournaments/${editingId}`, data);
        setMessage("Tournament updated successfully.");
      } else {
        await API.post("/tournaments", data);
        setMessage("Tournament created successfully.");
      }

      setFormData(initialForm);
      setEditingId(null);

      await fetchTournaments();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tournament) => {
    setEditingId(tournament._id);

    setFormData({
      title: tournament.title || "",
      category: tournament.category || "Open",
      description: tournament.description || "",
      date: tournament.date ? tournament.date.substring(0, 10) : "",
      location: tournament.location || "",
      fee: tournament.fee || "",
      maxPlayers: tournament.maxPlayers || "",
      status: tournament.status || "upcoming",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tournament?",
    );

    if (!confirmed) return;

    try {
      await API.delete(`/tournaments/${id}`);

      setMessage("Tournament deleted successfully.");

      fetchTournaments();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to delete tournament.",
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
    setMessage("");
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-black">Tournament Management</h2>

        <p className="text-gray-500 mt-2">
          Create and manage chess tournaments.
        </p>
      </div>

      {message && (
        <div className="bg-white border rounded-xl p-4 mb-6">{message}</div>
      )}

      {/* Form */}

      <div className="bg-white rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">
            {editingId ? "Edit Tournament" : "Create Tournament"}
          </h3>

          {editingId && (
            <button onClick={cancelEdit} className="text-sm font-semibold">
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold mb-2">Tournament Title</label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Grand Chess Championship"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="Open">Open</option>
              <option value="Rapid">Rapid</option>
              <option value="Blitz">Blitz</option>
              <option value="Classical">Classical</option>
              <option value="Under 18">Under 18</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Location</label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Puducherry"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Entry Fee</label>

            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              required
              min="0"
              className="w-full border rounded-xl px-4 py-3"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Maximum Players</label>

            <input
              type="number"
              name="maxPlayers"
              value={formData.maxPlayers}
              onChange={handleChange}
              required
              min="1"
              className="w-full border rounded-xl px-4 py-3"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="upcoming">Upcoming</option>

              <option value="ongoing">Ongoing</option>

              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="1"
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Tournament description"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-8 py-3 rounded-full font-bold disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Tournament"
                  : "Create Tournament"}
            </button>
          </div>
        </form>
      </div>

      {/* Tournament Table */}

      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">All Tournaments</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="p-3">Title</th>
                <th className="p-3">Date</th>
                <th className="p-3">Location</th>
                <th className="p-3">Fee</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tournaments.map((tournament) => (
                <tr key={tournament._id} className="border-b">
                  <td className="p-3 font-semibold">{tournament.title}</td>

                  <td className="p-3">
                    {new Date(tournament.date).toLocaleDateString()}
                  </td>

                  <td className="p-3">{tournament.location}</td>

                  <td className="p-3">₹{tournament.fee}</td>

                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                      {tournament.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(tournament)}
                        className="bg-gray-200 px-4 py-2 rounded-lg font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(tournament._id)}
                        className="bg-black text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {tournaments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500">
                    No tournaments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTournaments;
