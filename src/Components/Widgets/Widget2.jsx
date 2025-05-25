import React from "react";
import "./widget.css";

const Widget2 = ({ favourites }) => {
  return (
    <div>
      <h3 className="text-xl font-bold">Carousel-Slider</h3>
      {
        <div class="carousel-container">
          {favourites.map((t) => (
            <div class="testimonial-card">
              <div class="testimonial-message">{t.reviewText}</div>
              <div class="testimonial-author">{t.name || "Anonymous"}</div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Widget2;
