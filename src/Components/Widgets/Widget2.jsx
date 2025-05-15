import React from "react";

const Widget2 = () => {
  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-all duration-300">
      <h3 className="text-center font-medium mb-2">Masonry - fixed</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded shadow-sm h-28 overflow-hidden">
        <img src="" alt="User Image" 
              className='w-10 h-10 rounded-full mr-2'
              />
          <p className="text-sm">"Widget2 testimonial layout..."</p>
          <span className="text-xs text-gray-500">— User X</span>
        </div>
        <div className="bg-white p-4 rounded shadow-sm h-28 overflow-hidden">
        <img src="" alt="User Image" 
              className='w-10 h-10 rounded-full mr-2'
              />
          <p className="text-sm">"Different testimonial style..."</p>
          <span className="text-xs text-gray-500">— User Y</span>
        </div>
      </div>
    </div>
  );
};

export default Widget2;
