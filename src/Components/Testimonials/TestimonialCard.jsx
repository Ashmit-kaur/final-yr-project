import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BsShare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

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

  const handleDelete=async ()=>{
    try{
      const result = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/review/${testimonial.id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(result.data.message);
    }catch(error){
      console.log(error.message);
      toast.error("Failed to delete testimonial. Please try again later.");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-gray-800 transition transform hover:scale-[1.01] hover:shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          {testimonial.reviewType}
        </span>

        <div className="relative flex gap-4 items-center">
          <BsShare
            className="cursor-pointer text-xl text-gray-500 hover:text-blue-600 transition"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-64 space-y-3">
              <div>
                <p
                  className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer"
                  onClick={() => setopengetlink(!getlink)}
                >
                  🔗 Get the link
                </p>
                {getlink && (
                  <div className="mt-2 bg-gray-100 text-gray-700 p-2 rounded text-xs break-words">
                    {import.meta.env.VITE_FRONTEND_URL}/share/{testimonial.id}
                  </div>
                )}
              </div>

              <div>
                <p
                  className="text-sm text-gray-600 hover:text-blue-700 cursor-pointer"
                  onClick={() => setembedlink(!embed)}
                >
                  📎 Embed testimonial
                </p>
                {embed && (
                  <div className="mt-2 bg-gray-100 text-gray-700 p-2 rounded text-xs">
                    &lt;iframe
                    src=`{import.meta.env.VITE_BACKEND_URL}/review/embedsingle/{testimonial.id}` /&gt;
                  </div>
                )}
              </div>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  `${import.meta.env.VITE_FRONTEND_URL}/share/${testimonial.id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-700 block"
              >
                📣 Share on LinkedIn
              </a>
            </div>
          )}

          <AiOutlineDelete className="text-black cursor-pointer" onClick={()=>handleDelete()}/>

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
            <span key={index} className="text-gray-300 text-lg">
              ★
            </span>
          ))}
        </div>
      )}

      <div className="mb-4">
        {testimonial.reviewType === "TEXT" ? (
          <p className="text-gray-700 italic leading-relaxed">
            {testimonial.reviewText}
          </p>
        ) : (
          testimonial.reviewType === "VIDEO" && (
            <video
              src={testimonial.videoUrl}
              controls
              className="w-[30%] rounded-lg mt-2 border border-gray-300"
            />
          )
        )}
      </div>

      <div className="text-sm text-gray-500 space-y-1 border-t border-gray-200 pt-4">
        <p>
          <span className="font-semibold text-gray-700">Name:</span>{" "}
          {testimonial.name}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Email:</span>{" "}
          {testimonial.email}
        </p>
        <p>
          <span className="font-semibold text-gray-700">SubmittedAt:</span>{" "}
          {new Date(testimonial.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
