import React, { useState } from "react";
import axios from "axios";
import CreateSpaceDialog from "./CreateSpaceDialog";
import { useNavigate } from "react-router-dom";

const DropdownMenu = ({ id, space, setspaces }) => {
  const [confirmdelete, setconfirmDelete] = useState(false);
  const [value, setvalue] = useState("");
  const [error, setError] = useState("");
  const [editspace, seteditspace] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (value != space?.title) {
      setError("Your space title isn't correct.");
      return;
    }
    try {
      const result = await axios.delete(
        `http://localhost:3000/api/v1/space/${id}`,
        {
          withCredentials: true,
        }
      );
      alert(result.data?.message);
      setspaces((prevSpaces) => prevSpaces.filter((space) => space.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDuplicate = () => {};

  return (
    <div className="absolute right-0 mt-2 w-56 bg-gray-900 text-white rounded-lg shadow-lg z-10">
      <ul className="py-2 text-sm">
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            navigate(`/dashboard/managetestimonials/${space.slug}`);
          }}
        >
          📁 Manage testimonials
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(`http://localhost:5173/products/${space.slug}`)
            alert("Copied to clipboard");
          }}
        >
          🔗 Get the link
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => seteditspace(true)}
        >
          ✏️ Edit the space
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            console.log("Duplicate", space.id);
          }}
        >
          📄 Duplicate the space
        </li>
        <li
          className="px-4 py-2 text-red-400 hover:bg-gray-700 cursor-pointer"
          onClick={() => setconfirmDelete(true)}
        >
          ❌ Delete the space
        </li>
      </ul>
      {confirmdelete && (
        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg mt-2">
          <h1 className="text-lg font-bold text-red-500">Delete this space</h1>
          <p className="text-sm text-gray-300 mt-1">
            Once deleted, all testimonials in this space will be gone forever.
          </p>
          <p className="text-sm text-gray-300">Please be certain!</p>
          <p className="text-sm text-gray-300 mt-2">
            Type <strong>{space?.title}</strong> to confirm:
          </p>

          <input
            type="text"
            name="confirmtext"
            value={value}
            onChange={(e) => {
              setvalue(e.target.value);
              setError("");
            }}
            className="mt-2 w-full p-2 rounded bg-gray-700 text-white outline-none"
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="flex gap-2 mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2"
              onClick={handleDelete}
            >
              Confirm Delete
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-500 text-white rounded-md px-4 py-2"
              onClick={() => setconfirmDelete(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {editspace && (
        <CreateSpaceDialog
          mode={"edit"}
          spaceData={space}
          setopenDialog={seteditspace}
        />
      )}
    </div>
  );
};

export default DropdownMenu;
