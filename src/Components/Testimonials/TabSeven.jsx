import React, { useState } from "react";
import { toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";

const TabSeven = ({ settab, space }) => {
  const [type, settype] = useState("");
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    settype("");
  };

  const handleCopy = () => {
    const embedCode = `<iframe src="${import.meta.env.VITE_BACKEND_URL}/review/embed/${space.slug}/${type}" width="100%" height="400" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast.info("Embed code copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <div className="relative flex items-center justify-center mb-4">
          <h2 className="text-2xl text-black font-semibold text-center">
            Embed a single testimonial
          </h2>
          <IoCloseSharp
            className="absolute text-black right-0 cursor-pointer text-2xl"
            onClick={() => settab("1")}
          />
        </div>
        <p className="text-center text-gray-600 mb-6">
          Aside from Wall of Love, you have the option to easily embed a video
          or text testimonial to your website. Read our instructions here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => {
              settype("VIDEO");
              setOpen(true);
            }}
            className="border rounded-xl overflow-hidden hover:shadow-lg cursor-pointer"
          >
            <div className="relative h-64 bg-gray-200">
              <img
                src="https://via.placeholder.com/400x250.png?text=Video+Thumbnail"
                alt="Video testimonial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="bg-white rounded-full p-2">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
                <p className="text-sm font-semibold">Jack Andrew</p>
                <p className="text-xs">General Manager of betterfamily.com</p>
              </div>
            </div>
            <div className="text-center text-black py-3 font-medium">
              Video testimonial
            </div>
          </div>

          <div
            onClick={() => {
              settype("TEXT"), setOpen(true);
            }}
            className="border rounded-xl overflow-hidden hover:shadow-lg cursor-pointer"
          >
            <div className="bg-yellow-50 p-4 h-64 flex flex-col justify-between">
              <div>
                <div className="text-blue-500 text-xl">★★★★★</div>
                <p className="mt-2 text-sm text-gray-800">
                  "We embedded Testimonial.to on the last page of our
                  Prehireforms and candidates' testimonials started coming in
                  automatically!"
                </p>
                <p className="mt-2 text-sm font-semibold text-yellow-900">
                  Testimonials collection is now automated and we don’t need to
                  ask for them anymore!
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <img
                  src="https://via.placeholder.com/30"
                  alt="User avatar"
                  className="rounded-full w-8 h-8"
                />
                <div>
                  <p className="text-sm text-black font-semibold">Kam Ling</p>
                  <p className="text-xs text-gray-600">
                    Co-Founder at Prehireforms.com
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center text-black py-3 font-medium">
              Text testimonial
            </div>
          </div>
        </div>

        {isOpen && (
          <div>
            <h3 className="text-lg text-black font-semibold mt-6">
              Embed code
            </h3>
            <p className="text-gray-600 mb-4">
              Copy the code below and paste it into your website.
            </p>
            <textarea
              className="w-full h-32 border text-black border-gray-300 rounded-lg p-4 resize-none"
              value={`<iframe src="${import.meta.env.VITE_BACKEND_URL}/embed/${space.slug}/${type}" width="100%" height="400" frameborder="0"></iframe>`}
              readOnly
            ></textarea>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleClose}
                className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCopy}
                className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSeven;
