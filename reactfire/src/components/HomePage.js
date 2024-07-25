import React from 'react';
import ImageSlider from './ImageSlider';
import dubai1 from './dubai1.jpg';
import './componentsstyle.css';

const HomePage = () => {
   const images = [
    dubai1,
    dubai1,
    dubai1,
  ];

  return (
    <div>
      <p></p>
    <ImageSlider id="imgslider" images={images} />
      <h1>Welcome to the Home Page!</h1>
      {/* Add your home page content here */}
    </div>
  );
};

export default HomePage;
