import React from "react";
import PropTypes from "prop-types";

interface SlideProps {
  content: JSX.Element;
}

const Slide: React.FC<SlideProps> = ({ content }) => (
  <div className="slide">{content}</div>
);

Slide.propTypes = {
  content: PropTypes.element.isRequired,
};

export default Slide;
