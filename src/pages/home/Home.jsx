import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";

const Home = () => {
  return (
    <Layout>
        <HeroSection />
        <Filter />
        <ProductCard />
        <Track />
        <Testimonial />
    </Layout>
  );
};

export default Home;
