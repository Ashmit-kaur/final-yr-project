import React, { useState } from "react";
import Widget1 from "./Widget1";
import Widget2 from "./Widget2";
import { IoMdClose } from "react-icons/io";
import { favouritedata } from "./Dummydata";
import InstallationModal from "./InstallationModal";

const WidgetDialog = ({ slug, settab }) => {
  const [selected, setSelected] = useState("masonry-fixed");

  const [isopen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <div className="relative flex items-center justify-center mb-2">
            <h2 className="text-2xl font-semibold text-center w-full">
              Embed a Wall of Love
            </h2>

            <button className="absolute text-black cursor-pointer right-0" onClick={()=>settab("1")}>
              <IoMdClose size={24} />
            </button>
          </div>

          <p className="mb-6 text-gray-700">
            <span className="text-indigo-600 font-medium mr-2">Step 1</span>
            Choose a layout
          </p>

          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 cursor-pointer py-2 rounded ${
                selected === "masonry-fixed"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                setSelected("masonry-fixed");
                setIsOpen(true);
              }}
            >
              Layout 1
            </button>
            <button
              className={`px-4 py-2 cursor-pointer rounded ${
                selected === "carouselSlider"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                setSelected("carouselSlider");
                setIsOpen(true);
              }}
            >
              Layout 2
            </button>
          </div>

          {selected === "masonry-fixed" && (
            <Widget1 favourites={favouritedata} />
          )}
          {selected === "carouselSlider" && (
            <Widget2 favourites={favouritedata} />
          )}
        </div>
      </div>
      {isopen && <InstallationModal setIsOpen={setIsOpen} slug={slug} layout={selected}/>}
    </>
  );
};

export default WidgetDialog;
