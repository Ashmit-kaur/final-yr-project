import React from "react";

const DropdownMenu = (id) => {
  return (
    <div className="absolute right-0 mt-2 w-56 bg-gray-900 text-white rounded-lg shadow-lg z-10">
      <ul className="py-2 text-sm">
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            console.log("Manage testimonials");
          }}
        >
          📁 Manage testimonials
        </li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
          🔗 Get the link
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => {
            console.log("Edit space", space.id);
          }}
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
          onClick={() => {
            console.log("Delete", space.id);
          }}
        >
          ❌ Delete the space
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
