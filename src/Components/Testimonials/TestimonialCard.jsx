import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BsShare } from "react-icons/bs";

const TestimonialCard = ({ testimonial }) => {
  const [isLiked, setIsLiked] = useState(testimonial.isfavourite);
  const [isOpen, setIsOpen] = useState(false);

  const [getlink, setopengetlink] = useState(false);
  const [embed, setembedlink] = useState(false);

  console.log(testimonial);

  const handleLike = async () => {
    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/review/${
          testimonial.id
        }/addtofavourite`,
        {},
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

        <div className="relative flex gap-4 items-center">
          <BsShare
            className="cursor-pointer text-xl text-gray-300 hover:text-white transition"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="absolute top-full mt-2 right-0 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-3 w-64 space-y-2">
              <div>
                <p
                  className="text-sm text-gray-300 hover:text-white cursor-pointer"
                  onClick={() => setopengetlink(!getlink)}
                >
                  🔗 Get the link
                </p>
                {getlink && (
                  <div className="mt-2 bg-gray-900 text-gray-300 p-2 rounded text-xs break-words">
                    http://localhost:5173/share/{testimonial.id}
                  </div>
                )}
              </div>

              <div>
                <p
                  className="text-sm text-gray-300 hover:text-white cursor-pointer"
                  onClick={() => setembedlink(!embed)}
                >
                  📎 Embed testimonial
                </p>
                {embed && (
                  <div className="mt-2 bg-gray-900 text-gray-300 p-2 rounded text-xs">
                    {/* Replace this with actual embed logic */}
                    &lt;iframe
                    src="http://localhost:3000/api/v1/review/embedsingle/
                    {testimonial.id}" /&gt;
                  </div>
                )}
              </div>

              {/* Share on social media */}
              
              <a href={ `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`http://localhost:5173/share/${testimonial.id}`)}` }
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#0a66c2" }}
              >
                <p
                  className="text-sm text-gray-300 hover:text-white cursor-pointer"
                >
                  📣 Share on LinkedIn
                </p>
              </a>
            </div>
          )}

          <span
            className={`text-xl cursor-pointer transition transform hover:scale-110 ${
              isLiked ? "text-red-500" : "text-gray-400"
            }`}
            onClick={handleLike}
          >
            {isLiked ? "❤️" : "🤍"}
          </span>
        </div>
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
