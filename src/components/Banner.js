import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import "../styles/Banner.css"
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="https://res.cloudinary.com/dmpjioe8c/image/upload/v1733227953/301206505_365442985797930_7729807928513046546_n.jpg_koz3kt.jpg" alt="Image 2" className="slide-image"/>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dmpjioe8c/image/upload/v1733228068/free-professional-car-banner-template-c8wil_tqb919.jpg" alt="Image 2" className="slide-image"/>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dmpjioe8c/image/upload/v1733227584/VF6-banner_h9kygt.webp" alt="Image 1" className="slide-image"/>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dmpjioe8c/image/upload/v1733227983/hero_banner_tzvwzf.jpg" alt="Image 3" className="slide-image"/>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
