import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="min-h-screen bg-[#f5f3ee] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-sm font-bold text-gray-500">
            Get In Touch
          </p>

          <h1 className="text-5xl font-black mt-3">Contact Us</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-black text-white rounded-3xl p-8 md:p-10">
            <h2 className="text-3xl font-black">Let's Talk Chess</h2>

            <p className="text-gray-400 mt-4">
              Have questions about tournaments, registration or partnerships?
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex gap-4">
                <Mail />
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-gray-400">gamesquarechess@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone />
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="text-gray-400">+91 XXXXX XXXXX</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin />
                <div>
                  <p className="font-bold">Location</p>
                  <p className="text-gray-400">Puducherry, India</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-white rounded-3xl p-8 md:p-10 space-y-5">
            <div>
              <label className="font-semibold">Name</label>

              <input
                className="w-full border rounded-xl px-4 py-3 mt-2"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="font-semibold">Email</label>

              <input
                type="email"
                className="w-full border rounded-xl px-4 py-3 mt-2"
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="font-semibold">Message</label>

              <textarea
                rows="6"
                className="w-full border rounded-xl px-4 py-3 mt-2"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-full font-bold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
