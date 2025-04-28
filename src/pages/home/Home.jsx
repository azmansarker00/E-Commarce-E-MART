import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import { Link } from "react-router-dom";
import MyContext from "../../context/data/myContext";

const Home = () => {
  const context = useContext(MyContext);
  const {mode} = context
  return (
    <Layout>
        <HeroSection />
        <Filter />
        <ProductCard />
         <Link to={"/allproducts"} className="flex justify-center items-center text-md  "
         style={{ color: mode === "dark" ? "white" : "" }}>more products...</Link>
        <Track />
        <Testimonial />
    </Layout>
  );
};

export default Home;
