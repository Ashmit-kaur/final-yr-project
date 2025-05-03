import React from "react";

const Sidebar = ({ tab, settab }) => {
  return (
    <aside className="w-full md:w-64 h-full bg-[#1f1f1f] p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>
      <ul className="space-y-1">
        <li
          className={`hover:text-yellow-400 ${
            tab === "1" ? "text-yellow-400" : "text-white"
          } cursor-pointer`}
          onClick={() => settab("1")}
        >
          All
        </li>
        <li
          className={`hover:text-yellow-400 ${
            tab === "2" ? "text-yellow-400" : "text-white"
          } cursor-pointer`}
          onClick={() => settab("2")}
        >
          Video
        </li>
        <li
          className={`hover:text-yellow-400 ${
            tab === "3" ? "text-yellow-400" : "text-white"
          } cursor-pointer`}
          onClick={() => settab("3")}
        >
          Text
        </li>
        <li
          className={`hover:text-yellow-400 ${
            tab === "4" ? "text-yellow-400" : "text-white"
          } cursor-pointer`}
          onClick={() => settab("4")}
        >
          Liked
        </li>
        <li  className={`hover:text-yellow-400 ${
            tab === "5" ? "text-yellow-400" : "text-white"
          } cursor-pointer`}
          onClick={() => settab("5")} >
          Request Testimonials
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-6">Embed Widgets</h2>
      <ul className="space-y-1">
        <li className="hover:text-yellow-400 cursor-pointer">Wall of Love</li>
        <li className="hover:text-yellow-400 cursor-pointer">
          Single Testimonial
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
