import React from "react";

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
    "https://images.unsplash.com/photo-1529699211952-734e80c4d42b",
    "https://images.unsplash.com/photo-1580541832626-2a7131ee809f",
    "https://images.unsplash.com/photo-1560174038-da43ac74f01b",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-5 mb-12">
          <div>
            <p className="uppercase tracking-widest text-sm font-bold text-gray-500">
              Moments
            </p>

            <h2 className="text-4xl sm:text-5xl font-black mt-2">
              From The Board
            </h2>
          </div>

          <p className="text-gray-500 max-w-md">
            Highlights and memories from our chess tournaments and events.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-3xl"
            >
              <img
                src={`${image}?auto=format&fit=crop&w=700&q=80`}
                alt="Chess tournament"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
