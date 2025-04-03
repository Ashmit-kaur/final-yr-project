import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage===1} className="px-4 py-2 mx-1 bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-800 cursor-pointer">Prev</button>
      {[...Array(totalPages)].map((_,index)=>{
        <button key={index} onClick={()=>onPageChange(index+1)} className={`px-4 py-2 mx-1 rounded ${currentPage===index+1?"bg-blue-600 text-white":"bg-gray-700 text-white"}`}>{index+1}</button>
      })}
      <button onClick={()=>onPageChange(currentPage+1)} disabled={currentPage===totalPages} className="px-4 py-2 mx-1 bg-gray-700 hover:bg-gray-800 cursor-pointer text-white rounded disabled:opacity-50">Next</button>
    </div>
  );
};

export default Pagination;
