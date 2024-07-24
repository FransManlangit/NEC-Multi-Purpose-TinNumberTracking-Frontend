import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/saga-blue/theme.css';  // PrimeReact theme
import 'primereact/resources/primereact.min.css';         // PrimeReact CSS
import 'primeicons/primeicons.css';                       // PrimeIcons

const products = [
  { id: 1, image: "/images/porsche1.jpg" },
  { id: 2, image: "/images/porsche2.jpg" },
  { id: 3, image: "/images/porsche3.jpg" },
  { id: 4, image: "/images/porsche4.jpg" },
  { id: 5, image: "/images/porsche5.jpg" },
];

const responsiveOptions = [
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
];

const productTemplate = (product) => {
  return (
    <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
      <div className="mb-3">
        <img src={product.image} alt={product.name} className="w-full h-auto" style={{ maxHeight: '300px' }} />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="container mx-auto py-32">
      <Carousel
        value={products}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
      />
      <div>
        frans
      </div>
    </div>
  );
};

export default Home;
