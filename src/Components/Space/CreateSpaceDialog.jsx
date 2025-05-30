import React, { useState } from "react";
import FormData from "form-data";
import { createspace } from "../../api-communicators/communicators";
import axios from "axios";
import { toast } from "react-toastify";

const CreateSpaceDialog = ({
  mode,
  spaceData = {},
  setopenDialog,
  setopenshareDialog,
  setslug,
}) => {
  console.log(spaceData);
  const [space, setspace] = useState({
    title: spaceData.title || "",
    description: spaceData.description || "",
    spacelogo: spaceData.logourl || "",
  });
  const [loading, setloading] = useState(false);

  console.log(space);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      console.log(space);
      formData.append("name", space.name);
      formData.append("description", space.description);
      formData.append("title", space.title);
      formData.append("spacelogo", space.spacelogo);
      setloading(true);
      let response;
      if (mode === "create") {
        response = await createspace(formData);
      } else {
        console.log(spaceData.id)
        response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/space/update/${spaceData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
      }

      if (response?.space?.slug) {
        toast.success(response?.message);
        console.log("Space created successfully");
        setslug(response?.space?.slug);
        setopenshareDialog(true);
      }
      setTimeout(() => {
        setopenDialog(false);
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
    setloading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files.length > 0) {
      setspace((prev) => ({ ...prev, spacelogo: files[0] }));
    } else {
      setspace((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* Live Preview Section */}
          <div className="mb-4 text-center">
            <p className="text-2xl font-semibold text-gray-700">
              {mode === "edit" ? `Edit ${space.title}` : "Create Your Space"}
            </p>
            {mode === "create" && (
              <p className=" font-medium text-gray-700">
                After the Space is created, it will generate a dedicated page
                for collecting testimonials.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "create" ? (
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
                  Public URL: {import.meta.env.VITE_FRONTEND_URL}/your-space
                </span>
              </div>
            ) : (
              <></>
            )}

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
              {mode=="create" && space.spacelogo!=""  && (
                <img
                  src={URL.createObjectURL(space.spacelogo)}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mt-2 mx-auto"
                />
              )}
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
              className="w-full mb-3 cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                ? "Update Space"
                : "Create Space"}
            </button>
          </form>

          <button
            className="w-full bg-red-600 cursor-pointer text-white py-2 rounded-md hover:bg-red-700 transition"
            onClick={() => setopenDialog(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateSpaceDialog;
