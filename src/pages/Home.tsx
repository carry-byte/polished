import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import PromoBanner from '../components/home/PromoBanner';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
    </div>
  );
};

export default Home;