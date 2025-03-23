import React from "react";
export function Button({ children, className, ...props }) {
    return (
      <button 
        className={`px-6 py-3 text-lg rounded-xl shadow-md bg-blue-600 text-white hover:bg-blue-700 ${className}`} 
        {...props}
      >
        {children}
      </button>
    );
  }
  