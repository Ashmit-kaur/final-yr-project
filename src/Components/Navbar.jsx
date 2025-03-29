import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/Authcontext";

const Navbar = () => {

  const {isAuthenticated,logout}=useContext(AuthContext)

  const handlelogout = async () => {
      try{
        await logout()
        alert("Logged out")
      }catch(error){
        console.log(error.response?.data?.message || "logout failed")
      }
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-white font-bold">
          Testimonials
        </Link>
        <div className="flex space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 border text-white border-white rounded  hover:text-blue-600 transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-700 hover:text-white transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            // dROPDOWN WITH A DASHBOARD AND LOGOUT BUTTON
            <Link
              className="px-4 py-2 border text-white border-white rounded  hover:text-blue-600 transition"
              onClick={()=>handlelogout()}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
