import React from "react";
import { FaStar } from "react-icons/fa";

const Form = ({ review, setreview }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files.length > 0) {
      setreview((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setreview((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <div className="flex m-2 justify-center gap-1">
        {[...Array(5)].map((star, index) => {
          const currentRate = index + 1;
          return (
            <FaStar
              key={index}
              onClick={() => setreview({ ...review, rating: currentRate })}
              color={currentRate <= review.rating ? "yellow" : "gray"}
              className="cursor-pointer"
            />
          );
        })}
      </div>

      <div className="m-2">
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          value={review.name}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2 text-sm"
          required
        />
      </div>

      <div className="m-2">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
          value={review.email}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2 text-sm"
          required
        />
      </div>

      <div className="m-2">
        <label htmlFor="file" className="block text-sm font-medium mb-1">
          Upload Image
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2 text-sm"
          accept="image/*"
        />

        {review.photo && typeof review.photo !== "string" && (
          <img
            src={URL.createObjectURL(review.photo)}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover mt-2 mx-auto"
          />
        )}
      </div>

      <div className="flex m-2 items-center text-sm">
        <input
          type="checkbox"
          name="consent"
          id="consent"
          checked={review.consent}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="consent">
          I give permission to use this testimonial across social channels and
          other marketing efforts.
        </label>
      </div>
    </>
  );
};

export default Form;
