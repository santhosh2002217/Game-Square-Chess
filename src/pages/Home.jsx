import React from "react";

import Hero from "../components/Hero";
import Tournaments from "../pages/Tournaments";
import Features from "../components/Features";
import Gallery from "../components/Gallery";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <Tournaments />
      <Features />
      <Gallery />
      <CTA />
    </>
  );
};

export default Home;
