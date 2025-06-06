import React, { useState } from "react";
import axios from "axios";
import Form from "../Form";
import { toast } from "react-toastify";

const TextReviewDialog = ({ space, setopen }) => {
  const [review, setreview] = useState({
    name: "",
    email: "",
    // attach image for any feature user liked or not liked
    file: "",
    // user photo
    photo: "",
    rating: 4,
    message: "",
    consent: false,
  });
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files.length > 0) {
      setreview((prev) => ({ ...prev, file: files[0] }));
    } else {
      setreview((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      toast.info("Provide your consent in checkbox");
      return;
    }
    const formData = new FormData();
    try {
      // convert to formData
      formData.append("name", review.name);
      formData.append("email", review.email);
      formData.append("rating", review.rating);
      formData.append("photo", review.photo);
      formData.append("textreview", review.file);
      formData.append("reviewText", review.message);
      formData.append("reviewType", "TEXT");
      setloading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/review/${space.slug}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(formData);
      console.log(review);
      toast.success(response.data.message);
      setloading(false);
      setopen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="max-h-[90vh] w-[90%] max-w-lg overflow-y-auto bg-white rounded-xl p-6 shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Write a Testimonial</h2>
          <img src={space.logourl} alt="space logo" className="h-16 mx-auto" />
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b-2 border-indigo-500 pb-1 mb-2">
            Questions
          </h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Who are you / what are you working on?</li>
            <li>How has our product/service helped you?</li>
            <li>What is the best thing about our product/service?</li>
          </ul>
        </div>

        <textarea
          name="message"
          id="message"
          placeholder="Your experience..."
          value={review.message}
          onChange={handleChange}
          className="w-full border rounded-md mt-2 px-4 py-2 text-sm"
          rows="4"
          required
        />

        <div className="m-2">
          <label htmlFor="file" className="block text-sm font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="file"
            id="file"
            placeholder="Upload relevant image for review"
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 text-sm"
            accept="image/*"
          />

          {review.file && typeof review.file !== "string" && (
            <img
              src={URL.createObjectURL(review.file)}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover mt-2 mx-auto"
            />
          )}
        </div>

        <Form review={review} setreview={setreview} />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setopen(false)}
            className="px-4 py-2 cursor-pointer rounded bg-gray-300 hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white text-sm"
            disabled={loading}
          >
            {loading ? "Sending" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextReviewDialog;
