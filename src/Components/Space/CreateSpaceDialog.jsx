import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { createspace } from "../../api-communicators/communicators";

const CreateSpaceDialog = ({ setopenDialog }) => {
  const [space, setspace] = useState({
    name: "",
    title: "",
    description: "",
    file: null,
  });

  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      console.log(space);
      formData.append("name", space.name);
      formData.append("description", space.description);
      formData.append("title", space.title);
      formData.append("file", space.file);
      const response=await createspace(formData)
      alert(response?.message);
      console.log("Space created successfully");
      setopenDialog(false)
    } catch (error) {
      alert(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files.length > 0) {
      setspace((prev) => ({ ...prev, file: files[0] }));
    } else {
      setspace((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Live Preview Section (Optional) */}
        <div className="mb-4 text-center">
          <p className="text-2xl font-semibold text-gray-700">
            Create Your Space
          </p>
          <p className=" font-medium text-gray-700">
            After the Space is created, it will generate a dedicated page for
            collecting testimonials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Space Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={space.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border text-black rounded-md focus:ring focus:ring-blue-300"
              required
            />
            <span className="text-xs text-gray-500">
              Public URL: http://localhost:5173/your-space
            </span>
          </div>

          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Space Logo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border text-black rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Space Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={space.title}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border text-black rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Custom Message
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={space.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border text-black rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mb-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Space
          </button>
        </form>

        <button
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          onClick={() => setopenDialog(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateSpaceDialog;
