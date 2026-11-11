import API from "../services/api";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  const tournamentId = searchParams.get("tournament");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    fideId: "",
    rating: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/registrations", {
        tournamentId,
        ...formData,
        age: Number(formData.age),
        rating: Number(formData.rating || 0),
      });

      console.log(response.data);

      setMessage("Registration successful!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        fideId: "",
        rating: "",
      });
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const handlePayment = async (registrationId, tournament) => {
    try {
      // Step 1:
      // Create Razorpay order

      const orderResponse = await API.post("/payments/create-order", {
        tournamentId: tournament._id,

        amount: tournament.fee,
      });

      const order = orderResponse.data.data;

      // Step 2:
      // Open Razorpay

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: "INR",

        name: "Game Square Chess",

        description: tournament.title,

        order_id: order.id,

        handler: async function (response) {
          // Step 3:
          // Verify payment

          try {
            await API.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

              registrationId: registrationId,
            });

            alert("Payment successful! Registration confirmed.");

            window.location.href = "/my-registrations";
          } catch (error) {
            console.error(error);

            alert("Payment verification failed.");
          }
        },

        prefill: {
          name: formData.name,

          email: formData.email,

          contact: formData.phone,
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to start payment.");
    }
  };

  return (
    <section className="min-h-screen bg-[#f5f3ee] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-5">
        <div className="bg-white rounded-[35px] p-7 md:p-12">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.3em] text-sm font-bold text-gray-500">
              Join The Game
            </p>

            <h1 className="text-4xl md:text-5xl font-black mt-3">
              Player Registration
            </h1>

            <p className="text-gray-500 mt-4">
              Enter your details to register for the tournament.
            </p>
          </div>

          {message && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-semibold">Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-semibold">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 mt-2"
                  placeholder="example@gmail.com"
                />
              </div>

              <div>
                <label className="font-semibold">Phone</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 mt-2"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-semibold">Age</label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 mt-2"
                  placeholder="Age"
                />
              </div>

              <div>
                <label className="font-semibold">FIDE ID</label>

                <input
                  type="text"
                  name="fideId"
                  value={formData.fideId}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 mt-2"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Chess Rating</label>

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 mt-2"
                placeholder="Optional"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
