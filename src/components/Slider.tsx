import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "../assets/css/components/Slider.css";

type Slide = any;

interface SliderProps {
  interval?: number;
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides, interval = 7500 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartPos, setTouchStartPos] = useState(0);
  const touchEndPos = useRef(0);

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

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartPos(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndPos.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEndPos.current - touchStartPos;
    if (swipeDistance > 50) {
      handlePrevSlide();
    } else if (swipeDistance < -50) {
      handleNextSlide();
    }
  };

  return (
    <>
      <div
        className="slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
