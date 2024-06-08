import React from 'react'
import Hero from './_sections/Hero';
import RandomProducts from './_sections/RandomProducts';
import Categories from './_sections/Categories';
import SecLine from './_components/SecLine';
import BestSelling from './_sections/BestSelling';
import NewArrival from './_sections/NewArrival'

const Home = async () => {

  return (
    <div className="container mx-auto px-4">
      <Hero />
      <RandomProducts />
      <SecLine />
      <Categories />
      <SecLine />
      <BestSelling />
      <NewArrival />
    </div>
  );
}

export default Home