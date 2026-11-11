import React from "react";

const GalleryPage = () => {
  const images = [
    "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
    "https://images.unsplash.com/photo-1529699211952-734e80c4d42b",
    "https://images.unsplash.com/photo-1580541832626-2a7131ee809f",
    "https://images.unsplash.com/photo-1560174038-da43ac74f01b",
    "https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5",
    "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24",
  ];

  return (
    <section className="min-h-screen bg-[#f5f3ee] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-sm font-bold text-gray-500">
            Moments
          </p>

          <h1 className="text-5xl font-black mt-3">Chess Gallery</h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-3xl overflow-hidden"
            >
              <img
                src={`${image}?auto=format&fit=crop&w=800&q=80`}
                alt={`Chess tournament ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
