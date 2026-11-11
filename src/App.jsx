import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import TournamentDetails from "./pages/TournamentDetails";
import Register from "./pages/Register";
import Results from "./pages/Results";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTournaments from "./pages/admin/AdminTournaments";
import AdminRegistrations from "./pages/admin/AdminRegistrations";
import AdminResults from "./pages/admin/AdminResults";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/tournaments" element={<Tournaments />} />

        <Route path="/tournaments/:id" element={<TournamentDetails />} />

        <Route path="/register" element={<Register />} />

        <Route path="/results" element={<Results />} />

        <Route path="/gallery" element={<GalleryPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/faq" element={<FAQ />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="tournaments" element={<AdminTournaments />} />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="results" element={<AdminResults />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
