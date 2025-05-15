import React from "react";
import "./Widget1.css";

const Widget1 = ({ favourites }) => {
  return (
    <div className="container">
      <div className="scroll-container flex-col">
        <p>Masonry-Animated</p>
        <div className="scroll-content">
          {[...favourites, ...favourites].map((testimonial, index) => (
            <div key={index} className="item">
              {testimonial.reviewType === "TEXT" ? (
                <img src={testimonial?.photo} alt={testimonial?.name} />
              ) : (
                <video
                  src={testimonial?.video}
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              )}
              <div>
                <p className="testimonial-text">{testimonial.reviewText}</p>
                <span className="testimonial-name">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Widget1;
