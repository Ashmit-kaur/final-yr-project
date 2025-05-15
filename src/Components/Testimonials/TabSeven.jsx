import React, { use, useState } from 'react';

const TabSeven = ({settab}) => {

    const [type,settype]=useState("")
    const handleClose = () => {
        settab("1")
    }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl text-black font-semibold text-center mb-4">Embed a single testimonial</h2>
        <p className="text-center text-gray-600 mb-6">
          Aside from Wall of Love, you have the option to easily embed a video or text testimonial to your website. Read our instructions here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Video testimonial */}
          <div onClick={()=>{settype("VIDEO"),handleClose()}} className="border rounded-xl overflow-hidden hover:shadow-lg cursor-pointer">
            <div className="relative h-64 bg-gray-200">
              <img 
                src="https://via.placeholder.com/400x250.png?text=Video+Thumbnail" 
                alt="Video testimonial" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="bg-white rounded-full p-2">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
                <p className="text-sm font-semibold">Jack Andrew</p>
                <p className="text-xs">General Manager of betterfamily.com</p>
              </div>
            </div>
            <div className="text-center text-black py-3 font-medium">Video testimonial</div>
          </div>

          {/* Text testimonial */}
          <div onClick={()=>{settype("TEXT"),handleClose()}} className="border rounded-xl overflow-hidden hover:shadow-lg cursor-pointer">
            <div className="bg-yellow-50 p-4 h-64 flex flex-col justify-between">
              <div>
                <div className="text-blue-500 text-xl">★★★★★</div>
                <p className="mt-2 text-sm text-gray-800">
                  "We embedded Testimonial.to on the last page of our Prehireforms and candidates' testimonials started coming in automatically!"
                </p>
                <p className="mt-2 text-sm font-semibold text-yellow-900">
                  Testimonials collection is now automated and we don’t need to ask for them anymore!
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
                  <p className="text-xs text-gray-600">Co-Founder at Prehireforms.com</p>
                </div>
              </div>
            </div>
            <div className="text-center text-black py-3 font-medium">Text testimonial</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSeven;
