import React from "react";

const Widget1 = ({ favourites }) => {
  console.log(favourites);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <h3 className="text-center text-2xl font-semibold mb-4">Masonary-fixed</h3>
      {favourites.map((testimonial, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="text-sm font-semibold">{testimonial.name}</span>
          </div>
          <p className="text-sm text-gray-700 italic">{testimonial.reviewText}</p>
        </div>
      ))}
    </div>
  );
}
   
export default Widget1;
