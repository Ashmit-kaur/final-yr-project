import axios from "axios";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Authcontext.jsx";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Signin = () => {

  const [formData,setformData]=useState(initialValues)
  const [error, setError] = useState("");
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()
  const {isAuthenticated,login}=useContext(AuthContext)

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/dashboard")
    }
  },[isAuthenticated])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      await login(formData); 
      setError("");
      navigate("/verify-account")
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
    setloading(false);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <p className="text-3xl text-purple-600 font-bold text-center mb-6">Login | Developer</p>
        <p className="font-bold">Enter your login details</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="developer@gmail.com"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Abc#123"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading?"Signing In...":"Sign In"}
            </button>
          </div>
        </form>

        {/* Forget password */}
        <p className="mt-2 text-center text-sm text-black">
          <a href="/forget-password" className="text-indigo-600 hover:text-indigo-500">
            Forget password
          </a>
        </p>

        {/* Link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>

        
      </div>
    </div>
  );
};

export default Signin;
