import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const TestimonialCard = ({ testimonial }) => {
  const [isLiked, setIsLiked] = useState(testimonial.isfavourite);
  const handleLike = async () => {
    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/review/${testimonial.id}/addtofavourite`,{},
        {
          withCredentials: true,
        }
      );
      setIsLiked(result.data.isfavourite);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 text-white transition transform hover:scale-[1.01] hover:shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold px-3 py-1 bg-gray-700 rounded-full">
          {testimonial.reviewType}
        </span>
        {isLiked ? (
          <span
            className="text-red-500 cursor-pointer text-xl"
          onClick={() => handleLike()}
          >
            ❤️
          </span>
        ) : (
          <span
            className="text-gray-500 cursor-pointer text-xl"
            onClick={() => handleLike()}
          >
            🤍
          </span>
        )}
      </div>

      {testimonial.rating && (
        <div className="flex items-center mb-4">
          {Array.from({ length: testimonial.rating }, (_, index) => (
            <span key={index} className="text-yellow-400 text-lg">
              ★
            </span>
          ))}
          {Array.from({ length: 5 - testimonial.rating }, (_, index) => (
            <span key={index} className="text-gray-500 text-lg">
              ★
            </span>
          ))}
        </div>
      )}

      <div className="mb-4">
        {testimonial.reviewType === "TEXT" ? (
          <p className="text-gray-300 italic leading-relaxed">
            {testimonial.reviewText}
          </p>
        ) : (
          testimonial.reviewType === "VIDEO" && (
            <video
              src={testimonial.videoUrl}
              controls
              className="w-[30%] rounded-lg mt-2 border border-gray-600"
            />
          )
        )}
      </div>

      <div className="text-sm text-gray-400 space-y-1 border-t border-gray-700 pt-4">
        <p>
          <span className="font-semibold text-gray-300">Name:</span>{" "}
          {testimonial.name}
        </p>
        <p>
          <span className="font-semibold text-gray-300">Email:</span>{" "}
          {testimonial.email}
        </p>
        <p>
          <span className="font-semibold text-gray-300">SubmittedAt:</span>{" "}
          {new Date(testimonial.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
