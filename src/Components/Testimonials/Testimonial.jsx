import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import confetti from 'canvas-confetti';

const Testimonial = () => {
  const { id } = useParams();

  const [testimonial, settestimonial] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(()=>{
    confetti({
        particleCount: 200,
        spread: 200,
        origin: { y: 0.6 },
        colors: ['#bb0000', '#ffffff', '#00ff00', '#0000ff', '#ff00ff', '#ffcc00'],
      });
  },[])

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        setloading(true)
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/review/testimonial/${id}`,
          {
            withCredentials: true,
          }
        );
        setloading(false)
        console.log(result.data.testimonial);
        settestimonial(result.data.testimonial);
        console.log(result.data.message);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTestimonial();
  }, [id]);

  return (
    <>
        {loading && (
            <p>Loading...</p>
        )}

      <nav className="w-full bg-blue-600 py-4">
        <p className="text-white ml-3 text-2xl font-semibold">GimmeFeedbacks</p>
      </nav>

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
        <div className="border-2 border-blue-500 rounded-xl p-6 w-full max-w-md text-center bg-white shadow-lg">
          
          {testimonial.reviewType === "TEXT" ? (
            <>
              {testimonial.photo && (
                <img
                  src={testimonial.photo}
                  alt="Testimonial"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
              )}
              <p className="text-xl font-medium text-gray-800 mb-2">
                "{testimonial.reviewText}"
              </p>
            </>
          ) : (
            <div className="aspect-video w-full max-w-full mb-4">
              <iframe
                className="w-full h-full rounded-md"
                src={testimonial.videoUrl}
                title="Video Testimonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
            <div className="flex justify-center items-center mb-4">
                {Array.from({ length: testimonial.rating }, (_, index) => (
                <span key={index} className="text-yellow-500 text-2xl">
                    ★
                </span>
                ))}
                {Array.from({ length: 5 - testimonial.rating }, (_, index) => (
                <span key={index} className="text-gray-300 text-2xl">
                    ★
                </span>
                ))}
            </div>
          <p className="text-gray-600">— {testimonial.name}</p>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
