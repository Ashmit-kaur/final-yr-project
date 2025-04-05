import React from "react";

const ShareSpaceLinkDialog = ({ setopen, spacename, slug }) => {
  console.log(spacename);
  console.log(slug);
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="mb-4 text-center">

            <p className="text-2xl font-semibold text-gray-700">
              Added {spacename} successfully 🎉
            </p>

            <p className=" font-medium text-gray-700">
              Here is the link for your customers:
            </p>

            <p 
            className="hover:text-blue-600 hover:underline font-medium cursor-pointer text-blue-500"
            onClick={() => {
              navigator.clipboard.writeText(` http://localhost:5173/${slug}`);
              alert("Copied to clipboard")
            }}
            >
              http://localhost:5173/{slug}
            </p>

          </div>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              setopen(false);
              window.location.reload();
            }}
          >
            Close
          </button>
          
        </div>
      </div>
    </>
  );
};

export default ShareSpaceLinkDialog;
