import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../assets/css/components/Slider.css";

type Slide = any;

interface SliderProps {
  interval?: number;
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides, interval = 7500 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((currentSlide + 1) % slides.length),
      interval
    );
    return () => clearInterval(timer);
  }, [currentSlide, interval, slides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <div className="slider">
        {slides.map((slide: number, index: number) => (
          <div
            key={index}
            className={`slide ${
              index === currentSlide ? "active" : "deactive"
            }`}
          >
            {slide}
          </div>
        ))}
        <nav className="bannersNav">
          <button onClick={handlePrevSlide}>«</button>
          <button onClick={handleNextSlide}>»</button>
        </nav>
        <div className="dots">
          {slides.map((slide: number, index: number) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
