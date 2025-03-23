import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/authSlice";

const Navbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handlelogout = () => {
      dispatch(logout());
      alert("Logged out successfully")
      window.location.reload()
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-white font-bold">
          Testimonials
        </Link>
        <div className="flex space-x-4">
          {!user ? (
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
