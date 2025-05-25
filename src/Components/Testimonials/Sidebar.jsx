import React from "react";
import TabSeven from "./TabSeven";

const Sidebar = ({ tab, settab, space }) => {
  return (
    <>
      <aside className="w-full md:w-64 h-full bg-purple-100 p-6 space-y-6 border-r border-purple-200">
        <div>
          <h2 className="text-xl font-semibold text-purple-800 mb-3">
            📥 Inbox
          </h2>
          <ul className="space-y-2">
            {[
              { label: "All", value: "1" },
              { label: "Video", value: "2" },
              { label: "Text", value: "3" },
              { label: "Liked", value: "4" },
              { label: "Request Testimonials", value: "5" },
            ].map(({ label, value }) => (
              <li
                key={value}
                className={`cursor-pointer px-2 py-1 rounded-md transition-colors ${
                  tab === value
                    ? "bg-purple-300 text-white font-medium"
                    : "text-purple-700 hover:bg-purple-200"
                }`}
                onClick={() => settab(value)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-800 mb-3">
            🧩 Embed Widgets
          </h2>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer px-2 py-1 rounded-md transition-colors ${
                tab === "6"
                  ? "bg-purple-300 text-white font-medium"
                  : "text-purple-700 hover:bg-purple-200"
              }`}
              onClick={() => settab("6")}
            >
              Wall of Love
            </li>
            <li
              className={`cursor-pointer px-2 py-1 rounded-md transition-colors ${
                tab === "7"
                  ? "bg-purple-300 text-white font-medium"
                  : "text-purple-700 hover:bg-purple-200"
              }`}
              onClick={() => settab("7")}
            >
              Single Testimonial
            </li>
          </ul>
        </div>
      </aside>

      {tab === "7" && <TabSeven settab={settab} space={space} />}
    </>
  );
};

export default Sidebar;
