import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/Authcontext";
import { toast } from "react-toastify";
import GimmeFeedbacksLogo from "../assets/GimmeFeedbacksLogo.png";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
    } catch (error) {
      console.log(error.response?.data?.message || "logout failed");
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="flex items-center">
          <img
            src={GimmeFeedbacksLogo}
            className="h-[4.5em] w-auto ml-2 sm:h-[5em] md:h-[5.5em]"
            alt="GimmeFeedbacks"
          />
        </Link>

        <div className="flex space-x-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={handlelogout}
                className="px-4 cursor-pointer py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-red-600 hover:text-white transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
